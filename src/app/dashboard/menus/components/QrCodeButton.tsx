"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, QrCode } from "lucide-react";
import { devLog, generateDynamicMenuUrl } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MenuWithItems } from "@/types/restaurant";
import generateQRCode from "@/services/menu/generateQRCode";
import { toast } from "@/hooks/use-toast";
import useRestaurant from "@/hooks/useRestaurant";
import { useState } from "react";

type QrCodeButtonProps = {
    menu: MenuWithItems;
}

const QrCodeButton: React.FC<QrCodeButtonProps> = ({ menu }) => {
    const { restaurants, updateMenu } = useRestaurant();
    const [generatingQrCode, setGeneratingQrCode] = useState(false);

    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;

    const handleQrCode = async () => {
        try {
            setGeneratingQrCode(true);

            if (mainRestaurant === null || !mainRestaurant.logoUrl) return toast({ title: "Failed to generate qr code" });

            const hasTheme = menu.themeId !== null;

            if (!hasTheme) return toast({ title: "This menu doesn't have a theme yet" });

            const { data, error, status } = await generateQRCode(menu.id, generateDynamicMenuUrl(menu.id), mainRestaurant.logoUrl);

            if (status === 500 || error) return toast({ title: "Failed to generate qr code" });

            if (status === 200) {
                const updatedMenu = data.menu;
                updateMenu(mainRestaurant.id, menu.id, updatedMenu);

                toast({ title: `qr code for ${menu.name} generated successfully` });

            }

        } catch (error) {
            devLog(`Failed to generate qr code: ${error}`, "error");
        } finally {
            setGeneratingQrCode(false);
        }
    };




    if (!menu.qrcode || menu.qrcode === null) return <Button
        size="sm"
        variant="ghost"
        onClick={handleQrCode}
    >
        {
            generatingQrCode
                ? <Loader className="animate-spin text-primary" />
                : <QrCode className="h-4 w-4" />
        }

    </Button>;


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex w-full flex-row items-center justify-center gap-2 md:w-1/2"
                    size="sm"
                    variant="ghost"
                >
                    <QrCode />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{menu.name} QR Code</DialogTitle>
                </DialogHeader>

                <Image
                    alt={`${menu.name} QR Code`}
                    src={menu.qrcode.codeUrl}
                    width={500}
                    height={500}
                />
            </DialogContent>
        </Dialog>
    );
};

export default QrCodeButton;