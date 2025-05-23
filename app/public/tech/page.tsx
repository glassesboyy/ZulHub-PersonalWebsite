"use client";
import { Template } from "@/app/animation/template";
import { TechSection } from "@/components/front/section/tech-section";

export default function Tech() {
  return (
    <Template>
      <div className="w-full overflow-hidden">
        <div className="mx-auto w-full max-w-2xl">
          <TechSection />
        </div>
      </div>
    </Template>
  );
}
