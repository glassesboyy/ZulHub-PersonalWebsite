import { Template } from "@/app/animation/template";
import { HomeSection } from "@/components/front/section/home-section";

export default function Home() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-4 md:px-6 -mt-28">
        <div className="mx-auto w-full max-w-3xl">
          <HomeSection />
        </div>
      </div>
    </Template>
  );
}
