"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useProfiles } from "@/hooks/profile-hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProfilePage() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const router = useRouter();
  const { createProfile } = useProfiles();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!avatarFile || !cvFile) {
      alert("Please select both an avatar and a CV file");
      return;
    }

    const success = await createProfile(
      name,
      tagline,
      bio,
      cvFile,
      avatarFile,
      isActive
    );

    if (success) {
      router.push("/protected/profile");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar Image</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            required
          />
          {avatarPreview && (
            <div className="mt-2 relative w-32 h-32">
              <Image
                src={avatarPreview}
                alt="Avatar preview"
                fill
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cv">CV File</Label>
          <Input
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCVChange}
            required
          />
          {cvFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {cvFile.name}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive}
            id="active"
          />
          <Label htmlFor="active">Set as Active Profile</Label>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Profile</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/profile")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
