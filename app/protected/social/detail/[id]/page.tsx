"use client";

import { Button } from "@/components/ui/button";
import { useSocials } from "@/hooks/social-hooks";
import { Social } from "@/types/socials";
import * as TablerIcons from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

// Add this type helper
type IconKey = keyof typeof TablerIcons;

export default function SocialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [social, setSocial] = useState<Social | null>(null);
  const router = useRouter();
  const { fetchSocialById } = useSocials();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadSocial() {
      const data = await fetchSocialById(resolvedParams.id);
      if (data) {
        setSocial(data);
      }
    }
    loadSocial();
  }, [resolvedParams.id, fetchSocialById]);

  if (!social) return <div>Loading...</div>;

  // Get the icon component
  const IconComponent = TablerIcons[
    social.icon as IconKey
  ] as React.ComponentType<{
    size: number;
  }>;

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Social Media Details
        </h1>
        <div className="flex w-full xs:w-auto xs:flex-col md:flex-row gap-2 xs:gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/protected/social/edit/${social?.id}`)}
            className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Edit Social Media
          </Button>
          <Button
            onClick={() => router.push("/protected/social")}
            className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Back to List
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-lg border bg-card">
        {/* Icon and Name Header */}
        <div className="p-4 xs:p-6 border-b flex flex-col xs:flex-row gap-4 items-center">
          <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-primary/10 flex items-center justify-center">
            {IconComponent && <IconComponent size={32} />}
          </div>
          <div className="text-center xs:text-left">
            <h2 className="text-lg xs:text-xl md:text-2xl font-semibold">
              {social?.name}
            </h2>
            <p className="text-xxs xs:text-xs md:text-sm text-muted-foreground mt-1">
              {social?.icon}
            </p>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-4 xs:p-6 space-y-4 xs:space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <span className="text-xxs xs:text-xs md:text-sm text-muted-foreground font-medium">
              Description
            </span>
            <p className="text-xxs xs:text-xs md:text-sm">
              {social?.description}
            </p>
          </div>

          {/* Visit Link Button */}
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full text-xxs xs:text-xs md:text-sm"
              onClick={() =>
                window.open(social?.link, "_blank", "noopener,noreferrer")
              }
            >
              <svg
                className="h-3 xs:h-4 w-3 xs:w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Visit {social?.name}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
