const createNavRoutes = (activeString: string) => [
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

export default createNavRoutes;