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
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Social Media Details
      </h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{social.name}</h2>
          <p className="text-gray-600 mb-4">{social.description}</p>
          <div className="space-y-4">
            <p>
              <span className="font-medium">Link: </span>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {social.link}
              </a>
            </p>
            <div className="flex items-center gap-2">
              <span className="font-medium">Icon: </span>
              {IconComponent && (
                <div className="flex items-center gap-2">
                  <IconComponent size={24} />
                  <span className="text-gray-600">{social.icon}</span>
                </div>
              )}
            </div>
            <p>
              <span className="font-medium">Created: </span>
              {new Date(social.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => router.push("/protected/social")}
          >
            Back to List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/protected/social/edit/${social.id}`)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
