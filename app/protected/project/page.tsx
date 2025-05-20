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
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link href="/protected/project/create">
          <Button>Create New Project</Button>
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
