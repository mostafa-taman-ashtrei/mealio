"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { NewFormType } from "@/types/ui";
import NewItemForm from "@/app/menu/[menuId]/components/NewItemForm";
import NewMenuForm from "@/app/dashboard/menus/components/NewMenuForm";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NewMenuButtonProps = {
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    text: string;
    formType: NewFormType;
}

const NewItemButton: React.FC<NewMenuButtonProps> = ({ className, variant, text, formType }) => {
    const [openModal, setOpenModal] = useState(false);
    const form = formType === "menu"
        ? <NewMenuForm setOpenModal={setOpenModal} />
        : <NewItemForm setOpenModal={setOpenModal} />;

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        "flex w-full flex-row items-center justify-center gap-2 md:w-1/2",
                        className
                    )}
                    variant={variant}
                >
                    <PlusCircle />
                    {text}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{text}</DialogTitle>
                </DialogHeader>

                {form}
            </DialogContent>
        </Dialog>
    );
};

export default NewItemButton;