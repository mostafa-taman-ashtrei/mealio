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
