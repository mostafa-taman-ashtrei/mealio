import { MenuItem, Restaurant } from "@prisma/client";

import { MenuWithItems } from "./restaurant";

export type RestaurantStore = {
    restaurants: Restaurant[];
    addRestaurant: (restaurant: Restaurant) => void;
    removeRestaurant: (restaurantId: string) => void;
    updateRestaurant: (restaurantId: string, updatedRestaurant: Restaurant) => void;
};

export type MenuStore = {
    menus: MenuWithItems[];
    addMenu: (menu: MenuWithItems) => void;
    removeMenu: (menuId: string) => void;
    updateMenu: (menuId: string, updatedMenu: MenuWithItems) => void;
    addMenuItem: (menuId: string, newMenuItem: MenuItem) => void;
    removeMenuItem: (menuId: string, menuItemId: string) => void;
    updateMenuItem: (menuId: string, menuItemId: string, updatedMenuItem: MenuItem) => void;
};