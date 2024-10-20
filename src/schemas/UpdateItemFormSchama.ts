import { z } from "zod";

const UpdateMenuItemFormSchama = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    price: z.coerce.number().gt(0),
    menu: z.string().min(1),
    images: z.array(z.object({
        file: z.instanceof(File),
        id: z.string(),
        isNew: z.boolean(),
        url: z.string(),
        isDeleted: z.boolean(),
    }))
});

export const ApiUpdateItemSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    price: z.coerce.number().gt(0),
    menu: z.string().min(1),
    images: z.array(z.object({
        id: z.string(),
        url: z.string(),
        isNew: z.boolean(),
        isDeleted: z.boolean()
    }))
});

export type apiUpdateItemSchemaType = z.infer<typeof ApiUpdateItemSchema>;
export type UpdateMenuItemFormSchamaType = z.infer<typeof UpdateMenuItemFormSchama>;

export default UpdateMenuItemFormSchama;