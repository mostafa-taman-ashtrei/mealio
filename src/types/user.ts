import { Restaurant, User } from "@prisma/client";

export type UserWithRestaurants = User & { restaurants: Restaurant[] };