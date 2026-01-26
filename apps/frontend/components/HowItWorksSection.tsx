"use client";

import { useState } from "react";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Connect GitHub",
        description: "Link your GitHub account and import an existing repository to get started.",
        image: "/images/1.png",
    },
    {
        number: "02",
        title: "Configure Settings",
        description: "Set your project name, root directory, and start command.",
        image: "/images/2.png",
    },
    {
        number: "03",
        title: "Choose Compute",
        description: "Select memory, timeout, and storage based on your workload.",
        image: "/images/3.png",
    },
    {
        number: "04",
        title: "Deploy & Go Live",
        description: "Add environment variables securely, then deploy with one click.",
        image: "/images/4.png",
    },
];

const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="relative w-full bg-white">
            {/* Section Header */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                    From GitHub to production in minutes
                </h2>
                <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                    Four simple steps to deploy your backend. No Docker, no YAML, no DevOps required.
                </p>
            </div>

            {/* Steps Navigation */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-0">
                    {steps.map((step, index) => (
                        <button
                            key={step.number}
                            onClick={() => setActiveStep(index)}
                            className={`
                                group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-200
                                ${index === 0 ? "sm:rounded-l-lg" : ""}
                                ${index === steps.length - 1 ? "sm:rounded-r-lg" : ""}
                                ${activeStep === index
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }
                                ${index !== 0 ? "sm:border-l border-gray-200" : ""}
                                rounded-lg sm:rounded-none
                            `}
                        >
                            <span
                                className={`
                                    text-xs font-medium px-2 py-0.5 rounded
                                    ${activeStep === index
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-200 text-gray-500"
                                    }
                                `}
                            >
                                {step.number}
                            </span>
                            <span className="text-sm font-medium whitespace-nowrap">
                                {step.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Step Content */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pb-24">
                {/* Description */}
                <p className="text-center text-gray-500 mb-6 sm:mb-8 max-w-lg mx-auto">
                    {steps[activeStep].description}
                </p>

                {/* Image Container */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-gray-100/50">
                    <Image
                        src={steps[activeStep].image}
                        alt={`Step ${steps[activeStep].number}: ${steps[activeStep].title}`}
                        width={1200}
                        height={675}
                        className="w-full h-auto transition-opacity duration-300"
                        priority={activeStep === 0}
                    />
                </div>

                {/* Step Indicators (dots) */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {steps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveStep(index)}
                            className={`
                                w-2 h-2 rounded-full transition-all duration-200
                                ${activeStep === index
                                    ? "bg-gray-900 w-4"
                                    : "bg-gray-300 hover:bg-gray-400"
                                }
                            `}
                            aria-label={`Go to step ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { HowItWorksSection };
