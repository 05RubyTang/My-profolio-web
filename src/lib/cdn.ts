// 图片资源路径工具
// 项目已迁移到 Vercel（本身即 CDN），所有图片直接走 public/ 目录，不再依赖外部 CDN。
// 保留 cdnUrl 函数名是为了兼容全站已有引用；只做路径规范化 + 中文 / 空格编码。
export function cdnUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // 按 / 分段编码，保留 / 分隔符，正确处理中文文件名 & 空格
  const encoded = normalizedPath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return encoded;
}
