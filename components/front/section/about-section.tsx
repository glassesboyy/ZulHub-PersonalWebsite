"use client";

import { BadgeFe } from "@/components/front/badge-fe";
import { Spotlight } from "@/components/front/spotlight";
import { StarBorder } from "@/components/ui/star-border";
import { useProfiles } from "@/hooks/profile-hooks";
import { Profile } from "@/types/profiles";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchProfiles } = useProfiles();

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
        <p className="text-sm text-foreground/60">Loading profile...</p>
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
              Front-End Developer with experience in building responsive user
              interfaces and a growing interest in AI automation using N8N to
              streamline processes across various fields.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative group">
          <Spotlight className="-top-32 left-0 md:left-12 md:-top-20 z-10 from-primary/20 via-primary/10 to-primary/5" />
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/0 backdrop-blur-sm group-hover:from-primary/30 transition-all duration-500" />
            <div className="absolute inset-1 rounded-2xl overflow-hidden border border-primary/10 group-hover:border-primary/20 transition-all duration-500">
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
          className="space-y-1"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-[Audiowide] uppercase tracking-wide text-primary/80">
              {profile.full_name}
            </h2>
            <div className="space-y-4 text-xxs text-foreground/70">
              <div className="whitespace-pre-wrap text-justify">
                {profile.bio}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex gap-4 flex-col xs:flex-col sm:flex-row">
            <StarBorder
              as={Link}
              href="/public/contact"
              size="sm"
              className="tracking-wide w-full"
            >
              GET IN TOUCH
            </StarBorder>
            <StarBorder
              as="a"
              href={profile?.cv || "#"}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="tracking-wide w-full"
              variant="secondary"
              onClick={(e) => {
                if (!profile?.cv) {
                  e.preventDefault();
                  alert("CV not available");
                }
              }}
            >
              DOWNLOAD CV
            </StarBorder>
          </div>
        </motion.div>
      </div>

      {/* Curved Background Section */}
      <div className="relative -mt-20 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </>
  );
}
