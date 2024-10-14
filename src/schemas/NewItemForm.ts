import { z } from "zod";

const NewItemFormSchama = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    price: z.coerce.number().gt(0),
    images: z.array(z.instanceof(File)).min(1),
});

export type NewItemFormSchamaType = z.infer<typeof NewItemFormSchama>;
export default NewItemFormSchama;