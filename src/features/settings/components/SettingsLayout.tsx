import { ReactNode } from "react";

// [Path: src/features/settings/components/SettingsLayout.tsx]

interface SettingsLayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export function SettingsLayout({ children, title, description }: SettingsLayoutProps) {
    return (
        <div className="mx-auto w-full max-w-5xl space-y-8 p-10 pb-32">
            <div className="space-y-1.5">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{title}</h1>
                {description && (
                    <p className="text-base text-neutral-500 dark:text-neutral-400">
                        {description}
                    </p>
                )}
            </div>

            <div className="space-y-10">
                {children}
            </div>
        </div>
    );
}
