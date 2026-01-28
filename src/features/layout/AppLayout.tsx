import type { ReactNode } from "react";
import { MainSidebar } from "./components/MainSidebar";
import { SubSidebar } from "./components/SubSidebar";

// [Path: src/features/layout/AppLayout.tsx]
export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white text-neutral-900 dark:bg-black dark:text-neutral-50">
            <MainSidebar />
            <SubSidebar />
            <main className="flex-1 overflow-auto relative">
                {children}
            </main>
        </div>
    );
}
