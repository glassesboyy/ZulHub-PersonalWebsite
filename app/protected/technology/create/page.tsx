"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTechnologies } from "@/hooks/technology-hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTechnologyPage() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const { createTechnology } = useTechnologies();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await createTechnology(name, icon);
    if (success) {
      router.push("/protected/technology");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Technology
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Technology name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon URL</Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon URL"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Technology</Button>
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
