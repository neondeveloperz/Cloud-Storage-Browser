import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// [Path: src/components/ui/settings/SettingItem.tsx]

interface SettingItemProps {
    label: string;
    description?: string;
    children: ReactNode;
    align?: "center" | "start";
    className?: string;
}

export function SettingItem({
    label,
    description,
    children,
    align = "center",
    className,
}: SettingItemProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-6 px-6 transition-all",
                "min-h-[var(--spacing-item-h)] py-[var(--spacing-item-py)]",
                align === "start" && "items-start",
                className
            )}
        >
            <div className="flex flex-col gap-0.5">
                <label className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[300px]">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-2">{children}</div>
        </div>
    );
}
