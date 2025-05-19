import * as z from "zod";

const technologySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  icon: z
    .string()
    .min(1, "Icon class is required")
    .regex(
      /^[a-zA-Z0-9\-\s]+$/,
      "Invalid icon class format. Use only letters, numbers, spaces and hyphens",
    )
    .max(100, "Icon class must not exceed 100 characters"),
});

export type TechnologyFormValues = z.infer<typeof technologySchema>;
export const technologyFormSchema = technologySchema;
