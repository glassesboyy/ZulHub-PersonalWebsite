"use client";

import { TestimonialDataTable } from "@/components/data-table/testimonial-data-table";
import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function TestimonialPage() {
  const {
    testimonials,
    fetchTestimonials,
    deleteTestimonial,
    bulkDeleteTestimonials,
    toggleApproval,
  } = useTestimonials();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return (
    <div className="container max-w-7xl py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
        <Link href="/protected/testimonial/create">
          <Button>Create New Testimonial</Button>
        </Link>
      </div>
      <TestimonialDataTable
        data={testimonials}
        onDelete={deleteTestimonial}
        onBulkDelete={bulkDeleteTestimonials}
        onToggleApproval={toggleApproval}
      />
    </div>
  );
}
