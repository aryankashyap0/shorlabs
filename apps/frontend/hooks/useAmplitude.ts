'use client';

import { useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import {
    trackEvent,
    trackRevenue,
    setAmplitudeUserProperties,
    setAmplitudeOptOut,
    getAmplitudeSessionId,
    getAmplitudeDeviceId,
    flushAmplitudeEvents,
} from '@/lib/amplitude';

/**
 * useAmplitude - Custom hook for Amplitude analytics
 * 
 * Provides easy access to common analytics operations with
 * automatic user context from Clerk.
 * 
 * @example
 * ```tsx
 * const { track, trackRevenue } = useAmplitude();
 * 
 * // Track a button click
 * track('Button Clicked', { buttonName: 'Submit' });
 * 
 * // Track a purchase
 * trackRevenue('pro_plan', 29.99, 1, 'subscription');
 * ```
 */
export function useAmplitude() {
    const { user } = useUser();

    /**
     * Track a custom event with optional properties
     */
    const track = useCallback(
        (eventName: string, properties?: Record<string, unknown>) => {
            trackEvent(eventName, {
                ...properties,
                // Automatically include user context if available
                ...(user && {
                    _userId: user.id,
                    _userEmail: user.primaryEmailAddress?.emailAddress,
                }),
            });
        },
        [user]
    );

    /**
     * Track a revenue/purchase event
     */
    const revenue = useCallback(
        (
            productId: string,
            price: number,
            quantity: number = 1,
            revenueType?: string
        ) => {
            trackRevenue(productId, price, quantity, revenueType);
        },
        []
    );

    /**
     * Update user properties
     */
    const setUserProperties = useCallback(
        (properties: Record<string, unknown>) => {
            setAmplitudeUserProperties(properties);
        },
        []
    );

    /**
     * Opt user out of tracking (for privacy/GDPR compliance)
     */
    const setOptOut = useCallback((optOut: boolean) => {
        setAmplitudeOptOut(optOut);
    }, []);

    /**
     * Get the current session ID
     */
    const getSessionId = useCallback(() => {
        return getAmplitudeSessionId();
    }, []);

    /**
     * Get the current device ID
     */
    const getDeviceId = useCallback(() => {
        return getAmplitudeDeviceId();
    }, []);

    /**
     * Flush events immediately
     */
    const flush = useCallback(() => {
        flushAmplitudeEvents();
    }, []);

    return {
        track,
        revenue,
        setUserProperties,
        setOptOut,
        getSessionId,
        getDeviceId,
        flush,
    };
}

export default useAmplitude;
