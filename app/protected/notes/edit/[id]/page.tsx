"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [noteText, setNoteText] = useState("");
  const router = useRouter();
  const supabase = createClient();
  const resolvedParams = use(params);

  useEffect(() => {
    async function fetchNote() {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", resolvedParams.id)
        .single();

      if (error) {
        console.error("Error fetching note:", error.message);
        return;
      }

      if (data) {
        setNoteText(data.title);
      }
    }

    fetchNote();
  }, [resolvedParams.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("notes")
        .update({ title: noteText })
        .eq("id", resolvedParams.id);

      if (error) {
        console.error("Error updating note:", error.message);
        return;
      }

      router.push("/protected/notes");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Note</h1>
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
          <Button type="submit">Update Note</Button>
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
