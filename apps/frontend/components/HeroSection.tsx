"use client";

import Image from "next/image";
import { useSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { trackEvent } from "@/lib/amplitude";

const HeroSection = () => {
    const { signIn, isLoaded } = useSignIn();

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "shorlabs-demo" });
            cal("ui", {
                cssVarsPerTheme: {
                    light: { "cal-brand": "#171717" },
                    dark: { "cal-brand": "#ffffff" }
                },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    const handleGitHubSignIn = async () => {
        if (!isLoaded || !signIn) return;

        trackEvent('GitHub Auth Started', {
            source: 'hero_section'
        });

        await signIn.authenticateWithRedirect({
            strategy: "oauth_github",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/projects",
        });
    };

    return (
        <section className="relative w-full min-h-screen bg-[#faf9f7] overflow-hidden">
            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Main content */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
                <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">

                    {/* Status badge */}
                    <div className="inline-flex items-center gap-2 bg-neutral-900 px-3 py-1.5 sm:px-4 sm:py-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-100">
                            Now in Beta
                        </span>
                    </div>

                    {/* Headings */}
                    <div className="max-w-3xl space-y-4 sm:space-y-6 md:space-y-8 text-center">
                        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                            Vercel <span className="text-neutral-400">for Backend</span>
                        </h1>

                        <p className="max-w-xl mx-auto font-mono text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed tracking-tight">
                            <span className="hidden sm:inline">Shorlabs manages the deployment, management, and scaling of your backend app. Connect GitHub, configure your settings, click deploy, and sit back.</span>
                            <span className="sm:hidden">Deploy, manage, and scale your backend. Connect GitHub and go live in seconds.</span>
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col w-full sm:w-auto gap-3 sm:gap-4 items-center">
                        <SignedOut>
                            <Button
                                size="lg"
                                onClick={handleGitHubSignIn}
                                disabled={!isLoaded}
                                className="group font-mono text-xs sm:text-sm uppercase tracking-wide bg-neutral-900 text-white hover:bg-neutral-800 px-6 sm:px-8 py-5 sm:py-6 rounded-none border border-neutral-900 transition-all duration-200 cursor-pointer w-full sm:min-w-[320px]"
                            >
                                <Github className="w-4 h-4 mr-2" strokeWidth={1.5} />
                                Continue with GitHub
                                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" strokeWidth={1.5} />
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/projects" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="group font-mono text-xs sm:text-sm uppercase tracking-wide bg-neutral-900 text-white hover:bg-neutral-800 px-6 sm:px-8 py-5 sm:py-6 rounded-none border border-neutral-900 transition-all duration-200 cursor-pointer w-full sm:min-w-[320px]"
                                >
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" strokeWidth={1.5} />
                                </Button>
                            </Link>
                        </SignedIn>

                        {/* Book Demo Button */}
                        <Button
                            size="lg"
                            data-cal-namespace="shorlabs-demo"
                            data-cal-link="aryan-kashyap/shorlabs-demo"
                            data-cal-config='{"layout":"month_view"}'
                            className="group font-mono text-xs sm:text-sm uppercase tracking-wide bg-white text-neutral-900 hover:bg-neutral-100 px-6 sm:px-8 py-5 sm:py-6 rounded-none border border-neutral-300 hover:border-neutral-400 transition-all duration-200 cursor-pointer w-full sm:min-w-[320px]"
                        >
                            <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
                            Schedule a Call
                            <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" strokeWidth={1.5} />
                        </Button>
                    </div>

                    {/* Visual - Dashboard Preview */}
                    <div className="relative w-full mt-4 sm:mt-6 md:mt-8">
                        {/* Terminal-style header bar */}
                        <div className="flex items-center gap-2 bg-neutral-900 px-3 sm:px-4 py-2 sm:py-3">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500" />
                                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
                                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500" />
                            </div>
                            <span className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-neutral-400 truncate">
                                shorlabs.com/projects/1234
                            </span>
                        </div>

                        {/* Image container with border */}
                        <div className="border border-neutral-200 border-t-0 bg-white">
                            <div className="relative overflow-hidden">
                                <Image
                                    src="/images/f.png"
                                    alt="Shorlabs"
                                    width={1920}
                                    height={1080}
                                    className="h-auto w-full object-cover"
                                    priority
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f7]/20 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 h-4 w-4 sm:h-6 sm:w-6 border-l-2 border-b-2 border-neutral-300" />
                        <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 h-4 w-4 sm:h-6 sm:w-6 border-r-2 border-b-2 border-neutral-300" />
                    </div>

                    {/* Stats row */}
                    <div className="w-full grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-12 border-t border-neutral-200">
                        <div className="flex flex-col items-center">
                            <span className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900">99.9%</span>
                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wide text-neutral-500 mt-1">Uptime</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900">&lt;50ms</span>
                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wide text-neutral-500 mt-1">Cold Start</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900">∞</span>
                            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wide text-neutral-500 mt-1">Scale</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { HeroSection };
