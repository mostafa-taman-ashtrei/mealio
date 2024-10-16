"use client";

import Image from "next/image";
import Logo from "@/assets/logos/logo.png";
import getUserData from "@/services/user/getUserData";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const OnBoarding: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();



    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const { user, error, status } = await getUserData();

                if (status === 401) return router.push("/sign-in");
                if (error) return toast({
                    title: "Something Went Wrong!",
                    description: "Please try again later.",
                });

                if (user && user.restaurants.length === 0 || !user) router.push("/new-restaurant");
                else router.push("/dashboard");

            } catch {
                throw new Error("Failed to check user status");
            }
        };

        checkUserStatus();
    }, [router, toast]);


    return (
        <div className="flex items-center justify-center h-screen">
            <Image
                src={Logo}
                width={1000}
                height={1000}
                alt="Logo"
                className="w-64 h-64 animate-bounce"
            />
        </div>
    );
};

export default OnBoarding;
