import { Technology } from "./technology";

export type ProjectStatus = "planned" | "on process" | "on hold" | "done";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  project_image: string;
  created_at: string;
  technologies?: Technology[];
};
