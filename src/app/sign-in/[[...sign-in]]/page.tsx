"use client";

import { SignIn as ClerkSignUp } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "@/assets/logos/logo.png";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignIn: React.FC = () => {
    const { resolvedTheme } = useTheme();
    const clerkTheme = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;

    return (
        <section className="p-6">
            <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
                <div className="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 ">
                    <ClerkSignUp appearance={clerkTheme} fallbackRedirectUrl="/dashboard" />
                </div>

                <div className="object-cover w-full rounded-md xl:col-span-3">
                    <Image
                        src={Logo}
                        width={1000}
                        height={1000}
                        alt="login image"
                    />
                </div>
            </div>
        </section>
    );
};

export default SignIn;