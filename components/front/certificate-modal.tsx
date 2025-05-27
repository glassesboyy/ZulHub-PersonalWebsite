"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Certificate } from "@/types/certificate";
import { motion } from "framer-motion";
import Image from "next/image";
import { Spotlight } from "./spotlight";
import { Tilt } from "./tilt";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <div className="p-1">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-primary/10">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-xl" />
          <div className="absolute top-0 right-0 w-20 h-20 translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-xl" />
          <div className="absolute -z-10 inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

          {/* Top Decorative Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <DialogHeader className="relative">
            {/* Decorative Badge */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 rounded-full border border-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
              </div>
            </div>

            <DialogTitle className="font-[audioWide] text-xl uppercase tracking-widest text-center text-primary/80 pt-6">
              {certificate.title}
            </DialogTitle>

            {/* Decorative Separator */}
            <div className="relative h-[1.5px] w-80 mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-sm" />
            </div>
          </DialogHeader>

          <div className="relative">
            {/* Corner Accents for Image Container */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary/30" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary/30" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary/30" />

            <Tilt
              rotationFactor={2}
              style={{ transformOrigin: "center center" }}
              springOptions={{
                stiffness: 100,
                damping: 10,
                mass: 0.2,
              }}
              className="group relative w-full rounded-md bg-background/90 border border-primary/10 hover:border-primary/30 overflow-hidden"
            >
              <Spotlight
                className="from-primary/20 via-primary/10 to-primary/5"
                size={400}
              />
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[16/9]"
              >
                <Image
                  src={certificate.certificate_image}
                  alt={certificate.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority
                />
              </motion.div>
            </Tilt>
          </div>

          <div className="relative flex justify-between items-center gap-2 mt-2">
            {/* Left side - Issuer and Year with decoration */}
            <div className="flex items-center gap-2">
              <div className="text-primary/60 text-xs">
                <span>{certificate.issuer}</span>
                <span className="mx-2">•</span>
                <span>{certificate.year}</span>
              </div>
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="gradient"
                onClick={() =>
                  window.open(
                    certificate.certificate_image,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="text-xs relative overflow-hidden group"
              >
                <span className="relative z-10">View Full Image</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="text-xs relative overflow-hidden group"
              >
                <span className="relative z-10">Close</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </Button>
            </div>
          </div>

          {/* Bottom Decorative Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
