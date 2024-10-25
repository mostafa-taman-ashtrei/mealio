import { MenuItemWithImages, MenuWithItems, RestaurantWithMenus } from "./restaurant";

import { Discount } from "@prisma/client";

export type RestaurantStore = {
    restaurants: RestaurantWithMenus[];
    setRestaurants: (restaurants: RestaurantWithMenus[]) => void;
    addRestaurant: (restaurant: RestaurantWithMenus) => void;
    removeRestaurant: (restaurantId: string) => void;
    updateRestaurant: (restaurantId: string, updatedRestaurant: RestaurantWithMenus) => void;
    clearData: () => void;
    addMenu: (restaurantId: string, menu: MenuWithItems) => void;
    removeMenu: (restaurantId: string, menuId: string) => void;
    updateMenu: (restaurantId: string, menuId: string, updatedMenu: MenuWithItems) => void;
    addMenuItem: (restaurantId: string, menuId: string, newMenuItem: MenuItemWithImages) => void;
    removeMenuItem: (restaurantId: string, menuId: string, menuItemId: string) => void;
    updateMenuItem: (restaurantId: string, menuId: string, menuItemId: string, updatedMenuItem: MenuItemWithImages) => void;
    addMenuItemDiscount: (restaurantId: string, menuItemIds: string[], discount: Omit<Discount, "menuItemId">) => void;
    updateMenuItemDiscount: (restaurantId: string, discountId: string, data: Partial<Discount>) => void;
    removeMenuItemDiscount: (restaurantId: string, menuId: string, discountId: string) => void;
    removeDiscountFromAllItems: (restaurantId: string, discountId: string) => void;

    updateDiscountWithItems: (restaurantId: string, discountId: string, updatedDiscount: Discount & { menuItems: MenuItemWithImages[] }) => void;
    addRestaurantDiscount: (restaurantId: string, discountData: Discount) => void;
    updateRestaurantDiscount: (restaurantId: string, discountId: string, data: Partial<Discount>) => void;
    removeRestaurantDiscount: (restaurantId: string, discountId: string) => void;

    updateMenuTheme: (restaurantId: string, menuId: string, themeId: string) => void;
};
