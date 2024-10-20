import ImageCarousel from "./ImageCarousel";
import { MenuItemWithImages } from "@/types/restaurant";
import { cn } from "@/lib/utils";

type ItemDetailsProps = {
    item: MenuItemWithImages;
};


const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className={cn("flex mt-4", item.images.length > 1 && "my-10")}>

                <ImageCarousel
                    images={item.images}
                />
            </div>

            <div className="flex flex-col gap-4 mt-4 px-2 w-full">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <span className="font-semibold">${item.price}</span>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-300">{item.description}</span>

            </div>
        </div>
    );
};

export default ItemDetails;