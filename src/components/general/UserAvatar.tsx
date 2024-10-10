"use client";

import React from "react";
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
        />
    );
};

export default UserAvatar;