import { AnimationProvider } from "@/app/animation/animation-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Audiowide, Geist, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Surya Zulfikar | Frontend Developer & AI Automation Engineer",
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
