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
              Let's connect and discuss how we can work together to bring your
              ideas to life. Feel free to reach out for collaborations,
              opportunities, or just a friendly chat.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Docks */}
      <div className="flex items-center justify-center gap-4 w-full">
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
              className="rounded-full p-2 hover:bg-primary/20 transition-colors duration-300"
              onClick={() =>
                window.open(social.link, "_blank", "noopener,noreferrer")
              }
            >
              <IconComponent
                size={24}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              />
            </Button>
          ) : null;
        })}
      </div>

      {/* Globe Section - Centered */}
      <div className="flex justify-center">
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-background/50 backdrop-blur-sm w-full h-[520px]">
          <Globe className="scale-90" />
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
        </div>
      </div>

      {/* Curved Background Section */}
      <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground)),transparent_70%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </>
  );
}
