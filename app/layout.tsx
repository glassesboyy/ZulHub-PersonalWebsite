import { AnimationProvider } from "@/app/animation/animation-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Audiowide, Geist, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Zul Hub | Personal Website",
  description:
    "Glassesboyy Personal Web. Surya Zulfikar. Front-End Developer | Enthusiast in N8N AI Automation. GET IN TOUCH · DOWNLOAD CV.",
  keywords: [
    "Zul Hub",
    "Surya Zulfikar",
    "Front-End Developer",
    "AI Automation",
    "Personal Website",
  ],
  authors: [{ name: "Surya Zulfikar" }],
  creator: "Surya Zulfikar",
  publisher: "Zul Hub",
  openGraph: {
    title: "Zul Hub | Personal Website",
    description:
      "Glassesboyy Personal Web. Surya Zulfikar. Front-End Developer | Enthusiast in N8N AI Automation.",
    url: "https://zulhub.vercel.app",
    siteName: "Zul Hub",
    type: "website",
    locale: "id_ID",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "t63WTZquUsAYdtOxDocdYU6D38ug3b354Pc13LZpBO4",
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], display: "swap" });
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="t63WTZquUsAYdtOxDocdYU6D38ug3b354Pc13LZpBO4"
      />
      <body
        suppressHydrationWarning
        className={`${inter.className} ${audiowide.className} ${montserrat.className} ${geistSans.className} dark`}
      >
        <AnimationProvider>{children}</AnimationProvider>
        <GoogleAnalytics gaId="G-JG980K76DH" />
      </body>
    </html>
  );
}
