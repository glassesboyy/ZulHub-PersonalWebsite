"use client";

import { RecapDataTable } from "@/components/dashboard/data-table/recap-data-table";
import { StatsCard } from "@/components/dashboard/statistic";
import { useCertificates } from "@/hooks/certificate-hooks";
import { useProfiles } from "@/hooks/profile-hooks";
import { useProjects } from "@/hooks/project-hooks";
import { useSocials } from "@/hooks/social-hooks";
import { useTechnologies } from "@/hooks/technology-hooks";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { Certificate } from "@/types/certificate";
import { Project } from "@/types/projects";
import { RecapColumn } from "@/types/recap";
import { Social } from "@/types/socials";
import { Technology } from "@/types/technology";
import { Testimonial } from "@/types/testimonials";
import * as TablerIcons from "@tabler/icons-react";
import { IconProps } from "@tabler/icons-react";
import {
  Award,
  FolderGit,
  Globe2,
  MessageSquareText,
  MonitorSmartphone,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import * as Si from "react-icons/si";

interface ProfileStats {
  certificates: Certificate[];
  projects: Project[];
  technologies: Technology[];
  socials: Social[];
  testimonials: Testimonial[];
}

type RecapSection<T> = {
  title: string;
  data: T[];
  columns: RecapColumn<T>[];
  managePath: string;
};

type RecapSections = Array<
  | RecapSection<Certificate>
  | RecapSection<Project>
  | RecapSection<Social>
  | RecapSection<Technology>
  | RecapSection<Testimonial>
>;

function renderRecapTable<T extends Record<string, unknown>>(
  section: RecapSection<T>
) {
  return (
    <RecapDataTable<T>
      key={section.title}
      title={section.title}
      data={section.data}
      columns={section.columns}
      managePath={section.managePath}
    />
  );
}

export default function ProtectedPage() {
  const { certificates, fetchCertificates } = useCertificates();
  const { projects, fetchProjects } = useProjects();
  const { socials, fetchSocials } = useSocials();
  const { technologies, fetchTechnologies } = useTechnologies();
  const { testimonials, fetchTestimonials } = useTestimonials();
  const { fetchProfiles } = useProfiles();
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);

  useEffect(() => {
    fetchCertificates();
    fetchProjects();
    fetchSocials();
    fetchTechnologies();
    fetchTestimonials();
    loadProfileStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfileStats = async () => {
    const profiles = await fetchProfiles();
    if (profiles && profiles.length > 0) {
      setProfileStats(profiles[0]);
    }
  };

  const recapSections: RecapSections = [
    {
      title: "Certificates",
      data: certificates,
      columns: [
        {
          header: "Title",
          accessorKey: "title",
          cell: (value: string) => (
            <div className="truncate max-w-[150px] xs:max-w-[200px] md:max-w-[250px]">
              {value}
            </div>
          ),
        },
        {
          header: "Certificate",
          accessorKey: "certificate_image",
          cell: (value: string) => (
            <div className="relative w-16 h-16">
              <Image
                src={value || "/placeholder.png"}
                alt="Certificate"
                fill
                className="rounded-md object-cover"
                sizes="(max-width: 64px) 100vw, 64px"
              />
            </div>
          ),
        },
      ] as RecapColumn<Certificate>[],
      managePath: "/protected/certificate",
    },
    {
      title: "Projects",
      data: projects,
      columns: [
        { header: "Name", accessorKey: "name" },
        {
          header: "Status",
          accessorKey: "status",
          cell: (value: string) => (
            <div
              className={`px-2 py-1 rounded-full text-center text-white ${
                value === "done"
                  ? "bg-green-600"
                  : value === "on process"
                    ? "bg-blue-600"
                    : value === "on hold"
                      ? "bg-yellow-600"
                      : "bg-gray-600"
              }`}
            >
              {value}
            </div>
          ),
        },
        {
          header: "Image",
          accessorKey: "project_image",
          cell: (value: string) => (
            <div className="relative w-16 h-16">
              <Image
                src={value || "/placeholder.png"}
                alt="Project"
                fill
                className="rounded-md object-cover"
                sizes="(max-width: 64px) 100vw, 64px"
              />
            </div>
          ),
        },
      ] as RecapColumn<Project>[],
      managePath: "/protected/project",
    },
    {
      title: "Social Media",
      data: socials,
      columns: [
        { header: "Name", accessorKey: "name" },
        {
          header: "Link",
          accessorKey: "link",
          cell: (value: string) => (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-600/50 transition-colors duration-300"
            >
              View Link
            </a>
          ),
        },
        {
          header: "Icon",
          accessorKey: "icon",
          cell: (value: string) => {
            const IconComponent = TablerIcons[
              value as keyof typeof TablerIcons
            ] as React.FC<IconProps>;
            return IconComponent && <IconComponent size={20} />;
          },
        },
      ] as RecapColumn<Social>[],
      managePath: "/protected/social",
    },
    {
      title: "Technologies",
      data: technologies,
      columns: [
        { header: "Name", accessorKey: "name" },
        {
          header: "Icon",
          accessorKey: "icon",
          cell: (value: string) => {
            const IconComponent = Si[value as keyof typeof Si] as IconType;
            return IconComponent && <IconComponent size={20} />;
          },
        },
      ] as RecapColumn<Technology>[],
      managePath: "/protected/technology",
    },
    {
      title: "Testimonials",
      data: testimonials,
      columns: [
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        {
          header: "Status",
          accessorKey: "is_approved",
          cell: (value: boolean) => (
            <div
              className={`px-2 py-1 rounded-full text-center text-white ${
                value ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              {value ? "Approved" : "Pending"}
            </div>
          ),
        },
      ] as RecapColumn<Testimonial>[],
      managePath: "/protected/testimonial",
    },
  ];

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col gap-1 xs:gap-2">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-xxs xs:text-xs md:text-sm text-muted-foreground">
          Here&apos;s a quick overview of all your data
        </p>
      </div>

      {/* Stats Cards */}
      {profileStats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <StatsCard
            title="Certificates"
            value={profileStats.certificates?.length || 0}
            icon={<Award />}
            variant="bordered"
          />
          <StatsCard
            title="Projects"
            value={profileStats.projects?.length || 0}
            icon={<FolderGit />}
            variant="bordered"
          />
          <StatsCard
            title="Technologies"
            value={profileStats.technologies?.length || 0}
            icon={<MonitorSmartphone />}
            variant="bordered"
          />
          <StatsCard
            title="Socials"
            value={profileStats.socials?.length || 0}
            icon={<Globe2 />}
            variant="bordered"
          />
          <StatsCard
            title="Testimonials"
            value={profileStats.testimonials?.length || 0}
            icon={<MessageSquareText />}
            variant="bordered"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 md:gap-6">
        {recapSections.map((section) => {
          if ("certificate_image" in (section.data[0] || {})) {
            return renderRecapTable<Certificate>(
              section as RecapSection<Certificate>
            );
          }
          if ("project_image" in (section.data[0] || {})) {
            return renderRecapTable<Project>(section as RecapSection<Project>);
          }
          if ("link" in (section.data[0] || {})) {
            return renderRecapTable<Social>(section as RecapSection<Social>);
          }
          if (
            "icon" in (section.data[0] || {}) &&
            !("link" in (section.data[0] || {}))
          ) {
            return renderRecapTable<Technology>(
              section as RecapSection<Technology>
            );
          }
          return renderRecapTable<Testimonial>(
            section as RecapSection<Testimonial>
          );
        })}
      </div>
    </div>
  );
}
