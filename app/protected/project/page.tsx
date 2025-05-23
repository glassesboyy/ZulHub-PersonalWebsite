"use client";

import { ProjectDataTable } from "@/components/data-table/project-data-table";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/project-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function ProjectPage() {
  const { projects, fetchProjects, deleteProject, bulkDeleteProjects } =
    useProjects();

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Projects
        </h1>
        <Link href="/protected/project/create">
          <Button className="w-full xs:w-auto">Create New Project</Button>
        </Link>
      </div>
      <ProjectDataTable
        data={projects}
        onDelete={deleteProject}
        onBulkDelete={bulkDeleteProjects}
      />
    </div>
  );
}
