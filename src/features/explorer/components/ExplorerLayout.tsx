"use client";

import { ReactNode } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { cn } from "@/lib/utils";

interface ExplorerLayoutProps {
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    className?: string;
}

export function ExplorerLayout({ leftPanel, rightPanel, className }: ExplorerLayoutProps) {
    return (
        <div className={cn("h-full w-full", className)}>
            <Group orientation="horizontal" className="h-full w-full rounded-lg border border-neutral-200 dark:border-neutral-800">
                <Panel defaultSize={50} minSize={20}>
                    <div className="h-full w-full overflow-hidden bg-white dark:bg-neutral-900">
                        {leftPanel}
                    </div>
                </Panel>

                <Separator className="bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-500 dark:hover:bg-blue-500 w-2 transition-colors relative flex items-center justify-center">
                    <div className="h-4 w-0.5 bg-neutral-300 dark:bg-neutral-600 rounded-full" />
                </Separator>

                <Panel defaultSize={50} minSize={20}>
                    <div className="h-full w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
                        {rightPanel}
                    </div>
                </Panel>
            </Group>
        </div>
    );
}
