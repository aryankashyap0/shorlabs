"""
AWS Services Module

AWS service operations for deployment.
"""

from .ecr import create_ecr_repository, delete_ecr_repository
from .iam import get_or_create_codebuild_role, get_or_create_lambda_role
from .codebuild import create_or_update_codebuild_project, start_build, wait_for_build
from .lambda_service import create_or_update_lambda, delete_lambda
from .cloudwatch import get_build_logs, get_lambda_logs, delete_lambda_logs

__all__ = [
    # ECR
    "create_ecr_repository",
    "delete_ecr_repository",
    # IAM
    "get_or_create_codebuild_role",
    "get_or_create_lambda_role",
    # CodeBuild
    "create_or_update_codebuild_project",
    "start_build",
    "wait_for_build",
    # Lambda
    "create_or_update_lambda",
    "delete_lambda",
    # CloudWatch Logs
    "get_build_logs",
    "get_lambda_logs",
    "delete_lambda_logs",
]
