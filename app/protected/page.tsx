"use client";

import { RecapDataTable } from "@/components/data-table/recap-data-table";
import { useCertificates } from "@/hooks/certificate-hooks";
import { useProjects } from "@/hooks/project-hooks";
import { useSocials } from "@/hooks/social-hooks";
import { useTechnologies } from "@/hooks/technology-hooks";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import * as TablerIcons from "@tabler/icons-react";
import { IconProps } from "@tabler/icons-react";
import Image from "next/image"; // Update this import
import { useEffect } from "react";
import { IconType } from "react-icons";
import * as Si from "react-icons/si";

export default function ProtectedPage() {
  const { certificates, fetchCertificates } = useCertificates();
  const { projects, fetchProjects } = useProjects();
  const { socials, fetchSocials } = useSocials();
  const { technologies, fetchTechnologies } = useTechnologies();
  const { testimonials, fetchTestimonials } = useTestimonials();

  useEffect(() => {
    fetchCertificates();
    fetchProjects();
    fetchSocials();
    fetchTechnologies();
    fetchTestimonials();
  }, []);

  const recapSections = [
    {
      title: "Certificates",
      data: certificates,
      columns: [
        { header: "Title", accessorKey: "title" },
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
      ],
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
      ],
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
              className="text-blue-600 hover:underline truncate block max-w-[200px]"
            >
              {value}
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
      ],
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
      ],
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
      ],
      managePath: "/protected/testimonial",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Here's a quick overview of all your data
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {recapSections.map((section) => (
          <RecapDataTable
            key={section.title}
            title={section.title}
            data={section.data}
            columns={section.columns}
            managePath={section.managePath}
          />
        ))}
      </div>
    </div>
  );
}
