import type { NextConfig } from "next";

// 是否部署到 GitHub Pages（走仓库子路径），并且未启用自定义域名
// - 使用自定义域名（如 example.com）时：网站从根路径访问，无需 basePath
// - 未使用自定义域名时：走 <用户名>.github.io/My-profolio-web/ 需要 basePath
const useSubPath =
  process.env.GITHUB_PAGES === "true" && process.env.CUSTOM_DOMAIN !== "true";

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
  basePath: useSubPath ? "/My-profolio-web" : "",
  assetPrefix: useSubPath ? "/My-profolio-web/" : "",
};

export default nextConfig;
