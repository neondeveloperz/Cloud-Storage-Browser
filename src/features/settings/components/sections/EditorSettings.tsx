"use client";

import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";
import { SettingGroup } from "@/components/ui/settings/SettingGroup";
import { SettingItem } from "@/components/ui/settings/SettingItem";
import { SettingsLayout } from "@/features/settings/components/SettingsLayout";
import { cn } from "@/lib/utils";
import { List, Columns } from "lucide-react";
import { useInstalledEditors } from "@/hooks/useInstalledEditors";
import { Loader2 } from "lucide-react";
import { open } from '@tauri-apps/plugin-dialog';
import { FolderSearch } from "lucide-react";

// [Path: src/features/settings/components/sections/EditorSettings.tsx]
export function EditorSettings() {
    const settings = useSettingsStore();
    const { editors, loading } = useInstalledEditors();

    const handleLocate = async () => {
        try {
            const selected = await open({
                multiple: false,
                filters: [{
                    name: 'Executable',
                    extensions: ['app', 'exe']
                }]
            });

            if (selected && typeof selected === 'string') { // open returns string|null|string[] depending on config
                // Extract filename as name (e.g. "C:/.../Code.exe" -> "Code")
                const filename = selected.split(/[\\/]/).pop() || selected;
                const name = filename.replace(/\.(app|exe)$/i, '');

                settings.addCustomEditor(name, selected);
            }
        } catch (err) {
            console.error("Failed to open dialog:", err);
        }
    };

    return (
        <SettingsLayout
            title="Editor Integration"
            description="Configure how files are opened and viewed."
        >
            <SettingGroup title="Configuration">
                <SettingItem
                    label="Default Code Editor"
                    description="Application used to open code files."
                >
                    <div className="flex items-center gap-3">
                        {loading ? (
                            <div className="flex items-center gap-2 text-sm text-neutral-500">
                                <Loader2 className="animate-spin" size={14} />
                                <span>Scanning...</span>
                            </div>
                        ) : (
                            <select
                                value={settings.editor.defaultEditor}
                                onChange={(e) => settings.setDefaultEditor(e.target.value)}
                                className="h-8 rounded-md border-neutral-200 bg-neutral-50 px-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 min-w-[180px]"
                            >
                                <option value="" disabled>Select an Editor</option>

                                {/* Custom Editors (Manual) */}
                                {settings.editor.customEditors?.length > 0 && (
                                    <optgroup label="Custom">
                                        {settings.editor.customEditors.map((editor: { name: string; path: string }) => (
                                            <option key={editor.path} value={editor.name}>
                                                {editor.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                )}

                                {/* Detected Editors */}
                                {editors.length > 0 ? (
                                    <optgroup label="Detected">
                                        {editors.map((editor) => (
                                            <option key={editor.path} value={editor.name}>
                                                {editor.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                ) : (
                                    // Make sure we don't show "No supported" if we have custom ones
                                    settings.editor.customEditors.length === 0 && (
                                        <option value="" disabled>No supported editors found</option>
                                    )
                                )}
                            </select>
                        )}

                        <button
                            onClick={handleLocate}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                            title="Locate Editor Manually..."
                        >
                            <FolderSearch size={18} />
                        </button>
                    </div>
                </SettingItem>

                <SettingItem
                    label="Default View Mode"
                    description="Choose your preferred layout for file lists."
                >
                    <div className="flex gap-1 bg-neutral-100 p-1 rounded-lg dark:bg-neutral-800">
                        <button
                            onClick={() => settings.setDefaultView('list')}
                            className={cn(
                                "p-1.5 rounded-md transition-all",
                                settings.editor.defaultView === 'list'
                                    ? "bg-white text-blue-600 shadow-sm dark:bg-neutral-700 dark:text-blue-400"
                                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            )}
                            title="List View"
                        >
                            <List size={16} />
                        </button>
                        <button
                            onClick={() => settings.setDefaultView('column')}
                            className={cn(
                                "p-1.5 rounded-md transition-all",
                                settings.editor.defaultView === 'column'
                                    ? "bg-white text-blue-600 shadow-sm dark:bg-neutral-700 dark:text-blue-400"
                                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                            )}
                            title="Column View"
                        >
                            <Columns size={16} />
                        </button>
                    </div>
                </SettingItem>
            </SettingGroup>
        </SettingsLayout>
    );
}
