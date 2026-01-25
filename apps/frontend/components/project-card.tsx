"use client"

import { MoreHorizontal, GitBranch } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Minimal color palette for project icons
const projectColors = [
    "bg-amber-500",
    "bg-neutral-800",
    "bg-blue-600",
    "bg-purple-600",
    "bg-emerald-600",
]

export interface Project {
    id: string
    name: string
    url?: string
    repo?: string
    lastActivity?: string
    timestamp?: string
    branch?: string
    colorIndex?: number
}

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const colorIndex = project.colorIndex ??
        project.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % projectColors.length
    const bgColor = projectColors[colorIndex]

    return (
        <div className="group relative border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
            <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" />

            <div className="p-4">
                {/* Header: Icon + Name + Actions */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {/* Project Icon */}
                        <div className={`w-9 h-9 ${bgColor} rounded-md flex items-center justify-center`}>
                            <span className="text-white text-xs font-medium">
                                {project.name.substring(0, 2).toUpperCase()}
                            </span>
                        </div>

                        {/* Name & URL */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">
                                {project.name}
                            </h3>
                            {project.url && (
                                <p className="text-xs text-gray-500">
                                    {project.url}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 relative z-20">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon-sm" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Repo Link */}
                {project.repo && (
                    <a
                        href={`https://github.com/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 relative z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        {project.repo}
                    </a>
                )}

                {/* Activity */}
                {project.lastActivity && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-600">{project.lastActivity}</p>
                        {project.timestamp && (
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                                <span>{project.timestamp}</span>
                                {project.branch && (
                                    <>
                                        <span>on</span>
                                        <span className="inline-flex items-center gap-0.5">
                                            <GitBranch className="h-3 w-3" />
                                            {project.branch}
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
