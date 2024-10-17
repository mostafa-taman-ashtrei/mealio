import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));


export const devLog = (log: unknown, type: "log" | "error") => {
  const isDevelopment = process.env.NODE_ENV === "development";
  if (!isDevelopment) return;

  if (type === "log") {
    // eslint-disable-next-line no-console
    console.log(log);
  } else if (type === "error") {
    // eslint-disable-next-line no-console
    console.error(log);
  }
};
