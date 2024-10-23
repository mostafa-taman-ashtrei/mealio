"use client";

import Container from "@/components/general/Container";
import DiscountGrid from "./components/DiscountGrid";
import PageTitle from "@/components/general/PageTitle";

const DiscountsPage: React.FC = () => {
    return (
        <Container>
            <PageTitle text="Your Discounts" />

            <div className="flex flex-col justify-center py-4">
                <DiscountGrid />
            </div>
        </Container>
    );
};

export default DiscountsPage;