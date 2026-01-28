"use client";

import { PricingTable } from "@clerk/nextjs";

const PricingSection = () => {
    return (
        <section id="pricing" className="relative w-full bg-white">
            {/* Top border */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                <div className="border-t border-gray-100" />
            </div>

            {/* Section Header */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-14">
                <div className="text-center sm:text-left max-w-xl mx-auto sm:mx-0">
                    <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                        Pricing
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                        Simple, transparent pricing
                    </h2>
                    <p className="mt-3 text-gray-500 leading-relaxed">
                        Start free, scale as you grow. No surprises.
                    </p>
                </div>
            </div>

            {/* Pricing Table */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8">
                    <PricingTable
                        appearance={{
                            variables: {
                                colorPrimary: "#171717",
                                colorBackground: "#ffffff",
                                colorText: "#374151",
                                colorTextSecondary: "#6b7280",
                                fontFamily: "inherit",
                                borderRadius: "12px",
                            },
                            elements: {
                                card: "border border-gray-100 shadow-none hover:border-gray-200 transition-colors rounded-xl bg-white",
                                cardHeader: "border-b border-gray-50 pb-4",
                                cardBody: "p-4 sm:p-6",
                                badge: "bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded-full",
                                button: "bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors",
                                buttonSecondary: "border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-lg transition-colors",
                                price: "text-gray-900 font-semibold text-2xl sm:text-3xl",
                                pricePeriod: "text-gray-400 text-sm font-normal",
                                feature: "text-gray-600 text-sm",
                                featureIcon: "text-green-600",
                                planName: "text-gray-900 font-semibold text-base sm:text-lg",
                                planDescription: "text-gray-500 text-sm",
                            },
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export { PricingSection };
