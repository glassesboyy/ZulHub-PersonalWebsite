"use client";

import { useProjects } from "@/hooks/project-hooks";
import { Project } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatedTabs } from "../animated-tabs";
import { BadgeFe } from "../badge-fe";

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles =
    {
      done: "bg-green-500/20 text-green-500",
      "on process": "bg-blue-500/20 text-blue-500",
      "on hold": "bg-yellow-500/20 text-yellow-500",
      planned: "bg-gray-500/20 text-gray-500",
    }[status] || "bg-gray-500/20 text-gray-500";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-white/60">Status:</span>
      <span className={`px-3 py-1 rounded-full text-xs ${statusStyles}`}>
        {status}
      </span>
    </div>
  );
};

const ProjectContent = ({ project }: { project: Project }) => (
  <>
    {/* Image Section */}
    <div className="relative h-[250px]  w-full flex-shrink-0">
      <Image
        src={project.project_image}
        alt={project.name}
        fill
        className="rounded-xl object-cover shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-xl font-[audioWide] tracking-wide font-medium text-white">
          {project.name}
        </h2>
        <div className="h-[1px] w-full bg-primary/20" />
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-1 bg-primary/10 text-primary text-xxs rounded-full"
            >
              {tech.name}
            </span>
          ))}
        </div>
      )}

      {/* Status */}
      <StatusBadge status={project.status} />

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-white/60">Description:</h3>
        <p className="text-xs text-gray-200 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Project Link */}
      {project.link && (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-white/60">Project Link:</h3>
          <Link
            href={project.link}
            target="_blank"
            className="text-primary hover:underline text-xs inline-flex items-center gap-2 group"
          >
            View Project
            <span className="transform transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      )}
    </div>
  </>
);

const ProjectHeader = () => (
  <div className="text-center mb-8">
    <div className="space-y-1">
      <BadgeFe label="My Project Gallery" />
      <div className="space-y-1">
        <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
          Project Showcase
        </span>
        <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
          Explore my portfolio of diverse projects spanning web, mobile, and
          desktop applications. Each project demonstrates my commitment to
          creating innovative and user-centric solutions.
        </p>
      </div>
    </div>
  </div>
);

const ProjectShowcase = ({ projectTabs }: { projectTabs: any[] }) => (
  <section className="w-full">
    <div>
      <AnimatedTabs tabs={projectTabs} className="mx-auto" />
    </div>
  </section>
);

const ProjectSection = () => {
  const { projects, fetchProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects();
      setIsLoading(false);
    };
    loadProjects();
  }, [fetchProjects]);

  const projectTabs = useMemo(() => {
    return projects.map((project: Project, index: number) => ({
      id: project.id.toString(),
      label: `Project ${index + 1}`,
      content: <ProjectContent project={project} />,
    }));
  }, [projects]);

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <>
      <ProjectHeader />
      <ProjectShowcase projectTabs={projectTabs} />
    </>
  );
};

export default ProjectSection;
