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
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching profiles:", error.message);
        return;
      }
      setProfiles(data || []);
    } catch (error) {
      console.error("Error:", error);
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

  const createProfile = async (
    name: string,
    tagline: string,
    bio: string,
    cvFile: File,
    avatarFile: File,
    isActive: boolean,
  ) => {
    try {
      // If setting this profile as active, deactivate all others first
      if (isActive) {
        await supabase
          .from("profiles")
          .update({ is_active: false })
          .eq("is_active", true);
      }

      const [cvUrl, avatarUrl] = await Promise.all([
        uploadCV(cvFile),
        uploadAvatar(avatarFile),
      ]);

      if (!cvUrl || !avatarUrl) {
        toast({
          title: "Error",
          description: "Failed to upload files",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase.from("profiles").insert([
        {
          name,
          tagline,
          bio,
          cv: cvUrl,
          avatar: avatarUrl,
          is_active: isActive,
        },
      ]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create profile",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Profile created successfully",
      });
      await fetchProfiles();
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

  const updateProfile = async (
    id: string,
    name: string,
    tagline: string,
    bio: string,
    cvFile: File | null,
    avatarFile: File | null,
    isActive: boolean,
  ) => {
    try {
      // If setting this profile as active, deactivate all others first
      if (isActive) {
        await supabase
          .from("profiles")
          .update({ is_active: false })
          .neq("id", id);
      }

      let updateData: any = { name, tagline, bio, is_active: isActive };

      if (cvFile) {
        const cvUrl = await uploadCV(cvFile);
        if (!cvUrl) return false;
        updateData.cv = cvUrl;
      }

      if (avatarFile) {
        const avatarUrl = await uploadAvatar(avatarFile);
        if (!avatarUrl) return false;
        updateData.avatar = avatarUrl;
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

  const deleteProfile = async (id: number) => {
    try {
      const profile = await fetchProfileById(id.toString());
      if (!profile) return false;

      // Delete files from storage
      const cvFileName = profile.cv.split("/").pop();
      const avatarFileName = profile.avatar.split("/").pop();

      await Promise.all([
        supabase.storage.from("cv-file").remove([`cvs/${cvFileName}`]),
        supabase.storage
          .from("avatar-image")
          .remove([`avatars/${avatarFileName}`]),
      ]);

      const { error } = await supabase.from("profiles").delete().eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete profile",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Profile deleted successfully",
      });
      await fetchProfiles();
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

  const bulkDeleteProfiles = async (ids: number[]) => {
    try {
      // Fetch profiles first to get file paths
      const { data: profiles } = await supabase
        .from("profiles")
        .select()
        .in("id", ids);

      if (profiles) {
        // Delete all files from storage
        for (const profile of profiles) {
          const cvFileName = profile.cv.split("/").pop();
          const avatarFileName = profile.avatar.split("/").pop();

          await Promise.all([
            supabase.storage.from("cv-file").remove([`cvs/${cvFileName}`]),
            supabase.storage
              .from("avatar-image")
              .remove([`avatars/${avatarFileName}`]),
          ]);
        }
      }

      // Delete profiles from database
      const { error } = await supabase.from("profiles").delete().in("id", ids);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete profiles",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: `${ids.length} profile(s) deleted successfully`,
      });
      await fetchProfiles();
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
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return {
    profiles,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    fetchProfileById,
    uploadCV,
    uploadAvatar,
    bulkDeleteProfiles,
  };
}
