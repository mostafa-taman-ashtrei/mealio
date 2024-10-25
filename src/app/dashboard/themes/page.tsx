"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { initializeThemes, themeRegistry } from "@/lib/themes/themeRegistry";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MenuWithItems } from "@/types/restaurant";
import assignMenuTheme from "@/services/menu/assignMenuTheme";
import { toast } from "@/hooks/use-toast";
import useRestaurant from "@/hooks/useRestaurant";
import { useRouter } from "next/navigation";

const ThemeGallery = () => {
    const { restaurants, updateMenuTheme } = useRestaurant();
    const router = useRouter();

    const [selectedMenu, setSelectedMenu] = useState<MenuWithItems | null>(null);
    const mainRestaurant = restaurants?.[0];

    useEffect(() => { initializeThemes(); }, []);

    const handleThemeSelect = async (themeId: string) => {
        if (!selectedMenu || !mainRestaurant) {
            toast({ title: "Please select a menu first" });
            return;
        }

        const { status } = await assignMenuTheme(selectedMenu.id, themeId);

        if (status === 200) {
            updateMenuTheme(mainRestaurant.id, selectedMenu.id, themeId);
            toast({ title: "Theme updated successfully" });
        }
    };

    const handleThemePreview = (url: string) => router.push(url);


    if (!mainRestaurant) return null;


    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Theme Gallery</h1>

            <Select
                onValueChange={(menuId: string) => {
                    const menu = mainRestaurant.menus.find(m => m.id === menuId);
                    setSelectedMenu(menu || null);
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a menu" />
                </SelectTrigger>
                <SelectContent>
                    {mainRestaurant.menus.map(menu => (
                        <SelectItem key={menu.id} value={menu.id}>
                            {menu.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {Array.from(themeRegistry.values()).map(theme => (
                    <Card key={theme.id}>
                        <CardHeader>
                            <CardTitle>{theme.name}</CardTitle>
                            <CardDescription>{theme.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={theme.previewUrl}
                                alt={theme.name}
                                className="w-full h-48 object-cover rounded-lg"
                                width={500}
                                height={500}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                variant="outline"
                                onClick={() => handleThemePreview(`/preview/${theme.id}?menuId=${selectedMenu?.id}`)}
                                disabled={!selectedMenu}
                            >
                                Preview
                            </Button>
                            <Button
                                onClick={() => handleThemeSelect(theme.id)}
                                disabled={!selectedMenu}
                            >
                                Use Theme
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ThemeGallery;