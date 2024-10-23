/* eslint-disable no-console */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create sample users
    const users = await prisma.user.createMany({
        data: [
            { id: "user1", clerkId: "clerkId1" },
            { id: "user2", clerkId: "clerkId2" },
            { id: "user3", clerkId: "clerkId3" },
        ],
    });

    console.log("Users created:", users);

    // Create sample restaurants
    const restaurants = await prisma.restaurant.createMany({
        data: [
            {
                id: "restaurant1",
                name: "The Spice House",
                description: "A place for exquisite spices and herbs.",
                ownerId: "user1",

            },
            {
                id: "restaurant2",
                name: "Pasta Paradise",
                description: "Home of delicious pasta dishes.",
                ownerId: "user2",

            },
            {
                id: "restaurant3",
                name: "Burger Bistro",
                description: "Juicy burgers and crispy fries.",
                ownerId: "user3",

            },
        ],
    });

    console.log("Restaurants created:", restaurants);

    // Create sample menus
    const menus = await prisma.menu.createMany({
        data: [
            {
                id: "menu1",
                restaurantId: "restaurant1",
                name: "Spice Menu",
                description: "A menu full of spicy delights.",

            },
            {
                id: "menu2",
                restaurantId: "restaurant2",
                name: "Pasta Menu",
                description: "Delicious pasta selections.",

            },
            {
                id: "menu3",
                restaurantId: "restaurant3",
                name: "Burger Menu",
                description: "A menu dedicated to burgers.",

            },
        ],
    });

    console.log("Menus created:", menus);

    // Create sample menu items
    const menuItems = await prisma.menuItem.createMany({
        data: [
            {
                id: "menuItem1",
                menuId: "menu1",
                name: "Spicy Curry",
                description: "A hot and spicy curry dish.",
                price: 12.99,

            },
            {
                id: "menuItem2",
                menuId: "menu1",
                name: "Hot Wings",
                description: "Crispy wings with a spicy sauce.",
                price: 8.99,

            },
            {
                id: "menuItem3",
                menuId: "menu2",
                name: "Fettuccine Alfredo",
                description: "Creamy fettuccine pasta.",
                price: 10.99,

            },
            {
                id: "menuItem4",
                menuId: "menu3",
                name: "Classic Cheeseburger",
                description: "Juicy cheeseburger with lettuce and tomato.",
                price: 9.99,

            },
        ],
    });

    console.log("Menu Items created:", menuItems);

    // Create sample images
    const images = await prisma.image.createMany({
        data: [
            {
                id: "image1",
                menuItemId: "menuItem1",
                url: "https://example.com/spicy_curry.jpg",

            },
            {
                id: "image2",
                menuItemId: "menuItem2",
                url: "https://example.com/hot_wings.jpg",

            },
            {
                id: "image3",
                menuItemId: "menuItem3",
                url: "https://example.com/fettuccine_alfredo.jpg",

            },
            {
                id: "image4",
                menuItemId: "menuItem4",
                url: "https://example.com/classic_cheeseburger.jpg",

            },
        ],
    });

    console.log("Images created:", images);

    // Create sample discounts
    const discounts = await prisma.discount.createMany({
        data: [
            {
                id: "discount1",
                menuItemId: "menuItem1",
                value: 10,
                description: "10% off spicy curry for a limited time.",
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                restaurantId: "restaurant1",
                type: "PERCENTAGE",
                name: "Halloween Special",
            },
            {
                id: "discount2",
                menuItemId: "menuItem3",
                value: 15,
                description: "15% off Fettuccine Alfredo on Wednesdays.",
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                restaurantId: "restaurant1",
                type: "PERCENTAGE",
                name: "Fettuccine Special",
            },
        ],
    });

    console.log("Discounts created:", discounts);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
