import { z } from "zod";

const NewMenuFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500).optional().or(z.literal("")),
});

export type NewMenuFormSchemaType = z.infer<typeof NewMenuFormSchema>;
export default NewMenuFormSchema;