import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phzlvcyeunrrsoiigmjl.supabase.co",
      },
    ],
  },
};

export default nextConfig;
