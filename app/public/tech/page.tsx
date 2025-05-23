"use client";
import { Template } from "@/app/animation/template";
import { TechStack } from "@/components/front/tech-stack";

export default function Tech() {
  return (
    <Template>
      <div className="w-full overflow-hidden">
        <div className="mx-auto w-full max-w-2xl">
          <TechStack />
        </div>
      </div>
    </Template>
  );
}
