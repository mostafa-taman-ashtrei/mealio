import { CheckCircle2, Loader, Pen, Trash, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn, devLog } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Discount } from "@prisma/client";
import DiscountDetails from "./DiscountDetails";
import UpdateDiscountFrom from "./UpdateDiscountFrom";
import deleteDiscount from "@/services/discounts/deleteDiscount";
import { toast } from "@/hooks/use-toast";
import useRestaurant from "@/hooks/useRestaurant";
import { useState } from "react";

type DiscountCardProps = {
    discount: Discount;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {
    const { restaurants, removeRestaurantDiscount, removeDiscountFromAllItems } = useRestaurant();
    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;


    const [openModal, setOpenModal] = useState(false);
    const [isDeleting, setIsDeleteing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);


    const handleUpdateDiscount = () => setIsUpdating((state) => !state);


    const handleDeleteDiscount = async () => {
        try {
            setIsDeleteing(true);
            const { error, status } = await deleteDiscount(discount.id);

            if (status === 500 || error || mainRestaurant === null) return toast({ title: "Failed to delete discount" });

            if (status === 200) {
                toast({ title: `${discount.name} deleted successfully` });
                removeRestaurantDiscount(mainRestaurant.id, discount.id);
                removeDiscountFromAllItems(mainRestaurant.id, discount.id);
            }

        } catch (error) {
            devLog(`Failed to delete discount: ${error}`, "error");
        } finally {
            setIsDeleteing(false);
            setOpenModal(false);
        }
    };


    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <li
                    className={cn(
                        "col-span-1 cursor-pointer   hover:bg-primary hover:bg-gray-300 dark:hover:bg-zinc-800 duration-500 rounded-lg bg-gray-200 transition dark:divide-black dark:bg-zinc-900",
                        discount.description && "divide-y divide-gray-400"
                    )}
                >

                    <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-primary text-white">
                            <span>
                                {discount.name[0]}
                            </span>

                        </div>

                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-lg font-medium">
                                    {discount.name}
                                </h3>
                            </div>
                        </div>

                        {discount.isActive ? <CheckCircle2 className="text-primary" /> : <XCircle className="text-red-500" />}
                    </div>

                    <div className="mt-4 flex flex-row items-center justify-between px-2 py-2  text-xs text-zinc-500">
                        <p>
                            {discount.description}
                        </p>

                    </div>
                </li>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{discount.name}</DialogTitle>

                    <div className="w-full flex flex-row gap-4 items-center justify-between">
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={handleUpdateDiscount}
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
                            onClick={handleDeleteDiscount}
                            disabled={isUpdating || isDeleting}
                        >
                            {
                                isDeleting
                                    ? <Loader className="animate-spin" />
                                    : <Trash className="h-4 w-4" />
                            }
                        </Button>
                    </div>
                </DialogHeader>

                {
                    isUpdating
                        ? <UpdateDiscountFrom setIsUpdating={setIsUpdating} setOpenModal={setOpenModal} discount={discount} />
                        : <DiscountDetails discount={discount} />
                }
            </DialogContent>
        </Dialog>

    );
};

export default DiscountCard;