"use client";

import { Button } from "../ui/button";
import HoverLink from "@/components/general/HoverLink";
import Link from "next/link";
import MobileNavbar from "@/components/nav/MobileNavbar";
import ThemeTogglerButton from "./ThemeToggle";
import { cn } from "@/lib/utils";
import createNavRoutes from "./NavRoutes";
import { usePathname } from "next/navigation";

const NavRoutes: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
    const pathname = usePathname();
    const routes = createNavRoutes(pathname);

    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <div className="relative pt-6 pb-16 sm:pb-24">
                <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                    <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                        M
                    </div>

                    <MobileNavbar />

                    <div className="hidden md:flex md:space-x-10 list-none">
                        {routes.map((route) => (
                            <HoverLink key={route.href}>
                                <Link
                                    href={route.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        route.active ? "text-orange-500" : "text-muted-foreground"
                                    )}
                                >
                                    {route.label}
                                </Link>
                            </HoverLink>

                        ))}
                    </div>

                    <div className="hidden gap-5 md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                        <Button className="rounded-full">Get Started</Button>
                        <ThemeTogglerButton />
                    </div>
                </nav>
            </div>
        </div>

    );
};

export default NavRoutes;