"""
Framework Registry and Auto-Detection

Vercel-style declarative framework detection for Python and Node.js projects.
"""

import re
import httpx
from typing import Optional, TypedDict, List


class DetectionResult(TypedDict):
    detected: bool
    framework: Optional[str]
    runtime: Optional[str]
    entry_file: Optional[str]
    suggested_command: Optional[str]
    confidence: str  # "high", "medium", "low"


# Framework registry with detection rules
# Order matters - first match wins
FRAMEWORKS = [
    # Python Frameworks
    {
        "name": "FastAPI",
        "runtime": "python",
        "detectors": {
            "files": [
                "main.py",
                "app.py",
                "server.py",
                "api.py",
                "src/main.py",
                "src/app.py",
                "api/main.py",
                "app/main.py",
            ],
            "match_content": r"(from\s+fastapi|import\s+FastAPI|FastAPI\s*\()",
        },
        "start_command": "uvicorn {module}:app --host 0.0.0.0 --port 8080",
    },
    {
        "name": "Flask",
        "runtime": "python",
        "detectors": {
            "files": [
                "main.py",
                "app.py",
                "server.py",
                "api.py",
                "src/main.py",
                "src/app.py",
                "application.py",
            ],
            "match_content": r"(from\s+flask|import\s+Flask|Flask\s*\()",
        },
        "start_command": "gunicorn {module}:app -b 0.0.0.0:8080",
    },
    {
        "name": "Django",
        "runtime": "python",
        "detectors": {
            "files": ["manage.py"],
            "match_content": r"django",
        },
        "start_command": "python manage.py migrate && gunicorn {project}.wsgi:application -b 0.0.0.0:8080",
    },
    {
        "name": "Litestar",
        "runtime": "python",
        "detectors": {
            "files": ["main.py", "app.py", "server.py", "src/main.py"],
            "match_content": r"(from\s+litestar|import\s+Litestar|Litestar\s*\()",
        },
        "start_command": "uvicorn {module}:app --host 0.0.0.0 --port 8080",
    },
    {
        "name": "Starlette",
        "runtime": "python",
        "detectors": {
            "files": ["main.py", "app.py", "server.py", "src/main.py"],
            "match_content": r"(from\s+starlette|import\s+Starlette|Starlette\s*\()",
        },
        "start_command": "uvicorn {module}:app --host 0.0.0.0 --port 8080",
    },
    # Generic Python (fallback for Python projects without framework detection)
    {
        "name": "Python",
        "runtime": "python",
        "detectors": {
            "files": ["main.py", "app.py", "server.py", "run.py"],
            "match_content": None,  # Just check file exists
        },
        "start_command": "python {file}",
    },
    # Node.js Frameworks (these use package.json start script)
    {
        "name": "Express",
        "runtime": "nodejs",
        "detectors": {
            "files": ["package.json"],
            "match_package": ["express"],
        },
        "start_command": None,  # Uses package.json start script
    },
    {
        "name": "Fastify",
        "runtime": "nodejs",
        "detectors": {
            "files": ["package.json"],
            "match_package": ["fastify"],
        },
        "start_command": None,
    },
    {
        "name": "Hono",
        "runtime": "nodejs",
        "detectors": {
            "files": ["package.json"],
            "match_package": ["hono"],
        },
        "start_command": None,
    },
    {
        "name": "Koa",
        "runtime": "nodejs",
        "detectors": {
            "files": ["package.json"],
            "match_package": ["koa"],
        },
        "start_command": None,
    },
    {
        "name": "NestJS",
        "runtime": "nodejs",
        "detectors": {
            "files": ["package.json"],
            "match_package": ["@nestjs/core"],
        },
        "start_command": None,
    },
    # Generic Node.js (fallback)
    {
        "name": "Node.js",
        "runtime": "nodejs",
        "detectors": {
            "files": ["package.json"],
            "match_package": None,  # Just check package.json exists
        },
        "start_command": None,  # Uses package.json start script
    },
]


def _normalize_path(root_directory: str, file_path: str) -> str:
    """Combine root directory and file path, normalizing for GitHub API."""
    root = root_directory.strip("./").strip("/")
    if root:
        return f"{root}/{file_path}"
    return file_path


def _file_to_module(file_path: str) -> str:
    """Convert file path to Python module notation."""
    module = file_path.replace("/", ".").replace("\\", ".")
    if module.endswith(".py"):
        module = module[:-3]
    return module


async def _fetch_file_content(
    owner: str,
    repo: str,
    file_path: str,
    token: str,
) -> Optional[str]:
    """Fetch file content from GitHub API."""
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.raw+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                return response.text
        except Exception as e:
            print(f"Error fetching {file_path}: {e}")
    
    return None


async def _check_file_exists(
    owner: str,
    repo: str,
    file_path: str,
    token: str,
) -> bool:
    """Check if a file exists in the GitHub repo."""
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.head(url, headers=headers, timeout=10)
            return response.status_code == 200
        except Exception:
            return False


async def _check_package_json_deps(
    owner: str,
    repo: str,
    file_path: str,
    packages: List[str],
    token: str,
) -> bool:
    """Check if package.json contains any of the specified packages."""
    import json
    
    content = await _fetch_file_content(owner, repo, file_path, token)
    if not content:
        return False
    
    try:
        pkg = json.loads(content)
        deps = {
            **pkg.get("dependencies", {}),
            **pkg.get("devDependencies", {}),
        }
        return any(p in deps for p in packages)
    except json.JSONDecodeError:
        return False


async def detect_framework(
    github_url: str,
    root_directory: str,
    token: str,
) -> DetectionResult:
    """
    Detect framework and suggest start command.
    """
    # Parse owner/repo from URL
    parts = github_url.rstrip("/").rstrip(".git").split("/")
    owner = parts[-2]
    repo = parts[-1]
    
    # Try each framework in order
    for framework in FRAMEWORKS:
        detectors = framework["detectors"]
        files_to_check = detectors.get("files", [])
        match_content = detectors.get("match_content")
        match_package = detectors.get("match_package")
        
        for file_path in files_to_check:
            full_path = _normalize_path(root_directory, file_path)
            
            # For Node.js with package matchers
            if match_package is not None:
                if file_path == "package.json":
                    if await _check_package_json_deps(owner, repo, full_path, match_package, token):
                        return DetectionResult(
                            detected=True,
                            framework=framework["name"],
                            runtime=framework["runtime"],
                            entry_file=file_path,
                            suggested_command=framework["start_command"],
                            confidence="high",
                        )
            
            # For Python with content matchers
            elif match_content is not None:
                content = await _fetch_file_content(owner, repo, full_path, token)
                if content and re.search(match_content, content, re.IGNORECASE):
                    module = _file_to_module(file_path)
                    cmd = framework["start_command"]
                    if cmd:
                        cmd = cmd.replace("{module}", module)
                        cmd = cmd.replace("{file}", file_path)
                    
                    return DetectionResult(
                        detected=True,
                        framework=framework["name"],
                        runtime=framework["runtime"],
                        entry_file=file_path,
                        suggested_command=cmd,
                        confidence="high",
                    )
            
            # Fallback: just check if file exists
            else:
                if await _check_file_exists(owner, repo, full_path, token):
                    module = _file_to_module(file_path)
                    cmd = framework["start_command"]
                    if cmd:
                        cmd = cmd.replace("{module}", module)
                        cmd = cmd.replace("{file}", file_path)
                    
                    return DetectionResult(
                        detected=True,
                        framework=framework["name"],
                        runtime=framework["runtime"],
                        entry_file=file_path,
                        suggested_command=cmd,
                        confidence="medium",
                    )
    
    # No framework detected
    return DetectionResult(
        detected=False,
        framework=None,
        runtime=None,
        entry_file=None,
        suggested_command=None,
        confidence="low",
    )
