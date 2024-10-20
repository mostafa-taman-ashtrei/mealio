"use client";

import Container from "@/components/general/Container";
import ManuItemsGrid from "./components/ManuItemsGrid";
import PageTitle from "@/components/general/PageTitle";
import useRestaurant from "@/hooks/useRestaurant";

type MenuPageProps = {
    params: {
        menuId: string;
    };
};

const MenuPage: React.FC<MenuPageProps> = ({ params }) => {
    const { menuId } = params;
    const { restaurants } = useRestaurant();

    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;

    const currentMenu = mainRestaurant
        ? mainRestaurant.menus.find(menu => menu.id === menuId)
        : null;

    if (!currentMenu) return null;

    return (
        <Container className="px-10">
            <PageTitle text="Menu Items" />
            <p className="text-gray-500">These are all your items in the {currentMenu.name} menu</p>

            <ManuItemsGrid items={currentMenu.menuItems.toReversed()} />
        </Container>
    );
};

export default MenuPage;