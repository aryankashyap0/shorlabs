"use client";

import { PricingTable } from "@clerk/nextjs";
import { Zap, Shield, Sparkles } from "lucide-react";

const highlights = [
    {
        icon: Zap,
        title: "Pay Per Use",
        description: "Only pay for actual compute time. No idle server costs.",
    },
    {
        icon: Shield,
        title: "Free Tier",
        description: "Generous free tier to get started. No credit card required.",
    },
    {
        icon: Sparkles,
        title: "Scale Instantly",
        description: "Upgrade anytime for more memory, timeout, and storage.",
    },
];

const PricingSection = () => {
    return (
        <section id="pricing" className="relative w-full bg-[#faf9f7] overflow-hidden">
            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Section content */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
                {/* Section header */}
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20">
                    {/* Section label */}
                    <div className="inline-flex items-center gap-2 bg-neutral-900 px-3 py-1.5 sm:px-4 sm:py-2">
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-100">
                            Simple Pricing
                        </span>
                    </div>

                    <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.1]">
                        Start Free,{" "}
                        <span className="text-neutral-400">Scale as You Grow</span>
                    </h2>

                    <p className="max-w-xl font-mono text-sm sm:text-base text-neutral-600 leading-relaxed">
                        No surprise bills. Transparent pricing with a generous free tier for indie devs and startups.
                    </p>
                </div>

                {/* Highlights row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
                    {highlights.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="flex flex-col items-center text-center p-6 sm:p-8 border border-neutral-200 bg-white hover:border-neutral-300 transition-colors duration-300"
                            >
                                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-neutral-900 text-white mb-4 sm:mb-6">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-mono text-base sm:text-lg font-bold text-neutral-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="font-mono text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Pricing Table container */}
                <div className="relative">
                    {/* Terminal-style header bar */}
                    <div className="flex items-center gap-2 bg-neutral-900 px-3 sm:px-4 py-2 sm:py-3">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500" />
                            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500" />
                            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-neutral-400 truncate">
                            shorlabs.com/pricing
                        </span>
                    </div>

                    {/* Pricing table wrapper */}
                    <div className="border border-neutral-200 border-t-0 bg-white p-6 sm:p-8 md:p-10">
                        <PricingTable
                            appearance={{
                                variables: {
                                    colorPrimary: "#171717",
                                    colorBackground: "#ffffff",
                                    colorText: "#3f3f46",
                                    colorTextSecondary: "#71717a",
                                    fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                    borderRadius: "0px",
                                },
                                elements: {
                                    card: "border border-neutral-200 shadow-none hover:border-neutral-300 transition-colors",
                                    cardHeader: "border-b border-neutral-100 pb-4",
                                    cardBody: "p-6",
                                    badge: "bg-neutral-900 text-white font-mono text-xs uppercase tracking-wide px-3 py-1",
                                    button: "bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-sm uppercase tracking-wide py-3 transition-colors rounded-none",
                                    buttonSecondary: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-mono text-sm uppercase tracking-wide py-3 rounded-none",
                                    price: "text-neutral-900 font-bold font-mono",
                                    pricePeriod: "text-neutral-500 font-mono text-sm",
                                    feature: "text-neutral-600 font-mono text-sm",
                                    featureIcon: "text-emerald-600",
                                    planName: "text-neutral-900 font-mono font-bold text-lg uppercase tracking-wide",
                                    planDescription: "text-neutral-500 font-mono text-sm",
                                },
                            }}
                        />
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 h-4 w-4 sm:h-5 sm:w-5 border-l-2 border-b-2 border-neutral-300" />
                    <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 h-4 w-4 sm:h-5 sm:w-5 border-r-2 border-b-2 border-neutral-300" />
                </div>

                {/* FAQ teaser */}
                <div className="mt-16 sm:mt-20 md:mt-24 text-center">
                    <p className="font-mono text-sm text-neutral-500">
                        Questions?{" "}
                        <a
                            href="mailto:kashyaparyan093@gmail.com"
                            className="text-neutral-900 hover:underline underline-offset-4 transition-colors"
                        >
                            Get in touch
                        </a>
                    </p>
                </div>
            </div>

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
        </section>
    );
};

export { PricingSection };
