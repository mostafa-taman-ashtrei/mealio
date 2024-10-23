import { Loader, Pen, Trash, XCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn, devLog } from "@/lib/utils";

import BowlIcon from "@/assets/images/bowl.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ItemDetails from "./ItemDetails";
import { MenuItemWithImages } from "@/types/restaurant";
import UpdateItemForm from "./UpdateItemForm";
import deleteMenuItem from "@/services/menu/deleteMenuItem";
import { toast } from "@/hooks/use-toast";
import useRestaurant from "@/hooks/useRestaurant";
import { useState } from "react";

type ItemCardProps = {
    item: MenuItemWithImages;
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    const { restaurants, removeMenuItem } = useRestaurant();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleteing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;


    const handleDeleteMenuItem = async () => {
        try {
            setIsDeleteing(true);
            const { error, status } = await deleteMenuItem(item.id);

            if (status === 500 || error || mainRestaurant === null) return toast({ title: "Failed to create restaurant" });

            if (status === 200) {
                toast({ title: `${item.name} deleted successfully` });
                removeMenuItem(mainRestaurant.id, item.menuId, item.id);
            }

        } catch (error) {
            devLog(`Failed to delete menu item: ${error}`, "error");
        } finally {
            setIsDeleteing(false);
            setIsOpen(false);
        }
    };

    const handleUpdateMenuItem = () => setIsUpdating((state) => !state);


    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div className="w-full md:w-80 bg-secondary shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                    <a href="#">
                        <Image
                            src={item.images[0] ? item.images[0].url : BowlIcon}
                            width={1000}
                            height={1000}
                            alt={item.name}
                            className="h-80 w-full md:w-80 object-cover rounded-t-xl"
                        />

                        <div className="p-2 w-full md:w-80">
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

                    <div className={cn(
                        "w-full flex flex-row gap-4 items-center justify-between",
                        item.images.length > 1 && "p-5"
                    )}>
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={handleUpdateMenuItem}
                        >
                            {
                                isUpdating
                                    ? <XCircle className="h-4 w-4" />
                                    : <Pen className="h-4 w-4" />
                            }
                        </Button>

                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleDeleteMenuItem}
                            disabled={isUpdating || isDeleting}
                        >
                            {
                                isDeleting
                                    ? <Loader className="animate-spin text-primary" />
                                    : <Trash className="h-4 w-4" />
                            }
                        </Button>
                    </div>
                </SheetHeader>

                {
                    isUpdating
                        ? <UpdateItemForm item={item} setIsUpdating={setIsUpdating} setOpenModal={setIsOpen} />
                        : <ItemDetails item={item} />
                }

            </SheetContent>
        </Sheet>
    );
};

export default ItemCard;