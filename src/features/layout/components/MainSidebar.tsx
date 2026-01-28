"use client";

import { Database, Settings, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// [Path: src/features/layout/components/MainSidebar.tsx]
export function MainSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-16 flex-col items-center justify-between border-r border-neutral-200 bg-neutral-100 py-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm z-50">
            <div className="flex flex-col gap-4">
                <Link href="/">
                    <NavIcon
                        icon={Cloud}
                        label="Accounts"
                        active={pathname === "/"}
                    />
                </Link>
                <NavIcon icon={Database} label="Storage" />
            </div>
            <div className="flex flex-col gap-4">
                <Link href="/settings">
                    <NavIcon
                        icon={Settings}
                        label="Settings"
                        active={pathname.startsWith("/settings")}
                    />
                </Link>
            </div>
        </aside>
    );
}

function NavIcon({
    icon: Icon,
    label,
    active,
}: {
    icon: typeof Cloud;
    label: string;
    active?: boolean;
}) {
    return (
        <button
            title={label}
            className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105",
                active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            )}
        >
            <Icon size={20} strokeWidth={2} />
        </button>
    );
}
