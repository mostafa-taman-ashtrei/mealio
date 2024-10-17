"use client";

import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Wand2 } from "lucide-react";
import NewMenuFormSchema, { NewMenuFormSchemaType } from "@/schemas/NewMenuFormSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import createNewMenu from "@/services/menu/createNewMenu";
import { devLog } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import useMenu from "@/hooks/useMenu";
import useRestaurant from "@/hooks/useRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";

type NewMenuFormProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const NewMenuForm: React.FC<NewMenuFormProps> = ({ setOpenModal }) => {
    const { restaurants } = useRestaurant();
    const { addMenu } = useMenu();

    const form = useForm<NewMenuFormSchemaType>({
        resolver: zodResolver(NewMenuFormSchema),
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (values: NewMenuFormSchemaType) => {
        try {
            if (!restaurants || restaurants.length < 0) return toast({ title: "Something Went Wrong!", variant: "destructive" });


            const { name, description } = values;
            const mainRestaurantId = restaurants[0].id;

            const { data, error, status } = await createNewMenu(mainRestaurantId, { name, description: description || null });


            if (status === 500 || error) return toast({ title: "Failed to create restaurant" });

            if (status === 201) {
                toast({ title: "Restaurant created successfully" });
                addMenu(data);
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
                                Creating Menu
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

export default NewMenuForm;