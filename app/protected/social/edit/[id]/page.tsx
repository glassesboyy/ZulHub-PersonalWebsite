"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSocials } from "@/hooks/social-hooks";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditSocialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();
  const { updateSocial, fetchSocialById } = useSocials();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadSocial() {
      const social = await fetchSocialById(resolvedParams.id);
      if (social) {
        setName(social.name);
        setDescription(social.description);
        setLink(social.link);
        setIcon(social.icon);
      }
    }
    loadSocial();
  }, [resolvedParams.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await updateSocial(
      resolvedParams.id,
      name,
      description,
      link,
      icon
    );
    if (success) {
      router.push("/protected/social");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Edit Social Media
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Similar form fields as create page */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Update Social Media</Button>
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
