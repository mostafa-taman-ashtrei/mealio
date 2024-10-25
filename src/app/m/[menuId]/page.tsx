"use client";

import { initializeThemes, themeRegistry } from "@/lib/themes/themeRegistry";
import { useEffect, useState } from "react";

import { MenuThemeType } from "@/types/theme";
import { MenuWithItems } from "@/types/restaurant";
import getMenuData from "@/services/menu/getMenuData";
import { useRouter } from "next/navigation";

const MenuRedirect = ({ params }: { params: { menuId: string } }) => {
    const router = useRouter();

    const [selectedMenu, setSelectedMenu] = useState<MenuWithItems | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<MenuThemeType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const redirect = async () => {
            const { data, status, error } = await getMenuData(params.menuId);

            if (status === 500 || error) router.push("/dashboard");
            if (status === 200) {
                const { themeId } = data;
                if (!themeId) return router.push("/dashboard");

                setSelectedMenu(data);
                setSelectedTheme(themeRegistry.get(themeId) || null);
            }

            setLoading(false);
        };

        initializeThemes();
        redirect();
    }, [params.menuId, router]);



    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
        </div>
    );

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