"use client";

import { BadgeFe } from "@/components/front/badge-fe";
import { Spotlight } from "@/components/front/spotlight";
import { Tilt } from "@/components/front/tilt";
import { Button } from "@/components/ui/button";
import { useCertificates } from "@/hooks/certificate-hooks";
import { Certificate } from "@/types/certificate";
import { AnimatePresence, motion } from "framer-motion"; // Add this import
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
  <div className="w-full flex flex-col gap-2 border border-primary/10 rounded-lg p-2 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
    {/* Image with Tilt */}
    <Tilt
      rotationFactor={4}
      isRevese
      style={{ transformOrigin: "center center" }}
      springOptions={{
        stiffness: 26.7,
        damping: 4.1,
        mass: 0.2,
      }}
      className="group relative rounded-lg bg-background/90 border border-primary/10 hover:border-primary/30 overflow-hidden"
    >
      <Spotlight
        className="z-10 from-primary/20 via-primary/10 to-primary/5 blur-2xl"
        size={248}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
      />
      <img
        src={certificate.certificate_image}
        alt={certificate.title}
        className="w-full h-[125px] object-cover transition-all duration-700 group-hover:scale-110"
      />
    </Tilt>

    {/* Content Container with separate Tilt */}
    <Tilt
      rotationFactor={2}
      style={{ transformOrigin: "center center" }}
      springOptions={{
        stiffness: 100,
        damping: 10,
        mass: 0.2,
      }}
      className="group relative"
    >
      <Spotlight
        className="z-10 from-primary/10 via-primary/5 to-primary/0 blur-xl"
        size={200}
        springOptions={{
          stiffness: 100,
          damping: 10,
          mass: 0.2,
        }}
      />
      <div className="px-3 pt-3 pb-2 flex flex-col gap-4 bg-gradient-to-b from-background/90 to-muted/90 rounded-lg transition-all duration-300">
        <h3 className="font-[Audiowide] text-xxs font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
          {certificate.title}
        </h3>
        <div className="w-full flex justify-between items-center">
          <span className="text-xxxs text-primary/80 truncate max-w-[100px]">
            {certificate.issuer}
          </span>
          <span className="text-xxxs text-primary/60 flex-shrink-0">
            {certificate.year}
          </span>
        </div>
      </div>
    </Tilt>
  </div>
);

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-center items-center gap-2 mt-4">
    <Button
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="text-xxxs xs:text-xxs"
    >
      Previous
    </Button>
    <div className="flex items-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={currentPage === i + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(i + 1)}
          className="text-xs w-8"
        >
          {i + 1}
        </Button>
      ))}
    </div>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="text-xs"
    >
      Next
    </Button>
  </div>
);

const CertificateSection = () => {
  const { certificates, fetchCertificates } = useCertificates();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadCertificates = async () => {
      await fetchCertificates();
      setIsLoading(false);
    };
    loadCertificates();
  }, [fetchCertificates]);

  // Calculate pagination
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCertificates = certificates.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of certificate section smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-sm text-foreground/60">Loading certificates...</p>
      </div>
    );
  }

  if (!certificates.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-sm text-foreground/60">No certificates found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="space-y-1">
          <BadgeFe label="My Certifications" />
          <div className="space-y-1">
            <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
              Certificates
            </span>
            <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
              A collection of my professional certifications and achievements in
              various technical domains.
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Grid with Animation */}
      <div className="min-h-fit">
        {" "}
        {/* Add fixed minimum height to prevent layout shift */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
          >
            {currentCertificates.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0.1,
                }}
              >
                <CertificateCard certificate={cert} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </motion.div>
    </>
  );
};

export default CertificateSection;
