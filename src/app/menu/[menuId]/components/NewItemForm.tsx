"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Trash, Wand2 } from "lucide-react";
import NewItemFormSchama, { NewItemFormSchamaType } from "@/schemas/NewItemFromSchema";

import { Button } from "@/components/ui/button";
import { FileRejection } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadDropZone from "@/components/general/UploadDropZone";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const NewItemForm: React.FC = () => {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<NewItemFormSchamaType>({
        resolver: zodResolver(NewItemFormSchama),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            price: 0
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

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload images");

            const data = await response.json();

            if (!data.results && !Array.isArray(data.results)) throw new Error("Failed To Upload Images");

            return data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error uploading images:", error);
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
                toast(
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
        console.log(values);

        const { images } = values;
        await uploadImages(images);

    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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