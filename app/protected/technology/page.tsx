"use client";

import { TechnologyDataTable } from "@/components/dashboard/data-table/technology-data-table";
import { Button } from "@/components/ui/button";
import { useTechnologies } from "@/hooks/technology-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function TechnologyPage() {
  const {
    technologies,
    fetchTechnologies,
    deleteTechnology,
    bulkDeleteTechnologies,
  } = useTechnologies();

  useEffect(() => {
    fetchTechnologies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Technologies
        </h1>
        <Link href="/protected/technology/create">
          <Button className="w-full xs:w-auto">Create New Tech</Button>
        </Link>
      </div>
      <TechnologyDataTable
        data={technologies}
        onDelete={deleteTechnology}
        onBulkDelete={bulkDeleteTechnologies}
      />
    </div>
  );
}
