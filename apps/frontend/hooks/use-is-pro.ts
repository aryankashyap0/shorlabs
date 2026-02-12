"use client"

import { useCustomer } from "autumn-js/react"

/**
 * Hook to check the current organization's plan status via Autumn.
 *
 * SWR caching (including localStorage persistence) is handled globally
 * by the SWRConfig provider in AutumnProviderWrapper, so this hook
 * doesn't need any custom cache logic — it just derives plan state
 * from the customer object that SWR keeps warm.
 *
 * All plan detection across the app goes through this single hook.
 */

const BILLABLE_STATUSES = new Set(["active", "trialing", "past_due", "scheduled"])

export function useIsPro() {
    const { customer, isLoading } = useCustomer()

    const plusProduct = customer?.products?.find(
        (product) => product.id === "plus" && BILLABLE_STATUSES.has(product.status)
    )
    const proProduct = customer?.products?.find(
        (product) => product.id === "pro" && BILLABLE_STATUSES.has(product.status)
    )

    const hasCustomerData = !!customer
    // "isPro" is treated as "has any paid plan" (Plus or Pro)
    const isPro = hasCustomerData ? !!(proProduct || plusProduct) : false
    const isCanceling = hasCustomerData
        ? (!!(proProduct || plusProduct) && !!(proProduct || plusProduct)!.canceled_at)
        : false
    const currentPlan: "pro" | "plus" | "hobby" | undefined = hasCustomerData
        ? (proProduct
            ? "pro"
            : plusProduct
                ? "plus"
                : "hobby")
        : undefined
    const activeProduct = proProduct ?? plusProduct ?? null

    return {
        isPro,
        isCanceling,
        currentPlan,
        proProduct: proProduct ?? null,
        plusProduct: plusProduct ?? null,
        activeProduct,
        isLoaded: hasCustomerData,
        customer,
    }
}
