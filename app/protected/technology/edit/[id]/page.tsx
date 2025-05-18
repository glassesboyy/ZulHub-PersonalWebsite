"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTechnologies } from "@/hooks/technology-hooks";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditTechnologyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const { updateTechnology, fetchTechnologyById } = useTechnologies();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadTechnology() {
      const tech = await fetchTechnologyById(resolvedParams.id);
      if (tech) {
        setName(tech.name);
        setIcon(tech.icon);
      }
    }
    loadTechnology();
  }, [resolvedParams.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await updateTechnology(resolvedParams.id, name, icon);
    if (success) {
      router.push("/protected/technology");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Edit Technology
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon URL</Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Update Technology</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/technology")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
