"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCertificates } from "@/hooks/certificate-hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCertificatePage() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { createCertificate } = useCertificates();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image");
      return;
    }
    const success = await createCertificate(title, imageFile);
    if (success) {
      router.push("/protected/certificate");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Certificate
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Certificate title"
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
          <Button type="submit">Save Certificate</Button>
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
