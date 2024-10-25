import "./globals.css";

import AuthWrapper from "@/components/general/AuthWrapper";
import { ClerkProvider } from "@clerk/nextjs";
import MenuThemeProvider from "@/providers/MenuThemeProvider";
import type { Metadata } from "next";
import NavBar from "@/components/nav/Navbar";
import NextThemeProvider from "@/providers/NextThemeProvider";
import { Toaster as SoonerToaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";
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
            <AuthWrapper>
              <MenuThemeProvider>
                <NavBar />
                {children}
                <SoonerToaster />
                <Toaster />
              </MenuThemeProvider>
            </AuthWrapper>
          </NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;