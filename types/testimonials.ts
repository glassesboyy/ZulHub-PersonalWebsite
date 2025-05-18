export type TestimonialRelation =
  | "client"
  | "coworker"
  | "manager"
  | "team member"
  | "project partners"
  | "lecturer"
  | "industry peer"
  | "workshop attende"
  | "prospective client"
  | "other";

export type Testimonial = {
  id: number;
  name: string;
  email: string;
  relation: TestimonialRelation;
  custom_relation?: string;  // Optional (nullable) field
  message: string;
  is_approved: boolean;
  created_at: string;
};
