import { useToast } from "@/hooks/use-toast";
import { Testimonial, TestimonialRelation } from "@/types/testimonials";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const supabase = createClient();
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching testimonials:", error.message);
        return;
      }
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createTestimonial = async (
    name: string,
    email: string,
    relation: TestimonialRelation,
    message: string,
  ) => {
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      const profile_id = profiles?.[0]?.id;

      const { error } = await supabase
        .from("testimonials")
        .insert([
          { name, email, relation, message, is_approved: false, profile_id },
        ]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create testimonial",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Testimonial created successfully",
      });
      await fetchTestimonials();
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

  const updateTestimonial = async (
    id: string,
    name: string,
    email: string,
    relation: string,
    message: string,
    isApproved: boolean,
  ) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ name, email, relation, message, is_approved: isApproved })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update testimonial",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });
      await fetchTestimonials();
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

  const deleteTestimonial = async (id: number) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      await fetchTestimonials();
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

  const bulkDeleteTestimonials = async (ids: number[]) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .in("id", ids);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete testimonials",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: `${ids.length} testimonial(s) deleted successfully`,
      });
      await fetchTestimonials();
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

  const toggleApproval = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_approved: !currentStatus })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to toggle approval status",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: `Testimonial ${!currentStatus ? "approved" : "unapproved"} successfully`,
      });
      await fetchTestimonials();
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

  const fetchTestimonialById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching testimonial:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return {
    testimonials,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    bulkDeleteTestimonials,
    toggleApproval,
    fetchTestimonialById,
  };
}
