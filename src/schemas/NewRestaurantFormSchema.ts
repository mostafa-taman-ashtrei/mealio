import { z } from "zod";

const NewRestaurantFormSchama = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500).optional().or(z.literal("")),
    logoUrl: z.instanceof(File),
});

export type NewRestaurantFormSchamaType = z.infer<typeof NewRestaurantFormSchama>;
export default NewRestaurantFormSchama;