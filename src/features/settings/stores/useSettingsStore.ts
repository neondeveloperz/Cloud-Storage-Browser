import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// [Path: src/features/settings/stores/useSettingsStore.ts]

interface SettingsState {
    appearance: {
        theme: 'system' | 'light' | 'dark';
        density: 'compact' | 'comfortable';
    };
    editor: {
        defaultEditor: string;
        defaultView: 'list' | 'column';
    };
    general: {
        presignedUrlExpiration: number; // hours (e.g., 1, 24)
        copyUrlAfterUpload: boolean;
        ignoredFiles: string[];
    };

    // Actions
    setTheme: (theme: SettingsState['appearance']['theme']) => void;
    setDensity: (density: SettingsState['appearance']['density']) => void;
    setDefaultEditor: (editor: string) => void;
    setDefaultView: (view: SettingsState['editor']['defaultView']) => void;
    setPresignedUrlExpiration: (hours: number) => void;
    toggleCopyUrlAfterUpload: () => void;
    setIgnoredFiles: (files: string[]) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            appearance: {
                theme: 'system',
                density: 'comfortable',
            },
            editor: {
                defaultEditor: 'Visual Studio Code',
                defaultView: 'list',
            },
            general: {
                presignedUrlExpiration: 1,
                copyUrlAfterUpload: true,
                ignoredFiles: ['.DS_Store', 'Thumbs.db', '.git', 'node_modules'],
            },

            setTheme: (theme) =>
                set((state) => ({ appearance: { ...state.appearance, theme } })),
            setDensity: (density) =>
                set((state) => ({ appearance: { ...state.appearance, density } })),
            setDefaultEditor: (defaultEditor) =>
                set((state) => ({ editor: { ...state.editor, defaultEditor } })),
            setDefaultView: (defaultView) =>
                set((state) => ({ editor: { ...state.editor, defaultView } })),
            setPresignedUrlExpiration: (presignedUrlExpiration) =>
                set((state) => ({ general: { ...state.general, presignedUrlExpiration } })),
            toggleCopyUrlAfterUpload: () =>
                set((state) => ({
                    general: {
                        ...state.general,
                        copyUrlAfterUpload: !state.general.copyUrlAfterUpload,
                    },
                })),
            setIgnoredFiles: (ignoredFiles) =>
                set((state) => ({ general: { ...state.general, ignoredFiles } })),
        }),
        {
            name: 'app-settings', // name of the item in the storage (must be unique)
        }
    )
);
