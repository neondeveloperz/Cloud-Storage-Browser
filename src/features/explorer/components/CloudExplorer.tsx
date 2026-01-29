"use client";

import { Cloud, WifiOff, Plus } from "lucide-react";
import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";

export function CloudExplorer() {
    const density = useSettingsStore(s => s.appearance.density);

    return (
        <div className="flex flex-col h-full bg-neutral-50 dark:bg-neutral-950">
            {/* Header */}
            <div className="flex items-center gap-2 p-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                    <Cloud size={18} />
                </div>
                <div className="flex-1">
                    <select className="w-full bg-transparent text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none">
                        <option>Select Connection...</option>
                        <option disabled>──────────</option>
                        <option value="new">+ New Connection</option>
                    </select>
                </div>
            </div>

            {/* Empty State / Placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 gap-4 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <WifiOff size={32} />
                </div>
                <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">No Connection Selected</h3>
                    <p className="text-sm max-w-[200px]">Select a cloud storage provider to browse files.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                    <Plus size={16} />
                    Add Connection
                </button>
            </div>
        </div>
    );
}
