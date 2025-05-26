import { useToast } from "@/hooks/use-toast";
import { Social } from "@/types/socials";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useSocials() {
  const [socials, setSocials] = useState<Social[]>([]);
  const supabase = createClient();
  const { toast } = useToast();

  const fetchSocials = async () => {
    try {
      const { data, error } = await supabase
        .from("socials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching socials:", error.message);
        return;
      }
      setSocials(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createSocial = async (
    name: string,
    description: string,
    link: string,
    icon: string,
  ) => {
    try {
      // Ambil profile ID yang aktif
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);
      
      const profile_id = profiles?.[0]?.id;

      const { error } = await supabase
        .from("socials")
        .insert([{ name, description, link, icon, profile_id }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create social media",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Social media created successfully",
      });
      await fetchSocials();
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

  const updateSocial = async (
    id: string,
    name: string,
    description: string,
    link: string,
    icon: string,
  ) => {
    try {
      const { error } = await supabase
        .from("socials")
        .update({ name, description, link, icon })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update social media",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Social media updated successfully",
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

  const deleteSocial = async (id: number) => {
    try {
      const { error } = await supabase.from("socials").delete().eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete social media",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Social media deleted successfully",
      });
      await fetchSocials();
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

  const fetchSocialById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("socials")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching social:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const bulkDeleteSocials = async (ids: number[]) => {
    try {
      const { error } = await supabase.from("socials").delete().in("id", ids);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete social media items",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: `${ids.length} social media item(s) deleted successfully`,
      });
      await fetchSocials();
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

  return {
    socials,
    fetchSocials,
    createSocial,
    updateSocial,
    deleteSocial,
    fetchSocialById,
    bulkDeleteSocials,
  };
}
