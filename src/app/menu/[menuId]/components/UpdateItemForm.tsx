"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader, Trash, Wand2 } from "lucide-react";
import UpdateMenuItemFormSchama, { UpdateMenuItemFormSchamaType } from "@/schemas/UpdateItemFormSchama";

import { Button } from "@/components/ui/button";
import { FileRejection } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MenuItemWithImages } from "@/types/restaurant";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import UploadDropZone from "@/components/general/UploadDropZone";
import { devLog } from "@/lib/utils";
import { toast as soonerToast } from "sonner";
import { toast } from "@/hooks/use-toast";
import updateMenuItem from "@/services/menu/updateMenuItem";
import uploadImagesToCloudinary from "@/services/upload/uploadImage";
import { useForm } from "react-hook-form";
import useRestaurant from "@/hooks/useRestaurant";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateItemFormProps = {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setIsUpdating: Dispatch<SetStateAction<boolean>>;
    item: MenuItemWithImages;
}

const UpdateItemForm: React.FC<UpdateItemFormProps> = ({ item, setOpenModal, setIsUpdating }) => {
    const { restaurants, updateMenuItem: updateMenuItemState } = useRestaurant();
    const [isUploading, setIsUploading] = useState(false);


    const mainRestaurant = typeof restaurants !== "undefined" ? restaurants[0] : null;

    const prepareFormData = (item: { images: Array<{ url: string; id?: string | null }> }) => {
        return item.images.map(img => ({
            file: new File([new Blob()], img.url, { type: "image/jpeg" }),
            id: img.id || uuidv4(),
            isNew: false,
            isDeleted: false,
            url: img.url
        }));
    };

    const form = useForm<UpdateMenuItemFormSchamaType>({
        resolver: zodResolver(UpdateMenuItemFormSchama),
        defaultValues: {
            name: item.name,
            description: item.description || "",
            images: prepareFormData(item),
            price: item.price,
            menu: item.menuId,
        }
    });

    const loading = form.formState.isSubmitting;
    const images = form.watch("images");
    const visibleImages = images.filter(img => !img.isDeleted);
    const deletedImages = images.filter(img => img.isDeleted && !img.isNew);


    const handleImageDelete = (id: string) => {
        const newImages = images.filter(img => {
            if (img.id === id) return !img.isNew; // Keep existing images, remove new ones
            return true;
        }).map(img => img.id === id ? { ...img, isDeleted: true } : img);
        form.setValue("images", newImages);
    };


    const handleNewImages = async (files: File[]) => {
        const newImages = [...images];
        files.forEach(file => {
            if (visibleImages.length < 3) {
                newImages.push({ file, isNew: true, isDeleted: false, id: uuidv4(), url: file.name });
            } else {
                const oldestIndex = newImages.findIndex(img => !img.isNew && !img.isDeleted);
                if (oldestIndex !== -1) {
                    newImages[oldestIndex] = { file, isNew: true, isDeleted: false, id: uuidv4(), url: file.name };
                }
            }
        });
        form.setValue("images", newImages);
    };

    const handleImageRestore = (id: string) => {
        let newImages = images.map(img => img.id === id ? { ...img, isDeleted: false } : img);
        const visibleCount = newImages.filter(img => !img.isDeleted).length;

        if (visibleCount > 3) {
            let excessCount = visibleCount - 3;
            newImages = newImages.filter(img => {
                if (img.isNew && !img.isDeleted) {
                    if (excessCount > 0) {
                        excessCount--;
                        return false; // Remove this new image
                    }
                }
                return true;
            });
        }

        form.setValue("images", newImages);
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

    const onSubmit = async (values: UpdateMenuItemFormSchamaType) => {
        try {
            const { images, menu, name, price, description } = values;
            const validImages = images.filter(img => !img.isDeleted || img.isNew);
            const isValid = validImages.length > 0;

            if (!isValid) return toast({ title: "You need at least one image", variant: "destructive" });

            const newImages = images.filter(img => img.isNew);
            const existingImages = images.filter(img => !img.isNew);

            let updatedImages = [...existingImages];

            if (newImages.length > 0) {
                const uploadedImages = await uploadImages(newImages.map(img => img.file));
                if (uploadedImages && uploadedImages.results.length > 0) {
                    const newUploadedImages = newImages.map((img, index) => ({
                        ...img,
                        url: uploadedImages.results[index].secure_url
                    }));
                    updatedImages = [...updatedImages, ...newUploadedImages];
                }
            }

            const { data, error, status } = await updateMenuItem(item.id, {
                name,
                description,
                price,
                menu,
                images: updatedImages.map(img => ({
                    id: img.id,
                    url: img.url,
                    isNew: img.isNew,
                    isDeleted: img.isDeleted
                }))
            });

            if (status === 500 || error || mainRestaurant === null) return toast({ title: "Failed to create menu item", variant: "destructive" });

            if (status === 200) {
                toast({ title: `${data.name} created successfully` });
                updateMenuItemState(mainRestaurant.id, data.menuId, data.id, data);
                setIsUpdating(false);
                setOpenModal(false);
            }
        } catch (error) {
            devLog(error, "error");
            throw new Error("Failed to update menu item");
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    name="images"
                    render={() => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-3 gap-4">
                                    {visibleImages.map((image) => (
                                        <div key={uuidv4()} className="relative">
                                            <Image
                                                src={image.isNew ? URL.createObjectURL(image.file) : image.file.name}
                                                alt={item.name}
                                                className="w-full h-14 object-cover rounded-md"
                                                height={500}
                                                width={500}
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => handleImageDelete(image.id)}
                                                className="absolute top-2 right-2"
                                                variant="destructive"
                                                size="sm"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                {deletedImages.length > 0 && (
                    <FormItem>
                        <FormLabel>Deleted Images</FormLabel>
                        <FormControl>
                            <div className="grid grid-cols-3 gap-4">
                                {deletedImages.map((img) => (
                                    <div key={img.id} className="relative">
                                        <Image
                                            src={img.file.name}
                                            alt={item.name}
                                            className="w-full h-14 object-cover rounded-md opacity-50"
                                            height={500}
                                            width={500}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => handleImageRestore(img.id)}
                                            className="absolute top-2 right-2"
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Restore
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </FormControl>
                    </FormItem>
                )}



                <UploadDropZone
                    handleUpload={handleNewImages}
                    handleError={handleDropError}
                    isUploading={isUploading}
                    multiple={true}
                    maxDocumentSize={2 * 1024 * 1024}
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
                                    {mainRestaurant && mainRestaurant.menus.map((menu, index) => (
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

export default UpdateItemForm;