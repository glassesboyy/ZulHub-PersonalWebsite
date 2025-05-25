import { Template } from "@/app/animation/template";
import CertificateSection from "@/components/front/section/certificate-section";

export default function Certificate() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-2">
        <div className="mx-auto w-full max-w-3xl">
          <CertificateSection />
        </div>
      </div>
    </Template>
  );
}
