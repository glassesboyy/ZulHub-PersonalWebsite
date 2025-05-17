"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNotes } from "@/hooks/notes-hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNotePage() {
  const [noteText, setNoteText] = useState("");
  const router = useRouter();
  const { createNote } = useNotes();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await createNote(noteText);
    if (success) {
      router.push("/protected/notes");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Note
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="note">Note Content</Label>
          <textarea
            id="note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note here..."
            className="w-full min-h-[200px] p-3 rounded-md border"
            rows={8}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Note</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/notes")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
