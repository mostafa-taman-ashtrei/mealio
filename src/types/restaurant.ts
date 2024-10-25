import { Discount, Image, Menu, MenuItem, QrCode, Restaurant } from "@prisma/client";

export type MenuWithItems = Menu & { menuItems: MenuItemWithImages[], qrcode: QrCode };

export type MenuItemWithImages = MenuItem & { images: Image[], discounts: Discount[] };

export type RestaurantWithMenus = Restaurant & {
    menus: (Menu & {
        menuItems: (MenuItem & {
            images: Image[],
            discounts: Discount[]
        })[],
        qrcode: QrCode
    })[]
    discounts: Discount[]
};

export type DiscountWithMenuItems = Discount & {
    menuItems: MenuItemWithImages[]
};


export type QrCodeWithMenu = QrCode & {
    menu: MenuWithItems
}