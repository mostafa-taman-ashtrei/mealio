import { Image, Menu, MenuItem, Restaurant } from "@prisma/client";

export type MenuWithItems = Menu & { menuItems: MenuItemWithImages[] };

export type MenuItemWithImages = MenuItem & { images: Image[] };

export type RestaurantWithMenus = Restaurant & {
    menus: (Menu & {
        menuItems: (MenuItem & {
            images: Image[]
        })[]
    })[]
};
