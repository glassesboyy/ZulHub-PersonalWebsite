"use client";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
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
import Link from "next/link";
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
    <div className="container max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Create New Certificate
        </h1>
        <Button variant="outline" asChild>
          <Link href="/protected/certificate">Back to Certificates</Link>
        </Button>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Enter the certificate details below. Make sure to include a clear
            image of the certificate.
          </p>
        </div>

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
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Certificate Image</FormLabel>
                  <FormControl>
                    <FileInput
                      accept="image/*"
                      onChange={(file) => {
                        onChange(file);
                        if (file) {
                          setPreviewUrl(URL.createObjectURL(file));
                        }
                      }}
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
    </div>
  );
}
