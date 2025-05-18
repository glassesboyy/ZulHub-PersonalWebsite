import { relationOptions } from "@/types/testimonials";
import * as z from "zod";

const testimonialSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),
  relation: z.enum(relationOptions),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  isApproved: z.boolean()
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
export const testimonialFormSchema = testimonialSchema;
