"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Trash, Wand2 } from "lucide-react";
import NewItemFormSchama, { NewItemFormSchamaType } from "@/schemas/NewItemFromSchema";

import { Button } from "@/components/ui/button";
import { FileRejection } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import UploadDropZone from "@/components/general/UploadDropZone";
import createNewMenuItem from "@/services/menu/createNewMenuItem";
import { devLog } from "@/lib/utils";
import { toast as soonerToast } from "sonner";
import { toast } from "@/hooks/use-toast";
import uploadImagesToCloudinary from "@/services/upload/uploadImage";
import { useForm } from "react-hook-form";
import useRestaurant from "@/hooks/useRestaurant";
import { zodResolver } from "@hookform/resolvers/zod";

type NewItemFormProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const NewItemForm: React.FC<NewItemFormProps> = ({ setOpenModal }) => {
    const { addMenuItem, restaurants } = useRestaurant();
    const [isUploading, setIsUploading] = useState(false);

    const menus = restaurants[0].menus;
    const restaurantId = restaurants[0].id;

    const form = useForm<NewItemFormSchamaType>({
        resolver: zodResolver(NewItemFormSchama),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            price: 0,
            menu: menus && menus.length > 0 ? menus[0].id : "",
        }
    });

    const loading = form.formState.isSubmitting;


    const uploadImages = async (files: File[]) => {
        setIsUploading(true);

        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("images", file);
            });

            const res = await uploadImagesToCloudinary(formData);
            const { data, error, status } = res;

            if (status === 500 || error) throw new Error("Failed to upload images");
            if (!data.results && !Array.isArray(data.results)) throw new Error("Failed To Upload Images");

            return data;
        } catch (error) {
            devLog(error, "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDropUpload = async (files: File[]) => {
        const currentImages = form.getValues("images");
        const newImages = [...files];
        const totalImages = [...currentImages, ...newImages];

        if (totalImages.length > 3) {
            // If we have more than 3 images, keep only the newest ones
            const updatedImages = totalImages.slice(-3);
            form.setValue("images", updatedImages);
        } else {
            // If we have 3 or fewer images, add all new ones
            form.setValue("images", totalImages);
        }
    };

    const handleDropRemove = (file: File) => {
        const currentImages = form.getValues("images");
        const updatedImages = currentImages.filter(
            (image) => image !== file
        );
        form.setValue("images", updatedImages);
    };

    const handleDropError = (fileRejections: FileRejection[]) => {
        fileRejections.forEach((rejection) => {
            rejection.errors.forEach((error) => {
                soonerToast(
                    `File ${rejection.file.name} error: ${error.message}`,
                    {
                        duration: 2000,
                        description: "Please try again",
                        className: "dark:bg-black dark:text-primary"

                    }
                );
            });
        });

        setIsUploading(false);
        return;
    };


    const onSubmit = async (values: NewItemFormSchamaType) => {
        try {
            const { images, menu, name, price, description } = values;
            const cloudinaryImages = await uploadImages(images);

            if (!cloudinaryImages || cloudinaryImages.results.length < 0) return toast({ title: "Something Went Wrong!", variant: "destructive" });

            const imageUrls = cloudinaryImages.results.map((image) => image.secure_url);

            const { data, error, status } = await createNewMenuItem(
                menu,
                { name, description: description || null, price, imageUrls }
            );


            if (status === 500 || error) return toast({ title: "Failed to create menu item", variant: "destructive" });

            if (status === 201) {
                toast({ title: `${data.name} created successfully` });
                addMenuItem(restaurantId, menu, data);
                setOpenModal(false);
            }

        } catch (error) {
            devLog(error, "error");
            throw new Error("Failed to create menu");
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Images</FormLabel>
                                <FormMessage />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {
                                    field.value.map((image) => (
                                        <div key={image.name} className="relative">
                                            <Image
                                                src={URL.createObjectURL(image)}
                                                alt={`Uploaded image ${image.name}`}
                                                className="w-full h-14 object-cover rounded-md"
                                                height={500}
                                                width={500}
                                            />

                                            <Button
                                                type="button"
                                                size="icon"
                                                onClick={() => handleDropRemove(image)}
                                                className="absolute w-8 h-8 top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                            >
                                                <Trash />
                                            </Button>
                                        </div>
                                    ))
                                }
                            </div>

                            <UploadDropZone
                                handleError={handleDropError}
                                handleUpload={handleDropUpload}
                                isUploading={isUploading}
                                maxDocumentSize={2 * 1024 * 1024}
                                multiple
                                className="h-56"
                            />
                        </FormItem>
                    )}
                />



                <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
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
                                    <Input
                                        disabled={loading}
                                        placeholder="Hamburger ..."
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <div className="flex flex-row items-center justify-start gap-4">
                                    <FormLabel>Price</FormLabel>
                                    <FormMessage />
                                </div>

                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="Item Price" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="menu"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Menu</FormLabel>
                                <FormMessage />
                            </div>


                            <FormControl>
                                <div className="flex overflow-x-auto space-x-2 p-2 max-w-md">
                                    {menus.map((menu, index) => (
                                        <div key={menu.id} className={`flex-none ${index >= 2 ? "ml-2" : ""}`}>
                                            <Toggle
                                                disabled={loading}
                                                pressed={field.value === menu.id}
                                                onPressedChange={() => field.onChange(menu.id)}
                                                className="flex flex-col items-center justify-between rounded-full border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary"
                                            >
                                                {menu.name}
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
                                    disabled={loading}
                                    placeholder="Tell us a little bit about this item ..."
                                    rows={2}
                                    className="resize-none"
                                    {...field}
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
                                Creating Menu Item
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

export default NewItemForm;