"""
Migration script to add organization_id to existing user-usage-metrics records.

This script:
1. Scans the shorlabs-projects table to find each user's organization_id
2. Updates user-usage-metrics records with the corresponding organization_id

Run: python scripts/migrate_usage_org.py
"""

import os
import boto3
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize DynamoDB
dynamodb = boto3.resource(
    "dynamodb",
    region_name="us-east-1",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

projects_table = dynamodb.Table("shorlabs-projects")
usage_table = dynamodb.Table("user-usage-metrics")


def get_user_org_mapping():
    """Scan projects table to build user_id -> organization_id mapping."""
    user_org_map = {}
    
    response = projects_table.scan()
    items = response.get("Items", [])
    
    # Handle pagination
    while "LastEvaluatedKey" in response:
        response = projects_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        items.extend(response.get("Items", []))
    
    for item in items:
        user_id = item.get("user_id")
        org_id = item.get("organization_id")
        if user_id and org_id:
            # Keep the first org_id we find for each user
            # (assuming users have one primary org)
            if user_id not in user_org_map:
                user_org_map[user_id] = org_id
    
    return user_org_map


def migrate_usage_records():
    """Add organization_id to all usage records."""
    # Get user -> org mapping from projects
    user_org_map = get_user_org_mapping()
    print(f"Found {len(user_org_map)} user-org mappings")
    
    # Scan all usage records
    response = usage_table.scan()
    usage_items = response.get("Items", [])
    
    while "LastEvaluatedKey" in response:
        response = usage_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        usage_items.extend(response.get("Items", []))
    
    print(f"Found {len(usage_items)} usage records to migrate")
    
    updated = 0
    skipped = 0
    
    for item in usage_items:
        user_id = item.get("user_id")
        period = item.get("period")
        
        if not user_id or not period:
            print(f"Skipping invalid record: {item}")
            skipped += 1
            continue
        
        # Check if already has organization_id
        if item.get("organization_id"):
            print(f"Skipping {user_id}/{period} - already has org_id")
            skipped += 1
            continue
        
        # Get org_id from mapping
        org_id = user_org_map.get(user_id)
        if not org_id:
            print(f"Warning: No org_id found for user {user_id}")
            skipped += 1
            continue
        
        # Update record with organization_id
        usage_table.update_item(
            Key={"user_id": user_id, "period": period},
            UpdateExpression="SET organization_id = :org_id",
            ExpressionAttributeValues={":org_id": org_id},
        )
        print(f"Updated {user_id}/{period} with org_id={org_id}")
        updated += 1
    
    print(f"\nMigration complete: {updated} updated, {skipped} skipped")


if __name__ == "__main__":
    migrate_usage_records()
