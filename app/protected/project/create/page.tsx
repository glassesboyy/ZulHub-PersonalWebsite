"use client";

import { ComboboxTechnologies } from "@/components/combobox-technologies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/project-hooks";
import { Technology } from "@/types/technology";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string>("planned");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<Technology[]>([]);
  const router = useRouter();
  const { createProjectWithTechnologies, fetchTechnologies } = useProjects();

  useEffect(() => {
    const loadTechnologies = async () => {
      const techs = await fetchTechnologies();
      setTechnologies(techs);
    };
    loadTechnologies();
  }, [fetchTechnologies]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleTechSelect = (tech: Technology) => {
    if (!selectedTechs.some((t) => t.id === tech.id)) {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleTechRemove = (techId: number) => {
    setSelectedTechs(selectedTechs.filter((t) => t.id !== techId));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image");
      return;
    }
    const success = await createProjectWithTechnologies(
      name,
      description,
      status,
      imageFile,
      selectedTechs.map((t) => t.id),
    );
    if (success) {
      router.push("/protected/project");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Project
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="on process">On Process</SelectItem>
              <SelectItem value="on hold">On Hold</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Project Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
          {previewUrl && (
            <div className="mt-4 relative w-full h-[200px]">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies</Label>
          <ComboboxTechnologies
            technologies={technologies}
            selectedTechnologies={selectedTechs}
            onSelect={handleTechSelect}
            onRemove={handleTechRemove}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Project</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/project")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
