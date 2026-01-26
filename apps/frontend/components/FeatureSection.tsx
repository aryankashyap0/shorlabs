"use client";

import Image from "next/image";
import { Github, Settings, Cpu, Key, ArrowRight, Check } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Connect GitHub",
        description: "Link your GitHub account and import an existing repository. Shorlabs automatically detects Python or Node.js projects.",
        icon: Github,
        image: "/images/1.png",
        features: ["OAuth Authentication", "Private Repos Support", "Auto-Detection"],
    },
    {
        number: "02",
        title: "Configure Settings",
        description: "Set up your project with a custom name, root directory, and start command. Shorlabs handles the rest.",
        icon: Settings,
        image: "/images/2.png",
        features: ["Custom Subdomain", "Root Directory", "Start Command"],
    },
    {
        number: "03",
        title: "Choose Compute",
        description: "Select the memory, timeout, and ephemeral storage that fits your workload. Scale as needed.",
        icon: Cpu,
        image: "/images/3.png",
        features: ["Up to 4GB Memory", "300s Timeout", "Ephemeral Storage"],
    },
    {
        number: "04",
        title: "Deploy & Go Live",
        description: "Add environment variables securely, hit deploy, and your backend is live in seconds.",
        icon: Key,
        image: "/images/4.png",
        features: ["Secure Env Vars", "One-Click Deploy", "Instant URL"],
    },
];

const FeatureSection = () => {
    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Section header */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                    {/* Section label */}
                    <div className="inline-flex items-center gap-2 border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2">
                        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500">
                            How It Works
                        </span>
                    </div>

                    <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.1]">
                        Four Steps to{" "}
                        <span className="text-neutral-400">Production</span>
                    </h2>

                    <p className="max-w-xl font-mono text-sm sm:text-base text-neutral-600 leading-relaxed">
                        From GitHub to live URL in under two minutes. No Docker files, no infrastructure headaches.
                    </p>
                </div>
            </div>

            {/* Steps */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 md:pb-32">
                <div className="space-y-16 sm:space-y-24 md:space-y-32">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isEven = index % 2 === 1;

                        return (
                            <div
                                key={step.number}
                                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 sm:gap-12 lg:gap-16 items-center`}
                            >
                                {/* Content side */}
                                <div className="flex-1 w-full lg:max-w-md space-y-6 sm:space-y-8">
                                    {/* Step number with line */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-neutral-900 text-white">
                                                <span className="font-mono text-sm sm:text-base font-bold">
                                                    {step.number}
                                                </span>
                                            </div>
                                            {/* Connecting line */}
                                            {index < steps.length - 1 && (
                                                <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 w-px h-[calc(100vh/3)] bg-gradient-to-b from-neutral-300 to-transparent" />
                                            )}
                                        </div>
                                        <div className="h-px flex-1 bg-neutral-200" />
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-neutral-200 bg-white">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    {/* Title and description */}
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="font-mono text-sm sm:text-base text-neutral-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Feature pills */}
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {step.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-50 border border-neutral-100"
                                            >
                                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" strokeWidth={2} />
                                                <span className="font-mono text-[10px] sm:text-xs text-neutral-700">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Learn more link (subtle) */}
                                    <button className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-200">
                                        Learn more
                                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" strokeWidth={1.5} />
                                    </button>
                                </div>

                                {/* Image side */}
                                <div className="flex-1 w-full">
                                    <div className="relative group">
                                        {/* Terminal-style header bar */}
                                        <div className="flex items-center gap-2 bg-neutral-900 px-3 sm:px-4 py-2 sm:py-3">
                                            <div className="flex items-center gap-1.5">
                                                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-500" />
                                                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500" />
                                                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500" />
                                            </div>
                                            <span className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-neutral-400 truncate">
                                                Step {step.number} — {step.title}
                                            </span>
                                        </div>

                                        {/* Image container */}
                                        <div className="border border-neutral-200 border-t-0 bg-white overflow-hidden">
                                            <div className="relative overflow-hidden">
                                                <Image
                                                    src={step.image}
                                                    alt={`${step.title} — Shorlabs`}
                                                    width={1200}
                                                    height={675}
                                                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                />
                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Decorative corner accents */}
                                        <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 h-4 w-4 sm:h-5 sm:w-5 border-l-2 border-b-2 border-neutral-300 transition-all duration-300 group-hover:border-neutral-900" />
                                        <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 h-4 w-4 sm:h-5 sm:w-5 border-r-2 border-b-2 border-neutral-300 transition-all duration-300 group-hover:border-neutral-900" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 sm:mt-24 md:mt-32 flex flex-col items-center text-center space-y-6 sm:space-y-8">
                    <div className="h-px w-full max-w-xs bg-neutral-200" />

                    <p className="font-mono text-sm sm:text-base text-neutral-600 max-w-lg leading-relaxed">
                        Ready to deploy your first backend? Join developers who've already made the switch.
                    </p>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center"
                                >
                                    <span className="font-mono text-[10px] sm:text-xs text-neutral-500">
                                        {["AB", "CD", "EF", "GH"][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <span className="font-mono text-xs sm:text-sm text-neutral-500">
                            + many more
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
        </section>
    );
};

export { FeatureSection };
