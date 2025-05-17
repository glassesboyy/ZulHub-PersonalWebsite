export type Technology = {
  id: number;
  name: string;
  icon: string;
  created_at: string;
};

export type ProjectTechnology = {
  id: number;
  project_id: number;
  tech_id: number;
  created_at: string;
};
