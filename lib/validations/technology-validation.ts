import * as z from "zod";

const technologySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  icon: z
    .string()
    .min(1, "Icon name is required")
    .regex(
      /^Si[A-Za-z]+$/,
      "Invalid icon name format. Must start with 'Si' followed by letters (e.g., SiJavascript)"
    ),
});

export type TechnologyFormValues = z.infer<typeof technologySchema>;
export const technologyFormSchema = technologySchema;
