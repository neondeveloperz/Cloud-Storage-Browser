"use client";

import { usePathname } from "next/navigation";
import { FileExplorerView } from "./sidebars/FileExplorerView";
import { SettingsNavView } from "./sidebars/SettingsNavView";

// [Path: src/features/layout/components/SubSidebar.tsx]
export function SubSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden h-full w-64 flex-col border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-black md:flex">
            {pathname.startsWith("/settings") ? (
                <SettingsNavView />
            ) : (
                <FileExplorerView />
            )}
        </aside>
    );
}
