import { AnimationProvider } from "@/app/animation/animation-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Audiowide, Geist, Inter, Montserrat } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zul Hub | Personal Website",
  description:
    "Surya Zulfikar Personal Website, Front-End Developer | Enthusiast in N8N AI Automation. GET IN TOUCH · DOWNLOAD CV.",
  keywords: [
    "Zul Hub",
    "Zul Hub Personal Website",
    "Teguh Surya Zulfikar",
    "Teguh Surya Zulfikar Personal Website",
    "Surya Zulfikar",
    "Surya Zulfikar Personal Website",
    "Glassesboyy",
    "Glassesboyy Personal Website",
    "Front-End Developer",
    "Frontend Developer",
    "Web Developer",
    "AI Automation",
    "N8N Automation",
    "Personal Website",
    "Portfolio",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Supabase Developer",
    "Full Stack Developer",
    "UI/UX Developer",
    "Web Development",
    "Software Engineer",
    "Programmer",
    "Indonesia Developer",
    "Freelancer",
    "Tech Enthusiast",
    "Code",
    "Programming",
    "Web Design",
    "Responsive Design",
    "Modern Web Development",
    "CV Download",
    "Contact Developer",
  ],
  authors: [{ name: "Surya Zulfikar" }],
  creator: "Surya Zulfikar",
  publisher: "Zul Hub",
  openGraph: {
    title: "Zul Hub | Personal Website",
    description:
      "Surya Zulfikar Personal Website. Front-End Developer | Enthusiast in N8N AI Automation.",
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
      <head>
        <meta
          name="google-site-verification"
          content="t63WTZquUsAYdtOxDocdYU6D38ug3b354Pc13LZpBO4"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Surya Zulfikar",
              alternateName: [
                "Teguh Surya Zulfikar",
                "Glassesboyy",
                "Surya Zulfikar",
              ],
              url: "https://zulhub.vercel.app",
              jobTitle: "Front-End Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelancer",
              },
              description: "Front-End Developer and AI Automation Enthusiast",
              knowsAbout: [
                "Web Development",
                "React",
                "Next.js",
                "AI Automation",
                "N8N",
              ],
              sameAs: [
                "https://github.com/glassesboyy",
                "https://www.linkedin.com/in/suryazulfikar/",
                "https://open.spotify.com/user/31hdddh6jo5kwyxuxion45xjifv4?si=5d95839ef2174a92&nd=1&dlsi=d13d8e24f24e4f8e",
                "https://www.instagram.com/suryazulfikarr",
              ],
            }),
          }}
        />
      </head>
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
