import ClassicTheme from "@/components/themes/classic";
import Logo from "@/assets/logos/logo.png";
import { MenuThemeType } from "@/types/theme";
import ModernTheme from "@/components/themes/modern";

export const themeRegistry = new Map<string, MenuThemeType>();

export const registerTheme = (theme: MenuThemeType) => themeRegistry.set(theme.id, theme);

export const getTheme = (id: string) => themeRegistry.get(id);


export const initializeThemes = () => {
    const themes: MenuThemeType[] = [
        {
            id: "modern",
            name: "Modern Layout",
            description: "Clean, modern design perfect for upscale restaurants",
            component: ModernTheme,
            previewUrl: Logo
        },
        {
            id: "classic",
            name: "Classic Menu",
            description: "Traditional menu layout with elegant styling",
            component: ClassicTheme,
            previewUrl: "/previews/classic.png"
        }
    ];

    themes.forEach(theme => registerTheme(theme));
};
