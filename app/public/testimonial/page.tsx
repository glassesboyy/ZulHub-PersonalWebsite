"use client";
import { Template } from "@/app/animation/template";
import { TestimonialSection } from "@/components/front/section/testimonial-section";

export default function Testimonial() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-2">
        <div className="mx-auto w-full max-w-3xl">
          <TestimonialSection />
        </div>
      </div>
    </Template>
  );
}
