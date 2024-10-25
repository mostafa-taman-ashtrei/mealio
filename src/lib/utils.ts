import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


export const devLog = (log: unknown, type: "log" | "error", env: "api" | "client" = "client") => {
  const isDevelopment = process.env.NODE_ENV === "development";
  if (!isDevelopment && env !== "api") return;

  if (type === "log") {
    // eslint-disable-next-line no-console
    console.log(log);
  } else if (type === "error") {
    // eslint-disable-next-line no-console
    console.error(log);
  }
};


export const getPublicIdFromUrl = (url: string): string => {
  const regex = /\/v\d+\/(.+)\.\w+$/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

export const generateDynamicMenuUrl = (menuId: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/m/${menuId}`;