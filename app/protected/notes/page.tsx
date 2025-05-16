"use client";

import NoteList from "@/components/note-list";
import { Note } from "@/types/notes";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const supabase = createClient();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
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
  }

  async function handleDelete(id: number) {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) {
        console.error("Error deleting note:", error.message);
        return;
      }
      await fetchNotes();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Link
          href="/protected/notes/create"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create New Note
        </Link>
      </div>
      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
}
