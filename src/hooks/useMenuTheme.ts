import { createJSONStorage, persist } from "zustand/middleware";

import { MenuThemeStore } from "@/types/stores";
import { MenuThemeType } from "@/types/theme";
import { create } from "zustand";
import menuThemes from "@/lib/themes/menuThemes";

const useMenuTheme = create(
    persist<MenuThemeStore>((set, get) => ({
        themes: menuThemes,
        selectedMenuId: null,

        setSelectedMenu: (menuId: string | null) => set({ selectedMenuId: menuId }),


        registerTheme: (theme) =>
            set((state) => ({
                themes: [...state.themes, theme]
            })),

        getTheme: (id) => get().themes.find(theme => theme.id === id),

        initializeThemes: () => set({ themes: menuThemes })
    }), {
        name: "menu-storage",
        storage: createJSONStorage(() => localStorage),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        merge: (persistedState: any, currentState) => ({
            ...currentState,
            themes: persistedState.themes.map((theme: Partial<MenuThemeType>) => ({
                ...theme,
                component: menuThemes.find(t => t.id === theme.id)?.component
            }))
        })
    })
); export default useMenuTheme;
