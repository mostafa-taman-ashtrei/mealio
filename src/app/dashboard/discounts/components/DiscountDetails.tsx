import { CheckCircle2, Loader, XCircle } from "lucide-react";
import { cn, devLog } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Discount } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import toggleDiscountActivity from "@/services/discounts/toggleDiscountActivity";
import useRestaurant from "@/hooks/useRestaurant";
import { useState } from "react";

type DicountDetailsProps = {
    discount: Discount;
}

const DiscountDetails: React.FC<DicountDetailsProps> = ({ discount }) => {
    const { restaurants, updateMenuItemDiscount, updateRestaurantDiscount } = useRestaurant();
    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;

    const [isLoading, setIsLoading] = useState(false);

    const discountMenuItems = mainRestaurant
        ? mainRestaurant.menus.flatMap(menu => menu.menuItems.filter(item =>
            item.discounts.some(currentDiscount => currentDiscount.id === discount.id)))
        : null;


    const handleActivityToggle = async (isActive: boolean) => {
        try {
            setIsLoading(true);
            const { data, error, status } = await toggleDiscountActivity(discount.id, isActive);

            if (status === 500 || error || mainRestaurant === null) return toast({ title: `Failed to  ${isActive ? "activiat" : "deactivat"} discoun` });

            if (status === 200) {
                toast({ title: `${discount.name} ${isActive ? "activiated" : "deactivated"} successfully` });
                updateMenuItemDiscount(mainRestaurant.id, discount.id, data);
                updateRestaurantDiscount(mainRestaurant.id, discount.id, data);
            }

        } catch (error) {
            devLog(`Failed to toggle discount activity: ${error}`, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col gap-4 mt-4 px-2 w-full">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">{discount.type.toLowerCase()}</h2>
                    <span className="font-semibold">{discount.value}</span>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">Items</h2>
                    <span className="font-semibold">{discountMenuItems?.length}</span>
                </div>
                <Separator />

                <span className="text-sm text-gray-600 dark:text-gray-300">{discount.description}</span>


                <Button
                    onClick={() => handleActivityToggle(!discount.isActive)}
                    className={cn(
                        "flex flex-col items-center justify-between",
                        discount.isActive ? "text-red-500" : "text-primary"
                    )}
                    disabled={isLoading}
                    variant={discount.isActive ? "outline" : "secondary"}
                >
                    {
                        isLoading
                            ? <Loader size={20} className="animate-spin" />


                            : !discount.isActive ?
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <CheckCircle2 size={20} />
                                    <span>Acitvate</span>
                                </div>
                                :
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <XCircle size={20} />
                                    <span>De Activatate</span>
                                </div>
                    }
                </Button>
            </div>
        </div>
    );
};

export default DiscountDetails;