'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Github, Loader2, ExternalLink, Unplug, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface GitHubConnection {
    connected: boolean
    username?: string
    avatar_url?: string
    account_type?: string
    installation_id?: string
}

export default function SettingsPage() {
    const { getToken, orgId, isLoaded: authLoaded } = useAuth()
    const { isLoaded: userLoaded } = useUser()

    const [connection, setConnection] = useState<GitHubConnection | null>(null)
    const [loading, setLoading] = useState(true)
    const [disconnecting, setDisconnecting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchStatus = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const token = await getToken()
            if (!token) {
                setLoading(false)
                return
            }

            const url = new URL(`${API_BASE_URL}/api/github/status`)
            if (orgId) url.searchParams.append('org_id', orgId)

            const res = await fetch(url.toString(), {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) throw new Error('Failed to fetch connection status')

            const data = await res.json()
            setConnection(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }, [getToken, orgId])

    // Only fetch once Clerk auth is fully loaded and orgId is available
    useEffect(() => {
        if (authLoaded && userLoaded && orgId) {
            fetchStatus()
        }
    }, [authLoaded, userLoaded, orgId]) // eslint-disable-line react-hooks/exhaustive-deps

    // Listen for GitHub popup callback (reuse existing flow)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return
            if (event.data.type === 'github-connected') {
                fetchStatus()
            }
        }
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [fetchStatus])

    const handleConnect = async () => {
        try {
            const token = await getToken()
            const res = await fetch(`${API_BASE_URL}/api/github/auth-url`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) throw new Error('Failed to get auth URL')

            const data = await res.json()
            if (data?.url) {
                const width = 600
                const height = 800
                const left = window.screenX + (window.outerWidth - width) / 2
                const top = window.screenY + (window.outerHeight - height) / 2

                window.open(
                    data.url,
                    'github-install',
                    `width=${width},height=${height},left=${left},top=${top},popup=1`
                )
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initiate connection')
        }
    }

    const handleDisconnect = async () => {
        try {
            setDisconnecting(true)
            setError(null)
            const token = await getToken()
            if (!token) return

            const url = new URL(`${API_BASE_URL}/api/github/disconnect`)
            if (orgId) url.searchParams.append('org_id', orgId)

            const res = await fetch(url.toString(), {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.detail || 'Failed to disconnect')
            }

            setConnection({ connected: false })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to disconnect')
        } finally {
            setDisconnecting(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Settings</h1>
                    <p className="text-sm text-zinc-500 mt-1">Manage your integrations and preferences</p>
                </div>

                {/* Integrations Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">Integrations</h2>

                        {/* GitHub Connection Card */}
                        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                            {/* Card Header */}
                            <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
                                        <Github className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-zinc-900">GitHub</p>
                                        <p className="text-xs text-zinc-500">Deploy from your repositories</p>
                                    </div>
                                </div>

                                {!loading && connection && (
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                                        connection.connected
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-zinc-100 text-zinc-500'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            connection.connected ? 'bg-emerald-500' : 'bg-zinc-400'
                                        }`} />
                                        {connection.connected ? 'Connected' : 'Not connected'}
                                    </span>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="px-6 py-5">
                                {loading ? (
                                    <div className="flex items-center justify-center py-6">
                                        <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center gap-3 py-4">
                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                        </div>
                                        <p className="text-sm text-zinc-500">{error}</p>
                                        <Button
                                            onClick={fetchStatus}
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full"
                                        >
                                            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                                            Retry
                                        </Button>
                                    </div>
                                ) : connection?.connected ? (
                                    /* Connected State */
                                    <div className="space-y-5">
                                        {/* Account Info */}
                                        <div className="flex items-center gap-3">
                                            {connection.avatar_url ? (
                                                <img
                                                    src={connection.avatar_url}
                                                    alt={connection.username || 'GitHub'}
                                                    className="w-12 h-12 rounded-full border border-zinc-200"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                                                    <Github className="h-6 w-6 text-zinc-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-zinc-900">{connection.username}</p>
                                                <p className="text-xs text-zinc-500">
                                                    {connection.account_type === 'Organization' ? 'Organization' : 'Personal account'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-100">
                                            <a
                                                href={`https://github.com/${connection.username}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                View on GitHub
                                            </a>

                                            <span className="text-zinc-200">|</span>

                                            <a
                                                href="https://github.com/apps/shorlabs/installations/new"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                                            >
                                                <RefreshCw className="h-3.5 w-3.5" />
                                                Manage permissions
                                            </a>

                                            <span className="text-zinc-200">|</span>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors">
                                                        <Unplug className="h-3.5 w-3.5" />
                                                        Disconnect
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="rounded-2xl">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Disconnect GitHub?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will revoke access to your GitHub repositories. Existing deployments will continue to work, but you won&apos;t be able to create new projects or redeploy until you reconnect.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={handleDisconnect}
                                                            className="bg-red-600 hover:bg-red-700 text-white rounded-full"
                                                            disabled={disconnecting}
                                                        >
                                                            {disconnecting ? (
                                                                <>
                                                                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                                                                    Disconnecting...
                                                                </>
                                                            ) : (
                                                                'Disconnect'
                                                            )}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                ) : (
                                    /* Not Connected State */
                                    <div className="flex flex-col items-center gap-4 py-4">
                                        <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center">
                                            <Github className="h-7 w-7 text-zinc-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium text-zinc-900 mb-1">No GitHub account connected</p>
                                            <p className="text-sm text-zinc-500 max-w-sm">
                                                Connect your GitHub account to import repositories and deploy your projects.
                                            </p>
                                        </div>
                                        <Button
                                            onClick={handleConnect}
                                            className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full h-10 px-6"
                                        >
                                            <Github className="h-4 w-4 mr-2" />
                                            Connect GitHub
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
