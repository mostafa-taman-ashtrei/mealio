import { createJSONStorage, persist } from "zustand/middleware";

import { RestaurantStore } from "@/types/stores";
import { create } from "zustand";

const useRestaurant = create(
    persist<RestaurantStore>((set) => ({
        restaurants: [],
        setRestaurants: (restaurants) => set({ restaurants }),
        addRestaurant: (restaurant) => set((state) => ({ restaurants: [...state.restaurants, restaurant] })),
        removeRestaurant: (restaurantId) => set((state) => ({ restaurants: state.restaurants.filter((restaurant) => restaurant.id !== restaurantId) })),
        updateRestaurant: (restaurantId, updatedRestaurant) => set((state) => ({ restaurants: state.restaurants.map((restaurant) => restaurant.id === restaurantId ? updatedRestaurant : restaurant) })),
        clearData: () => set({ restaurants: [] }),
        addMenu: (restaurantId, menu) => set((state) => ({
            restaurants: state.restaurants.map((restaurant) =>
                restaurant.id === restaurantId ? { ...restaurant, menus: [...restaurant.menus, menu] } : restaurant
            )
        })),
        removeMenu: (restaurantId, menuId) => set((state) => ({
            restaurants: state.restaurants.map((restaurant) =>
                restaurant.id === restaurantId ? { ...restaurant, menus: restaurant.menus.filter((menu) => menu.id !== menuId) } : restaurant
            )
        })),
        updateMenu: (restaurantId, menuId, updatedMenu) => set((state) => ({
            restaurants: state.restaurants.map((restaurant) =>
                restaurant.id === restaurantId ? { ...restaurant, menus: restaurant.menus.map((menu) => menu.id === menuId ? updatedMenu : menu) } : restaurant
            )
        })),
        addMenuItem: (restaurantId, menuId, newMenuItem) => set((state) => ({
            restaurants: state.restaurants.map((restaurant) =>
                restaurant.id === restaurantId ? {
                    ...restaurant,
                    menus: restaurant.menus.map((menu) =>
                        menu.id === menuId ? { ...menu, menuItems: [...menu.menuItems, newMenuItem] } : menu
                    )
                } : restaurant
            )
        })),
        removeMenuItem: (restaurantId, menuId, menuItemId) => set((state) => ({
            restaurants: state.restaurants.map((restaurant) =>
                restaurant.id === restaurantId ? {
                    ...restaurant,
                    menus: restaurant.menus.map((menu) =>
                        menu.id === menuId ? { ...menu, menuItems: menu.menuItems.filter((item) => item.id !== menuItemId) } : menu
                    )
                } : restaurant
            )
        })),
        updateMenuItem: (restaurantId, menuId, menuItemId, updatedMenuItem) => set((state) => ({
            restaurants: state.restaurants.map((restaurant) =>
                restaurant.id === restaurantId ? {
                    ...restaurant,
                    menus: restaurant.menus.map((menu) =>
                        menu.id === menuId ? {
                            ...menu,
                            menuItems: menu.menuItems.map((item) => item.id === menuItemId ? updatedMenuItem : item)
                        } : menu
                    )
                } : restaurant
            )
        })),

    }), {
        name: "restaurant-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useRestaurant;