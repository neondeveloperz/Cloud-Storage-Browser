"use client";

import { Sliders } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// [Path: src/features/layout/components/sidebars/SettingsNavView.tsx]

const categories = [
    { id: "appearance", label: "Interface & UX", href: "/settings/appearance" },
    { id: "editor", label: "Editor Integration", href: "/settings/editor" },
    { id: "general", label: "General & Defaults", href: "/settings/general" },
];

export function SettingsNavView() {
    const pathname = usePathname();

    return (
        <>
            <div className="flex h-12 items-center px-4 font-medium text-sm text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
                <Sliders size={16} className="mr-2" />
                SETTINGS
            </div>
            <div className="flex-1 p-2">
                <div className="flex flex-col gap-1">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className={cn(
                                "flex items-center rounded-md px-3 py-2 text-sm transition-colors text-left",
                                pathname === category.href
                                    ? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 font-medium"
                                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                            )}
                        >
                            {category.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
