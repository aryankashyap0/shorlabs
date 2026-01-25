#!/bin/bash
#
# Setup EventBridge schedule for usage metrics aggregation
# Runs hourly to fetch CloudWatch metrics and store in DynamoDB
#

set -e

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Loaded AWS credentials from .env"
else
    echo "❌ .env file not found!"
    exit 1
fi

REGION="${AWS_DEFAULT_REGION:-us-east-1}"
FUNCTION_NAME="shorlabs-api"
RULE_NAME="usage-metrics-aggregation-hourly"

echo "🔧 Setting up EventBridge schedule for usage aggregation..."
echo "   Region: $REGION"
echo "   Function: $FUNCTION_NAME"

# Get Lambda function ARN
FUNCTION_ARN=$(aws lambda get-function \
  --function-name "$FUNCTION_NAME" \
  --region "$REGION" \
  --query 'Configuration.FunctionArn' \
  --output text)

echo "✅ Found Lambda: $FUNCTION_ARN"

# Create EventBridge rule (cron: every hour at :00)
echo "📅 Creating EventBridge rule..."
aws events put-rule \
  --name "$RULE_NAME" \
  --description "Trigger usage metrics aggregation hourly" \
  --schedule-expression "cron(0 * * * ? *)" \
  --state ENABLED \
  --region "$REGION" \
  > /dev/null

echo "✅ EventBridge rule created: $RULE_NAME"

# Get rule ARN
RULE_ARN=$(aws events describe-rule \
  --name "$RULE_NAME" \
  --region "$REGION" \
  --query 'Arn' \
  --output text)

# Add permission for EventBridge to invoke Lambda
echo "🔐 Adding Lambda permission for EventBridge..."
aws lambda add-permission \
  --function-name "$FUNCTION_NAME" \
  --statement-id "AllowEventBridgeInvoke-${RULE_NAME}" \
  --action lambda:InvokeFunction \
  --principal events.amazonaws.com \
  --source-arn "$RULE_ARN" \
  --region "$REGION" \
  2>/dev/null || echo "   (Permission already exists)"

# Create target with custom payload
echo "🎯 Adding Lambda as EventBridge target..."
aws events put-targets \
  --rule "$RULE_NAME" \
  --targets "Id=1,Arn=$FUNCTION_ARN,Input='{\"source\":\"aws.events\",\"detail\":{\"action\":\"aggregate_usage\"}}'" \
  --region "$REGION" \
  > /dev/null

echo ""
echo "✅ EventBridge schedule configured successfully!"
echo ""
echo "Schedule: Every hour at :00 minutes"
echo "Next runs:"
aws events list-rule-names-by-target \
  --target-arn "$FUNCTION_ARN" \
  --region "$REGION" \
  > /dev/null && echo "   ✓ Rule is active and targeting Lambda"
echo ""
echo "To manually trigger aggregation:"
echo "  aws lambda invoke --function-name $FUNCTION_NAME \\"
echo "    --payload '{\"source\":\"aws.events\",\"detail\":{\"action\":\"aggregate_usage\"}}' \\"
echo "    response.json"
