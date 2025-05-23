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
      /^Si[A-Za-z0-9]+$/,
      "Invalid icon name format. Must start with 'Si' followed by letters or numbers (e.g., SiHtml5, SiJavascript)"
    ),
});

export type TechnologyFormValues = z.infer<typeof technologySchema>;
export const technologyFormSchema = technologySchema;
