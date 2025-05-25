import { Template } from "@/app/animation/template";
import { ContactSection } from "@/components/front/section/contact-section";

export default function Contact() {
  return (
    <Template>
      <div className="w-full overflow-hidden px-2">
        <div className="mx-auto w-fit max-w-3xl">
          <ContactSection />
        </div>
      </div>
    </Template>
  );
}
