import { Menu, MenuItem } from "@prisma/client";

export type MenuWithItems = Menu & { menuItems: MenuItem[] };