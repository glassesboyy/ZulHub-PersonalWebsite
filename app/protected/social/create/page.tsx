"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSocials } from "@/hooks/social-hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateSocialPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const { createSocial } = useSocials();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await createSocial(name, description, link, icon);
    if (success) {
      router.push("/protected/social");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Social Media
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Social media name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Social media description"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon URL or class name"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Social Media</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/social")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
