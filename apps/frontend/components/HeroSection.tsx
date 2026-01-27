"use client";

import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { GoogleSignInButton } from "@/components/GoogleSignInButton";

// GitHub logo SVG
const GitHubLogo = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const HeroSection = () => {
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Hero Content */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
                <div className="flex flex-col items-start space-y-6">
                    {/* Beta Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                        <span className="text-xs font-medium text-blue-700">
                            100% Open Source
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
                        Deploy backends
                        <br />
                        <span className="text-gray-400">without the hassle.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                        A modern platform for deploying, managing, and scaling your Python
                        and Node.js backends. Connect GitHub, configure, and go live.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                        {!isLoaded ? (
                            // Skeleton button while auth loads - prevents layout shift
                            <div className="h-10 w-[186px] bg-zinc-200 rounded-full animate-pulse" />
                        ) : isSignedIn ? (
                            <Link href="/projects">
                                <Button className="text-sm bg-gray-900 text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-colors">
                                    Go to Projects
                                </Button>
                            </Link>
                        ) : (
                            <GoogleSignInButton source="hero_section" />
                        )}

                        <Link
                            href="https://github.com/aryankashyap0/shorlabs"
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2.5 h-10 px-6 bg-zinc-900 text-white font-medium text-sm rounded-full shadow-sm hover:bg-zinc-800 active:bg-zinc-950 transition-all duration-150"
                        >
                            <GitHubLogo />
                            <span>View on GitHub</span>
                        </Link>
                    </div>

                    {/* Small Text */}
                    <p className="text-sm text-gray-400">
                        Free tier available • No credit card required
                    </p>
                </div>
            </div>

            {/* Product Preview */}
            <div className="relative w-full">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/50 to-rose-100/70" />

                {/* Screenshot Container */}
                <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pb-24">
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-200/60">
                        <Image
                            src="/images/f.png"
                            alt="Shorlabs Dashboard"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export { HeroSection };
