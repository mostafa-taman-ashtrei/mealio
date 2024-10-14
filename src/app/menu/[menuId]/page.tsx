import Container from "@/components/general/Container";
import ManuItemsGrid from "./components/ManuItemsGrid";
import PageTitle from "@/components/general/PageTitle";

type MenuPageProps = {
    params: {
        menuId: string;
    };
};

const MenuPage: React.FC<MenuPageProps> = ({ params }) => {
    const { menuId } = params;

    return (
        <Container className="py-14">
            <PageTitle text="Menu Items" />
            <p className="text-gray-500">These are all your items in the {menuId} menu</p>

            <ManuItemsGrid />
        </Container>
    );
};

export default MenuPage;