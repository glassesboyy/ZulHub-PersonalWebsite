"use client";

import { signOutAction } from "@/app/actions";
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
    <Sidebar className="border-r bg-gradient-to-b from-background to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="px-6 py-4">
        <div className="flex items-center gap-2 justify-center">
          <div className="h-7 w-7 rounded-lg p-1 bg-background border border-primary flex items-center justify-center">
            <Star className="h-full w-full text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.title ? null : item.title,
                          )
                        }
                        isActive={openSubmenu === item.title}
                        tooltip={item.title}
                        className="group transition-colors hover:bg-accent"
                      >
                        <item.icon className="transition-transform duration-200 group-hover:scale-110" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {openSubmenu === item.title && (
                        <SidebarMenuSub className="animate-in slide-in-from-left-8">
                          {item.items.map((subItem) => (
                            <SidebarMenuItem key={subItem.href}>
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === subItem.href}
                                tooltip={subItem.title}
                                className="group relative overflow-hidden transition-colors hover:bg-accent"
                              >
                                <Link href={subItem.href}>
                                  <subItem.icon className="transition-transform duration-200 group-hover:scale-110" />
                                  <span>{subItem.title}</span>
                                  {pathname === subItem.href && (
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-primary/20 to-transparent" />
                                  )}
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
                      className="group relative overflow-hidden transition-colors hover:bg-accent"
                    >
                      <Link href={item.href!}>
                        <item.icon className="transition-transform duration-200 group-hover:scale-110" />
                        <span>{item.title}</span>
                        {pathname === item.href && (
                          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-primary/20 to-transparent" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <form action={signOutAction}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                type="submit"
                tooltip="Sign Out"
                className="group gap-4 bg-destructive text-destructive-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="transition-transform duration-200 group-hover:scale-110" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
