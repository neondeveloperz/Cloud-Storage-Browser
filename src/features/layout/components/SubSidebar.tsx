import { FolderOpen } from "lucide-react";

// [Path: src/features/layout/components/SubSidebar.tsx]
export function SubSidebar() {
    return (
        <aside className="hidden h-full w-64 flex-col border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-black md:flex">
            <div className="flex h-12 items-center px-4 font-medium text-sm text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <FolderOpen size={16} className="mr-2" />
                EXPLORER
            </div>
            <div className="flex-1 p-4">
                <div className="text-xs text-neutral-400 text-center mt-10">
                    No folder opened
                </div>
            </div>
        </aside>
    );
}
