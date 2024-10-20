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

type UpdatedImage = {
    id: string;
    url: string;
    isNew: boolean;
    isDeleted: boolean;
};


export type UpdateMenuItemData = {
    name: string;
    description?: string;
    price: number;
    menu: string;
    images: UpdatedImage[];
};
