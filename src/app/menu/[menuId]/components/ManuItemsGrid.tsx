import ItemCard from "./ItemCard";
import { MenuItemWithImages } from "@/types/restaurant";
import NewItemButton from "@/components/general/NewItemButton";

type MenuGridItemProps = {
    items: MenuItemWithImages[];
}

const ManuItemsGrid: React.FC<MenuGridItemProps> = ({ items }) => {
    return (
        <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-6 px-2 overflow-hidden w-11/12">
                <NewItemButton
                    className="h-full md:w-80"
                    variant="secondary"
                    text="Add New Item"
                    formType="item"
                />

                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManuItemsGrid;