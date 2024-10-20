import ItemCard from "./ItemCard";
import { MenuItemWithImages } from "@/types/restaurant";
import NewItemButton from "@/components/general/NewItemButton";

type MenuGridItemProps = {
    items: MenuItemWithImages[];
}

const ManuItemsGrid: React.FC<MenuGridItemProps> = ({ items }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6 px-2 overflow-hidden">
            <NewItemButton
                className="h-full md:w-72"
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
    );
};

export default ManuItemsGrid;