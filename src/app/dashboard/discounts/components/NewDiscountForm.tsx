import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Wand2 } from "lucide-react";
import NewDiscountSchema, { NewDiscountSchemaType } from "@/schemas/NewDiscountFormSchema";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/general/DatePicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import createNewDiscount from "@/services/discounts/createNewDiscount";
import { devLog } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import useRestaurant from "@/hooks/useRestaurant";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";

type NewDiscountFormProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const NewDiscountForm: React.FC<NewDiscountFormProps> = ({ setOpenModal }) => {
    const { restaurants, addMenuItemDiscount, addRestaurantDiscount } = useRestaurant();
    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;
    const allItems = restaurants.flatMap(restaurant => restaurant.menus?.flatMap(menu => menu.menuItems || []) || []);


    const form = useForm<NewDiscountSchemaType>({
        resolver: zodResolver(NewDiscountSchema),
        defaultValues: {
            name: "",
            type: "PERCENTAGE",
            restaurant: mainRestaurant?.id || "",
            menuItems: [],
            value: 0,
            description: "",
            startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        }
    });


    const loading = form.formState.isSubmitting;

    const onSubmit = async (values: NewDiscountSchemaType) => {
        try {
            if (!restaurants || restaurants.length < 0 || mainRestaurant === null) return toast({ title: "Something Went Wrong!", variant: "destructive" });

            const mainRestaurantId = restaurants[0].id;
            const { name, description, type, startDate, endDate, menuItems, value } = values;


            const { data, error, status } = await createNewDiscount({
                name,
                description,
                type,
                restaurant: mainRestaurantId,
                menuItems,
                value,
                startDate,
                endDate,
            });


            if (status === 500 || error) return toast({ title: "Failed to create discount" });

            if (status === 201) {
                toast({ title: "Discount created successfully" });
                addRestaurantDiscount(mainRestaurant.id, data);
                addMenuItemDiscount(mainRestaurant.id, menuItems, data);
                setOpenModal(false);
            }

        } catch (error) {
            devLog(error, "error");
            throw new Error("Failed to create menu");
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <div className="flex flex-row gap-3 items-center w-full">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <div className="flex flex-row items-center justify-start gap-4">
                                    <FormLabel>Name</FormLabel>
                                    <FormMessage />
                                </div>

                                <FormControl>
                                    <Input disabled={loading} placeholder="Christmas Special ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <div className="flex flex-row items-center justify-start gap-4">
                                    <FormLabel>value</FormLabel>
                                    <FormMessage />
                                </div>

                                <FormControl>
                                    <Input disabled={loading} placeholder="Breakfast Menu ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>


                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Type</FormLabel>
                                <FormMessage />
                            </div>


                            <FormControl>
                                <div className="flex overflow-x-auto space-x-2 p-2 max-w-md">


                                    <Toggle
                                        disabled={loading}
                                        pressed={field.value === "PERCENTAGE"}
                                        onPressedChange={() => field.onChange("PERCENTAGE")}
                                        className="flex w-full flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary"
                                    >
                                        PERCENTAGE
                                    </Toggle>

                                    <Toggle
                                        disabled={loading}
                                        pressed={field.value === "FIXED"}
                                        onPressedChange={() => field.onChange("FIXED")}
                                        className="flex w-full flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary"
                                    >
                                        FIXED
                                    </Toggle>

                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-row gap-3 items-center w-full">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="w-full">

                                <div className="flex flex-row items-center justify-start gap-4">
                                    <FormLabel>start Date</FormLabel>
                                    <FormMessage />
                                </div>

                                <FormControl>
                                    <DatePicker
                                        {...field}
                                        date={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <div className="flex flex-row items-center justify-start gap-4">
                                    <FormLabel>end Date</FormLabel>
                                    <FormMessage />
                                </div>

                                <FormControl>
                                    <DatePicker
                                        {...field}
                                        date={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>





                <FormField
                    control={form.control}
                    name="menuItems"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Menu</FormLabel>
                                <FormMessage />
                            </div>


                            <FormControl>
                                <div className="flex overflow-x-auto space-x-2 p-2 max-w-md">
                                    {allItems.map((item, index) => (
                                        <div key={uuidv4()} className={`flex-none ${index >= 2 ? "ml-2" : ""}`}>
                                            <Toggle
                                                disabled={loading}
                                                pressed={field.value.includes(item.id)}
                                                onPressedChange={() => field.value.includes(item.id) ? field.onChange(field.value.filter((id) => id !== item.id)) : field.onChange([...field.value, item.id])}
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary"
                                            >
                                                {item.name}
                                            </Toggle>
                                        </div>
                                    ))}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Description</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Textarea
                                    {...field}
                                    disabled={loading}
                                    rows={2}
                                    className="resize-none"
                                    placeholder="Tell us a little about this menu ..."
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />


                <Button disabled={loading} className="ml-auto w-full" type="submit" variant="secondary">
                    {loading ? (
                        <div className="flex flex-row items-center justify-center gap-1">
                            <Loader className="animate-spin text-primary" />
                            <p className="animate-pulse">
                                Creating Discount
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-center gap-1">
                            <Wand2 className="h-5 w-5 text-primary" />
                            <p>Create</p>
                        </div>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default NewDiscountForm;