import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

// [Path: src/hooks/useInstalledEditors.ts]

export interface EditorInfo {
    name: string;
    path: string;
    icon: string;
}

export function useInstalledEditors() {
    const [editors, setEditors] = useState<EditorInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEditors() {
            try {
                const detected = await invoke<EditorInfo[]>('detect_editors');
                setEditors(detected);
            } catch (error) {
                console.error("Failed to detect editors:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEditors();
    }, []);

    return { editors, loading };
}
