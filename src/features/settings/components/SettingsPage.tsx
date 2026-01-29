"use client";

import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";
import { SettingsSection } from "./SettingsSection";
import { Monitor, Code, Sliders, List, Columns } from "lucide-react";
import { cn } from "@/lib/utils";

// [Path: src/features/settings/components/SettingsPage.tsx]

export function SettingsPage() {
    const settings = useSettingsStore();

    return (
        <div className="mx-auto w-full max-w-4xl space-y-8 p-8 pb-32">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            {/* --- Interface & UX --- */}
            <div id="appearance" className="scroll-mt-8 space-y-4">
                <h2 className="text-xl font-semibold text-neutral-500">Interface & UX</h2>

                <SettingsSection
                    title="Appearance"
                    description="Customize how the application looks."
                    icon={<Monitor className="h-5 w-5" />}
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Theme */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Theme</label>
                            <div className="flex gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-black">
                                {['system', 'light', 'dark'].map((theme) => (
                                    <button
                                        key={theme}
                                        onClick={() => settings.setTheme(theme as any)}
                                        className={cn(
                                            "flex-1 rounded-md px-3 py-1.5 text-sm capitalize transition-all",
                                            settings.appearance.theme === theme
                                                ? "bg-white text-black shadow dark:bg-neutral-800 dark:text-white"
                                                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                                        )}
                                    >
                                        {theme}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Density */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Density</label>
                            <div className="flex gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-black">
                                {['compact', 'comfortable'].map((density) => (
                                    <button
                                        key={density}
                                        onClick={() => settings.setDensity(density as any)}
                                        className={cn(
                                            "flex-1 rounded-md px-3 py-1.5 text-sm capitalize transition-all",
                                            settings.appearance.density === density
                                                ? "bg-white text-black shadow dark:bg-neutral-800 dark:text-white"
                                                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                                        )}
                                    >
                                        {density}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </SettingsSection>
            </div>

            <div id="editor" className="scroll-mt-8 space-y-4">
                <SettingsSection
                    title="Editor Integration"
                    description="Configure how files are opened and viewed."
                    icon={<Code className="h-5 w-5" />}
                >
                    {/* Default Editor */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Default Code Editor</label>
                        <select
                            value={settings.editor.defaultEditor}
                            onChange={(e) => settings.setDefaultEditor(e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700"
                        >
                            <option value="Visual Studio Code">Visual Studio Code</option>
                            <option value="Sublime Text">Sublime Text</option>
                            <option value="Atom">Atom</option>
                            <option value="Notepad++">Notepad++</option>
                            <option value="Vim">Vim</option>
                        </select>
                        <p className="text-xs text-neutral-500">
                            Application used to open code files (.js, .json, etc).
                        </p>
                    </div>

                    {/* Default View */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Default View Mode</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => settings.setDefaultView('list')}
                                className={cn(
                                    "flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800",
                                    settings.editor.defaultView === 'list'
                                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 dark:bg-blue-900/10"
                                        : "border-neutral-200 dark:border-neutral-800"
                                )}
                            >
                                <List className="h-6 w-6 text-neutral-500" />
                                <span className="text-sm font-medium">List View</span>
                            </button>
                            <button
                                onClick={() => settings.setDefaultView('column')}
                                className={cn(
                                    "flex flex-1 flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800",
                                    settings.editor.defaultView === 'column'
                                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 dark:bg-blue-900/10"
                                        : "border-neutral-200 dark:border-neutral-800"
                                )}
                            >
                                <Columns className="h-6 w-6 text-neutral-500" />
                                <span className="text-sm font-medium">Column View</span>
                            </button>
                        </div>
                    </div>
                </SettingsSection>
            </div>

            {/* --- General & Defaults --- */}
            <div id="general" className="scroll-mt-8 space-y-4">
                <h2 className="text-xl font-semibold text-neutral-500 pt-4">General & Defaults</h2>

                <SettingsSection
                    title="Defaults & Quality of Life"
                    description="Set your preferred defaults for common actions."
                    icon={<Sliders className="h-5 w-5" />}
                >
                    {/* Pre-signed URL Expiration */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Pre-signed URL Default Expiration</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min={1}
                                max={168} // 1 week
                                value={settings.general.presignedUrlExpiration}
                                onChange={(e) => settings.setPresignedUrlExpiration(Number(e.target.value))}
                                className="w-24 rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700"
                            />
                            <span className="text-sm text-neutral-500">hours</span>
                        </div>
                    </div>

                    {/* Clipboard */}
                    <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium">Auto-copy URL</label>
                            <p className="text-xs text-neutral-500">
                                Check to copy the URL to your clipboard immediately after upload.
                            </p>
                        </div>
                        <button
                            onClick={settings.toggleCopyUrlAfterUpload}
                            className={cn(
                                "flex h-6 w-11 items-center rounded-full transition-colors",
                                settings.general.copyUrlAfterUpload ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-700"
                            )}
                        >
                            <span
                                className={cn(
                                    "h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                                    settings.general.copyUrlAfterUpload ? "translate-x-5.5" : "translate-x-0.5"
                                )}
                            />
                        </button>
                    </div>

                    {/* Ignored Files */}
                    <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        <label className="text-sm font-medium">Ignored Files</label>
                        <textarea
                            value={settings.general.ignoredFiles.join('\n')}
                            onChange={(e) => settings.setIgnoredFiles(e.target.value.split('\n'))}
                            rows={4}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900"
                            placeholder=".DS_Store&#10;Thumbs.db"
                        />
                        <p className="text-xs text-neutral-500">
                            Enter one filename pattern per line. These files will be hidden from the explorer.
                        </p>
                    </div>
                </SettingsSection>
            </div>
        </div>
    );
}
