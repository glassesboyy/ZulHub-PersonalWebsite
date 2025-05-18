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
  }, [resolvedParams.id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Project Details
      </h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm ${
              project.status === "planned"
                ? "bg-gray-600"
                : project.status === "on process"
                  ? "bg-blue-600"
                  : project.status === "on hold"
                    ? "bg-yellow-600"
                    : "bg-green-600"
            }`}
          >
            {project.status}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Project Image</h3>
          <div className="border border-white  rounded-md py-1 px-2">
            <div className="relative w-full h-[120px] ">
              <Image
                src={project.project_image}
                alt={project.name}
                fill
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: Technology) => (
                <span
                  key={tech.id}
                  className="px-3 py-1 bg-black border border-white/70 rounded-full text-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => router.push("/protected/project")}
          >
            Back to List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/protected/project/edit/${project.id}`)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
