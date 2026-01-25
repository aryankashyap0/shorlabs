"""
AWS Client Management

Provides lazy-loaded AWS clients for better testing and resource management.
"""

import boto3
from functools import lru_cache



@lru_cache()
def get_ecr_client():
    """Get the ECR client (cached)."""
    return boto3.client("ecr")


@lru_cache()
def get_lambda_client():
    """Get the Lambda client (cached)."""
    return boto3.client("lambda")


@lru_cache()
def get_iam_client():
    """Get the IAM client (cached)."""
    return boto3.client("iam")


@lru_cache()
def get_sts_client():
    """Get the STS client (cached)."""
    return boto3.client("sts")


@lru_cache()
def get_codebuild_client():
    """Get the CodeBuild client (cached)."""
    return boto3.client("codebuild")


@lru_cache()
def get_logs_client():
    """Get the CloudWatch Logs client (cached)."""
    return boto3.client("logs")


def get_aws_account_id() -> str:
    """Get the AWS account ID."""
    return get_sts_client().get_caller_identity()["Account"]


def get_aws_region() -> str:
    """Get the AWS region."""
    return boto3.session.Session().region_name or "us-east-1"
