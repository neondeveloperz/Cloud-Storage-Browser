"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Folder, File, HardDrive, ArrowUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeDir } from '@tauri-apps/api/path';
import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";

// Type based on Rust struct
interface FileInfo {
    name: string;
    is_dir: boolean;
    size: number;
    modified: number;
}

export function LocalExplorer() {
    const [currentPath, setCurrentPath] = useState<string>("");
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const density = useSettingsStore(s => s.appearance.density);

    // Initial load: Go to Home Directory
    useEffect(() => {
        async function init() {
            try {
                const home = await homeDir();
                setCurrentPath(home);
            } catch (err) {
                console.error("Failed to get home dir", err);
            }
        }
        init();
    }, []);

    // Fetch files when path changes
    useEffect(() => {
        if (!currentPath) return;
        loadFiles(currentPath);
    }, [currentPath]);

    async function loadFiles(path: string) {
        setLoading(true);
        setError(null);
        try {
            const result = await invoke<FileInfo[]>("list_local_files", { path });
            setFiles(result);
        } catch (err: any) {
            setError(err.toString());
            setFiles([]);
        } finally {
            setLoading(false);
        }
    }

    const handleNavigate = (entryName: string) => {
        // Basic path joining - improvements needed for Win/Linux path separators in real robustness
        // But for now, assuming standard slash/backslash handling or just appending
        let newPath = "";
        if (currentPath.endsWith('/') || currentPath.endsWith('\\')) {
            newPath = `${currentPath}${entryName}`;
        } else {
            // Detect separator
            const sep = currentPath.includes('\\') ? '\\' : '/';
            newPath = `${currentPath}${sep}${entryName}`;
        }
        setCurrentPath(newPath);
    };

    const handleUp = () => {
        // Basic parent logic
        const sep = currentPath.includes('\\') ? '\\' : '/';
        const parts = currentPath.split(sep);
        // Remove last part
        if (parts.length > 1) {
            parts.pop();
            // Handle root cases (e.g. "C:\" or "/")
            if (parts.length === 1 && parts[0] === "") {
                setCurrentPath("/"); // Root on *nix
            } else if (parts.length === 1 && parts[0].endsWith(':')) {
                setCurrentPath(parts[0] + '\\'); // Root on Win
            } else {
                setCurrentPath(parts.join(sep) || sep);
            }
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "--";
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-2 p-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <HardDrive size={18} />
                </div>
                <div className="flex-1 flex gap-2 overflow-hidden">
                    <button
                        onClick={handleUp}
                        className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    >
                        <ArrowUp size={16} />
                    </button>
                    <input
                        type="text"
                        value={currentPath}
                        readOnly
                        className="flex-1 bg-transparent text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none truncate"
                    />
                </div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-auto">
                {loading && (
                    <div className="flex items-center justify-center p-8 text-neutral-400">
                        <Loader2 className="animate-spin mr-2" /> Loading...
                    </div>
                )}

                {error && (
                    <div className="p-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="min-w-full">
                        <div className={cn(
                            "grid grid-cols-[auto_1fr_auto] gap-x-4 px-4 py-2 text-xs font-semibold text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 sticky top-0 bg-white dark:bg-neutral-900 z-10",
                        )}>
                            <span className="w-5"></span>
                            <span>Name</span>
                            <span>Size</span>
                        </div>

                        {files.map((file) => (
                            <div
                                key={file.name}
                                className={cn(
                                    "grid grid-cols-[auto_1fr_auto] gap-x-4 px-4 cursor-default select-none group hover:bg-blue-50 dark:hover:bg-blue-900/20",
                                    density === "compact" ? "py-1.5" : "py-3"
                                )}
                                onDoubleClick={() => file.is_dir && handleNavigate(file.name)}
                            >
                                <div className="w-5 flex items-center justify-center text-neutral-400 group-hover:text-blue-500">
                                    {file.is_dir ? <Folder size={16} fill="currentColor" className="text-yellow-400 dark:text-yellow-500/80" /> : <File size={16} />}
                                </div>
                                <span className="truncate text-sm text-neutral-700 dark:text-neutral-200">
                                    {file.name}
                                </span>
                                <span className="text-xs text-neutral-400 font-mono">
                                    {file.is_dir ? "" : formatSize(file.size)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer info */}
            <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-400 bg-neutral-50 dark:bg-neutral-900">
                {files.length} items
            </div>
        </div>
    );
}
