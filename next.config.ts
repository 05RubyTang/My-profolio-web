import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudbase-d8gz5d2q35d53ea73-1452795216.tcloudbaseapp.com",
      },
    ],
  },
};

export default nextConfig;
