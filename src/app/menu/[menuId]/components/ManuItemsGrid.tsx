import ItemCard from "./ItemCard";
import NewItemButton from "@/components/general/NewItemButton";

const ManuItemsGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 px-2 overflow-hidden">
            <NewItemButton
                className="h-full md:w-full"
                variant="secondary"
                text="Add New Item"
                formType="item"
            />

            {Array.from({ length: 8 }).map((_, index) => (
                <ItemCard key={index} />
            ))}
        </div>
    );
};

export default ManuItemsGrid;