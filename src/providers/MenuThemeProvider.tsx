"use client";

import { useEffect } from "react";
import useMenuTheme from "@/hooks/useMenuTheme";

type MenuThemeProviderProps = {
    children: React.ReactNode;
}

const MenuThemeProvider: React.FC<MenuThemeProviderProps> = ({ children }) => {
    const { initializeThemes } = useMenuTheme();

    useEffect(() => initializeThemes(), [])


    return children;
};

export default MenuThemeProvider;