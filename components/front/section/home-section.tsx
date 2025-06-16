"use client";

import { BadgeFe } from "@/components/front/badge-fe";
import { Spinner } from "@/components/front/spinner";
import { StarBorder } from "@/components/ui/star-border";
import { Profile } from "@/types/profiles";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HomeSection() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .single();
      setProfile(data);
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner variant="infinite" size={28} />
        <p className="text-xs text-foreground/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center relative min-h-screen">
      {/* Top Curved Background */}
      <div className="absolute top-14 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] z-20">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 bottom-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-b border-border/40 bg-background dark:bg-muted" />
      </div>

      {/* Content Section */}
      <div className="z-30 flex flex-col items-center justify-center">
        <BadgeFe label="Personal Website" className="my-2" />
        <h1 className="text-4xl tracking-widest uppercase font-bold text-white font-[Audiowide] text-center">
          {profile?.full_name}
        </h1>
        <p className="text-lg text-white/80 text-center font-[Montserrat] tracking mb-2 font-light max-w-2xl">
          {profile?.tagline}
        </p>
        <div className="flex gap-6 flex-col xs:flex-col sm:flex-row">
          <StarBorder
            as={Link}
            size="sm"
            href="/public/contact"
            className="tracking-wide text-base"
          >
            GET IN TOUCH
          </StarBorder>
          <StarBorder
            as="a"
            href={profile?.cv || "#"}
            target="_blank"
            size="sm"
            rel="noopener noreferrer"
            className="tracking-wide text-base"
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
      </div>

      {/* Bottom Curved Background */}
      <div className="absolute bottom-10 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] z-20">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </div>
  );
}
