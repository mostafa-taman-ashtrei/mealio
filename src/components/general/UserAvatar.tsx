"use client";

import { BookOpenText, LayoutDashboard } from "lucide-react";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserAvatar = () => {
    const { resolvedTheme } = useTheme();
    const clerkTheme = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;

    return (
        <UserButton
            userProfileProps={{ appearance: clerkTheme }}
            appearance={clerkTheme}
        >
            <UserButton.MenuItems>
                <UserButton.Link label="Dashboard" labelIcon={<LayoutDashboard size={17} />} href="/dashboard" />
            </UserButton.MenuItems>

            <UserButton.MenuItems>
                <UserButton.Link label="My Menus" labelIcon={<BookOpenText size={17} />} href="/dashboard/menus" />
            </UserButton.MenuItems>
        </UserButton>
    );
};

export default UserAvatar;