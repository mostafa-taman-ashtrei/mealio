export type NewRestaurantDataType = {
    name: string;
    description: string | null;
    logoUrl: string;
};


export type NewMenuDataType = {
    name: string;
    description: string | null;
};


export type NewMenuItemType = {
    name: string;
    description: string | null;
    price: number;
    imageUrls: string[];
};