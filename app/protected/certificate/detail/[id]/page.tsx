"use client";

import { Button } from "@/components/ui/button";
import { useCertificates } from "@/hooks/certificate-hooks";
import { Certificate } from "@/types/certificate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const router = useRouter();
  const { fetchCertificateById } = useCertificates();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadCertificate() {
      const data = await fetchCertificateById(resolvedParams.id);
      if (data) {
        setCertificate(data);
      }
    }
    loadCertificate();
  }, [resolvedParams.id, fetchCertificateById]);

  const handleDownload = async () => {
    if (!certificate?.certificate_image) return;

    try {
      // Fetch the image
      const response = await fetch(certificate.certificate_image);
      const blob = await response.blob();

      // Create a temporary link element
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);

      // Set the file name - extract from the original URL or use the title
      const fileName = `${certificate.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${blob.type.split("/")[1]}`;
      downloadLink.download = fileName;

      // Append to document, click, and cleanup
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (!certificate) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Certificate Details
        </h1>
        <div className="flex w-full xs:w-auto xs:flex-col md:flex-row gap-2 xs:gap-4">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/protected/certificate/edit/${certificate?.id}`)
            }
            className="w-full xs:w-auto text-xxs xs:text-xs md:text-sm"
          >
            Edit Certificate
          </Button>
          <Button
            onClick={() => router.push("/protected/certificate")}
            className="w-full  xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Back to List
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xs:gap-6 md:gap-8">
        {/* Certificate Info Card */}
        <div className="rounded-lg border bg-card p-4 xs:p-6">
          <div className="flex flex-col gap-4 xs:gap-6">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-lg xs:text-xl md:text-2xl font-semibold">
                {certificate?.title}
              </h2>
              <div className="mt-2 h-[1px] w-40 bg-primary/20 mx-auto" />
            </div>

            {/* Certificate Image */}
            <div className="relative w-full">
              <div className="aspect-[16/9] relative rounded-lg border bg-muted/50 overflow-hidden">
                <Image
                  src={certificate?.certificate_image || "/placeholder.png"}
                  alt={certificate?.title || "Certificate"}
                  fill
                  className="object-contain p-2"
                  priority
                  sizes="(max-width: 320px) 100vw, (max-width: 768px) 80vw, 50vw"
                />
              </div>
            </div>

            {/* Download/View Actions */}
            <div className="flex flex-col xs:flex-col md:flex-row gap-2 xs:gap-4 mt-2">
              <Button
                variant="outline"
                className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
                onClick={() =>
                  window.open(
                    certificate?.certificate_image,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <svg
                  className="h-3 xs:h-4 w-3 xs:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Full Image
              </Button>
              <Button
                onClick={handleDownload}
                className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
              >
                <svg
                  className="h-3 xs:h-4 w-3 xs:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
