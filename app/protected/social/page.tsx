"use client";

import { SocialDataTable } from "@/components/data-table/social-data-table";
import { Button } from "@/components/ui/button";
import { useSocials } from "@/hooks/social-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function SocialPage() {
  const { socials, fetchSocials, deleteSocial, bulkDeleteSocials } =
    useSocials();

  useEffect(() => {
    fetchSocials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Social Media</h1>
        <Link href="/protected/social/create">
          <Button>Create New Social Media</Button>
        </Link>
      </div>
      <SocialDataTable
        data={socials}
        onDelete={deleteSocial}
        onBulkDelete={bulkDeleteSocials}
      />
    </div>
  );
}
