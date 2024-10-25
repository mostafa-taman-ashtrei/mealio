import { BookOpenText, CirclePercent, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageGrid = () => {
    return (
        <div className="my-2 grid grid-cols-1 gap-6 divide-y md:grid-cols-2 p-3 lg:grid-cols-3">
            <Link href="/dashboard/menus">
                <Button
                    className="flex w-full h-32 md:w-full flex-row items-center justify-center gap-2 text-3xl"
                    variant="secondary"
                >
                    <BookOpenText size={35} />
                    Menues
                </Button>
            </Link>

            <Link href="/dashboard/discounts">
                <Button
                    className="flex w-full h-32 md:w-full flex-row items-center justify-center gap-2 text-3xl"
                    variant="secondary"
                >
                    <CirclePercent size={35} />
                    Discounts
                </Button>
            </Link>

            <Link href="/dashboard/restaurants">
                <Button
                    className="flex w-full h-32 md:w-full flex-row items-center justify-center gap-2 text-3xl"
                    variant="secondary"
                >
                    <Store size={35} />
                    My Restaurant
                </Button>
            </Link>
        </div>

    );
}
    ;
export default PageGrid;