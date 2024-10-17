import { Image, Menu, MenuItem } from "@prisma/client";

export type MenuWithItems = Menu & { menuItems: MenuItem[] };

export type MenuItemWithImages = MenuItem & { images: Image[] };