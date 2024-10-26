import { Discount, Image, Menu, MenuItem, QrCode, Restaurant, User } from "@prisma/client";

export type UserWithRestaurants = User & { restaurants: Restaurant[] };


export type UserWithRestaurantsMenusItem = User & {
    restaurants: (Restaurant & {
        menus: (Menu & {
            menuItems: (MenuItem & {
                images: Image[]
                discounts: Discount[]
            })[],
            qrcode: QrCode
        })[]
        discounts: Discount[]
    })[]
};
