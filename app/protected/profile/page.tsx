"use client";

import { StatsCard } from "@/components/dashboard/statistic";
import { Button } from "@/components/ui/button";
import { useProfiles } from "@/hooks/profile-hooks";
import { Profile } from "@/types/profiles";
import {
  Award,
  FolderGit,
  Globe2,
  MessageSquareText,
  MonitorSmartphone,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { fetchProfiles } = useProfiles();

  useEffect(() => {
    async function loadProfile() {
      const profiles = await fetchProfiles();
      if (profiles && profiles.length > 0) {
        setProfile(profiles[0]);
      }
    }
    loadProfile();
  }, [fetchProfiles]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <div className="flex gap-4 flex-col xs:flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={() => router.push("/protected/profile/reset-password")}
          >
            Reset Password
          </Button>
          <Button
            onClick={() => router.push(`/protected/profile/edit/${profile.id}`)}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Left Column - Avatar and Basic Info */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="relative mx-auto mb-6 h-48 w-48">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="rounded-full object-cover ring-2 ring-primary/20"
                priority
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{profile.full_name}</h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* CV Section */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-medium">Curriculum Vitae</h3>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              View CV
            </a>
          </div>
        </div>

        {/* Right Column - Bio */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-4 text-xl font-medium">About Me</h3>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="rounded-md bg-muted/50 p-6 max-h-[420px] min-h-[420px] overflow-y-auto resize-none">
              <p className="whitespace-pre-wrap text-pretty text-muted-foreground">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card - Moved to bottom */}
      <div className="mt-6 rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-medium">Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <StatsCard
            title="Certificates"
            value={profile.certificates?.length || 0}
            icon={<Award />}
            variant="default"
          />
          <StatsCard
            title="Projects"
            value={profile.projects?.length || 0}
            icon={<FolderGit />}
            variant="default"
          />
          <StatsCard
            title="Technologies"
            value={profile.technologies?.length || 0}
            icon={<MonitorSmartphone />}
            variant="default"
          />
          <StatsCard
            title="Socials"
            value={profile.socials?.length || 0}
            icon={<Globe2 />}
            variant="default"
          />
          <StatsCard
            title="Testimonials"
            value={profile.testimonials?.length || 0}
            icon={<MessageSquareText />}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}
