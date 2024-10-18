import { Image, Menu, MenuItem, Restaurant, User } from "@prisma/client";

export type UserWithRestaurants = User & { restaurants: Restaurant[] };


export type UserWithRestaurantsMenusItem = User & {
    restaurants: (Restaurant & {
        menus: (Menu & {
            menuItems: (MenuItem & {
                images: Image[]
            })[]
        })[]
    })[]
};
