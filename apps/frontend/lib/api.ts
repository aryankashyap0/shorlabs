/**
 * Shorlabs API client for frontend
 * 
 * Note: This module should be used with useAuth() from Clerk.
 * The getToken function should be passed in from the component.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ─────────────────────────────────────────────────────────────
// GITHUB API
// ─────────────────────────────────────────────────────────────

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    clone_url: string;
    private: boolean;
    default_branch: string;
    updated_at: string;
    language: string | null;
}

export async function fetchGitHubRepos(token: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${API_BASE_URL}/api/github/repos`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function checkGitHubConnection(token: string): Promise<{ connected: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/github/status`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

// ─────────────────────────────────────────────────────────────
// PROJECTS API
// ─────────────────────────────────────────────────────────────

export interface Project {
    project_id: string;
    name: string;
    github_url: string;
    github_repo: string;
    status: "PENDING" | "CLONING" | "PREPARING" | "UPLOADING" | "BUILDING" | "DEPLOYING" | "LIVE" | "FAILED";
    function_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Deployment {
    deploy_id: string;
    build_id: string;
    status: "IN_PROGRESS" | "SUCCEEDED" | "FAILED";
    started_at: string;
    finished_at: string | null;
}

export interface ProjectDetails {
    project: Project & { ecr_repo: string | null };
    deployments: Deployment[];
}

export interface CreateProjectRequest {
    name: string;
    github_repo: string;
    root_directory?: string;
    env_vars?: Record<string, string>;
    start_command: string;
}

export interface CreateProjectResponse {
    project_id: string;
    name: string;
    github_url: string;
    status: string;
}

export async function fetchProjects(token: string): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function fetchProject(token: string, projectId: string): Promise<ProjectDetails> {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function createProject(token: string, data: CreateProjectRequest): Promise<CreateProjectResponse> {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function getProjectStatus(token: string, projectId: string): Promise<{ project_id: string; status: string; function_url: string | null }> {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/status`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function deleteProject(token: string, projectId: string): Promise<{ deleted: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}
