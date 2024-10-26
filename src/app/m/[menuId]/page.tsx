"use client";

import { useEffect, useState } from "react";

import { MenuThemeType } from "@/types/theme";
import { MenuWithItems } from "@/types/restaurant";
import ThemeSkeleton from "@/components/skeletons/ThemeSkeleton";
import getMenuData from "@/services/menu/getMenuData";
import trackUrlViews from "@/services/analytics/trackUrlViews";
import useMenuTheme from "@/hooks/useMenuTheme";
import { useRouter } from "next/navigation";

type MenuRedirectProps = {
    params: { menuId: string };
    searchParams: { qr_code?: string };
}

const MenuRedirect: React.FC<MenuRedirectProps> = ({ params, searchParams }) => {
    const router = useRouter();
    const { getTheme } = useMenuTheme();

    const [selectedMenu, setSelectedMenu] = useState<MenuWithItems | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<MenuThemeType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const redirect = async () => {
            const { data, status, error } = await getMenuData(params.menuId);

            await trackUrlViews(data.qrcode.id, searchParams.qr_code === "true");

            if (status === 500 || error) router.push("/dashboard");
            if (status === 200) {
                const { themeId } = data;
                if (!themeId) return router.push("/dashboard");

                setSelectedMenu(data);
                setSelectedTheme(getTheme(themeId) || null);
            }

            setLoading(false);
        };

        redirect();
    }, [getTheme, params.menuId, router, searchParams.qr_code]);


    if (loading) return <ThemeSkeleton />;

    if (selectedTheme === null || selectedMenu === null && !loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Theme or Menu not found</h1>
            </div>
        );
    }

    const ThemeComponent = selectedTheme.component;

    if (selectedMenu === null) return null;

    return <ThemeComponent menu={selectedMenu} />;
};

export default MenuRedirect;