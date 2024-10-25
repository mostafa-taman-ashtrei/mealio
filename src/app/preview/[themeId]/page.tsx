"use client";

import { Eye } from "lucide-react";
import useMenuTheme from "@/hooks/useMenuTheme";
import useRestaurant from "@/hooks/useRestaurant";
import { useSearchParams } from "next/navigation";

const PreviewPage = ({ params }: { params: { themeId: string } }) => {
    const searchParams = useSearchParams();
    const { restaurants } = useRestaurant();
    const { getTheme } = useMenuTheme();

    const menuId = searchParams.get("menuId");

    const mainRestaurant = typeof restaurants !== "undefined" && typeof restaurants[0] !== "undefined" ? restaurants[0] : null;
    const selectedTheme = getTheme(params.themeId);
    const selectedMenu = mainRestaurant ? mainRestaurant.menus.find(m => m.id === menuId) : null;

    console.log(selectedTheme);
    if (!selectedTheme || !selectedMenu) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Theme or Menu not found</h1>
            </div>
        );
    }

    const ThemeComponent = selectedTheme.component;

    return (
        <div className="min-h-screen">
            <div className="bg-primary/10 p-1 flex flex-row items-center justify-center gap-2">
                <Eye />
                <h1 className="text-xl text-center flex flex-row items-center justify-center gap-2">
                    <span>Previewing</span>
                    <span className="text-primary underline">{selectedTheme.name}</span>
                </h1>
            </div>

            <ThemeComponent menu={selectedMenu} />
        </div>
    );
};

export default PreviewPage;
