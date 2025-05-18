"use client";

import { NotesDataTable } from "@/components/data-table/notes-data-table";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/notes-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function NotesPage() {
  const { notes, fetchNotes, deleteNote, bulkDeleteNotes } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, []);

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
        onDelete={deleteNote}
        onBulkDelete={bulkDeleteNotes}
      />
    </div>
  );
}
