import { ReactNode } from "react";

// [Path: src/features/settings/components/SettingsSection.tsx]

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    icon?: ReactNode;
}

export function SettingsSection({ title, description, children, icon }: SettingsSectionProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-start gap-4">
                {icon && <div className="mt-1 text-neutral-500 dark:text-neutral-400">{icon}</div>}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
                    {description && (
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-6 pt-2">
                {children}
            </div>
        </div>
    );
}
