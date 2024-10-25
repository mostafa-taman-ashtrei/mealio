import ClassicTheme from "@/components/themes/classic";
import { MenuThemeType } from "@/types/theme";
import ModernTheme from "@/components/themes/modern";

const menuThemes: MenuThemeType[] = [
    {
        id: "modern",
        name: "Modern Layout",
        description: "Clean, modern design perfect for upscale restaurants",
        component: ModernTheme,
        previewUrl: "/previews/modern.png"
    },
    {
        id: "classic",
        name: "Classic Menu",
        description: "Traditional menu layout with elegant styling",
        component: ClassicTheme,
        previewUrl: "/previews/classic.png"
    }
];

export default menuThemes;