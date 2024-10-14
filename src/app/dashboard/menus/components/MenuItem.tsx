import { Pen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type MenuItemProps = {
    className?: string;
    menuName: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuName }) => {
    return (
        <li
            className="col-span-1 divide-y divide-gray-400  hover:bg-primary hover:text-white duration-500 rounded-lg bg-gray-200 transition dark:divide-black dark:bg-zinc-900"
        >
            <Link
                href={`/menu/12345`}
                className="flex flex-col gap-1"
            >
                <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-primary text-white">
                        <span>
                            {menuName[0]}
                        </span>
                    </div>

                    <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                            <h3 className="truncate text-lg font-medium">
                                {menuName}
                            </h3>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="mt-4 flex flex-row items-center justify-start px-2 py-2  text-xs text-zinc-500">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>

                <Button
                    size="sm"
                    variant="ghost"
                >
                    <Pen className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant="ghost"
                    className=" text-red-500 hover:text-red-600"
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </li>
    );
};

export default MenuItem;