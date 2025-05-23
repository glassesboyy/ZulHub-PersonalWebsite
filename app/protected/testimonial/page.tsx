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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 xs:gap-6 md:gap-8 p-2 xs:p-4 md:p-6">
      <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:items-center justify-between">
        <h1 className="text-xl xs:text-2xl md:text-3xl font-bold tracking-tight">
          Testimonials
        </h1>
        <Link href="/protected/testimonial/create">
          <Button className="w-full xs:w-auto">Create New Testimonial</Button>
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
