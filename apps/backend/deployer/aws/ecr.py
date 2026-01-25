"""
ECR Operations

ECR repository management.
"""

from ..clients import get_ecr_client
from ..config import ECR_REPO_PREFIX


def create_ecr_repository(repo_name: str) -> str:
    """
    Create ECR repository if it doesn't exist.
    
    Args:
        repo_name: Name of the repository
        
    Returns:
        The repository URI
    """
    ecr_client = get_ecr_client()
    
    try:
        response = ecr_client.describe_repositories(repositoryNames=[repo_name])
        repo_uri = response["repositories"][0]["repositoryUri"]
        print(f"✅ ECR repository exists: {repo_name}")
        return repo_uri
    except ecr_client.exceptions.RepositoryNotFoundException:
        print(f"📦 Creating ECR repository: {repo_name}")
        response = ecr_client.create_repository(repositoryName=repo_name)
        repo_uri = response["repository"]["repositoryUri"]
        print(f"✅ Created ECR repository: {repo_name}")
        return repo_uri


def delete_ecr_repository(repo_name: str) -> bool:
    """
    Delete an ECR repository and all its images.
    
    Args:
        repo_name: Name of the repository to delete
        
    Returns:
        True if deleted, False if not found
    """
    ecr_client = get_ecr_client()
    
    try:
        ecr_client.delete_repository(
            repositoryName=repo_name,
            force=True  # Delete even if images exist
        )
        print(f"✅ Deleted ECR repository: {repo_name}")
        return True
    except ecr_client.exceptions.RepositoryNotFoundException:
        print(f"⚠️ ECR repository not found: {repo_name}")
        return False
    except Exception as e:
        print(f"❌ Failed to delete ECR: {e}")
        return False


def get_ecr_repo_name(project_name: str) -> str:
    """
    Get the ECR repository name for a project.
    
    Args:
        project_name: The project name
        
    Returns:
        The ECR repository name
    """
    return f"{ECR_REPO_PREFIX}-{project_name}"
