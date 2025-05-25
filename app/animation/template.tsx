"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: {
    opacity: 0,
    y: "100%",
    rotateX: "45deg",
    transformOrigin: "top",
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: "0deg",
    transformOrigin: "top",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    rotateX: "-45deg",
    transformOrigin: "bottom",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface TemplateProps {
  children: React.ReactNode;
}

export function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  return (
    <div className="relative perspective-1000 min-h-screen">
      {" "}
      {/* Removed h-screen and overflow-hidden */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="relative z-10 pb-8">
            {" "}
            {/* Added padding bottom */}
            {children}
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
