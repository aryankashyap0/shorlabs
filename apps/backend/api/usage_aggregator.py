"""
Usage Metrics Aggregator - Scheduled service for CloudWatch → DynamoDB

This service runs hourly via EventBridge to:
1. Fetch CloudWatch metrics for all Lambda functions
2. Calculate incremental usage (requests + GB-Seconds)
3. Store aggregated data in DynamoDB

Industry-standard approach ensures usage persists even after function deletion.
"""
import os
from datetime import datetime, timedelta
from typing import Dict, List

import boto3
from boto3.dynamodb.conditions import Key

from api.db.dynamodb import (
    get_or_create_table,
    get_current_period,
    increment_user_usage,
)
from deployer import extract_project_name
from deployer.aws.lambda_service import get_lambda_function_name


# CloudWatch client
cloudwatch = boto3.client("cloudwatch")


def get_cloudwatch_metric_sum(
    function_name: str,
    metric_name: str,
    start_time: datetime,
    end_time: datetime,
) -> float:
    """
    Get sum of a CloudWatch metric for a Lambda function over a time period.
    
    Args:
        function_name: Lambda function name
        metric_name: CloudWatch metric name (e.g., "Invocations", "Duration")
        start_time: Start of time range
        end_time: End of time range
        
    Returns:
        Sum of metric values, or 0.0 if no data
    """
    try:
        response = cloudwatch.get_metric_statistics(
            Namespace="AWS/Lambda",
            MetricName=metric_name,
            Dimensions=[
                {
                    "Name": "FunctionName",
                    "Value": function_name,
                }
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=3600,  # 1 hour granularity
            Statistics=["Sum"],
        )
        
        datapoints = response.get("Datapoints", [])
        if not datapoints:
            return 0.0
        
        # Sum all datapoint values
        total = sum(dp.get("Sum", 0.0) for dp in datapoints)
        return float(total)
        
    except Exception as e:
        print(f"Error fetching {metric_name} for {function_name}: {e}")
        return 0.0


def get_hourly_invocations(function_name: str) -> int:
    """Get number of invocations in the last hour."""
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(hours=1)
    
    invocations = get_cloudwatch_metric_sum(
        function_name,
        "Invocations",
        start_time,
        end_time,
    )
    return int(invocations)


def get_hourly_gb_seconds(function_name: str, memory_mb: int) -> float:
    """
    Calculate GB-Seconds for a function in the last hour.
    
    GB-Seconds = (Duration_ms / 1000) * (Memory_MB / 1024) / 1000
    
    Note: CloudWatch Duration is in milliseconds, Memory is in MB.
    We convert to GB-Seconds for billing calculations.
    """
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(hours=1)
    
    # Get total duration in milliseconds
    total_duration_ms = get_cloudwatch_metric_sum(
        function_name,
        "Duration",
        start_time,
        end_time,
    )
    
    if total_duration_ms == 0:
        return 0.0
    
    # Convert to GB-Seconds
    # Duration: ms → seconds (/ 1000)
    # Memory: MB → GB (/ 1024)
    # Result in GB-Seconds
    duration_seconds = total_duration_ms / 1000.0
    memory_gb = memory_mb / 1024.0
    gb_seconds = duration_seconds * memory_gb
    
    return gb_seconds


def get_all_projects() -> List[Dict]:
    """Get all projects from DynamoDB."""
    table = get_or_create_table()
    
    # Scan for all project items
    # In production with many users, use pagination
    response = table.scan(
        FilterExpression="begins_with(SK, :sk_prefix)",
        ExpressionAttributeValues={
            ":sk_prefix": "PROJECT#",
        },
    )
    
    return response.get("Items", [])


def aggregate_usage_metrics():
    """
    Main aggregation function - called by EventBridge hourly.
    
    Fetches CloudWatch metrics for all projects and stores in DynamoDB.
    """
    print(f"🔄 Starting usage metrics aggregation at {datetime.utcnow().isoformat()}")
    
    # Get all projects
    projects = get_all_projects()
    print(f"📊 Found {len(projects)} projects to aggregate")
    
    if not projects:
        print("✅ No projects to aggregate")
        return
    
    # Group projects by user_id
    users_projects: Dict[str, List[Dict]] = {}
    for project in projects:
        user_id = project.get("user_id")
        if not user_id:
            continue
        if user_id not in users_projects:
            users_projects[user_id] = []
        users_projects[user_id].append(project)
    
    print(f"👥 Aggregating for {len(users_projects)} users")
    
    # Get current billing period
    period = get_current_period()
    
    # Aggregate metrics for each user
    total_requests = 0
    total_gb_seconds = 0.0
    
    for user_id, user_projects in users_projects.items():
        user_requests = 0
        user_gb_seconds = 0.0
        
        for project in user_projects:
            # Skip if project is not LIVE
            if project.get("status") != "LIVE":
                continue
            
            # Get function name - prefer stored function_name, fallback to deriving from github_url
            # for backwards compatibility with projects that don't have function_name stored
            stored_function_name = project.get("function_name")
            if stored_function_name:
                # Apply shorlabs- prefix to get full Lambda function name
                function_name = get_lambda_function_name(stored_function_name)
            else:
                # Fallback: derive from github_url and apply prefix
                project_name = extract_project_name(project.get("github_url", ""))
                if not project_name:
                    continue
                function_name = get_lambda_function_name(project_name)
            
            memory_mb = int(project.get("memory", 1024))
            
            # Fetch metrics from CloudWatch
            try:
                invocations = get_hourly_invocations(function_name)
                gb_seconds = get_hourly_gb_seconds(function_name, memory_mb)
                
                if invocations > 0 or gb_seconds > 0:
                    print(f"  📈 {function_name}: {invocations} invocations, {gb_seconds:.2f} GB-s")
                    user_requests += invocations
                    user_gb_seconds += gb_seconds
                    
            except Exception as e:
                print(f"  ❌ Error aggregating {function_name}: {e}")
                continue
        
        # Update user's usage in DynamoDB if there's any activity
        if user_requests > 0 or user_gb_seconds > 0:
            try:
                increment_user_usage(
                    user_id=user_id,
                    period=period,
                    requests=user_requests,
                    gb_seconds=user_gb_seconds,
                )
                print(f"✅ Updated usage for user {user_id}: +{user_requests} requests, +{user_gb_seconds:.2f} GB-s")
                total_requests += user_requests
                total_gb_seconds += user_gb_seconds
            except Exception as e:
                print(f"❌ Failed to update usage for user {user_id}: {e}")
    
    print(f"🎉 Aggregation complete!")
    print(f"   Total: {total_requests} requests, {total_gb_seconds:.2f} GB-Seconds")
    print(f"   Period: {period}")
