"use client";

import {
    Zap,
    GitBranch,
    Globe,
    Key,
    Cpu,
    Clock,
    FileText,
    Shield,
    Sparkles,
    Terminal,
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "One-Click Deploy",
        description:
            "Connect your GitHub repository and deploy with a single click. No Docker knowledge required.",
    },
    {
        icon: GitBranch,
        title: "Auto Runtime Detection",
        description:
            "Shorlabs automatically detects Python or Node.js and configures the build for you.",
    },
    {
        icon: Globe,
        title: "Custom Subdomains",
        description:
            "Every project gets a unique subdomain, instantly accessible after deployment.",
    },
    {
        icon: Key,
        title: "Environment Variables",
        description:
            "Securely configure environment variables through the dashboard. Supports .env imports.",
    },
    {
        icon: Cpu,
        title: "Configurable Compute",
        badge: "Pro",
        description:
            "Choose memory, timeout, and ephemeral storage based on your workload needs.",
    },
    {
        icon: Clock,
        title: "Deployment History",
        description:
            "Track every deployment with status, build logs, and timestamps at a glance.",
    },
    {
        icon: Terminal,
        title: "Runtime Logs",
        description:
            "View real-time CloudWatch logs directly from the dashboard. Debug with ease.",
    },
    {
        icon: Shield,
        title: "Secure by Default",
        description:
            "Your code runs in isolated Lambda functions. No shared infrastructure.",
    },
    {
        icon: Sparkles,
        title: "Auto Scaling",
        badge: "Coming Soon",
        description:
            "Scale automatically from zero to thousands of requests without configuration.",
    },
    {
        icon: FileText,
        title: "Pay-Per-Use",
        description:
            "Built on AWS Lambda, so you only pay for actual compute time. No idle costs.",
    },
];

const FeatureSection = () => {
    return (
        <section id="features" className="relative w-full bg-white">
            {/* Section Header */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                    Everything you need to ship backends
                </h2>
                <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                    Focus on writing code. We handle the infrastructure, scaling, and operations.
                </p>
            </div>

            {/* Features Grid */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
                <div className="border-t border-gray-100">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isEven = index % 2 === 1;
                        const isLastRow = index >= features.length - 2;
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={feature.title}
                                className={`
                                    grid grid-cols-1 md:grid-cols-2
                                    ${!isLastRow ? "border-b border-gray-100" : ""}
                                `}
                            >
                                {/* Feature Item */}
                                <div
                                    className={`
                                        py-6 sm:py-8 px-0 sm:px-6
                                        ${isLeft ? "md:border-r border-gray-100" : ""}
                                        ${index % 2 === 1 ? "md:col-start-2" : "md:col-start-1"}
                                        ${index % 2 === 0 && index !== 0 ? "md:row-start-auto" : ""}
                                    `}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400">
                                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {feature.title}
                                                </h3>
                                                {feature.badge && (
                                                    <span
                                                        className={`
                                                            inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium
                                                            ${feature.badge === "Pro"
                                                                ? "bg-gray-900 text-white"
                                                                : "bg-gray-100 text-gray-600"
                                                            }
                                                        `}
                                                    >
                                                        {feature.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Proper 2-column grid */}
                <div className="hidden">
                    {/* This is the correct implementation */}
                </div>
            </div>
        </section>
    );
};

// Correct 2-column layout version
const FeatureSectionV2 = () => {
    return (
        <section id="features" className="relative w-full bg-white">
            {/* Section Header */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                    Everything you need to ship backends
                </h2>
                <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                    Focus on writing code. We handle the infrastructure, scaling, and operations.
                </p>
            </div>

            {/* Features Grid - 2 columns */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isLeft = index % 2 === 0;
                        const rowIndex = Math.floor(index / 2);
                        const isLastRow = rowIndex === Math.floor((features.length - 1) / 2);

                        return (
                            <div
                                key={feature.title}
                                className={`
                                    py-6 sm:py-8 px-0 sm:px-6
                                    ${isLeft ? "md:border-r border-gray-100" : ""}
                                    ${!isLastRow || (isLeft && features.length % 2 === 1) ? "border-b border-gray-100" : ""}
                                    ${!isLastRow ? "md:border-b" : ""}
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400">
                                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {feature.title}
                                            </h3>
                                            {feature.badge && (
                                                <span
                                                    className={`
                                                        inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium
                                                        ${feature.badge === "Pro"
                                                            ? "bg-gray-900 text-white"
                                                            : "bg-gray-100 text-gray-600"
                                                        }
                                                    `}
                                                >
                                                    {feature.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export { FeatureSectionV2 as FeatureSection };
