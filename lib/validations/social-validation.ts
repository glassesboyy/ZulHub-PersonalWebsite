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
    .min(1, "Icon name is required")
    .regex(
      /^Icon[A-Za-z]+$/,
      "Invalid icon name format. Must start with 'Icon' followed by letters (e.g., IconBrandGithub)",
    ),
});

export type SocialFormValues = z.infer<typeof socialSchema>;
export const socialFormSchema = socialSchema;
