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
import { Textarea } from "@/components/ui/textarea";
import { useSocials } from "@/hooks/social-hooks";
import {
  socialFormSchema,
  SocialFormValues,
} from "@/lib/validations/social-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateSocialPage() {
  const router = useRouter();
  const { createSocial } = useSocials();

  const form = useForm<SocialFormValues>({
    mode: "onBlur",
    resolver: zodResolver(socialFormSchema),
    defaultValues: {
      name: "",
      description: "",
      link: "",
      icon: "",
    },
  });

  const onSubmit = async (data: SocialFormValues) => {
    const success = await createSocial(
      data.name,
      data.description,
      data.link,
      data.icon
    );
    if (success) {
      router.push("/protected/social");
    }
  };

  return (
    <div className="container max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Create New Social Media
        </h1>
        <Button variant="outline" asChild>
          <Link href="/protected/social">Back to Social Media</Link>
        </Button>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Add your social media details below. Make sure to include the
            correct icon name and link.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Social media name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Social media description"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. IconBrandGithub" />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    Enter the icon name from @tabler/icons-react (e.g.,
                    IconBrandGithub, IconBrandLinkedin, IconBrandInstagram). The
                    name must start with &apos;Icon&apos; followed by the icon
                    name.
                  </p>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : "Save Social Media"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/protected/social")}
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
