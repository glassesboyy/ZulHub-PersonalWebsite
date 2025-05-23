import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wiytwbafvqbjfoawxfbq.supabase.co',
      },
    ],
  },
};

export default nextConfig;
