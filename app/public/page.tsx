import { Template } from "@/app/animation/template";
import { DownloadCVButton } from "@/components/front/download-cv-button";
import { StarBorder } from "@/components/ui/star-border";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .single();

  return (
    <Template>
      <div className="w-full h-full">
        <div className="flex flex-col h-full relative">
          <div className="flex flex-col justify-center items-center pt-6 px-4 z-10 relative">
            <h1 className="xs:text-2xl md:text-3xl tracking-widest uppercase font-bold text-white font-[Audiowide] text-center">
              {profile?.full_name}
            </h1>
            <p className="xs:text-xxs md:text-xs text-white text-center font-[Montserrat] tracking-wide font-light mb-8">
              {profile?.tagline}
            </p>
            <div className="flex gap-4 flex-col xs:flex-col sm:flex-row">
              <StarBorder
                as={Link}
                href="/public/contact"
                size="sm"
                className="tracking-wide"
              >
                GET IN TOUCH
              </StarBorder>
              <DownloadCVButton cvUrl={profile?.cv} />
            </div>
          </div>
          {/* <div className="flex-1 md:h-full absolute xs:top-40 md:top-0 md:relative w-full">
            <div className="mx-auto xs:w-[250%] md:w-full aspect-square md:aspect-auto -translate-x-1/2 md:translate-x-0 left-1/2 md:left-0 relative">
              <Spline scene="https://prod.spline.design/QwHTUku6HjNMOzE3/scene.splinecode" />
            </div>
          </div> */}
        </div>
      </div>
    </Template>
  );
}
