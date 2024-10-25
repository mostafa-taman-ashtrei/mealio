"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Eye, Loader, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Container from "@/components/general/Container";
import Image from "next/image";
import { MenuWithItems } from "@/types/restaurant";
import PageTitle from "@/components/general/PageTitle";
import { Toggle } from "@/components/ui/toggle";
import assignMenuTheme from "@/services/menu/assignMenuTheme";
import { devLog } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import useMenuTheme from "@/hooks/useMenuTheme";
import useRestaurant from "@/hooks/useRestaurant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ThemeGallery = () => {
    const { restaurants, updateMenuTheme } = useRestaurant();
    const router = useRouter();
    const { themes, selectedMenuId, setSelectedMenu: setMenuState } = useMenuTheme();

    const mainRestaurant = restaurants?.[0];
    const defaultMenu = mainRestaurant?.menus.find(m => m.id === selectedMenuId);


    const [selectedMenu, setSelectedMenu] = useState<MenuWithItems | null>(defaultMenu ? defaultMenu : null);
    const [loading, setIsLoading] = useState<string | null>(null);




    const handleThemeSelect = async (themeId: string) => {
        try {
            setIsLoading(themeId);
            if (!selectedMenu || !mainRestaurant) {
                toast({ title: "Please select a menu first" });
                return;
            }

            const { status } = await assignMenuTheme(selectedMenu.id, themeId);

            if (status === 200) {
                updateMenuTheme(mainRestaurant.id, selectedMenu.id, themeId);
                toast({ title: "Theme updated successfully" });
            }
        } catch (error) {
            devLog(error, "error");
        } finally {
            setIsLoading(null);
        }

    };

    const handleThemePreview = (url: string) => router.push(url);

    const handleMenuChange = (newMenu: MenuWithItems) => {
        setSelectedMenu(newMenu);
        setMenuState(newMenu.id);
    };


    if (!mainRestaurant) return null;


    return (
        <Container>
            <PageTitle text="Theme Gallery" />

            <div className="container mx-auto py-2">
                <h2 className="text-base mb-1">Select A Menu</h2>

                <div className="flex overflow-x-auto space-x-2 p-2 max-w-md">
                    {mainRestaurant.menus.map((menu) => (
                        <Toggle
                            key={uuidv4()}
                            variant="outline"
                            pressed={selectedMenu?.id === menu.id}
                            onPressedChange={() => handleMenuChange(menu)}
                            className="flex flex-col w-full items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary"
                        >
                            <div className="flex flex-row items-center justify-center gap-2">
                                {selectedMenu?.id === menu.id && (
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                )}

                                {menu.name}
                            </div>
                        </Toggle>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {Array.from(themes.values()).map(theme => (
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
                        <CardFooter className="flex justify-between gap-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleThemePreview(`/preview/${theme.id}?menuId=${selectedMenu?.id}`)}
                                disabled={!selectedMenu}
                            >
                                <div className="flex flex-row items-center justify-center gap-2">
                                    <Eye className="h-5 w-5 text-primary" />
                                    <p>Preview</p>
                                </div>
                            </Button>
                            <Button
                                onClick={() => handleThemeSelect(theme.id)}
                                disabled={!selectedMenu || loading === theme.id}
                                variant="secondary"
                                className="w-full"
                            >
                                {loading === theme.id ? (
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <Loader className="animate-spin text-primary" />
                                        <p className="animate-pulse">
                                            Setting Theme
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <Wand2 className="h-5 w-5 text-primary" />
                                        <p>Use Theme</p>
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ThemeGallery;