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
import { useTechnologies } from "@/hooks/technology-hooks";
import {
  technologyFormSchema,
  TechnologyFormValues,
} from "@/lib/validations/technology-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditTechnologyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { updateTechnology, fetchTechnologyById } = useTechnologies();
  const resolvedParams = use(params);

  const form = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  useEffect(() => {
    async function loadTechnology() {
      const tech = await fetchTechnologyById(resolvedParams.id);
      if (tech) {
        form.reset({
          name: tech.name,
          icon: tech.icon,
        });
      }
    }
    loadTechnology();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id, form]);

  async function onSubmit(data: TechnologyFormValues) {
    const success = await updateTechnology(
      resolvedParams.id,
      data.name,
      data.icon
    );
    if (success) {
      router.push("/protected/technology");
    }
  }

  return (
    <div className="container max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Edit Technology</h1>
        <Button variant="outline" asChild>
          <Link href="/protected/technology">Back to Technologies</Link>
        </Button>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Update the technology details below. You can modify both the name
            and icon.
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
                    <Input {...field} placeholder="Technology name" />
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
                  <FormLabel>Icon Class</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. SiJavascript" />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    Enter the icon name from react-icons/si (e.g., SiJavascript,
                    SiReact, SiNextdotjs). The name must start with
                    &apos;Si&apos; followed by the technology name.
                  </p>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : "Update Technology"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/protected/technology")}
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
