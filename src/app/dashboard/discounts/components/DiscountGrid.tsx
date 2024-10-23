"use client";

import DiscountCard from "./DiscountCard";
import NewItemButton from "@/components/general/NewItemButton";
import useRestaurant from "@/hooks/useRestaurant";
import { v4 as uuidv4 } from "uuid";

type DiscountGridProps = {
    className?: string;
}

const DiscountGrid: React.FC<DiscountGridProps> = () => {
    const { restaurants } = useRestaurant();
    const discounts = typeof restaurants !== "undefined" && typeof restaurants[0] !== "undefined" ? restaurants[0].discounts : null;

    return (
        <ul className="mb-2 mt-8 grid grid-cols-1 gap-6 divide-y md:grid-cols-2 lg:grid-cols-3">
            <NewItemButton
                className="h-full md:w-full"
                formType="discount"
                variant="secondary"
                text="Add A New Discount"
            />

            {discounts && discounts.toReversed().map((discount) => (
                <DiscountCard
                    key={uuidv4()}
                    discount={discount}
                />
            ))}
        </ul>
    );
};

export default DiscountGrid;