"use client";
import { BadgeFe } from "@/components/front/badge-fe";
import { InfiniteMovingCards } from "@/components/front/infinite-moving-cards";
import { TestiModal } from "@/components/front/testi-modal";
import { StarBorder } from "@/components/ui/star-border";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { useEffect, useState } from "react";

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

export function TestimonialSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { testimonials, fetchTestimonials } = useTestimonials();

  useEffect(() => {
    const loadTestimonials = async () => {
      await fetchTestimonials();
      setIsLoading(false);
    };
    loadTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approvedTestimonials = testimonials
    .filter((t) => t.is_approved)
    .map((t) => ({
      quote: t.message,
      name: t.name,
      title: t.relation,
    }));

  // Split testimonials into three groups for different rows
  const splitTestimonials = (testimonials: TestimonialItem[]) => {
    const length = testimonials.length;
    const third = Math.ceil(length / 3);
    return [
      testimonials.slice(0, third),
      testimonials.slice(third, third * 2),
      testimonials.slice(third * 2),
    ];
  };

  const [row1, row2, row3] = splitTestimonials(approvedTestimonials);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-foreground/60">Loading Testimonials...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <div className="space-y-1">
          <BadgeFe label="Community Voices" />
          <div className="space-y-1">
            <span className="font-base uppercase xs:text-2xl md:text-3xl tracking-widest font-[Audiowide] text-white">
              What People Say
            </span>
            <p className="xs:text-xxs md:text-xs text-white/50 max-w-xl mx-auto">
              Discover testimonials from clients, colleagues, and industry peers
              that highlight my impact across various roles, projects, and
              collaborations.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[30rem] rounded-md flex flex-col items-center justify-center relative overflow-hidden bg-background">
        {approvedTestimonials.length > 0 && (
          <>
            <InfiniteMovingCards items={row1} direction="right" speed="slow" />
            <InfiniteMovingCards items={row2} direction="left" speed="slow" />
            <InfiniteMovingCards items={row3} direction="right" speed="slow" />
          </>
        )}
      </div>
      <div className="flex justify-center mt-4 relative z-20">
        <StarBorder
          size="sm"
          className="tracking-wide uppercase"
          onClick={() => setIsModalOpen(true)}
        >
          Share Your Experience
        </StarBorder>
      </div>

      {/* Curved Background Section */}
      <div className="relative -mt-28 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] z-10">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground-2)),transparent_90%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-border/40 bg-background dark:bg-muted" />
      </div>
      <TestiModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
