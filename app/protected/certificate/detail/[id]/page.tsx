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

  if (!certificate) return <div>Loading...</div>;

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Certificate Details
      </h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{certificate.title}</h2>
          <div className="border border-white  rounded-md py-1 px-2">
            <div className="relative w-full h-[250px]">
              <Image
                src={certificate.certificate_image}
                alt={certificate.title}
                className="rounded-md"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => router.push("/protected/certificate")}
          >
            Back to List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/protected/certificate/edit/${certificate.id}`)
            }
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
