"use client";

import { ComboboxTechnologies } from "@/components/dashboard/combobox-technologies";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/project-hooks";
import {
  ProjectFormValues,
  projectSchema,
} from "@/lib/validations/project-validation";
import { Technology } from "@/types/technology";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateProjectPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { createProjectWithTechnologies, fetchTechnologies } = useProjects();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "planned",
      imageFile: null,
      technologies: [],
    },
  });

  useEffect(() => {
    const loadTechnologies = async () => {
      const techs = await fetchTechnologies();
      setTechnologies(techs);
    };
    loadTechnologies();
  }, [fetchTechnologies]);

  const onSubmit = async (data: ProjectFormValues) => {
    if (!data.imageFile) {
      form.setError("imageFile", {
        type: "manual",
        message: "Project image is required",
      });
      return;
    }

    const success = await createProjectWithTechnologies(
      data.name,
      data.description,
      data.status,
      data.imageFile as File,
      data.technologies || []
    );

    if (success) {
      router.push("/protected/project");
    }
  };

  return (
    <div className="container max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Create New Project</h1>
        <Button variant="outline" asChild>
          <Link href="/protected/project">Back to Projects</Link>
        </Button>
      </div>

      <div className="space-y-8 rounded-lg border bg-card p-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Fill in the project details below. Add an image and select the
            technologies used in this project.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
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
                      placeholder="Project description"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="on process">On Process</SelectItem>
                      <SelectItem value="on hold">On Hold</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
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
                    <div className="mt-2 relative w-full h-[200px]">
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

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <ComboboxTechnologies
                      technologies={technologies}
                      selectedTechnologies={technologies.filter((tech) =>
                        field.value?.includes(tech.id)
                      )}
                      onSelect={(tech) => {
                        const currentIds = field.value || [];
                        if (!currentIds.includes(tech.id)) {
                          field.onChange([...currentIds, tech.id]);
                        }
                      }}
                      onRemove={(techId) => {
                        const currentIds = field.value || [];
                        field.onChange(
                          currentIds.filter((id) => id !== techId)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/protected/project")}
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
