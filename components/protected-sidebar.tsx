"use client";

import { signOutAction } from "@/app/actions";
import {
  Album,
  Bolt,
  Folders,
  Globe,
  LayoutDashboard,
  LogOut,
  Star,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/protected",
  },
  {
    title: "Manage",
    icon: Folders,
    items: [
      {
        title: "Certificate",
        icon: Album,
        href: "/protected/certificate",
      },
      {
        title: "Project",
        icon: Folders,
        href: "/protected/project",
      },
      {
        title: "Social",
        icon: Globe,
        href: "/protected/social",
      },
      {
        title: "Technology",
        icon: Bolt,
        href: "/protected/technology",
      },
      {
        title: "Testimonial",
        icon: Star,
        href: "/protected/testimonial",
      },
    ],
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "/protected/profile",
  },
];

export function ProtectedSidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Manage");

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <h2 className="px-2 text-lg font-semibold tracking-tight">
          Admin Panel
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.title ? null : item.title
                          )
                        }
                        isActive={openSubmenu === item.title}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {openSubmenu === item.title && (
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuItem key={subItem.href}>
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === subItem.href}
                                tooltip={subItem.title}
                              >
                                <Link href={subItem.href}>
                                  <subItem.icon />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href!}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <form action={signOutAction}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton type="submit" tooltip="Sign Out">
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
