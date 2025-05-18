"use client";

import { TechnologyDataTable } from "@/components/data-table/technology-data-table";
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
  }, []);

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Technologies</h1>
        <Link href="/protected/technology/create">
          <Button>Create New Technology</Button>
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
