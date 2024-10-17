const createNavRoutes = (activeString: string, isSignedIn: boolean) => {
    if (isSignedIn) return [
        {
            href: "/dashboard/restaurants",
            label: "Restaurants",
            active: activeString === "/dashboard/restaurants",
        },
        {
            href: "/dashboard/menus",
            label: "Menus",
            active: activeString === "/dashboard/menus",
        },
        {
            href: "/dashboard/discounts",
            label: "Discounts",
            active: activeString === "/dashboard/discounts",
        },
    ];

    return [
        {
            href: "/#pricing",
            label: "Pricing",
            active: activeString === "/pricing",
        },
        {
            href: "/#about",
            label: "About Us",
            active: activeString === "about",
        },
        {
            href: "/#services",
            label: "Services",
            active: activeString === "services",
        },
    ];
};
export default createNavRoutes;