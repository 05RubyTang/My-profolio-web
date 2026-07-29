// 腾讯云 CloudBase 静态托管 CDN 域名
export const CDN_PREFIX = "https://cloudbase-d8gz5d2q35d53ea73-1452795216.tcloudbaseapp.com";

// 拼接 CDN 路径的工具函数
export function cdnUrl(path: string): string {
  // 确保 path 以 / 开头
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${CDN_PREFIX}${normalizedPath}`;
}
