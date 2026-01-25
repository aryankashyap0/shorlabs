"""
GitHub API routes - fetch user's repositories.
"""
import httpx
from fastapi import APIRouter, Depends, HTTPException

from api.auth import get_current_user_id, get_github_oauth_token

router = APIRouter(prefix="/api/github", tags=["github"])


@router.get("/repos")
async def list_github_repos(user_id: str = Depends(get_current_user_id)):
    """List GitHub repositories for the current user."""
    token = await get_github_oauth_token(user_id)
    
    if not token:
        raise HTTPException(
            status_code=400,
            detail="GitHub account not connected. Please connect GitHub first.",
        )
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.github.com/user/repos",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            params={
                "sort": "updated",
                "per_page": 100,
                "visibility": "all",  # public and private
            },
        )
    
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"GitHub API error: {response.text}",
        )
    
    repos = response.json()
    
    # Return simplified repo data
    return [
        {
            "id": repo["id"],
            "name": repo["name"],
            "full_name": repo["full_name"],
            "html_url": repo["html_url"],
            "clone_url": repo["clone_url"],
            "private": repo["private"],
            "default_branch": repo["default_branch"],
            "updated_at": repo["updated_at"],
            "language": repo.get("language"),
        }
        for repo in repos
    ]


@router.get("/status")
async def github_connection_status(user_id: str = Depends(get_current_user_id)):
    """Check if user has connected their GitHub account."""
    token = await get_github_oauth_token(user_id)
    return {"connected": token is not None}


@router.get("/repos/{repo:path}/contents")
async def get_repo_contents(
    repo: str,
    path: str = "",
    user_id: str = Depends(get_current_user_id),
):
    """Get contents of a repository directory for the directory picker."""
    token = await get_github_oauth_token(user_id)
    
    if not token:
        raise HTTPException(
            status_code=400,
            detail="GitHub account not connected.",
        )
    
    # GitHub API URL for repository contents
    url = f"https://api.github.com/repos/{repo}/contents"
    if path:
        url = f"{url}/{path}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        )
    
    if response.status_code == 404:
        return []
    
    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"GitHub API error: {response.text}",
        )
    
    contents = response.json()
    
    # Handle case where contents is a single file (not a directory)
    if isinstance(contents, dict):
        return []
    
    # Return simplified content data (directories and files)
    return [
        {
            "name": item["name"],
            "path": item["path"],
            "type": item["type"],  # "file" or "dir"
        }
        for item in contents
    ]

