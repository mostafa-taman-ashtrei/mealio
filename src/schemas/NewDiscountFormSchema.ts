import { z } from "zod";

const NewDiscountSchema = z.object({
    name: z.string().min(2).max(50),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    restaurant: z.string().min(1),
    menuItems: z.array(z.string()),
    value: z.coerce.number().gt(0),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
});

export type NewDiscountSchemaType = z.infer<typeof NewDiscountSchema>;
export default NewDiscountSchema;