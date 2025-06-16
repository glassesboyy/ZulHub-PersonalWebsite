"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { title: "Home", href: "/public" },
  { title: "About", href: "/public/about" },
  { title: "Tech", href: "/public/tech" },
  { title: "Certificate", href: "/public/certificate" },
  { title: "Projects", href: "/public/project" },
  { title: "Testimonial", href: "/public/testimonial" },
  { title: "Contact", href: "/public/contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 bg-background/80 backdrop-blur-sm shadow-lg"
        aria-label="Toggle menu"
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="flex flex-col items-center space-y-6 relative z-50"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "text-lg font-medium transition-colors font-[Audiowide] hover:text-primary cursor-pointer",
                    "text-foreground"
                  )}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.title}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
