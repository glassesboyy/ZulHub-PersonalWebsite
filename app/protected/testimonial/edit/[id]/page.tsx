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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import {
  testimonialFormSchema,
  TestimonialFormValues,
} from "@/lib/validations/testimonial-validation";
import { relationOptions } from "@/types/testimonials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { updateTestimonial, fetchTestimonialById } = useTestimonials();
  const resolvedParams = use(params);

  const form = useForm<TestimonialFormValues>({
    mode: "onBlur",
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      email: "",
      relation: "client",
      customRelation: null,
      message: "",
      isApproved: false,
    } as TestimonialFormValues,
  });

  useEffect(() => {
    async function loadTestimonial() {
      const testimonial = await fetchTestimonialById(resolvedParams.id);
      if (testimonial) {
        form.reset({
          name: testimonial.name,
          email: testimonial.email,
          relation: testimonial.relation,
          message: testimonial.message,
          isApproved: testimonial.is_approved,
        });
      }
    }
    loadTestimonial();
  }, [resolvedParams.id, form, fetchTestimonialById]);

  const onSubmit = async (data: TestimonialFormValues) => {
    const success = await updateTestimonial(
      resolvedParams.id,
      data.name,
      data.email,
      data.relation,
      data.message,
      data.isApproved,
    );
    if (success) {
      router.push("/protected/testimonial");
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Edit Testimonial
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
                  <Input {...field} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Your email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} placeholder="Your message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isApproved"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Approve Testimonial</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Update Testimonial"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/protected/testimonial")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
