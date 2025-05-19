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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useProfiles } from "@/hooks/profile-hooks";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/lib/validations/profile-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [currentCV, setCurrentCV] = useState<string>("");

  const router = useRouter();
  const { updateProfile, fetchProfileById } = useProfiles();
  const resolvedParams = use(params);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      tagline: "",
      bio: "",
      isActive: false,
      avatarFile: null,
      cvFile: null,
    },
  });

  useEffect(() => {
    async function loadProfile() {
      const profile = await fetchProfileById(resolvedParams.id);
      if (profile) {
        form.reset({
          name: profile.name,
          tagline: profile.tagline,
          bio: profile.bio,
          isActive: profile.is_active,
          avatarFile: null,
          cvFile: null,
        });
        setAvatarPreview(profile.avatar);
        setCurrentCV(profile.cv);
      }
    }
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id]);

  const onSubmit = async (data: ProfileFormValues) => {
    const success = await updateProfile(
      resolvedParams.id,
      data.name,
      data.tagline,
      data.bio,
      data.cvFile,
      data.avatarFile,
      data.isActive
    );
    if (success) {
      router.push("/protected/profile");
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatarFile"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Avatar Image</FormLabel>
                <FormControl>
                  <FileInput
                    accept="image/*"
                    onChange={(file) => {
                      onChange(file);
                      if (file) {
                        setAvatarPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {avatarPreview && (
                  <div className="mt-2 relative w-32 h-32">
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      fill
                      className="rounded-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvFile"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>CV File</FormLabel>
                <FormControl>
                  <FileInput
                    accept=".pdf,.doc,.docx"
                    onChange={(file) => onChange(file)}
                  />
                </FormControl>
                <FormMessage />
                {currentCV && (
                  <p className="text-sm text-muted-foreground">
                    Current CV:{" "}
                    <a
                      href={currentCV}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Current CV
                    </a>
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Set as Active Profile</FormLabel>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Update Profile"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/protected/profile")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
