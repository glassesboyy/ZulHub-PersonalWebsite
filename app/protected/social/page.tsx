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
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Social Media
        </h1>
        <Link href="/protected/social/create">
          <Button className="w-full xs:w-auto">Create New Social Media</Button>
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
