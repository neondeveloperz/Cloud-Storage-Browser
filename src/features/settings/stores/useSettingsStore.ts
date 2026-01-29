import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// [Path: src/features/settings/stores/useSettingsStore.ts]

interface AppearanceSettings {
    theme: 'system' | 'light' | 'dark';
    density: 'compact' | 'comfortable';
}

interface EditorSettings {
    defaultEditor: string;
    defaultView: 'list' | 'column';
    customEditors: { name: string; path: string }[];
}

interface GeneralSettings {
    presignedUrlExpiration: number; // hours (e.g., 1, 24)
    copyUrlAfterUpload: boolean;
    ignoredFiles: string[];
}

interface SettingsState {
    appearance: AppearanceSettings;
    editor: EditorSettings;
    general: GeneralSettings;

    // Actions
    setTheme: (theme: AppearanceSettings['theme']) => void;
    setDensity: (density: AppearanceSettings['density']) => void;
    setDefaultEditor: (editor: string) => void;
    setDefaultView: (view: EditorSettings['defaultView']) => void;
    addCustomEditor: (name: string, path: string) => void;

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
                defaultEditor: '',
                defaultView: 'list',
                customEditors: [],
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
            addCustomEditor: (name, path) =>
                set((state) => {
                    const exists = state.editor.customEditors.some(e => e.path === path);
                    if (exists) return state;
                    return {
                        editor: {
                            ...state.editor,
                            customEditors: [...state.editor.customEditors, { name, path }],
                            defaultEditor: name // Auto-select newly added editor
                        }
                    };
                }),

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
            version: 1,
            migrate: (persistedState: unknown, version) => {
                const state = persistedState as SettingsState;

                // Migration from version 0 (or undefined) to 1
                if (version === 0 || !version) {
                    if (state.editor && !state.editor.customEditors) {
                        state.editor.customEditors = [];
                    }
                }

                return state;
            },
        }
    )
);
