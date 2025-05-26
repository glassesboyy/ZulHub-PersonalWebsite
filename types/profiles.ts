import { Certificate } from "./certificate";
import { Project } from "./projects";
import { Social } from "./socials";
import { Technology } from "./technology";
import { Testimonial } from "./testimonials";

export type Profile = {
  id: number;
  full_name: string;
  tagline: string;
  bio: string;
  cv: string;
  avatar_url: string;
  updated_at: string;
  certificates?: Certificate[];
  projects?: Project[];
  socials?: Social[];
  technologies?: Technology[];
  testimonials?: Testimonial[];
};
