import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/projects";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const supabase = createClient();
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching projects:", error.message);
        return;
      }
      setProjects(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-image")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError.message);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-image").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const createProject = async (
    name: string,
    description: string,
    status: string,
    imageFile: File,
  ) => {
    try {
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) return false;

      const { error } = await supabase
        .from("projects")
        .insert([{ name, description, status, project_image: imageUrl }]);

      if (error) {
        console.error("Error creating project:", error.message);
        return false;
      }
      await fetchProjects();
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const updateProject = async (
    id: string,
    name: string,
    description: string,
    status: string,
    imageFile: File | null,
  ) => {
    try {
      let imageUrl = null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) return false;
      }

      const updateData = {
        name,
        description,
        status,
        ...(imageUrl && { project_image: imageUrl }),
      };

      const { error } = await supabase
        .from("projects")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error updating project:", error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      const project = await fetchProjectById(id.toString());
      if (!project) return false;

      // Extract filename dari URL
      const imageUrl = project.project_image;
      const fileName = imageUrl.split("/").pop();
      const filePath = `projects/${fileName}`;

      // Hapus file dari storage
      const { error: storageError } = await supabase.storage
        .from("project-image")
        .remove([filePath]);

      if (storageError) {
        console.error(
          "Error deleting image from storage:",
          storageError.message,
        );
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
        return false;
      }

      const { error: dbError } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (dbError) {
        console.error("Error deleting project:", dbError.message);
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      await fetchProjects();
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      return false;
    }
  };

  const bulkDeleteProjects = async (ids: number[]) => {
    try {
      const { data: projects } = await supabase
        .from("projects")
        .select()
        .in("id", ids);

      if (projects) {
        for (const proj of projects) {
          const fileName = proj.project_image.split("/").pop();
          const filePath = `projects/${fileName}`;

          await supabase.storage.from("project-image").remove([filePath]);
        }
      }

      const { error } = await supabase.from("projects").delete().in("id", ids);

      if (error) {
        console.error("Error deleting projects:", error.message);
        toast({
          title: "Error",
          description: "Failed to delete projects",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: `${ids.length} project(s) deleted successfully`,
      });
      await fetchProjects();
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to delete projects",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchProjectById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          *,
          technologies:project_tech(
            technology:technologies(*)
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching project:", error.message);
        return null;
      }

      // Transform the nested data structure
      if (data) {
        data.technologies =
          data.technologies?.map((t: any) => t.technology) || [];
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const fetchTechnologies = async () => {
    try {
      const { data, error } = await supabase
        .from("technologies")
        .select("*")
        .order("name");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching technologies:", error);
      return [];
    }
  };

  const createProjectWithTechnologies = async (
    name: string,
    description: string,
    status: string,
    imageFile: File,
    techIds: number[],
  ) => {
    try {
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        return false;
      }

      // Insert project
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert([{ name, description, status, project_image: imageUrl }])
        .select()
        .single();

      if (projectError) throw projectError;

      // Insert project technologies
      if (techIds.length > 0) {
        const techData = techIds.map((techId) => ({
          project_id: project.id,
          tech_id: techId,
        }));

        const { error: techError } = await supabase
          .from("project_tech")
          .insert(techData);

        if (techError) throw techError;
      }

      toast({
        title: "Success",
        description: "Project created successfully",
      });
      await fetchProjects();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProjectWithTechnologies = async (
    id: string,
    name: string,
    description: string,
    status: string,
    imageFile: File | null,
    techIds: number[],
  ) => {
    try {
      let updateData: any = { name, description, status };

      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
          return false;
        }
        updateData.project_image = imageUrl;
      }

      // Update project
      const { error: projectError } = await supabase
        .from("projects")
        .update(updateData)
        .eq("id", id);

      if (projectError) throw projectError;

      // Delete existing tech relationships
      const { error: deleteError } = await supabase
        .from("project_tech")
        .delete()
        .eq("project_id", id);

      if (deleteError) throw deleteError;

      // Insert new tech relationships
      if (techIds.length > 0) {
        const techData = techIds.map((techId) => ({
          project_id: parseInt(id),
          tech_id: techId,
        }));

        const { error: techError } = await supabase
          .from("project_tech")
          .insert(techData);

        if (techError) throw techError;
      }

      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    projects,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    bulkDeleteProjects,
    fetchProjectById,
    uploadImage,
    fetchTechnologies,
    createProjectWithTechnologies,
    updateProjectWithTechnologies,
  };
}
