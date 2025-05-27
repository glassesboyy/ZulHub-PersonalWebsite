import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/types/profiles";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const supabase = createClient();
  const { toast } = useToast();

  const fetchProfiles = async () => {
    try {
      const { data: rawData, error } = await supabase
        .from("profiles")
        .select(
          `
          *,
          certificates(*),
          projects(
            *,
            technologies:project_tech(
              technology:technologies(*)
            )
          ),
          socials(*),
          technologies(*),
          testimonials(*)
        `,
        )
        .limit(1);

      if (error) {
        console.error("Error fetching profile:", error.message);
        return [];
      }

      const transformedData = rawData?.map((profile) => ({
        ...profile,
        projects: profile.projects?.map((project: any) => ({
          ...project,
          technologies:
            project.technologies?.map((t: any) => t.technology) || [],
        })),
      }));

      setProfiles(transformedData || []);
      return transformedData;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const uploadCV = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `cvs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cv-file")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading CV:", uploadError.message);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("cv-file").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatar-image")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError.message);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatar-image").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const deleteFile = async (
    url: string,
    bucket: "cv-file" | "avatar-image",
  ) => {
    try {
      const filePath = url.split("/").pop();
      const folder = bucket === "cv-file" ? "cvs" : "avatars";
      const path = `${folder}/${filePath}`;

      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) {
        console.error(`Error deleting file from ${bucket}:`, error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  };

  const updateProfile = async (
    id: string,
    full_name: string,
    tagline: string,
    bio: string,
    cvFile: File | null,
    avatarFile: File | null,
  ) => {
    try {
      let updateData: any = { full_name, tagline, bio };

      const currentProfile = await fetchProfileById(id);
      if (!currentProfile) return false;

      if (cvFile) {
        await deleteFile(currentProfile.cv, "cv-file");
        const cvUrl = await uploadCV(cvFile);
        if (!cvUrl) return false;
        updateData.cv = cvUrl;
      }

      if (avatarFile) {
        await deleteFile(currentProfile.avatar_url, "avatar-image");
        const avatarUrl = await uploadAvatar(avatarFile);
        if (!avatarUrl) return false;
        updateData.avatar_url = avatarUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchProfileById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
          *,
          certificates(*),
          projects(
            *,
            technologies:project_tech(
              technology:technologies(*)
            )
          ),
          socials(*),
          testimonials(*)
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
      }

      if (data) {
        const transformedData = {
          ...data,
          projects: data.projects?.map((project: any) => ({
            ...project,
            technologies:
              project.technologies?.map((t: any) => t.technology) || [],
          })),
        };
        return transformedData;
      }

      return null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return {
    profiles,
    fetchProfiles,
    updateProfile,
    fetchProfileById,
    uploadCV,
    uploadAvatar,
  };
}
