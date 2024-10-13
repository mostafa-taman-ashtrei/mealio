import Container from "@/components/general/Container";
import ItemCard from "./components/ItemCard";
import NewItemButton from "@/components/general/NewItemButton";
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 px-2 overflow-hidden">
                <NewItemButton
                    className="h-full md:w-full"
                    variant="secondary"
                    text="Add New Item"
                />

                {Array.from({ length: 8 }).map((_, index) => (
                    <ItemCard key={index} />
                ))}

            </div>
        </Container>

    );
};

export default MenuPage;