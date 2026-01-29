"use client";

import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";
import { SettingGroup } from "@/components/ui/settings/SettingGroup";
import { SettingItem } from "@/components/ui/settings/SettingItem";
import { SettingsLayout } from "@/features/settings/components/SettingsLayout";
import { cn } from "@/lib/utils";

// [Path: src/features/settings/components/sections/GeneralSettings.tsx]
export function GeneralSettings() {
    const settings = useSettingsStore();

    return (
        <SettingsLayout
            title="General & Defaults"
            description="Set your preferred defaults for common actions."
        >
            <SettingGroup title="Behaviors">
                <SettingItem
                    label="Pre-signed URL Expiration"
                    description="Time in hours before shared links expire."
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            max={168}
                            value={settings.general.presignedUrlExpiration}
                            onChange={(e) => settings.setPresignedUrlExpiration(Number(e.target.value))}
                            className="w-16 h-8 rounded-md border border-neutral-200 bg-white px-2 text-right text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900"
                        />
                        <span className="text-sm text-neutral-500">hours</span>
                    </div>
                </SettingItem>

                <SettingItem
                    label="Auto-copy URL"
                    description="Copy URL to clipboard after upload."
                >
                    <button
                        onClick={settings.toggleCopyUrlAfterUpload}
                        className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black",
                            settings.general.copyUrlAfterUpload ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-700"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                                settings.general.copyUrlAfterUpload ? "translate-x-5.5" : "translate-x-0.5"
                            )}
                        />
                    </button>
                </SettingItem>
            </SettingGroup>

            <SettingGroup title="Exclusions">
                <div className="p-4 sm:p-6">
                    <label className="text-sm font-medium mb-2 block dark:text-neutral-100">Ignored Files</label>
                    <textarea
                        value={settings.general.ignoredFiles.join('\n')}
                        onChange={(e) => settings.setIgnoredFiles(e.target.value.split('\n'))}
                        rows={4}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100"
                        placeholder=".DS_Store&#10;Thumbs.db"
                    />
                    <p className="mt-2 text-xs text-neutral-500">
                        Enter one filename pattern per line.
                    </p>
                </div>
            </SettingGroup>
        </SettingsLayout>
    );
}
