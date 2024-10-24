import { z } from "zod";

const UpdateDiscountSchema = z.object({
    name: z.string().min(2).max(50),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    menuItems: z.array(z.string()),
    value: z.coerce.number().gt(0),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
});


export const ApiUpdateDiscountSchema = z.object({
    name: z.string().min(2).max(50),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    restaurant: z.string().min(1),
    menuItems: z.array(z.string()),
    removedItems: z.array(z.string()),
    value: z.coerce.number().gt(0),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
});


export type UpdateDiscountSchemaType = z.infer<typeof UpdateDiscountSchema>;
export type ApiUpdateDiscountSchemaType = z.infer<typeof ApiUpdateDiscountSchema>;

export default UpdateDiscountSchema;