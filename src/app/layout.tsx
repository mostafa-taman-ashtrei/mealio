import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import NavBar from "@/components/nav/Navbar";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { Toaster } from "sonner";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mealio",
  description: "Homede meals delivered to your door",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextThemeProvider>
            <NavBar />
            {children}
            <Toaster />
          </NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;