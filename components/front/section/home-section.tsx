"use client";

import { BadgeFe } from "@/components/front/badge-fe";
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
    <div className="flex flex-col justify-center items-center pt-6 z-10 relative">
      <BadgeFe label="Glassesboyy Personal Web" className="my-2" />
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
  );
}
