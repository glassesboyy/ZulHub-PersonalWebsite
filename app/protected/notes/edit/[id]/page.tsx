"use client";

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
          className="w-full mb-2 p-2 border rounded"
          rows={4}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={() => router.push("/protected/notes")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
