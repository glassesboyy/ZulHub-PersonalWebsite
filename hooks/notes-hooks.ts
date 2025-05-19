import { Note } from "@/types/notes";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const supabase = createClient();

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase.from("notes").select("*");
      if (error) {
        console.error("Error fetching notes:", error.message);
        return;
      }
      setNotes(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createNote = async (noteText: string) => {
    try {
      const { error } = await supabase
        .from("notes")
        .insert([{ title: noteText }]);
      if (error) {
        console.error("Error creating note:", error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const updateNote = async (id: string, noteText: string) => {
    try {
      const { error } = await supabase
        .from("notes")
        .update({ title: noteText })
        .eq("id", id);
      if (error) {
        console.error("Error updating note:", error.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) {
        console.error("Error deleting note:", error.message);
        return false;
      }
      await fetchNotes();
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const bulkDeleteNotes = async (ids: number[]) => {
    try {
      const { error } = await supabase.from("notes").delete().in("id", ids);
      if (error) {
        console.error("Error deleting notes:", error.message);
        return false;
      }
      await fetchNotes();
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const fetchNoteById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching note:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return {
    notes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    bulkDeleteNotes,
    fetchNoteById,
  };
}
