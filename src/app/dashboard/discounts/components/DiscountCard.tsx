import {
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Discount } from "@prisma/client";
import { useState } from "react";

type DiscountCardProps = {
    discount: Discount;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {
    const [openModal, setOpenModal] = useState(false);


    return (
        <Sheet open={openModal} onOpenChange={setOpenModal}>
            <SheetTrigger asChild>
                <li
                    className="col-span-1 cursor-pointer divide-y divide-gray-400  hover:bg-primary hover:bg-gray-300 dark:hover:bg-zinc-800 duration-500 rounded-lg bg-gray-200 transition dark:divide-black dark:bg-zinc-900"
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
                    </div>

                    <div className="mt-4 flex flex-row items-center justify-between px-2 py-2  text-xs text-zinc-500">
                        <p>
                            {discount.description}
                        </p>

                    </div>
                </li>
            </SheetTrigger>

            <SheetContent>
                <DialogHeader>
                    <DialogTitle>{discount.name}</DialogTitle>
                </DialogHeader>

                Discount Details
            </SheetContent>
        </Sheet>

    );
};

export default DiscountCard;