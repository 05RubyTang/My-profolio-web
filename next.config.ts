import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudbase-d8gz5d2q35d53ea73-1452795216.tcloudbaseapp.com",
      },
    ],
  },
  // GitHub Pages 部署：仓库名为 My-profolio-web
  basePath: process.env.GITHUB_PAGES === "true" ? "/My-profolio-web" : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/My-profolio-web/" : "",
};

export default nextConfig;
