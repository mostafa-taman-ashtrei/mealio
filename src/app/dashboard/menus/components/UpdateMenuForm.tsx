"use client";

import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Pen } from "lucide-react";
import UpdateMenuFormSchema, { UpdateMenuFormSchemaType } from "@/schemas/UpdateMenuFromSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuWithItems } from "@/types/restaurant";
import { Textarea } from "@/components/ui/textarea";
import { devLog } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import updateMenu from "@/services/menu/updateMenu";
import { useForm } from "react-hook-form";
import useRestaurant from "@/hooks/useRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateFormProps = {
    menu: MenuWithItems;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const UpdateMenuForm: React.FC<UpdateFormProps> = ({ menu, setOpenModal }) => {
    const { updateMenu: updateMenuState } = useRestaurant();

    const form = useForm<UpdateMenuFormSchemaType>({
        resolver: zodResolver(UpdateMenuFormSchema),
        defaultValues: {
            name: menu.name,
            description: menu.description || "",
        }
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (values: UpdateMenuFormSchemaType) => {
        try {
            const { name, description } = values;
            const { data, error, status } = await updateMenu(menu.id, { name, description: description || null });

            if (status === 500 || error) return toast({ title: "Failed to create restaurant" });

            if (status === 200) {
                toast({ title: `${menu.name} updated successfully` });
                updateMenuState(menu.restaurantId, data.id, data);
                setOpenModal(false);
            }

        } catch (error) {
            devLog(error, "error");
            throw new Error("Failed to update menu");
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Name</FormLabel>
                                <FormMessage />
                            </div>

                            <FormControl>
                                <Input disabled={loading} placeholder="Breakfast Menu ..." {...field} />
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
                                Updating Menu
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

export default UpdateMenuForm;