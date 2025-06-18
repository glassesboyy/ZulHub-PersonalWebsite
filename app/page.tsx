import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zul Hub | Personal Website - Home",
  description:
    "Welcome to Zul Hub. Glassesboyy Personal Web. Surya Zulfikar, Front-End Developer and AI Automation Enthusiast.",
};

export default function RootPage() {
  redirect("/public");
}
