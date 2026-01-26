"use client";

import { PricingTable } from "@clerk/nextjs";

const PricingSection = () => {
    return (
        <section id="pricing" className="relative w-full bg-gray-50">
            {/* Section Header */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                    Simple, transparent pricing
                </h2>
                <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                    Start free, scale as you grow. No surprise bills or hidden fees.
                </p>
            </div>

            {/* Pricing Table */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
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
                                card: "border border-gray-100 shadow-none hover:border-gray-200 transition-colors rounded-xl",
                                cardHeader: "border-b border-gray-50 pb-4",
                                cardBody: "p-6",
                                badge: "bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded-full",
                                button: "bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors",
                                buttonSecondary: "border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-lg transition-colors",
                                price: "text-gray-900 font-semibold text-3xl",
                                pricePeriod: "text-gray-400 text-sm font-normal",
                                feature: "text-gray-600 text-sm",
                                featureIcon: "text-green-600",
                                planName: "text-gray-900 font-semibold text-lg",
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
