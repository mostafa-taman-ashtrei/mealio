import MenuItem from "./MenuItem";
import NewItemButton from "@/components/general/NewItemButton";

type MenuGridProps = {
    className?: string;
    menuName: string;
}

const MenuGrid: React.FC<MenuGridProps> = ({ menuName }) => {
    return (
        <ul className="mb-2 mt-8 grid grid-cols-1 gap-6 divide-y md:grid-cols-2 lg:grid-cols-3">
            <NewItemButton
                className="h-full md:w-full"
                formType="menu"
                variant="secondary"
                text="Add A New Menu"
            />

            <MenuItem menuName={menuName} />
        </ul>
    );
};

export default MenuGrid;