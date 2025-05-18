"use client";

import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [testimonial, setTestimonial] = useState<any>(null);
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
  }, [resolvedParams.id]);

  const handleToggleApproval = async () => {
    const success = await toggleApproval(
      testimonial.id,
      testimonial.is_approved
    );
    if (success) {
      router.push("/protected/testimonial");
    }
  };

  if (!testimonial) return <div>Loading...</div>;

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Testimonial Details
      </h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{testimonial.name}</h2>
          <p className="text-gray-500">{testimonial.email}</p>
          <div className="mt-2 inline-block px-3 py-1 rounded-full text-sm border border-gray-300">
            {testimonial.relation === "other"
              ? testimonial.custom_relation
              : testimonial.relation}
          </div>
          <div
            className={`ml-2 inline-block px-3 py-1 rounded-full text-sm ${
              testimonial.is_approved ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            {testimonial.is_approved ? "Approved" : "Pending"}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Message</h3>
          <p className="text-gray-600 whitespace-pre-wrap">
            {testimonial.message}
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => router.push("/protected/testimonial")}
          >
            Back to List
          </Button>
          <Button
            type="button"
            variant={testimonial.is_approved ? "destructive" : "green"}
            onClick={handleToggleApproval}
          >
            {testimonial.is_approved ? "Revoke Approval" : "Approve"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/protected/testimonial/edit/${testimonial.id}`)
            }
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
