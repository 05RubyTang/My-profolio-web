"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Users, LineChart, Palette } from "lucide-react";
import WorkLayout from "../_components/WorkLayout";
import ProcessDrawer, { ProcessItem, ProcessImageBlock } from "../_components/ProcessDrawer";
import FeatureEntries, { FeatureKey } from "../_components/artbridge/FeatureEntries";
import FeatureShowcase from "../_components/artbridge/FeatureShowcase";
import { cdnUrl } from "@/lib/cdn";

/* ============================================================
   艺起搭 —— ArtBridge · 小艺私人穿搭搭子
   ============================================================ */

/** 本地素材路径（放在 public/picture/artbridge/） */
const local = (name: string) => `/picture/artbridge/${name}`;

/** 首屏 4 个 icon → 抽屉 4 段过程性内容 */
const yiqidaCdnImages = [
  cdnUrl("/picture/id-project/tongji-works/艺起搭/1 86.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/2 26.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/3 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/4 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/5 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/6 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/7 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/8 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/9 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/10 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/11 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/12 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/14 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/15 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/16 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/17 1.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/18 6.jpg"),
  cdnUrl("/picture/id-project/tongji-works/艺起搭/19 1.jpg"),
];

const processItems: ProcessItem[] = [
  {
    id: "market",
    icon: <LineChart size={20} />,
    label: "市场调研",
    title: "市场调研",
    subtitle: "AI 穿搭赛道格局 · 用户需求缺口",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          在启动设计前，我们扫描了国内外主要的 AI 穿搭 / 时尚推荐产品，
          梳理出「工具型」与「陪伴型」两类核心竞品，找到差异化机会。
        </p>
        {yiqidaCdnImages.slice(0, 3).map((src, i) => (
          <ProcessImageBlock key={i} src={src} alt={`市场调研 ${i + 1}`} />
        ))}
      </div>
    ),
  },
  {
    id: "user",
    icon: <Users size={20} />,
    label: "用户调研",
    title: "用户调研",
    subtitle: "9 位深访用户 · 3 类核心人群画像",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          通过 9 位深度访谈用户，我们提炼出 3 类核心人群：
          「风格实验型」、「懒人穿搭型」、「场合焦虑型」，
          并归纳出各自最关心的场景与痛点。
        </p>
        {yiqidaCdnImages.slice(3, 6).map((src, i) => (
          <ProcessImageBlock key={i} src={src} alt={`用户调研 ${i + 1}`} />
        ))}
      </div>
    ),
  },
  {
    id: "tech",
    icon: <Cpu size={20} />,
    label: "技术架构",
    title: "技术架构",
    subtitle: "多模态感知 · Agent 编排 · 记忆系统",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          艺起搭底层由「多模态感知 → 意图路由 → 场景 Agent → 长期记忆」四层组成。
          每次穿搭对话都会写入用户风格向量，越用越懂你。
        </p>
        {yiqidaCdnImages.slice(8, 12).map((src, i) => (
          <ProcessImageBlock key={i} src={src} alt={`技术架构 ${i + 1}`} />
        ))}
      </div>
    ),
  },
  {
    id: "design",
    icon: <Palette size={20} />,
    label: "设计产出",
    title: "设计产出",
    subtitle: "视觉体系 · 交互稿 · 场景可视化",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          从用户画像卡到场景化视觉稿，这里汇总艺起搭在视觉体系、
          交互流程与场景可视化层面的完整设计产出。
        </p>
        {/* 汇总：原「用户调研」尾 2 张 + 原「技术架构」尾 2 张 + 原「完整视频」组 */}
        {[
          ...yiqidaCdnImages.slice(6, 8),
          ...yiqidaCdnImages.slice(12, 14),
          ...yiqidaCdnImages.slice(14),
        ].map((src, i) => (
          <ProcessImageBlock key={i} src={src} alt={`设计产出 ${i + 1}`} />
        ))}
      </div>
    ),
  },
];

/* ============================================================
   页面主体
   ============================================================ */

export default function ArtBridgePage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<FeatureKey>("travel");
  const currentItem = processItems.find((p) => p.id === openId) ?? null;

  return (
    <WorkLayout navTheme="dark" navTitle="ArtBridge" navSubtitle="小艺私人穿搭搭子">
      {/* ============ Hero ============ */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* 背景底色：紫色深邃渐变（兜底 & 图片加载前） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, #7A2E6C 0%, #571A4A 35%, #340F2C 70%, #20081C 100%)",
          }}
        />
        {/* 主背景图：紫粉球体 + 涂鸦弧线（作为主视觉出现） */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${local("hero-bg.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* 背景压暗层：确保前景白字与样机的可读性 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(32,8,28,0.55) 0%, rgba(32,8,28,0.25) 45%, rgba(32,8,28,0.10) 100%)",
          }}
        />
        {/* 光斑装饰 */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#FF88D9]/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#FFB0DE]/15 blur-3xl" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 flex flex-col md:flex-row items-center gap-10">
          {/* 左：标题文案 */}
          <motion.div
            className="flex-1 text-white z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* 校徽 / 出品方 */}
            <div className="flex items-center gap-3 mb-6 opacity-90">
              <div className="relative w-8 h-8">
                <Image
                  src={local("app-icon.png")}
                  alt="ArtBridge"
                  fill
                  className="object-contain rounded-lg"
                  unoptimized
                />
              </div>
              <span className="text-sm tracking-widest uppercase text-white/70">
                ArtBridge · 艺起搭
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              艺
              <span className="text-[#FF88D9]">起</span>
              搭
            </h1>
            <p className="mt-4 text-xl md:text-3xl text-white/90 font-light tracking-wide">
              小艺 · 你的私人穿搭搭子
            </p>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/60 leading-relaxed">
              为「风格实验型」用户打造的 AI 穿搭伙伴。
              每天早上告诉你今天穿什么，出行时帮你规划整趟旅行的穿搭方案，
              也可以陪你尝试从没试过的风格。
            </p>

            {/* 4 个 icon 入口（浮在标题下方） */}
            <div className="mt-10 flex flex-wrap gap-3">
              {processItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOpenId(item.id)}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white text-sm backdrop-blur-sm transition-all"
                >
                  <span className="text-[#FF88D9] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* 出品信息 */}
            <div className="mt-12 flex items-center gap-4 opacity-70">
              <div className="relative w-auto h-6">
                <Image
                  src={local("logo-tongji-huawei.png")}
                  alt="同济 × 华为"
                  width={180}
                  height={24}
                  className="object-contain h-6 w-auto"
                  unoptimized
                />
              </div>
              <span className="text-xs text-white/50">
                同济大学 × 华为 · 联合课程作业
              </span>
            </div>
          </motion.div>

          {/* 右：双手机高保真样机（Figma 1272-3511 锁屏 + 1272-3527 风格实验台）
              布局：右侧主图（风格实验台 · 大 · 略上）· 左侧副图（锁屏 · 小 · 略下）
              错位交叠，突出视觉层次 */}
          <motion.div
            className="flex-1 relative z-10 flex items-center justify-center min-h-[560px] md:min-h-[720px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="relative w-full max-w-[720px] aspect-[9/10]">
              {/* 副图 · 锁屏（左下 · 略小 · 稍旋转） */}
              <motion.div
                className="absolute left-0 bottom-0 w-[52%] aspect-[359/551] z-10"
                initial={{ opacity: 0, y: 24, rotate: -12 }}
                animate={{ opacity: 1, y: 0, rotate: -8 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={local("hero-hifi-lock.png")}
                  alt="艺起搭 · 锁屏样机"
                  fill
                  sizes="(min-width: 768px) 380px, 260px"
                  className="object-contain drop-shadow-[0_25px_50px_rgba(255,136,217,0.4)]"
                  priority
                  unoptimized
                />
              </motion.div>
              {/* 主图 · 风格实验台（右上 · 大 · 稍旋转 · 位于副图之上） */}
              <motion.div
                className="absolute right-0 top-0 w-[68%] aspect-[566/894] z-20"
                initial={{ opacity: 0, y: 24, rotate: 8 }}
                animate={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={local("hero-hifi-lab.png")}
                  alt="艺起搭 · 风格实验台"
                  fill
                  sizes="(min-width: 768px) 500px, 340px"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(255,136,217,0.5)]"
                  priority
                  unoptimized
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 底部滚动提示 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
          SCROLL ↓
        </div>
      </section>

      {/* ============ Section 2 · 4 大功能入口 Tab ============ */}
      <section className="relative w-full bg-gradient-to-b from-[#20081C] via-[#340F2C] to-[#20081C] pt-24 md:pt-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#FF88D9]/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#FFB0DE]/8 blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-14 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              4 个核心场景，
              <span className="text-[#FF88D9]">「风格实验」</span>
              搭子
            </h2>
            <p className="mt-4 text-white/60 text-base md:text-lg">
              点击下方入口查看对应的产品演示（当前仅「旅游穿搭规划」已实装）
            </p>
          </motion.div>

          <FeatureEntries active={activeFeature} onChange={setActiveFeature} />
        </div>
      </section>

      {/* ============ Section 3 · Feature Showcase 动态切换区 ============ */}
      <section className="relative w-full bg-gradient-to-b from-[#20081C] to-[#340F2C] pt-16 pb-24 md:pb-32 px-4 md:px-12 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto">
          <FeatureShowcase active={activeFeature} />
        </div>
      </section>

      {/* ============ 底部 CTA / 返回 ============ */}
      <section className="relative w-full bg-[#20081C] py-16 px-6 text-center">
        <p className="text-white/50 text-sm mb-4">这是艺起搭故事的一小部分</p>
        <Link
          href="/#works"
          onClick={() => {
            try {
              sessionStorage.setItem("returnTo", "works");
            } catch {
              // ignore
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm transition-all"
        >
          ← 回到 Works 看更多
        </Link>
      </section>

      {/* 抽屉 */}
      <ProcessDrawer
        open={openId !== null}
        onClose={() => setOpenId(null)}
        item={currentItem}
      />
    </WorkLayout>
  );
}
