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
      full_name: "",
      tagline: "",
      bio: "",
      avatarFile: null,
      cvFile: null,
    },
  });

  useEffect(() => {
    async function loadProfile() {
      const profile = await fetchProfileById(resolvedParams.id);
      if (profile) {
        form.reset({
          full_name: profile.full_name,
          tagline: profile.tagline,
          bio: profile.bio,
          avatarFile: null,
          cvFile: null,
        });
        setAvatarPreview(profile.avatar_url);
        setCurrentCV(profile.cv);
      }
    }
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id]);

  const onSubmit = async (data: ProfileFormValues) => {
    const success = await updateProfile(
      resolvedParams.id,
      data.full_name,
      data.tagline,
      data.bio,
      data.cvFile,
      data.avatarFile
    );
    if (success) {
      router.push("/protected/profile");
    }
  };

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/profile")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="profile-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Left Column - Avatar and CV */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <FormField
                  control={form.control}
                  name="avatarFile"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <div className="relative mx-auto mb-6 h-48 w-48">
                        <Image
                          src={avatarPreview || "/placeholder-avatar.png"}
                          alt="Avatar preview"
                          fill
                          className="rounded-full object-cover ring-2 ring-primary/20"
                          priority
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                          <FormLabel
                            htmlFor="avatar-upload"
                            className="cursor-pointer"
                          >
                            <div className="rounded-full bg-primary px-4 py-1 text-xs text-primary-foreground hover:bg-primary/90">
                              Change
                            </div>
                          </FormLabel>
                          <FormControl>
                            <FileInput
                              id="avatar-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={(file) => {
                                onChange(file);
                                if (file) {
                                  setAvatarPreview(URL.createObjectURL(file));
                                }
                              }}
                            />
                          </FormControl>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-center text-xl font-semibold"
                            placeholder="Your Name"
                          />
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
                        <FormControl>
                          <Input
                            {...field}
                            className="text-center text-muted-foreground"
                            placeholder="Your Tagline"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* CV Section */}
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-medium">Curriculum Vitae</h3>
                <FormField
                  control={form.control}
                  name="cvFile"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <div className="space-y-4">
                        {currentCV && (
                          <a
                            href={currentCV}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                              />
                            </svg>
                            View Current CV
                          </a>
                        )}
                        <FormControl>
                          <FileInput
                            accept=".pdf,.doc,.docx"
                            onChange={(file) => onChange(file)}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Right Column - Bio */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-xl font-medium">About Me</h3>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[470px] max-h-[470px] resize-none bg-muted/50 p-4"
                        placeholder="Write something about yourself..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
