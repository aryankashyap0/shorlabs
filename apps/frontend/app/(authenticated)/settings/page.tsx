'use client'

import { UserProfile } from '@clerk/nextjs'

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Settings</h1>
                    <p className="text-sm text-zinc-500 mt-1">Manage your account and preferences</p>
                </div>

                {/* Clerk UserProfile */}
                <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                    <UserProfile
                        routing="hash"
                        appearance={{
                            variables: {
                                colorPrimary: '#18181b',
                                colorText: '#18181b',
                                colorTextSecondary: '#71717a',
                                colorBackground: '#ffffff',
                                colorInputBackground: '#fafafa',
                                colorInputText: '#18181b',
                                borderRadius: '0.75rem',
                            },
                            elements: {
                                rootBox: 'w-full',
                                cardBox: 'shadow-none',
                                card: 'shadow-none border-0',
                                navbar: 'border-r border-zinc-100 bg-zinc-50/50',
                                navbarButton: 'text-zinc-600 hover:bg-zinc-100 rounded-lg',
                                navbarButtonActive: 'bg-zinc-900 text-white hover:bg-zinc-800',
                                profileSectionPrimaryButton: 'bg-zinc-900 hover:bg-zinc-800 text-white rounded-full',
                                formButtonPrimary: 'bg-zinc-900 hover:bg-zinc-800 text-white rounded-full',
                                formFieldInput: 'rounded-xl border-zinc-200',
                                avatarBox: 'rounded-xl',
                                badge: 'bg-emerald-100 text-emerald-700 rounded-full',
                                footer: 'hidden',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
