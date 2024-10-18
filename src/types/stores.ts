import { MenuItemWithImages, MenuWithItems, RestaurantWithMenus } from "./restaurant";

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
};
