import { Social } from "@/types/social";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useSocials() {
  const [socials, setSocials] = useState<Social[]>([]);
  const supabase = createClient();

  const fetchSocials = async () => {
    try {
      const { data, error } = await supabase
        .from("socials")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching socials:", error.message);
        return;
      }
      setSocials(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createSocial = async (name: string, description: string, link: string, icon: string) => {
    try {
      const { error } = await supabase
        .from("socials")
        .insert([{ name, description, link, icon }]);

      if (error) {
        console.error("Error creating social:", error.message);
        return false;
      }
      await fetchSocials();
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const updateSocial = async (id: string, name: string, description: string, link: string, icon: string) => {
    try {
      const { error } = await supabase
        .from("socials")
        .update({ name, description, link, icon })
        .eq("id", id);

      if (error) {
        console.error("Error updating social:", error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const deleteSocial = async (id: number) => {
    try {
      const { error } = await supabase
        .from("socials")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting social:", error.message);
        return false;
      }
      await fetchSocials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
      const { error } = await supabase
        .from("socials")
        .delete()
        .in("id", ids);

      if (error) {
        console.error("Error deleting socials:", error.message);
        return false;
      }
      await fetchSocials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
