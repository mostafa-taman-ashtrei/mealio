"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Wand2 } from "lucide-react";
import NewRestaurantFormSchama, { NewRestaurantFormSchamaType } from "@/schemas/NewRestaurantFormSchema";

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

const NewRestaurantForm: React.FC = () => {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<NewRestaurantFormSchamaType>({
        resolver: zodResolver(NewRestaurantFormSchama)
    });

    const loading = form.formState.isSubmitting;

    const handleDropUpload = async (file: File[]) => form.setValue("logoUrl", file[0]);

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


    const uploadLogo = async (file: File) => {
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("images", file);

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


    const onSubmit = async (values: NewRestaurantFormSchamaType) => {
        try {
            const { logoUrl, name, description } = values;
            const uploadedLogoUrl = await uploadLogo(logoUrl);
            console.log(uploadedLogoUrl, name, description);

        } catch {
            throw new Error("Failed to create restaurant");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <FormLabel>Logo</FormLabel>
                                <FormMessage />
                            </div>

                            {
                                field.value && typeof field.value && <Image
                                    src={URL.createObjectURL(field.value)}
                                    alt={`Uploaded image ${field.value.name}`}
                                    className="w-full h-32 aspect-square object-cover rounded-md"
                                    height={500}
                                    width={500}
                                />
                            }


                            <UploadDropZone
                                handleError={handleDropError}
                                handleUpload={handleDropUpload}
                                isUploading={isUploading}
                                maxDocumentSize={2 * 1024 * 1024}
                                multiple={false}
                            />
                        </FormItem>
                    )}
                />



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
                                <Input disabled={loading} placeholder="XYZ Food ..." {...field} />
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
                                    placeholder="Tell us a little about your restaurant ..."
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
                                Creating Restaurant
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

export default NewRestaurantForm;