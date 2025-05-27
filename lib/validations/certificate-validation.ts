import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const certificateFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  issuer: z
    .string()
    .min(2, "Issuer must be at least 2 characters")
    .max(100, "Issuer must not exceed 100 characters"),
  year: z
    .string()
    .min(4, "Year must be at least 4 characters, and should be a valid year")
    .max(4, "Year must not exceed 4 characters, and should be a valid year")
    .regex(/^\d{4}$/, "Year must be a valid 4-digit number"),
  certificateImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported",
    )
    .optional()
    .or(z.literal(undefined)),
});

export type CertificateFormValues = z.infer<typeof certificateFormSchema>;
