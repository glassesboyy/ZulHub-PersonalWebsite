"use client";

import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/project-hooks";
import { Technology } from "@/types/technology";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface ProjectWithTech {
  id: number;
  name: string;
  description: string;
  status: string;
  project_image: string;
  technologies: Technology[];
  link?: string;
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [project, setProject] = useState<ProjectWithTech | null>(null);
  const router = useRouter();
  const { fetchProjectById } = useProjects();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadProject() {
      const data = await fetchProjectById(resolvedParams.id);
      if (data) {
        setProject(data);
      }
    }
    loadProject();
  }, [resolvedParams.id, fetchProjectById]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Project Details
        </h1>
        <div className="flex w-full xs:w-auto xs:flex-col md:flex-row gap-2 xs:gap-4">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/protected/project/edit/${project?.id}`)
            }
            className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Edit Project
          </Button>
          <Button
            onClick={() => router.push("/protected/project")}
            className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Back to List
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 xs:gap-6 md:gap-8">
        {/* Project Header Card */}
        <div className="rounded-lg border bg-card p-4 xs:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative aspect-video md:w-[300px] rounded-md overflow-hidden">
              <Image
                src={project?.project_image || "/placeholder.png"}
                alt={project?.name || "Project"}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 320px) 100vw, (max-width: 768px) 80vw, 300px"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-lg xs:text-xl md:text-2xl font-semibold">
                  {project?.name}
                </h2>
                <div className="h-[1px] w-20 bg-primary/20 my-3" />
              </div>

              {/* Technologies Section with Label */}
              {project?.technologies && project.technologies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xxs xs:text-xs md:text-sm text-muted-foreground font-medium">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: Technology) => (
                      <span
                        key={tech.id}
                        className="px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-default border border-primary/20 rounded-full text-xxs xs:text-xs md:text-sm"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Section with Label */}
              <div className="space-y-2">
                <span className="text-xxs xs:text-xs md:text-sm text-muted-foreground font-medium">
                  Project Status:
                </span>
                <div
                  className={`px-4 py-1 w-fit rounded-full uppercase text-xxs xs:text-xs md:text-sm font-medium tracking-wide text-white ${
                    project?.status === "planned"
                      ? "bg-gray-600"
                      : project?.status === "on process"
                        ? "bg-blue-600"
                        : project?.status === "on hold"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                  }`}
                >
                  {project?.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid gap-4 xs:gap-6 grid-cols-1">
          {/* Description Section */}
          <div className="rounded-lg border bg-card p-4 xs:p-6 order-2 lg:order-1">
            <h3 className="text-sm xs:text-base md:text-lg font-medium mb-4">
              Project Description
            </h3>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="rounded-md bg-muted/50 p-4 xs:p-6">
                <p className="whitespace-pre-wrap text-pretty text-xxs xs:text-xs md:text-sm text-muted-foreground">
                  {project?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Project Link Section */}
          {project?.link && (
            <div className="rounded-lg border bg-card p-4 xs:p-6 space-y-2">
              <h3 className="text-sm xs:text-base md:text-lg font-medium">
                Project Link
              </h3>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xxs xs:text-xs md:text-sm text-primary hover:underline break-all"
              >
                {project.link}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
