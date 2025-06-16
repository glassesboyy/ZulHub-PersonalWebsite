"use client";

import { BadgeFe } from "@/components/front/badge-fe";
import { CertificateModal } from "@/components/front/certificate-modal";
import { Spinner } from "@/components/front/spinner";
import { Spotlight } from "@/components/front/spotlight";
import { Tilt } from "@/components/front/tilt";
import { Button } from "@/components/ui/button";
import { useCertificates } from "@/hooks/certificate-hooks";
import { Certificate } from "@/types/certificate";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

const CertificateCard = ({
  certificate,
  onClick,
}: {
  certificate: Certificate;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="w-full flex flex-col gap-2 border border-primary/10 rounded-md p-2 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 cursor-pointer"
  >
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
      className="group relative rounded-md bg-background/90 border border-primary/10 hover:border-primary/30 overflow-hidden"
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
      <div className="relative w-full h-[125px]">
        <Image
          src={certificate.certificate_image}
          alt={certificate.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
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
      <div className="px-3 pt-3 pb-2 flex flex-col gap-4 bg-gradient-to-b from-background/90 to-muted/90 rounded-md transition-all duration-300">
        <h3 className="text-xs font-[audioWide] uppercase tracking-wide text-primary/80 truncate">
          {certificate.title}
        </h3>
        <div className="w-full flex justify-between items-center">
          <span className="text-xxxs text-primary/60 truncate max-w-[100px]">
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
  <div className="flex justify-center items-center gap-2 mt-4 relative z-50">
    <Button
      variant="gradient"
      size="sm"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="text-xxxs xs:text-xxs relative"
    >
      Previous
    </Button>
    <div className="flex items-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i + 1}
          variant={currentPage === i + 1 ? "gradient" : "ghost"}
          size="sm"
          onClick={() => onPageChange(i + 1)}
          className="text-xs w-8 relative"
        >
          {i + 1}
        </Button>
      ))}
    </div>
    <Button
      variant="gradient"
      size="sm"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="text-xs relative"
    >
      Next
    </Button>
  </div>
);

const CertificateSection = () => {
  const { certificates, fetchCertificates } = useCertificates();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Spinner variant="infinite" size={28} />
        <p className="text-xs text-foreground/60">Loading Certificates...</p>
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
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-8">
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
                <CertificateCard
                  certificate={cert}
                  onClick={() => {
                    setSelectedCertificate(cert);
                    setIsModalOpen(true);
                  }}
                />
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
        className="relative z-50"
      >
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </motion.div>

      {/* Curved Background Section */}
      <div className="relative -mt-28 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCertificate(null);
        }}
      />
    </div>
  );
};

export default CertificateSection;
