'use client'

import { Check, Cpu, Clock, HardDrive } from 'lucide-react'

interface ComputeSettingsProps {
    memory: number
    timeout: number
    ephemeralStorage: number
    onMemoryChange: (value: number) => void
    onTimeoutChange: (value: number) => void
    onEphemeralStorageChange: (value: number) => void
    isPro: boolean
    onUpgradeClick: () => void
}

const memoryOptions = [
    { value: 1024, label: "1 GB", description: "Standard" },
    { value: 2048, label: "2 GB", description: "High Memory", proOnly: true },
    { value: 4096, label: "4 GB", description: "Intensive", proOnly: true },
]

const ephemeralStorageOptions = [
    { value: 512, label: "512 MB", description: "Default" },
    { value: 1024, label: "1 GB", description: "Extended", proOnly: true },
    { value: 2048, label: "2 GB", description: "Large", proOnly: true },
]

export function ComputeSettings({
    memory,
    timeout,
    ephemeralStorage,
    onMemoryChange,
    onTimeoutChange,
    onEphemeralStorageChange,
    isPro,
    onUpgradeClick,
}: ComputeSettingsProps) {

    const handleMemorySelect = (value: number, isProOnly: boolean) => {
        if (isProOnly && !isPro) {
            onUpgradeClick()
            return
        }
        onMemoryChange(value)
    }

    const handleEphemeralStorageSelect = (value: number, isProOnly: boolean) => {
        if (isProOnly && !isPro) {
            onUpgradeClick()
            return
        }
        onEphemeralStorageChange(value)
    }

    const handleTimeoutChange = (value: number) => {
        if (value > 30 && !isPro) {
            onUpgradeClick()
            return
        }
        onTimeoutChange(value)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Memory Column */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100">
                    <Cpu className="h-4 w-4 text-zinc-400" />
                    <h3 className="font-semibold text-zinc-900 text-sm">Memory</h3>
                </div>
                <div className="p-4">
                    <div className="space-y-2">
                        {memoryOptions.map((option) => {
                            const isLocked = option.proOnly && !isPro
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleMemorySelect(option.value, !!option.proOnly)}
                                    className={`relative w-full p-3 rounded-lg border-2 transition-all text-left ${memory === option.value
                                            ? "border-zinc-900 bg-zinc-50"
                                            : isLocked
                                                ? "border-zinc-200 bg-zinc-50/50 opacity-75"
                                                : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                                        }`}
                                >
                                    {option.proOnly && (
                                        <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                            Pro
                                        </span>
                                    )}
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-semibold text-sm ${isLocked ? 'text-zinc-500' : 'text-zinc-900'}`}>
                                            {option.label}
                                        </span>
                                        {memory === option.value && (
                                            <div className="w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center">
                                                <Check className="h-2.5 w-2.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs text-zinc-500">{option.description}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Timeout Column */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <h3 className="font-semibold text-zinc-900 text-sm">Timeout</h3>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-zinc-500">Duration</span>
                                <div className="bg-zinc-100 rounded-lg px-3 py-1.5">
                                    <span className="text-lg font-bold text-zinc-900">{timeout}</span>
                                    <span className="text-xs text-zinc-500 ml-1">sec</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max={isPro ? 300 : 30}
                                step="5"
                                value={timeout}
                                onChange={(e) => handleTimeoutChange(Number(e.target.value))}
                                className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-zinc-900"
                            />
                            <div className="flex justify-between text-xs text-zinc-400 mt-1">
                                <span>5s</span>
                                <span>{isPro ? '300s' : '30s'}</span>
                            </div>
                        </div>
                        {!isPro && (
                            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                                <p className="text-xs text-zinc-600">
                                    Free tier limited to 30 seconds.
                                    <button
                                        onClick={onUpgradeClick}
                                        className="text-zinc-900 font-medium underline ml-1"
                                    >
                                        Upgrade to Pro
                                    </button> for up to 5 minutes.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ephemeral Storage Column */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100">
                    <HardDrive className="h-4 w-4 text-zinc-400" />
                    <h3 className="font-semibold text-zinc-900 text-sm">Storage</h3>
                </div>
                <div className="p-4">
                    <div className="space-y-2">
                        {ephemeralStorageOptions.map((option) => {
                            const isLocked = option.proOnly && !isPro
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleEphemeralStorageSelect(option.value, !!option.proOnly)}
                                    className={`relative w-full p-3 rounded-lg border-2 transition-all text-left ${ephemeralStorage === option.value
                                            ? "border-zinc-900 bg-zinc-50"
                                            : isLocked
                                                ? "border-zinc-200 bg-zinc-50/50 opacity-75"
                                                : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                                        }`}
                                >
                                    {option.proOnly && (
                                        <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                            Pro
                                        </span>
                                    )}
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-semibold text-sm ${isLocked ? 'text-zinc-500' : 'text-zinc-900'}`}>
                                            {option.label}
                                        </span>
                                        {ephemeralStorage === option.value && (
                                            <div className="w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center">
                                                <Check className="h-2.5 w-2.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs text-zinc-500">{option.description}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
