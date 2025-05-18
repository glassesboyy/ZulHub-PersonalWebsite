export const relationOptions = [
  "client",
  "coworker",
  "manager",
  "team member",
  "project partners",
  "lecturer",
  "industry peer",
  "workshop attende",
  "prospective client",
] as const;

export type TestimonialRelation = typeof relationOptions[number];

export type Testimonial = {
  id: number;
  name: string;
  email: string;
  relation: TestimonialRelation;
  message: string;
  is_approved: boolean;
  created_at: string;
};
