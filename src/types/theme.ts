import { MenuWithItems } from "@/types/restaurant";
import { StaticImageData } from "next/image";

export interface MenuThemeType {
    id: string;
    name: string;
    description: string;
    component: React.FC<{ menu: MenuWithItems }>;
    previewUrl: string | StaticImageData;
}