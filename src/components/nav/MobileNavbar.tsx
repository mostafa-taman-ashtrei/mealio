"use client";

import { Menu, XIcon } from "lucide-react";

import HoverLink from "../general/HoverLink";
import Link from "next/link";
import ThemeTogglerButton from "./ThemeToggle";
import { cn } from "@/lib/utils";
import createNavRoutes from "./NavRoutes";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNavbar: React.FC = () => {
    const { isSignedIn } = useAuth();
    const [isOpen, setOpen] = useState<boolean>(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    const pathname = usePathname();
    const routes = createNavRoutes(pathname, isSignedIn ? isSignedIn : false);

    return (
        <div className="sm:hidden">
            {isOpen ? (
                <XIcon
                    onClick={toggleOpen}
                    className="relative z-50 h-5 w-5 cursor-pointer text-zinc-500"
                />
            ) : (
                <Menu
                    onClick={toggleOpen}
                    className="relative z-50 h-5 w-5 cursor-pointer text-zinc-700"
                />
            )}

            {isOpen && (
                <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
                    <div className="absolute bg-opacity-100 grid w-full gap-3 bg-white px-10 pb-8 pt-20 shadow-xl dark:bg-black">

                        {routes.map((route) => (
                            <HoverLink key={route.href}>
                                <Link
                                    href={route.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                                    )}
                                >
                                    {route.label}
                                </Link>
                            </HoverLink>
                        ))}
                        <ThemeTogglerButton />

                    </div>

                </div>
            )}
        </div>
    );
};

export default MobileNavbar;