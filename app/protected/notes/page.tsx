"use client";

import { NotesDataTable } from "@/components/notes-data-table";
import { Button } from "@/components/ui/button";
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

  async function handleBulkDelete(ids: number[]) {
    try {
      const { error } = await supabase.from("notes").delete().in("id", ids);

      if (error) {
        console.error("Error deleting notes:", error.message);
        return;
      }
      await fetchNotes();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
        <Link href="/protected/notes/create">
          <Button>Create New Note</Button>
        </Link>
      </div>
      <NotesDataTable
        data={notes}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
