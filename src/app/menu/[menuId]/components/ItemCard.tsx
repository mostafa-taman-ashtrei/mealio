import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import Image from "next/image";
import ItemDetails from "./ItemDetails";
import { MenuItemWithImages } from "@/types/restaurant";

type ItemCardProps = {
    item: MenuItemWithImages;
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="w-full md:w-72 bg-secondary shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <a href="#">
                        <Image
                            src={item.images[0].url}
                            width={1000}
                            height={1000}
                            alt={item.name}
                            className="h-72 w-full md:w-72 object-cover rounded-t-xl"
                        />

                        <div className="p-2 w-full md:w-72">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-lg font-bold  truncate block capitalize">{item.name}</p>
                                <p className="text-lg font-semibold cursor-auto my-3">${item.price}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </SheetTrigger>

            <SheetContent className="min-w-[500px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{item.name}</SheetTitle>
                </SheetHeader>

                <ItemDetails item={item} />
            </SheetContent>
        </Sheet>
    );
};

export default ItemCard;