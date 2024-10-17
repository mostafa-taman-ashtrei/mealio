import { createJSONStorage, persist } from "zustand/middleware";

import { MenuStore } from "@/types/stores";
import { create } from "zustand";

const useMenu = create(
    persist<MenuStore>((set) => ({
        menus: [],
        addMenu: (menu) => set((state) => ({ menus: [...state.menus, menu] })),
        removeMenu: (menuId) => set((state) => ({ menus: state.menus.filter((menu) => menu.id !== menuId) })),
        updateMenu: (menuId, updatedMenu) => set((state) => ({ menus: state.menus.map((menu) => menu.id === menuId ? updatedMenu : menu) })),
        addMenuItem: (menuId, newMenuItem) => set((state) => ({ menus: state.menus.map((menu) => menu.id === menuId ? { ...menu, menuItems: [...menu.menuItems, newMenuItem] } : menu) })),
        removeMenuItem: (menuId, menuItemId) => set((state) => ({ menus: state.menus.map((menu) => menu.id === menuId ? { ...menu, menuItems: menu.menuItems.filter((menuItem) => menuItem.id !== menuItemId) } : menu) })),
        updateMenuItem: (menuId, menuItemId, updatedMenuItem) => set((state) => ({ menus: state.menus.map((menu) => menu.id === menuId ? { ...menu, menuItems: menu.menuItems.map((menuItem) => menuItem.id === menuItemId ? updatedMenuItem : menuItem) } : menu) })),
    }), {
        name: "menu-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useMenu;