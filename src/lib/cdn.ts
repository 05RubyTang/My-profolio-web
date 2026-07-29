// 腾讯云 CloudBase 静态托管 CDN 域名
export const CDN_PREFIX = "https://cloudbase-d8gz5d2q35d53ea73-1452795216.tcloudbaseapp.com";

// 拼接 CDN 路径的工具函数
// 会对路径中每一段做 URI encode，正确处理中文文件名 & 空格
export function cdnUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // 按 / 分段编码，保留 / 分隔符
  const encoded = normalizedPath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${CDN_PREFIX}${encoded}`;
}
