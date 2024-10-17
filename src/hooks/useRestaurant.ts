import { createJSONStorage, persist } from "zustand/middleware";

import { RestaurantStore } from "@/types/stores";
import { create } from "zustand";

const useRestaurant = create(
    persist<RestaurantStore>((set) => ({
        restaurants: [],
        addRestaurant: (restaurant) => set((state) => ({ restaurants: [...state.restaurants, restaurant] })),
        removeRestaurant: (restaurantId) => set((state) => ({ restaurants: state.restaurants.filter((restaurant) => restaurant.id !== restaurantId) })),
        updateRestaurant: (restaurantId, updatedRestaurant) => set((state) => ({ restaurants: state.restaurants.map((restaurant) => restaurant.id === restaurantId ? updatedRestaurant : restaurant) })),
    }), {
        name: "restaurant-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useRestaurant;