import { useToast } from "@/hooks/use-toast";
import { Technology } from "@/types/technology";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useTechnologies() {
  const { toast } = useToast(); // Add this
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const supabase = createClient();

  const fetchTechnologies = async () => {
    try {
      const { data, error } = await supabase
        .from("technologies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching technologies:", error.message);
        return;
      }
      setTechnologies(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createTechnology = async (name: string, icon: string) => {
    try {
      const { error } = await supabase
        .from("technologies")
        .insert([{ name, icon }]);

      if (error) {
        console.error("Error creating technology:", error.message);
        toast({
          title: "Error",
          description: "Failed to create technology",
          variant: "destructive",
        });
        return false;
      }
      await fetchTechnologies();
      toast({
        title: "Success",
        description: "Technology created successfully",
      });
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateTechnology = async (id: string, name: string, icon: string) => {
    try {
      const { error } = await supabase
        .from("technologies")
        .update({ name, icon })
        .eq("id", id);

      if (error) {
        console.error("Error updating technology:", error.message);
        toast({
          title: "Error",
          description: "Failed to update technology",
          variant: "destructive",
        });
        return false;
      }
      await fetchTechnologies();
      toast({
        title: "Success",
        description: "Technology updated successfully",
      });
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTechnology = async (id: number) => {
    try {
      const { error } = await supabase
        .from("technologies")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error deleting technology:", error.message);
        toast({
          title: "Error",
          description: "Failed to delete technology",
          variant: "destructive",
        });
        return false;
      }
      await fetchTechnologies();
      toast({
        title: "Success",
        description: "Technology deleted successfully",
      });
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchTechnologyById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("technologies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching technology:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const bulkDeleteTechnologies = async (ids: number[]) => {
    try {
      const { error } = await supabase
        .from("technologies")
        .delete()
        .in("id", ids);

      if (error) {
        console.error("Error deleting technologies:", error.message);
        toast({
          title: "Error",
          description: "Failed to delete technologies",
          variant: "destructive",
        });
        return false;
      }

      await fetchTechnologies();
      toast({
        title: "Success",
        description: `${ids.length} technology(ies) deleted successfully`,
      });
      return true;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    technologies,
    fetchTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,
    fetchTechnologyById,
    bulkDeleteTechnologies,
  };
}
