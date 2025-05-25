"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  tooltip?: string; // Add tooltip property
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const defaultTabs: Tab[] = [
  {
    id: "tab1",
    label: "Tab 1",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Tab 1"
          className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />

        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 1
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1506543730435-e2c1d4553a84?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Tab 2"
          className="rounded-lg w-full h-60 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 2
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab3",
    label: "Tab 3",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1522428938647-2baa7c899f2f?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Tab 3"
          className="rounded-lg w-full h-60 object-cover mt-0 !m-0  shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 3
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-3xl flex flex-col gap-y-3", className)}>
      {/* Tab buttons */}
      <div className="flex justify-center">
        <div className="w-fit flex gap-3 flex-wrap bg-background/90 border border-primary/10 hover:border-primary/20 backdrop-blur-sm p-1.5 rounded-xl transition-all duration-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-1 text-xs tracking-wider rounded-lg text-foreground/80 outline-none group"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-gradient-to-t from-background/90 to-muted/90 border border-primary/10  shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm !rounded-lg"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className="relative z-10 font-[Audiowide]">
                {tab.label}
              </span>

              {/* Updated tooltip to appear above */}
              {tab.tooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.15,
                      ease: "easeOut",
                    },
                  }}
                  className="z-50 absolute hidden group-hover:block bottom-full  -translate-x-1/2 mb-2 w-max"
                >
                  <div className="relative px-3 py-1 text-xxxs bg-background/95 border border-primary/10 rounded-md shadow-lg backdrop-blur-sm">
                    {tab.tooltip}
                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-1 -translate-x-1/2 w-2 h-2 bg-background/95 border-r border-b border-primary/10 transform rotate-45" />
                  </div>
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="px-1 py-2 bg-gradient-to-b from-background/90 to-muted/70 border border-primary/10 hover:border-primary/20 backdrop-blur-sm rounded-xl h-[420px] transition-all duration-300">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
                className="h-full overflow-y-auto flex flex-col gap-4 p-4 scrollbar-hide"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };
