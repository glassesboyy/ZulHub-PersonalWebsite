"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useProfiles } from "@/hooks/profile-hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [currentCV, setCurrentCV] = useState<string>("");

  const router = useRouter();
  const { updateProfile, fetchProfileById } = useProfiles();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadProfile() {
      const profile = await fetchProfileById(resolvedParams.id);
      if (profile) {
        setName(profile.name);
        setTagline(profile.tagline);
        setBio(profile.bio);
        setIsActive(profile.is_active);
        setAvatarPreview(profile.avatar);
        setCurrentCV(profile.cv);
      }
    }
    loadProfile();
  }, [resolvedParams.id]);

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
    const success = await updateProfile(
      resolvedParams.id,
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
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Profile</h1>
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
          />
          {currentCV && !cvFile && (
            <p className="text-sm text-muted-foreground">
              Current CV:{" "}
              <a
                href={currentCV}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-500 hover:underline"
              >
                View Current CV
              </a>
            </p>
          )}
          {cvFile && (
            <p className="text-sm text-muted-foreground">
              New CV selected: {cvFile.name}
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
          <Button type="submit">Update Profile</Button>
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
