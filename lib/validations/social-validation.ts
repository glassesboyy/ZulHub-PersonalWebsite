import * as z from "zod";

const socialSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  link: z
    .string()
    .url("Invalid URL format")
    .max(255, "Link must not exceed 255 characters"),
  icon: z
    .string()
    .min(1, "Icon class is required")
    .regex(
      /^[a-zA-Z0-9\-\s]+$/,
      "Invalid icon class format. Use only letters, numbers, spaces and hyphens",
    )
    .max(100, "Icon class must not exceed 100 characters"),
});

export type SocialFormValues = z.infer<typeof socialSchema>;
export const socialFormSchema = socialSchema;
