"""
Common Utilities

General utility functions for the deployer.
"""

import os
from urllib.parse import urlparse


def extract_project_name(github_url: str) -> str:
    """
    Extract project name from GitHub URL.
    
    Args:
        github_url: The GitHub repository URL
        
    Returns:
        A sanitized project name
    """
    parsed = urlparse(github_url)
    path = parsed.path.strip("/")
    
    if path.endswith(".git"):
        path = path[:-4]
    
    name = path.split("/")[-1]
    
    # Sanitize: only alphanumeric and hyphens
    name = "".join(c if c.isalnum() else "-" for c in name.lower())
    
    # Remove consecutive hyphens
    while "--" in name:
        name = name.replace("--", "-")
    
    return name.strip("-")
