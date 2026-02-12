"use client";

import { PricingCard } from "@/components/pricing-card";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/plans";

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

            {/* Pricing Cards - info only, no buttons (homepage users are typically not logged in) */}
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 pb-16 sm:pb-24">
                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PLANS.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            highlighted={plan.highlighted}
                            className="w-full min-w-0"
                            renderBadge={() =>
                                (plan.id === "pro" || plan.id === "plus") ? (
                                    <Badge className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                                        14 day free trial
                                    </Badge>
                                ) : null
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { PricingSection };
