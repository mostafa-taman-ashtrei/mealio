"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MenuWithItems } from "@/types/restaurant";
import { Pen } from "lucide-react";
import UpdateMenuForm from "./UpdateMenuForm";
import { cn } from "@/lib/utils";
import { useState } from "react";

type UpdateMenuButtonProps = {
    menu: MenuWithItems;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

const UpdateMenuButton: React.FC<UpdateMenuButtonProps> = ({ menu, className, variant }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className={cn(
                        "flex w-full flex-row items-center justify-center gap-2 md:w-1/2",
                        className
                    )}
                    variant={variant}
                >
                    <Pen />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update {menu.name}</DialogTitle>
                </DialogHeader>

                <UpdateMenuForm menu={menu} setOpenModal={setOpenModal} />
            </DialogContent>
        </Dialog>
    );
};

export default UpdateMenuButton;