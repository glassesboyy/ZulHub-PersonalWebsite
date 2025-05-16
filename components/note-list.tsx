import { Note } from "@/types/notes";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 border rounded">
          <p className="mt-2">{note.title}</p>
          <div className="mt-4 space-x-2">
            <Link
              href={`/protected/notes/edit/${note.id}`}
              className="px-3 py-1 bg-yellow-500 text-white rounded inline-block"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(note.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
