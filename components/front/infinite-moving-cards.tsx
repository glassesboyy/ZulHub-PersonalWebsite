"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "160s");
      }
    }
  };
  return (
    <div className="relative w-full">
      {/* Fade edges with darker background */}
      <div className="absolute left-0 top-0 bottom-0 w-[100px] z-30 bg-gradient-to-r from-background via-background/90 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-[100px] z-30 bg-gradient-to-l from-background via-background/90 to-transparent" />

      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-full overflow-hidden",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-2 py-1 px-[100px]",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item) => (
            <li
              className="relative w-[300px] max-w-full shrink-0 rounded-md border border-zinc-800/50 bg-gradient-to-br from-zinc-900/50 via-zinc-800/90 to-black/90 px-6 py-6 pb-3 md:w-[300px] backdrop-blur-sm transition-all duration-300 hover:border-zinc-700/50 hover:bg-gradient-to-br hover:from-zinc-900/60 hover:via-zinc-800 hover:to-black/95 flex flex-col cursor-pointer hover:scale-[1.02] active:scale-[0.98] ease-in-out"
              style={{
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
                minHeight: "70px",
              }}
              key={item.name}
            >
              <blockquote className="flex flex-col h-full">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-px left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent"
                />
                <span className="relative z-20 text-xxs leading-[1.6] text-primary/90 italic flex-grow">
                  &ldquo;{item.quote}&rdquo;
                </span>
                {/* Separator using SVG for consistent rendering */}
                <svg className="w-full h-[1px] my-2" preserveAspectRatio="none">
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    vectorEffect="non-scaling-stroke"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-zinc-500/40"
                  />
                </svg>
                <div className="relative z-20">
                  <div className="flex flex-col">
                    <span className="text-xxxs font-medium leading-[1.6] text-primary/80">
                      {item.name}
                    </span>
                    <span className="text-xxxxs leading-[1.6] text-primary/60 font-light">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-px left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent"
                />
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
