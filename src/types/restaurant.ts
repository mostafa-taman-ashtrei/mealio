import { Discount, Image, Menu, MenuItem, Restaurant } from "@prisma/client";

export type MenuWithItems = Menu & { menuItems: MenuItemWithImages[] };

export type MenuItemWithImages = MenuItem & { images: Image[], discounts: Discount[] };

export type RestaurantWithMenus = Restaurant & {
    menus: (Menu & {
        menuItems: (MenuItem & {
            images: Image[],
            discounts: Discount[]
        })[]
    })[]
    discounts: Discount[]
};
