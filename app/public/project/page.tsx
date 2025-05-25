"use client";
import { Template } from "@/app/animation/template";
import ProjectSection from "@/components/front/section/project-section";

export default function Project() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-2">
        <div className="mx-auto w-full max-w-3xl">
          <ProjectSection />
        </div>
      </div>
    </Template>
  );
}
