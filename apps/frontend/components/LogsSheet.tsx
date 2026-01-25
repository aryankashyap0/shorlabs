"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useAuth } from "@clerk/nextjs"
import { RefreshCw, Terminal, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface LogEntry {
    timestamp: string
    message: string
    level: "INFO" | "WARN" | "ERROR" | "SUCCESS"
}

interface LogsSheetProps {
    projectId: string
    projectName: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const LOG_LEVEL_STYLES: Record<string, string> = {
    INFO: "text-neutral-600",
    WARN: "text-amber-600",
    ERROR: "text-red-600",
    SUCCESS: "text-emerald-600",
}

export function LogsSheet({ projectId, projectName, open, onOpenChange }: LogsSheetProps) {
    const { getToken } = useAuth()
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [autoScroll, setAutoScroll] = useState(true)
    const logsContainerRef = useRef<HTMLDivElement>(null)

    const fetchLogs = useCallback(async () => {
        if (!open) return

        try {
            setLoading(true)
            const token = await getToken()
            const response = await fetch(
                `${API_BASE_URL}/api/projects/${projectId}/runtime`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )

            if (!response.ok) {
                throw new Error("Failed to fetch logs")
            }

            const data = await response.json()
            setLogs(data.logs || [])
        } catch (err) {
            console.error("Error fetching logs:", err)
            setLogs([{ timestamp: new Date().toISOString(), message: "Failed to load logs", level: "ERROR" }])
        } finally {
            setLoading(false)
        }
    }, [getToken, projectId, open])

    // Fetch logs when sheet opens
    useEffect(() => {
        if (open) {
            fetchLogs()
        }
    }, [open, fetchLogs])

    // Auto-scroll to bottom when new logs arrive
    useEffect(() => {
        if (autoScroll && logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
        }
    }, [logs, autoScroll])

    // Handle scroll to toggle auto-scroll
    const handleScroll = () => {
        if (!logsContainerRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = logsContainerRef.current
        // If user scrolled up, disable auto-scroll; if near bottom, enable it
        setAutoScroll(scrollHeight - scrollTop - clientHeight < 50)
    }

    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp)
            return date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            })
        } catch {
            return timestamp
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
                <SheetHeader className="px-6 py-4 border-b border-neutral-100 shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="text-lg font-semibold text-neutral-900">
                                Runtime Logs
                            </SheetTitle>
                            <SheetDescription className="text-sm text-neutral-500">
                                {projectName}
                            </SheetDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchLogs}
                            disabled={loading}
                            className="rounded-full"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                    </div>
                </SheetHeader>

                {/* Logs Container */}
                <div
                    ref={logsContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto bg-neutral-50 p-4 font-mono text-xs"
                >
                    {loading && logs.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="h-6 w-6 text-neutral-500 animate-spin" />
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                            <Terminal className="h-8 w-8 mb-3 opacity-50" />
                            <p>No logs available</p>
                            <p className="text-neutral-400 text-xs mt-1">
                                Invoke your function to see runtime logs
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            {logs.map((log, index) => (
                                <div key={index} className="flex gap-3 leading-relaxed">
                                    <span className="text-neutral-400 shrink-0 select-none">
                                        {formatTimestamp(log.timestamp)}
                                    </span>
                                    <span className={LOG_LEVEL_STYLES[log.level] || "text-neutral-600"}>
                                        {log.message}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer with auto-scroll indicator */}
                <div className="px-6 py-2 border-t border-neutral-200 bg-white shrink-0">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                            {logs.length} log entries
                        </span>
                        {autoScroll && (
                            <span className="text-neutral-400">
                                Auto-scroll enabled
                            </span>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
