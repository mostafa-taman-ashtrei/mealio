"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/general/Loader";
import { devLog } from "@/lib/utils";
import getUserData from "@/services/user/getUserData";
import { useAuth } from "@clerk/nextjs";
import useRestaurant from "@/hooks/useRestaurant";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const { setRestaurants, clearData } = useRestaurant();
    const [justSignedIn, setJustSignedIn] = useState(false);


    useEffect(() => {
        if (!isLoaded) return;

        if (isSignedIn && !justSignedIn) {
            setJustSignedIn(true);
        } else if (!isSignedIn) {
            setJustSignedIn(false);
        }
    }, [isSignedIn, isLoaded]);

    useEffect(() => {
        const checkUserStatus = async () => {
            if (isLoaded && isSignedIn) {
                try {
                    const { user, error, status } = await getUserData();

                    if (status === 401) return router.push("/sign-in");

                    if (error) return toast({
                        title: "Something Went Wrong!",
                        description: "Please try again later.",
                    });

                    if (user && user.restaurants.length === 0 || !user) router.push("/new-restaurant");
                    else {
                        setRestaurants(user.restaurants);
                        // setMenus(user.restaurants[0].menus);
                        if (justSignedIn) router.push("/dashboard");
                    }

                } catch (error) {
                    devLog(`Failed to check user status ${error}`, "log");
                    throw new Error("Failed to check user status");
                }
            } else clearData();
        };

        checkUserStatus();
    }, [isLoaded, isSignedIn, router, toast]);

    if (!isLoaded) return <Loader />;

    return <>{children}</>;
};

export default AuthWrapper;