"use client";

import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/project-hooks";
import { Project } from "@/types/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatedTabs } from "../animated-tabs";
import { BadgeFe } from "../badge-fe";

interface ProjectTab {
  id: string;
  label: string;
  tooltip: string;
  content: React.ReactNode;
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles =
    {
      done: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 hover:from-green-500/30 hover:to-emerald-500/30 border-green-500/30",
      "on process":
        "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 hover:from-blue-500/30 hover:to-cyan-500/30 border-blue-500/30",
      "on hold":
        "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 hover:from-yellow-500/30 hover:to-orange-500/30 border-yellow-500/30",
      planned:
        "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 hover:from-gray-500/30 hover:to-slate-500/30 border-gray-500/30",
    }[status] ||
    "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400";

  return (
    <div className="flex flex-col gap-2 max-w-fit">
      <span className="text-xs font-medium text-foreground/60">Status:</span>
      <span
        className={`px-3 py-1 rounded-full text-xxs uppercase tracking-wide transition-all duration-300 hover:shadow-lg ${statusStyles}`}
      >
        {status}
      </span>
    </div>
  );
};

const ProjectContent = ({ project }: { project: Project }) => (
  <>
    {/* Main container - Add relative and z-index */}
    <div className="relative z-10 flex flex-col gap-2">
      <div className="relative h-[280px] w-full flex-shrink-0 overflow-hidden rounded-md ring-1 ring-border/10 hover-scale">
        <Image
          src={project.project_image}
          alt={project.name}
          fill
          className="object-cover transition-all duration-500 hover:scale-110"
        />
      </div>

      <div className="flex flex-col gap-6 pb-4 px-4 pt-2 rounded-md transition-all duration-300">
        {/* Title */}
        <div className="space-y-6">
          <h2 className="text-xl font-[audioWide] uppercase tracking-wide font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {project.name}
          </h2>

          {/* Simple separator */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="px-3 py-1 bg-gradient-to-t from-background/90 to-muted/90 border border-primary/10 hover:border-primary/20 text-xxs rounded-full transition-all duration-300"
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
          <h3 className="text-xs font-medium text-foreground/60">
            Description:
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Project Link - Add relative and z-index */}
        {project.link && (
          <div className="relative z-20 space-y-2">
            <h3 className="text-xs font-medium text-foreground/60">
              Project Link:
            </h3>
            <Button variant="gradient" size="sm" className="group" asChild>
              <Link href={project.link} target="_blank">
                View Project
                <span className="transform transition-all duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>
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
          Discover a collection of projects built with creativity, usability,
          and technical versatility spanning platforms to solve real-world
          problems with user-focused design.
        </p>
      </div>
    </div>
  </div>
);

const ProjectShowcase = ({ projectTabs }: { projectTabs: ProjectTab[] }) => (
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
      tooltip: project.name,
      content: <ProjectContent project={project} />,
    }));
  }, [projects]);

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <>
      <ProjectHeader />
      <div className="relative z-10">
        <ProjectShowcase projectTabs={projectTabs} />
      </div>
      <div className="relative -mt-24 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
    </>
  );
};

export default ProjectSection;
