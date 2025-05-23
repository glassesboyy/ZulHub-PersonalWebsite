"use client";

import { StarBorder } from "@/components/ui/star-border";

interface DownloadCVButtonProps {
  cvUrl: string | null;
}

export function DownloadCVButton({ cvUrl }: DownloadCVButtonProps) {
  return (
    <StarBorder
      as="a"
      href={cvUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      size="sm"
      className="tracking-wide"
      variant="secondary"
      onClick={(e) => {
        if (!cvUrl) {
          e.preventDefault();
          alert("CV not available");
        }
      }}
    >
      DOWNLOAD CV
    </StarBorder>
  );
}
