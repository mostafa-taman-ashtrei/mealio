import useRestaurant from "@/hooks/useRestaurant";

const PageGrid = () => {
    const { restaurants } = useRestaurant();
    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;


    if (!mainRestaurant) return null;

    const stats = {
        totalMenus: restaurants?.reduce((acc, r) => acc + r.menus.length, 0) || 0,
        totalDiscounts: mainRestaurant.discounts?.length || 0,
        totalItems: restaurants?.reduce((acc, r) =>
            acc + r.menus.reduce((menuAcc, m) =>
                menuAcc + m.menuItems.length, 0
            ), 0
        ) || 0,
        totalQrCodes: restaurants?.reduce((acc, r) =>
            acc + r.menus.reduce((menuAcc, m) =>
                menuAcc + (m.qrcode ? 1 : 0), 0
            ), 0
        ) || 0,
        activeDiscounts: mainRestaurant.discounts?.filter(d => d.isActive).length || 0
    };

    return (
        <dl className="my-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">Menus Created</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">{stats.totalMenus}</dd>
            </div>
            <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">Menu Items Created</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">{stats.totalItems}</dd>
            </div>
            <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">Active Discounts</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">{stats.activeDiscounts}</dd>
            </div>
            <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">Generated Qr Codes</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">{stats.totalQrCodes}</dd>
            </div>
        </dl>
    );
};
export default PageGrid;