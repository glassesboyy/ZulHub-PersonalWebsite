"use client";
import { Template } from "@/app/animation/template";
import { AboutSection } from "@/components/front/section/about-section";

export default function Project() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-2">
        <div className="mx-auto w-full max-w-3xl">
          <AboutSection />
        </div>
      </div>
    </Template>
  );
}
