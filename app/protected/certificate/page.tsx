"use client";

import { CertificateDataTable } from "@/components/dashboard/data-table/certificate-data-table";
import { Button } from "@/components/ui/button";
import { useCertificates } from "@/hooks/certificate-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function CertificatePage() {
  const {
    certificates,
    fetchCertificates,
    deleteCertificate,
    bulkDeleteCertificates,
  } = useCertificates();

  useEffect(() => {
    fetchCertificates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Certificates
        </h1>
        <Link href="/protected/certificate/create">
          <Button className="w-full xs:w-auto">Create New Certificate</Button>
        </Link>
      </div>
      <CertificateDataTable
        data={certificates}
        onDelete={deleteCertificate}
        onBulkDelete={bulkDeleteCertificates}
      />
    </div>
  );
}
