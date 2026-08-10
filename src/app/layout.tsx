import type { Metadata } from "next";
import {
  Noto_Sans_SC,
  Noto_Serif_SC,
  Inter,
  Caveat,
  ZCOOL_KuaiLe,
  Ma_Shan_Zheng,
} from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// 「艺起搭 · 风格实验台」标题特殊字体
// 用 Google 的 ZCOOL KuaiLe 作为 Figma 稿件里 YouSheBiaoTiHei（优设标题黑）的替身
const zcoolKuaile = ZCOOL_KuaiLe({
  variable: "--font-zcool-kuaile",
  subsets: ["latin"],
  weight: ["400"],
});

// 手写体 · 用于 Idea Salon Section 2 学生吐槽气泡
const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-ma-shan-zheng",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ruby Tang | AI Product Designer",
  description:
    "冰冰的个人网站 — AI产品经理 · 人机交互研究生 · 在研究人和AI怎么相处",
  keywords: ["Ruby Tang", "AI产品", "人机交互", "UX设计", "产品经理"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${notoSerif.variable} ${inter.variable} ${caveat.variable} ${zcoolKuaile.variable} ${maShanZheng.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
