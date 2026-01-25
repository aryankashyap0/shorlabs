'use client'

import { useUser } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface FeatureGateProps {
    /**
     * The feature key to check for (must match a feature defined in Clerk Dashboard)
     * e.g., "advancedAnalytics", "prioritySupport", "apiAccess"
     */
    feature: string
    /**
     * Content to show if the user has the feature
     */
    children: ReactNode
    /**
     * Optional fallback content to show if the user doesn't have the feature
     * If not provided, nothing will be rendered
     */
    fallback?: ReactNode
}

/**
 * FeatureGate component for gating content based on subscription features.
 * 
 * Usage:
 * ```tsx
 * <FeatureGate feature="advancedAnalytics">
 *   <AdvancedAnalyticsDashboard />
 * </FeatureGate>
 * 
 * <FeatureGate 
 *   feature="prioritySupport" 
 *   fallback={<UpgradePrompt />}
 * >
 *   <PrioritySupportWidget />
 * </FeatureGate>
 * ```
 * 
 * Note: Features must be configured in Clerk Dashboard under Subscription Plans.
 * Until Clerk Billing is enabled, this will show the fallback.
 */
export function FeatureGate({ feature, children, fallback = null }: FeatureGateProps) {
    const { user, isLoaded } = useUser()

    // Show nothing while loading
    if (!isLoaded) {
        return null
    }

    // Check if user has the feature via Clerk's subscription metadata
    // The feature will be available in user.publicMetadata.features or via useAuth
    const hasFeature = checkUserFeature(user, feature)

    if (hasFeature) {
        return <>{children}</>
    }

    return <>{fallback}</>
}

/**
 * Helper function to check if user has a specific feature
 * This checks the user's subscription features from Clerk
 */
function checkUserFeature(user: ReturnType<typeof useUser>['user'], feature: string): boolean {
    if (!user) return false

    // Clerk Billing stores features in publicMetadata.features array
    // This is populated automatically when you configure subscription plans
    const features = (user.publicMetadata as { features?: string[] })?.features

    if (Array.isArray(features)) {
        return features.includes(feature)
    }

    return false
}

/**
 * UpgradePrompt component - a default fallback for gated features
 */
export function UpgradePrompt({
    title = "Upgrade Required",
    message = "This feature requires a premium subscription.",
    ctaText = "View Plans",
    ctaHref = "/pricing"
}: {
    title?: string
    message?: string
    ctaText?: string
    ctaHref?: string
}) {
    return (
        <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 mb-4">{message}</p>
            <a
                href={ctaHref}
                className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
                {ctaText}
            </a>
        </div>
    )
}
