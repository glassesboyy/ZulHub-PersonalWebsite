"use client";
import { BadgeFe } from "@/components/front/badge-fe";
import { OrbitingCircles } from "@/components/front/orbiting-circles";
import {
  SiEslint,
  SiFigma,
  SiFramer,
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

export function TechStack() {
  return (
    <>
      <div className="text-center">
        <div className="space-y-1">
          <BadgeFe label="My Tech Arsenal" />
          <div className="space-y-1">
            <span className="font-base uppercase tracking-widest text-3xl font-[Audiowide] text-white">
              Technologies Stack
            </span>
            <p className="text-xs text-white/50 max-w-lg mx-auto">
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
          <div className="text-foreground/80 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiJavascript size={35} />
          </div>
          <div className="text-foreground/80 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiTypescript size={35} />
          </div>
          <div className="text-foreground/80 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiReact size={35} />
          </div>
          <div className="text-foreground/80 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiNextdotjs size={35} />
          </div>
          <div className="text-foreground/80 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiVite size={35} />
          </div>
        </OrbitingCircles>

        {/* Middle circle */}
        <OrbitingCircles iconSize={25} radius={100} duration={25} reverse>
          <div className="text-foreground/60 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiTailwindcss size={27} />
          </div>
          <div className="text-foreground/60 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiRedux size={27} />
          </div>
          <div className="text-foreground/60 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiEslint size={27} />
          </div>
          <div className="text-foreground/60 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiFramer size={27} />
          </div>
        </OrbitingCircles>

        {/* Inner circle */}
        <OrbitingCircles iconSize={20} radius={50} duration={20}>
          <div className="text-foreground/40 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiFigma size={20} />
          </div>
          <div className="text-foreground/40 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiGit size={20} />
          </div>
          <div className="text-foreground/40 cursor-pointer hover:scale-125 transition-transform duration-300 hover:text-foreground">
            <SiNpm size={20} />
          </div>
        </OrbitingCircles>
        <div className="absolute -bottom-4 left-0 right-0 text-center text-xs text-foreground/40 pb-4">
          Crafting digital experiences with my favorite tools
        </div>
      </div>

      {/* Curved Background Section */}
      <div className="relative -mt-44 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground)),transparent_70%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </>
  );
}
