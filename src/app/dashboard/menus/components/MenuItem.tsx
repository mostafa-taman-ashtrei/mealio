"use client";

import { Loader, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuWithItems } from "@/types/restaurant";
import UpdateMenuButton from "./UpdateMenuButton";
import deleteMenu from "@/services/menu/deleteMenu";
import { devLog } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import useRestaurant from "@/hooks/useRestaurant";
import { useState } from "react";

type MenuItemProps = {
    className?: string;
    menu: MenuWithItems;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
    const { restaurants, removeMenu } = useRestaurant();
    const [isDeleting, setIsDeleteing] = useState(false);

    const { name, description, id } = menu;
    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;



    const handleDeleteMenu = async () => {
        try {
            setIsDeleteing(true);
            const { error, status } = await deleteMenu(menu.id);

            if (status === 500 || error || mainRestaurant === null) return toast({ title: "Failed to create restaurant" });

            if (status === 200) {
                toast({ title: `${menu.name} deleted successfully` });
                removeMenu(mainRestaurant.id, menu.id);
            }

        } catch (error) {
            devLog(`Failed to delete menu: ${error}`, "error");
        } finally {
            setIsDeleteing(false);
        }
    };

    return (
        <li
            className="col-span-1 divide-y divide-gray-400  hover:bg-primary hover:text-white duration-500 rounded-lg bg-gray-200 transition dark:divide-black dark:bg-zinc-900"
        >
            <Link
                href={`/menu/${id}`}
                className="flex flex-col gap-1"
            >
                <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-primary text-white">
                        <span>
                            {name[0]}
                        </span>
                    </div>

                    <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                            <h3 className="truncate text-lg font-medium">
                                {name}
                            </h3>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="mt-4 flex flex-row items-center justify-between px-2 py-2  text-xs text-zinc-500">
                <p>{description}</p>

                <div className="flex items-center space-x-2">
                    <UpdateMenuButton menu={menu} variant="ghost" />

                    <Button
                        size="sm"
                        variant="ghost"
                        className=" text-red-500 hover:text-red-600"
                        onClick={handleDeleteMenu}
                    >
                        {
                            isDeleting
                                ? <Loader className="animate-spin text-primary" />
                                : <Trash className="h-4 w-4" />
                        }
                    </Button>
                </div>
            </div>
        </li >
    );
};

export default MenuItem;