"use client";

import MenuItem from "./MenuItem";
import NewItemButton from "@/components/general/NewItemButton";
import useRestaurant from "@/hooks/useRestaurant";

type MenuGridProps = {
    className?: string;
}

const MenuGrid: React.FC<MenuGridProps> = () => {
    const { restaurants } = useRestaurant();
    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;

    return (
        <ul className="mb-2 mt-8 grid grid-cols-1 gap-6 divide-y md:grid-cols-2 lg:grid-cols-3">
            <NewItemButton
                className="h-full md:w-full"
                formType="menu"
                variant="secondary"
                text="Add A New Menu"
            />

            {mainRestaurant && mainRestaurant.menus.toReversed().map((menu) => (
                <MenuItem
                    key={menu.id}
                    menu={menu}
                />
            ))}
        </ul>
    );
};

export default MenuGrid;