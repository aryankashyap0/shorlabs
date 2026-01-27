"use client";

import { AuthenticateWithRedirectCallback, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/amplitude";
import { Loader2 } from "lucide-react";

export default function SSOCallback() {
    const { user, isLoaded } = useUser();
    const hasTracked = useRef(false);

    useEffect(() => {
        if (isLoaded && user && !hasTracked.current) {
            // Check if user was created recently (within last 10 seconds) = signup
            const isNewUser = user.createdAt &&
                (Date.now() - user.createdAt.getTime()) < 10000;

            trackEvent('Google Auth Completed', {
                auth_method: 'google',
                is_new_user: isNewUser,
                user_tier: 'free'
            });

            hasTracked.current = true;
        }
    }, [isLoaded, user]);

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">Signing you in...</h2>
                <p className="text-sm text-zinc-500">Please wait while we complete authentication</p>
            </div>
            {/* Hidden Clerk callback handler */}
            <div className="hidden">
                <AuthenticateWithRedirectCallback
                    afterSignInUrl="/projects"
                    afterSignUpUrl="/projects"
                />
            </div>
        </div>
    );
}
