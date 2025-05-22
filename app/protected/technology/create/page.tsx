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
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function CreateTechnologyPage() {
  const router = useRouter();
  const { createTechnology } = useTechnologies();

  const form = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  async function onSubmit(data: TechnologyFormValues) {
    const success = await createTechnology(data.name, data.icon);
    if (success) {
      router.push("/protected/technology");
    }
  }

  return (
    <div className="container max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Create New Technology
        </h1>
        <Button variant="outline" asChild>
          <Link href="/protected/technology">Back to Technologies</Link>
        </Button>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Add a new technology below. Make sure to include the correct icon
            name from react-icons/si.
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
                  <FormLabel>Icon Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. SiJavascript" />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    Enter the icon name from react-icons/si (e.g., SiJavascript,
                    SiReact, SiNextdotjs). The name must start with 'Si'
                    followed by the technology name.
                  </p>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Technology"}
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
