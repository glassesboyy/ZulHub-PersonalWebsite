"use client";

import { StatsCard } from "@/components/dashboard/statistic";
import { BadgeFe } from "@/components/front/badge-fe";
import { Spotlight } from "@/components/front/spotlight";
import { useProfiles } from "@/hooks/profile-hooks";
import { Profile } from "@/types/profiles";
import { motion } from "framer-motion";
import { Album, Bolt, Folders, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeInput } from "react-activity-calendar";
import GitHubCalendar from "react-github-calendar";

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchProfiles } = useProfiles();

  const colorTheme: ThemeInput = {
    light: [
      "var(--color-calendar-graph-day-bg)",
      "var(--color-calendar-graph-day-L1-bg)",
      "var(--color-calendar-graph-day-L2-bg)",
      "var(--color-calendar-graph-day-L3-bg)",
      "var(--color-calendar-graph-day-L4-bg)",
    ],
    dark: [
      "var(--color-calendar-graph-day-bg)",
      "var(--color-calendar-graph-day-L1-bg)",
      "var(--color-calendar-graph-day-L2-bg)",
      "var(--color-calendar-graph-day-L3-bg)",
      "var(--color-calendar-graph-day-L4-bg)",
    ],
  };

  useEffect(() => {
    async function loadProfile() {
      const profiles = await fetchProfiles();
      if (profiles && profiles.length > 0) {
        setProfile(profiles[0]);
      }
      setIsLoading(false);
    }
    loadProfile();
  }, [fetchProfiles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-foreground/60">Loading Profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-foreground/60">No profile data found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="space-y-1">
          <BadgeFe label="Who Am I" />
          <div className="space-y-1">
            <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
              About Me
            </span>
            <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
              {profile.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-4">
        {/* Image Section */}
        <div className="relative group">
          <Spotlight className="-top-32 left-0 md:left-12 md:-top-20 z-10 from-primary/20 via-primary/10 to-primary/5" />
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/20 to-primary/0 backdrop-blur-sm group-hover:from-primary/30 transition-all duration-500" />
            <div className="absolute inset-1 rounded-md overflow-hidden border border-primary/10 group-hover:border-primary/20 transition-all duration-500">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            {" "}
            {/* Changed from space-y-1 to space-y-4 */}
            <h2 className="text-3xl text-center font-[Audiowide] uppercase text-primary/80 xs:p-2 md:p-1">
              {profile.full_name}
            </h2>
            {/* Added Separator */}
            <div className="h-px flex-1 bg-gradient-to-r from-primary/5 via-primary/50 to-primary/5 mb-2" />
            <div className="space-y-4 text-xxs text-foreground/70">
              <div className="whitespace-pre-wrap text-justify xs:p-2 md:p-1">
                {profile.bio}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid - Moved to bottom */}
      <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4 xs:p-2 md:p-1 relative z-30">
        <StatsCard
          title="Certificates"
          value={profile.certificates?.length || 0}
          icon={<Album className="w-7 h-7" />}
          variant="fancy"
        />
        <StatsCard
          title="Projects"
          value={profile.projects?.length || 0}
          icon={<Folders className="w-7 h-7" />}
          variant="fancy"
        />
        <StatsCard
          title="Technologies"
          value={profile.technologies?.length || 0}
          icon={<Bolt className="w-7 h-7" />}
          variant="fancy"
        />
        <StatsCard
          title="Testimonials"
          value={profile.testimonials?.length || 0}
          icon={<Star className="w-7 h-7" />}
          variant="fancy"
        />
      </div>

      {/* GitHub Calendar */}
      <div className="max-w-fit mx-auto mt-4 xs:p-2 md:p-1 relative z-30">
        <div className="bg-background rounded-md p-4 bg-gradient-to-br from-black/70 via-primary/5 to-black/70 backdrop-blur-sm border border-white/10 ">
          <div
            className="scrollbar-hide"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                minWidth: "max-content",
                width: "fit-content",
              }}
            >
              <GitHubCalendar
                username="glassesboyy"
                blockSize={15}
                blockMargin={4}
                fontSize={10}
                hideMonthLabels
                hideColorLegend
                hideTotalCount
                style={{
                  color: "var(--color-calendar-text)",
                }}
                theme={colorTheme}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Curved Background Section */}
      <div className="relative -mt-28 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] z-20">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </>
  );
}
