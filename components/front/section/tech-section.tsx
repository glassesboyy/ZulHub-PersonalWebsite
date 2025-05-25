"use client";
import { BadgeFe } from "@/components/front/badge-fe";
import { OrbitingCircles } from "@/components/front/orbiting-circles";
import { useTechnologies } from "@/hooks/technology-hooks";
import { useEffect } from "react";
import * as Si from "react-icons/si";

export function TechSection() {
  const { technologies, fetchTechnologies } = useTechnologies();

  useEffect(() => {
    fetchTechnologies();
  }, []);

  // Dynamic distribution of technologies
  const distributeTechnologies = (techs: any[]) => {
    const total = techs.length;

    // Calculate proportions for each circle
    const outerCount = Math.ceil(total * 0.4); // 40% for outer circle
    const middleCount = Math.ceil(total * 0.35); // 35% for middle circle
    const innerCount = total - outerCount - middleCount; // Remaining for inner circle

    return {
      outer: techs.slice(0, outerCount),
      middle: techs.slice(outerCount, outerCount + middleCount),
      inner: techs.slice(outerCount + middleCount),
    };
  };

  const { outer, middle, inner } = distributeTechnologies(technologies);

  const renderTechIcon = (tech: any, size: number, opacityClass: string) => {
    const IconComponent = Si[tech.icon as keyof typeof Si];
    return IconComponent ? (
      <div
        key={tech.id}
        className={`${opacityClass} cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground`}
      >
        <IconComponent size={size} />
      </div>
    ) : null;
  };

  return (
    <>
      <div className="text-center">
        <div className="space-y-1">
          <BadgeFe label="My Tech Arsenal" />
          <div className="space-y-1">
            <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
              Technologies Stack
            </span>
            <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
              Mastering modern frontend technologies like React, Next.js, and
              Tailwind CSS to create responsive, performance, and visually
              stunning web applications. Bringing designs to life with smooth
              animations and seamless user interactions.
            </p>
          </div>
        </div>
      </div>

      {/* Orbiting Circles Section */}
      <div className="relative flex h-[420px] w-full flex-col items-center justify-center overflow-hidden">
        {/* Outer circle */}
        <OrbitingCircles
          iconSize={35}
          radius={150}
          duration={30}
          className="z-10"
        >
          {outer.map((tech) => renderTechIcon(tech, 35, "text-foreground/80"))}
        </OrbitingCircles>

        {/* Middle circle */}
        <OrbitingCircles iconSize={25} radius={100} duration={25} reverse>
          {middle.map((tech) => renderTechIcon(tech, 27, "text-foreground/60"))}
        </OrbitingCircles>

        {/* Inner circle */}
        <OrbitingCircles iconSize={20} radius={50} duration={20}>
          {inner.map((tech) => renderTechIcon(tech, 20, "text-foreground/40"))}
        </OrbitingCircles>

        <div className="absolute -bottom-4 left-0 right-0 text-center xs:text-xxs md:text-xs text-foreground/40 pb-4">
          Crafting digital experiences with my favorite tools
        </div>
      </div>

      {/* Curved Background Section */}
      <div className="relative -mt-40 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground)),transparent_70%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </>
  );
}
