"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCertificates } from "@/hooks/certificate-hooks";
import {
  certificateFormSchema,
  type CertificateFormValues,
} from "@/lib/validations/certificate-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateCertificatePage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { createCertificate } = useCertificates();

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      form.setValue("certificateImage", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function onSubmit(data: CertificateFormValues) {
    if (!data.certificateImage) {
      form.setError("certificateImage", {
        type: "manual",
        message: "Please select an image",
      });
      return;
    }

    const success = await createCertificate(data.title, data.certificateImage);
    if (success) {
      router.push("/protected/certificate");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Create New Certificate
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Certificate title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certificateImage"
            render={() => (
              <FormItem>
                <FormLabel>Certificate Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
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
              </FormItem>
            )}
          />

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
      </Form>
    </div>
  );
}
