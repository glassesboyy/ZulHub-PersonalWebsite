"use client";

import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { Testimonial } from "@/types/testimonials";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const router = useRouter();
  const { fetchTestimonialById, toggleApproval } = useTestimonials();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadTestimonial() {
      const data = await fetchTestimonialById(resolvedParams.id);
      if (data) {
        setTestimonial(data);
      }
    }
    loadTestimonial();
  }, [resolvedParams.id, fetchTestimonialById]);

  const handleToggleApproval = async () => {
    if (!testimonial) return;

    const success = await toggleApproval(
      testimonial.id,
      testimonial.is_approved,
    );
    if (success) {
      router.push("/protected/testimonial");
    }
  };

  if (!testimonial) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Testimonial Details
        </h1>
        <div className="flex w-full xs:w-auto xs:flex-col md:flex-row gap-2 xs:gap-4">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/protected/testimonial/edit/${testimonial?.id}`)
            }
            className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Edit Testimonial
          </Button>
          <Button
            onClick={() => router.push("/protected/testimonial")}
            className="w-full xs:w-auto text-xs xs:text-xs md:text-sm"
          >
            Back to List
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 xs:gap-6 md:gap-8">
        {/* Testimonial Info Card */}
        <div className="rounded-lg border bg-card p-4 xs:p-6">
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 items-start xs:items-center">
              <div className="w-full xs:w-auto">
                <h2 className="text-lg xs:text-xl md:text-2xl font-semibold">
                  {testimonial?.name}
                </h2>
                <p className="text-xxs xs:text-xs md:text-sm text-muted-foreground mt-1">
                  {testimonial?.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 xs:ml-auto">
                <div className="px-3 py-1 rounded-full text-xxs xs:text-xs md:text-sm bg-primary/10 text-primary border border-primary/20">
                  {testimonial?.relation}
                </div>
                <div
                  className={`px-4 py-1 rounded-full uppercase tracking-wide text-xxs xs:text-xs md:text-sm text-white font-medium ${
                    testimonial?.is_approved ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  {testimonial?.is_approved ? "Approved" : "Pending"}
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-border" />

            {/* Message Section */}
            <div className="space-y-2">
              <span className="text-xxs xs:text-xs md:text-sm text-muted-foreground font-medium">
                Testimonial Message
              </span>
              <div className="rounded-md bg-muted/50 p-4 xs:p-6">
                <p className="whitespace-pre-wrap text-pretty text-xxs xs:text-xs md:text-sm text-muted-foreground">
                  {testimonial?.message}
                </p>
              </div>
            </div>

            {/* Approval Action */}
            <div className="flex flex-col xs:flex-row gap-2 pt-4 justify-end">
              <Button
                onClick={handleToggleApproval}
                variant={testimonial?.is_approved ? "destructive" : "green"}
                className="w-full xs:w-full md:w-auto text-xs xs:text-xs md:text-sm"
              >
                <svg
                  className="h-3 xs:h-4 w-3 xs:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {testimonial?.is_approved ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M5 13l4 4L19 7"
                    />
                  )}
                </svg>
                {testimonial?.is_approved
                  ? "Revoke Approval"
                  : "Approve Testimonial"}
              </Button>
            </div>

            {/* Creation Info */}
            <div className="text-right">
              <span className="text-xxs xs:text-xs text-muted-foreground">
                Created on{" "}
                {new Date(testimonial?.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
