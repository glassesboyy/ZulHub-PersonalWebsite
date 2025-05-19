"use client";

import { Button } from "@/components/ui/button";
import { useProfiles } from "@/hooks/profile-hooks";
import { Profile } from "@/types/profiles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { fetchProfileById } = useProfiles();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadProfile() {
      const data = await fetchProfileById(resolvedParams.id);
      if (data) {
        setProfile(data);
      }
    }
    loadProfile();
  }, [resolvedParams.id, fetchProfileById]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Profile Details
      </h1>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="rounded-full"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-gray-500">{profile.tagline}</p>
            <div
              className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${
                profile.is_active ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              {profile.is_active ? "Active" : "Inactive"}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-3">Bio</h3>
        <div>
          <p className="text-gray-300 break-words whitespace-pre-wrap">
            {profile.bio}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">CV</h3>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View CV
          </a>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => router.push("/protected/profile")}
          >
            Back to List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/protected/profile/edit/${profile.id}`)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
