"use client";

import { StarBorder } from "@/components/ui/star-border";
import { Profile } from "@/types/profiles";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HomeSection() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .single();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full relative">
        <div className="flex flex-col justify-center items-center pt-6 px-4 z-10 relative">
          <h1 className="xs:text-2xl md:text-3xl tracking-widest uppercase font-bold text-white font-[Audiowide] text-center">
            {profile?.full_name}
          </h1>
          <p className="xs:text-xxs md:text-xs text-white text-center font-[Montserrat] tracking-wide font-light mb-8">
            {profile?.tagline}
          </p>
          <div className="flex gap-4 flex-col xs:flex-col sm:flex-row">
            <StarBorder
              as={Link}
              href="/public/contact"
              size="sm"
              className="tracking-wide"
            >
              GET IN TOUCH
            </StarBorder>
            <StarBorder
              as="a"
              href={profile?.cv || "#"}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="tracking-wide"
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
      </div>
    </div>
  );
}
