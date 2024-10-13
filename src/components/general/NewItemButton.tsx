import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type NewMenuButtonProps = {
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    text: string;
}

const NewItemButton: React.FC<NewMenuButtonProps> = ({ className, variant, text }) => {
    return (
        <Dialog>
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

                <h2>{text}</h2>
            </DialogContent>
        </Dialog>
    );
};

export default NewItemButton;