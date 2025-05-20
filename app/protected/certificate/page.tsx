"use client";

import { CertificateDataTable } from "@/components/data-table/certificate-data-table";
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
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <Link href="/protected/certificate/create">
          <Button>Create New Certificate</Button>
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
