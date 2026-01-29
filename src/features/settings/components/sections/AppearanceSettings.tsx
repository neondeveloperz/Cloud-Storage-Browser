"use client";

import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";
import { SettingGroup } from "@/components/ui/settings/SettingGroup";
import { SettingItem } from "@/components/ui/settings/SettingItem";
import { SettingsLayout } from "@/features/settings/components/SettingsLayout";
import { cn } from "@/lib/utils";
import { Moon, Sun, Monitor } from "lucide-react";

// [Path: src/features/settings/components/sections/AppearanceSettings.tsx]
export function AppearanceSettings() {
    const settings = useSettingsStore();

    return (
        <SettingsLayout
            title="Interface & UX"
            description="Customize how the application looks and feels."
        >
            <SettingGroup title="Theme">
                <SettingItem
                    label="App Theme"
                    description="Select your preferred color scheme."
                >
                    <div className="flex bg-neutral-100 p-1 rounded-lg dark:bg-neutral-800">
                        {[
                            { id: 'light', icon: Sun },
                            { id: 'system', icon: Monitor },
                            { id: 'dark', icon: Moon }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => settings.setTheme(item.id as any)}
                                className={cn(
                                    "p-2 rounded-md transition-all text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200",
                                    settings.appearance.theme === item.id && "bg-white text-black shadow-sm dark:bg-neutral-700 dark:text-white"
                                )}
                                title={item.id}
                            >
                                <item.icon size={16} />
                            </button>
                        ))}
                    </div>
                </SettingItem>

                <SettingItem
                    label="Density"
                    description="Controls the spacing of list items."
                >
                    <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg dark:bg-neutral-800">
                        {['compact', 'comfortable'].map((density) => (
                            <button
                                key={density}
                                onClick={() => settings.setDensity(density as any)}
                                className={cn(
                                    "px-3 py-1 text-xs font-medium rounded-md capitalize transition-all",
                                    settings.appearance.density === density
                                        ? "bg-white text-black shadow-sm dark:bg-neutral-700 dark:text-white"
                                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                                )}
                            >
                                {density}
                            </button>
                        ))}
                    </div>
                </SettingItem>
            </SettingGroup>
        </SettingsLayout>
    );
}
