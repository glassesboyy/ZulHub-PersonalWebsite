"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: {
    opacity: 0,
    y: "100%",
    rotateX: "45deg",
    transformOrigin: "top",
    boxShadow: "0 -10px 20px rgba(0,0,0,0.2)",
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: "0deg",
    transformOrigin: "top",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
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
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
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
    <div className="relative perspective-1000 h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen bg-background/80 backdrop-blur-sm rounded-t-3xl shadow-2xl"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="relative z-10">{children}</div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
