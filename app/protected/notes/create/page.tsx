"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const [noteText, setNoteText] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("notes")
        .insert([{ title: noteText }]);

      if (error) {
        console.error("Error creating note:", error.message);
        return;
      }

      router.push("/protected/notes");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
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
            Save Note
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
