import { z } from "zod";

const UpdateMenuFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(500).optional().or(z.literal("")),
});

export type UpdateMenuFormSchemaType = z.infer<typeof UpdateMenuFormSchema>;
export default UpdateMenuFormSchema;