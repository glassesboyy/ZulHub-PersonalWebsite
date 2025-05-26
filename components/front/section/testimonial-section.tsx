"use client";
import { BadgeFe } from "@/components/front/badge-fe";
import { InfiniteMovingCards } from "@/components/front/infinite-moving-cards";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { useEffect } from "react";

export function TestimonialSection() {
  const { testimonials, fetchTestimonials } = useTestimonials();

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approvedTestimonials = testimonials
    .filter((t) => t.is_approved)
    .map((t) => ({
      quote: t.message,
      name: t.name,
      title: t.relation,
    }));

  // Split testimonials into two groups for different rows
  const splitTestimonials = (testimonials: any[]) => {
    const length = testimonials.length;
    const half = Math.ceil(length / 2);
    return [testimonials.slice(0, half), testimonials.slice(half)];
  };

  const [row1, row2] = splitTestimonials(approvedTestimonials);

  return (
    <>
      <div className="text-center">
        <div className="space-y-1">
          <BadgeFe label="Client Reviews" />
          <div className="space-y-1">
            <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
              What People Say
            </span>
            <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
              Discover what clients and collaborators have to say about their
              experiences working with me. Real feedback from real projects that
              showcase my commitment to delivering excellence.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[25rem] rounded-md flex flex-col items-center justify-center relative overflow-hidden bg-background">
        {approvedTestimonials.length > 0 && (
          <>
            <InfiniteMovingCards items={row1} direction="right" speed="slow" />
            <InfiniteMovingCards items={row2} direction="left" speed="slow" />
          </>
        )}
      </div>
    </>
  );
}
