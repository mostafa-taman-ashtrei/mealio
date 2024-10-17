import { MenuItemWithImages, MenuWithItems } from "./restaurant";

import { Restaurant } from "@prisma/client";

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
    addMenuItem: (menuId: string, newMenuItem: MenuItemWithImages) => void;
    removeMenuItem: (menuId: string, menuItemId: string) => void;
    updateMenuItem: (menuId: string, menuItemId: string, updatedMenuItem: MenuItemWithImages) => void;
};