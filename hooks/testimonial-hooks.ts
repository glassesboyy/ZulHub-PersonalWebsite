import { Testimonial } from "@/types/testimonials";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const supabase = createClient();

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order('created_at', { ascending: false });
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
    relation: string,
    message: string,
    customRelation?: string
  ) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .insert([{ 
          name,
          email,
          relation,
          custom_relation: relation === 'other' ? customRelation : null,
          message,
          is_approved: false // Default to false when created
        }]);

      if (error) {
        console.error("Error creating testimonial:", error.message);
        return false;
      }
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
    customRelation?: string
  ) => {
    try {
      const updateData = {
        name,
        email,
        relation,
        custom_relation: relation === 'other' ? customRelation : null,
        message,
        is_approved: isApproved
      };

      const { error } = await supabase
        .from("testimonials")
        .update(updateData)
        .eq("id", id);

      if (error) {
        console.error("Error updating testimonial:", error.message);
        return false;
      }
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
        console.error("Error deleting testimonial:", error.message);
        return false;
      }
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
        console.error("Error deleting testimonials:", error.message);
        return false;
      }
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
        console.error("Error toggling approval:", error.message);
        return false;
      }
      await fetchTestimonials();
      return true;
    } catch (error) {
      console.error("Error:", error);
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
