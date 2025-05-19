"use client";

import { ProfileDataTable } from "@/components/data-table/profile-data-table";
import { Button } from "@/components/ui/button";
import { useProfiles } from "@/hooks/profile-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function ProfilePage() {
  const { profiles, fetchProfiles, deleteProfile, bulkDeleteProfiles } =
    useProfiles();

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <Link href="/protected/profile/create">
          <Button>Create New Profile</Button>
        </Link>
      </div>
      <ProfileDataTable
        data={profiles}
        onDelete={deleteProfile}
        onBulkDelete={bulkDeleteProfiles}
      />
    </div>
  );
}
