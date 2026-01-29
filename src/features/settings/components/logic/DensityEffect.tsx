"use client";

import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";
import { useEffect } from "react";

// [Path: src/features/settings/components/logic/DensityEffect.tsx]
export function DensityEffect() {
    const density = useSettingsStore((state) => state.appearance.density);

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-density", density);
    }, [density]);

    return null;
}
