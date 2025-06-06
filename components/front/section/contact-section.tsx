"use client";

import { BadgeFe } from "@/components/front/badge-fe";
import { Globe } from "@/components/front/globe";
import { Button } from "@/components/ui/button";
import { useSocials } from "@/hooks/social-hooks";
import * as TablerIcons from "@tabler/icons-react";
import { useEffect } from "react";

type IconKey = keyof typeof TablerIcons;

export function ContactSection() {
  const { socials, fetchSocials } = useSocials();

  useEffect(() => {
    fetchSocials();
  }, [fetchSocials]);

  const handleSocialClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-4">
        <div className="space-y-1">
          <BadgeFe label="Get In Touch" />
          <div className="space-y-1">
            <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
              Contact Me
            </span>
            <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
              Let&apos;s connect and discuss how we can work together to bring
              your ideas to life. Feel free to reach out for collaborations,
              opportunities, or just a friendly chat.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Docks */}
      <div className="flex items-center justify-center gap-1 w-full relative z-20">
        {socials.map((social) => {
          const IconComponent = TablerIcons[
            social.icon as IconKey
          ] as React.ComponentType<{
            size: number;
            className?: string;
          }>;

          return IconComponent ? (
            <Button
              key={social.id}
              variant="ghost"
              size="icon"
              onClick={() => handleSocialClick(social.link)}
              className="relative rounded-md p-1 group hover:bg-primary/10 
                        transition-all duration-300 ease-in-out
                        before:absolute before:inset-0 before:rounded-md
                        before:border before:border-primary/10 before:scale-100
                        hover:before:scale-150 hover:before:opacity-0
                        before:transition-all before:duration-500 before:ease-in-out
                        after:absolute after:inset-0 after:rounded-md
                        after:border after:border-primary/10 after:scale-100
                        hover:after:scale-125 hover:after:opacity-0
                        after:transition-all after:duration-500 after:ease-in-out
                        hover:transform hover:scale-110
                        cursor-pointer"
            >
              <IconComponent
                size={30}
                className="text-foreground/70 group-hover:text-primary 
                          transition-all duration-300 group-hover:scale-110"
              />
              <span
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 
                            opacity-0 group-hover:opacity-100 text-xxxs text-primary/70
                            transition-all duration-300 whitespace-nowrap"
              >
                {social.name || social.icon.replace(/^Brand/, "")}
              </span>
            </Button>
          ) : null;
        })}
      </div>

      {/* Globe Section - Centered */}
      <div className="flex justify-center -mt-10 relative z-10">
        <div className="relative flex items-center justify-center overflow-hidden rounded-md bg-background/50 backdrop-blur-sm w-full h-[520px]">
          <Globe className="scale-90" />
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
        </div>
      </div>
    </>
  );
}
