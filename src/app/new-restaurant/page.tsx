import NewRestaurantForm from "./components/NewRestaurantForm";
import { Separator } from "@/components/ui/separator";

const NewRestaurant: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 items-center">
            <div className="lg:col-span-2 md:col-span-2 max-w-2xl w-full p-6 mx-auto">
                <div className="col-span-2 my-4 w-full space-y-2">
                    <div>
                        <h3 className="text-2xl font-medium">Restaurant Info</h3>
                    </div>

                    <Separator />
                </div>

                <NewRestaurantForm />
            </div>

            <div className="hidden md:flex flex-col justify-center rounded-md rounded-r-none space-y-16 md:h-screen max-md:mt-16 min-h-full bg-primary lg:px-8 px-4 py-4">
                <div>
                    <h4 className="text-white text-lg font-semibold">Your Restaurant</h4>
                    <p className="text-[13px] text-white mt-2">Tell us a little about your business.</p>
                </div>
                <div>
                    <h4 className="text-white text-lg font-semibold">Why Collect this information?</h4>
                    <p className="text-[13px] text-white mt-2">
                        This information will be used to help us verify your identity and to provide you with the best possible experience.
                    </p>
                </div>
                <div>
                    <h4 className="text-white text-lg font-semibold">You can always change it later</h4>
                    <p className="text-[13px] text-white mt-2">
                        You can always change your information later in your settings.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewRestaurant;