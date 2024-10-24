"use client";

import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Pen } from "lucide-react";
import UpdateDiscountSchema, { UpdateDiscountSchemaType } from "@/schemas/UpdateDiscountSchema";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/general/DatePicker";
import { Discount } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { devLog } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import updateDiscount from "@/services/discounts/updateDiscount";
import { useForm } from "react-hook-form";
import useRestaurant from "@/hooks/useRestaurant";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateDiscountFromProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setIsUpdating: Dispatch<SetStateAction<boolean>>;
    discount: Discount;
};

const UpdateDiscountFrom: React.FC<UpdateDiscountFromProps> = ({ discount, setOpenModal, setIsUpdating }) => {
    const { restaurants, updateDiscountWithItems } = useRestaurant();

    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;
    const allItems = restaurants.flatMap(restaurant => restaurant.menus?.flatMap(menu => menu.menuItems || []) || []);


    const linkedItemIds = mainRestaurant
        ? mainRestaurant.menus.flatMap(menu => menu.menuItems.filter(item =>
            item.discounts.some(currentDiscount => currentDiscount.id === discount.id))).map(item => item.id)
        : [];

    const form = useForm<UpdateDiscountSchemaType>({
        resolver: zodResolver(UpdateDiscountSchema),
        defaultValues: {
            name: discount.name,
            description: discount.description || "",
            type: discount.type,
            startDate: discount.startDate,
            endDate: discount.endDate,
            value: discount.value,
            menuItems: linkedItemIds
        }
    });



    const loading = form.formState.isSubmitting;

    const onSubmit = async (values: UpdateDiscountSchemaType) => {
        try {
            if (!restaurants || restaurants.length < 0 || mainRestaurant === null) return toast({ title: "Something Went Wrong!", variant: "destructive" });

            const mainRestaurantId = restaurants[0].id;
            const { name, description, type, startDate, endDate, menuItems, value } = values;


            const itemsToAdd = menuItems.filter(id => !linkedItemIds.includes(id));
            const itemsToRemove = linkedItemIds.filter(id => !menuItems.includes(id));

            const { data, error, status } = await updateDiscount(
                discount.id,
                {
                    name,
                    description,
                    type,
                    restaurant: mainRestaurantId,
                    menuItems: itemsToAdd,
                    value,
                    startDate,
                    endDate,
                    removedItems: itemsToRemove,
                }
            );


            if (status === 500 || error) return toast({ title: "Failed to updated discount" });

            if (status === 200) {
                toast({ title: `${discount.name} updated successfully` });
                updateDiscountWithItems(mainRestaurant.id, discount.id, data);

                setOpenModal(false);
                setIsUpdating(false);
            }

        } catch (error) {
            devLog(error, "error");
            throw new Error("Failed to updated discount");
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
                                Updating Discount
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-center gap-1">
                            <Pen className="h-5 w-5 text-primary" />
                            <p>Update</p>
                        </div>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default UpdateDiscountFrom;