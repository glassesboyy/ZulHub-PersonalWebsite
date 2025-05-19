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
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Edit Technology
      </h1>
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
                  <Input {...field} placeholder="e.g. devicon-react-original" />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-muted-foreground">
                  Enter the icon class from the icon library (e.g., Devicon,
                  Font Awesome)
                </p>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Update Technology"}
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
  );
}
