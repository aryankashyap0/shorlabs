"use client"

import { Terminal, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StartCommandInputProps {
    /** Current value of the start command */
    value: string
    /** Callback when value changes */
    onChange: (value: string) => void
    /** Whether to show the port 8080 warning */
    showPortWarning?: boolean
    /** Whether in read-only display mode */
    readOnly?: boolean
    /** Callback to start editing (for read-only mode) */
    onStartEdit?: () => void
    /** Whether currently in edit mode */
    isEditing?: boolean
    /** Callback to cancel editing */
    onCancelEdit?: () => void
    /** Callback to save changes */
    onSave?: () => void
    /** Whether save is in progress */
    isSaving?: boolean
    /** Placeholder text */
    placeholder?: string
}

export function StartCommandInput({
    value,
    onChange,
    showPortWarning = true,
    readOnly = false,
    onStartEdit,
    isEditing = false,
    onCancelEdit,
    onSave,
    isSaving = false,
    placeholder = "uvicorn main:app --host 0.0.0.0 --port 8080"
}: StartCommandInputProps) {

    // Read-only display mode (for project details when not editing)
    if (readOnly && !isEditing) {
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                        <Terminal className="h-5 w-5 text-zinc-400" />
                        <h3 className="font-semibold text-zinc-900">Start Command</h3>
                    </div>
                    {onStartEdit && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onStartEdit}
                            className="text-zinc-500 hover:text-zinc-900"
                        >
                            Edit
                        </Button>
                    )}
                </div>

                <div className="p-4 sm:p-6">
                    <div className="bg-zinc-50 rounded-xl px-4 py-3 font-mono text-sm text-zinc-700 border border-zinc-100">
                        {value || "No start command configured"}
                    </div>
                </div>
            </div>
        )
    }

    // Edit mode for project details page
    if (isEditing) {
        return (
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                        <Terminal className="h-5 w-5 text-zinc-400" />
                        <h3 className="font-semibold text-zinc-900">Start Command</h3>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                        <Input
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="font-mono text-sm h-12 rounded-xl"
                        />
                        <p className="text-sm text-zinc-500">
                            The command to start your application. Must listen on port 8080.
                        </p>
                        {onCancelEdit && onSave && (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={onCancelEdit}
                                    className="rounded-full"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onSave}
                                    disabled={isSaving}
                                    className="bg-zinc-900 hover:bg-zinc-800 rounded-full"
                                >
                                    {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Create mode (for configure page) - terminal style
    return (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-zinc-100">
                <Terminal className="h-5 w-5 text-zinc-400" />
                <h3 className="font-semibold text-zinc-900">Start Command</h3>
            </div>
            <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3.5 border border-zinc-800">
                    <span className="text-emerald-400 font-mono text-sm">$</span>
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="flex-1 border-0 bg-transparent h-auto p-0 font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-100 placeholder:text-zinc-500"
                    />
                </div>
                {showPortWarning && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-amber-900">Important</p>
                                <p className="text-sm text-amber-700 mt-1">
                                    Your application must listen on <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">port 8080</code>. This is the port our infrastructure expects.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
