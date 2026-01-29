import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// [Path: src/components/ui/settings/SettingGroup.tsx]

interface SettingGroupProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

export function SettingGroup({ children, title, className }: SettingGroupProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {title && (
                <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {title}
                </h3>
            )}
            <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white shadow-sm dark:divide-neutral-800 dark:border-neutral-800 dark:bg-black/40">
                <div className="flex flex-col px-0 py-0">{children}</div>
            </div>
        </div>
    );
}
