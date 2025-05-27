import { Template } from "@/app/animation/template";
import { HomeSection } from "@/components/front/section/home-section";

export default function Home() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-4 md:px-6 py-8">
        <div className="mx-auto w-full max-w-4xl">
          <HomeSection />
        </div>
      </div>
    </Template>
  );
}
