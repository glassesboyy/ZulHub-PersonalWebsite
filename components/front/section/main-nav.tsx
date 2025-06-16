"use client";

import { ExpandableTabs } from "@/components/front/expandable-tabs";
import { MobileNav } from "@/components/front/section/mobile-nav";
import { Album, Bolt, Folder, Home, Mail, Star, User } from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  { title: "Home", icon: Home, href: "/public" },
  { title: "About", icon: User, href: "/public/about" },
  { title: "Tech", icon: Bolt, href: "/public/tech" },
  { title: "Certificate", icon: Album, href: "/public/certificate" },
  { title: "Projects", icon: Folder, href: "/public/project" },
  { title: "Testimonial", icon: Star, href: "/public/testimonial" },
  { title: "Contact", icon: Mail, href: "/public/contact" },
];

export function MainNav() {
  const router = useRouter();

  const handleNavigation = (index: number | null) => {
    if (index !== null) {
      router.push(menuItems[index].href);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <ExpandableTabs
          tabs={menuItems}
          activeColor="text-foreground"
          className="border-border/40 shadow-lg text-xxs"
          onChange={handleNavigation}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
}
