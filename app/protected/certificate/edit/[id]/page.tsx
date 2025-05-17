"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCertificates } from "@/hooks/certificate-hooks";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Image from "next/image";

export default function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { updateCertificate, fetchCertificateById } = useCertificates();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadCertificate() {
      const certificate = await fetchCertificateById(resolvedParams.id);
      if (certificate) {
        setTitle(certificate.title);
        setPreviewUrl(certificate.certificate_image);
      }
    }
    loadCertificate();
  }, [resolvedParams.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await updateCertificate(
      resolvedParams.id,
      title,
      imageFile
    );
    if (success) {
      router.push("/protected/certificate");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Edit Certificate
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Certificate Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
          {previewUrl && (
            <div className="mt-4 relative w-full h-[200px]">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button type="submit">Update Certificate</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/certificate")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
