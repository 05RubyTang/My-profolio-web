"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Users, Palette } from "lucide-react";
import WorkLayout from "../_components/WorkLayout";
import ProcessDrawer, { ProcessItem, ProcessImageGroup } from "../_components/ProcessDrawer";
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
    id: "insight",
    icon: <Users size={20} />,
    label: "用户需要的穿搭AI是生活化的",
    title: "用户需要的穿搭 AI 是生活化的",
    subtitle: "市场扫描 + 9 位深访 · 提炼 3 类核心人群",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          我们先扫描国内外主要的 AI 穿搭 / 时尚推荐产品，梳理出「工具型」与「陪伴型」两类核心竞品；
          再通过 9 位深度访谈，提炼出「风格实验型」、「懒人穿搭型」、「场合焦虑型」3 类核心人群，
          归纳出各自最关心的场景与痛点。
        </p>
        <ProcessImageGroup
          srcs={yiqidaCdnImages.slice(0, 6)}
          altPrefix="用户与市场洞察"
        />
      </div>
    ),
  },
  {
    id: "tech",
    icon: <Cpu size={20} />,
    label: "我们如何做到越来越懂你？",
    title: "我们如何做到越来越懂你？",
    subtitle: "多模态感知 · Agent 编排 · 记忆系统",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          艺起搭底层由「多模态感知 → 意图路由 → 场景 Agent → 长期记忆」四层组成。
          每次穿搭对话都会写入用户风格向量，越用越懂你。
        </p>
        <ProcessImageGroup
          srcs={yiqidaCdnImages.slice(8, 12)}
          altPrefix="技术架构"
        />
      </div>
    ),
  },
  {
    id: "design",
    icon: <Palette size={20} />,
    label: "智慧穿搭Agent的设计策略",
    title: "智慧穿搭 Agent 的设计策略",
    subtitle: "视觉体系 · 交互稿 · 场景可视化",
    content: (
      <div>
        <p className="text-sm text-black/70 leading-relaxed mb-6">
          从用户画像卡到场景化视觉稿，这里汇总艺起搭在视觉体系、
          交互流程与场景可视化层面的完整设计产出。
        </p>
        {/* 汇总：原「用户调研」尾 2 张 + 原「技术架构」尾 2 张 + 原「完整视频」组 */}
        <ProcessImageGroup
          srcs={[
            ...yiqidaCdnImages.slice(6, 8),
            ...yiqidaCdnImages.slice(12, 14),
            ...yiqidaCdnImages.slice(14),
          ]}
          altPrefix="设计产出"
        />
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
        {/* 主背景渐变：品红 → 深紫红对角渐变（用户指定，保留紫色沉稳感 + 一抹亮粉活力） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(298deg, #C155A9 -6.73%, #552459 60.35%)",
          }}
        />
        {/* 星球纹理叠加：hero-bg.png 作为柔和纹理点缀，不喧宾夺主 */}
        <div
          className="absolute inset-0 opacity-45 mix-blend-soft-light"
          style={{
            backgroundImage: `url(${local("hero-bg.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* 背景压暗层：左侧文字区加深，右侧样机区透亮 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(46,15,48,0.45) 0%, rgba(46,15,48,0.18) 45%, rgba(46,15,48,0.05) 100%)",
          }}
        />
        {/* 光斑装饰（品红呼应） */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#C155A9]/25 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#E070C0]/18 blur-3xl" />

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
              <span className="text-[#FFB0DE]">起</span>
              搭
            </h1>
            <p className="mt-4 text-xl md:text-3xl text-white/90 font-light tracking-wide">
              小艺 · 你的私人穿搭搭子
            </p>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
              <span className="text-[#FFB0DE]">旧衣新穿</span>
              ，小艺 Agent 带你搭出私人风格
            </p>

            {/* 3 个 icon 入口（垂直排 · 无底色 · 保留 icon） */}
            <p className="mt-10 mb-3 text-xs text-white/45 tracking-wide">
              点击查看项目报告：
            </p>
            <div className="flex flex-col gap-2 items-start">
              {processItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOpenId(item.id)}
                  className="group flex items-center gap-2.5 py-1.5 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <span className="text-[#FFB0DE] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="border-b border-transparent group-hover:border-[#FFB0DE]/60 transition-colors">
                    {item.label}
                  </span>
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
              <span className="text-xs text-white/40">
                · 项目时间 2025 / 11
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
                  className="object-contain drop-shadow-[0_25px_50px_rgba(193,85,169,0.45)]"
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
                  className="object-contain drop-shadow-[0_30px_60px_rgba(193,85,169,0.55)]"
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
      <section
        className="relative w-full pt-24 md:pt-32 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2E0F30 0%, #3E1740 45%, #2E0F30 100%)",
        }}
      >
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#C155A9]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#E070C0]/10 blur-3xl" />

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
              <span className="text-[#FFB0DE]">「风格实验」</span>
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
      <section
        className="relative w-full pt-16 pb-24 md:pb-32 px-4 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2E0F30 0%, #3E1740 100%)",
        }}
      >
        <div className="relative max-w-[1200px] mx-auto">
          <FeatureShowcase active={activeFeature} />
        </div>
      </section>

      {/* ============ 底部 CTA / 返回 ============ */}
      <section
        className="relative w-full py-16 px-6 text-center"
        style={{
          background:
            "linear-gradient(180deg, #3E1740 0%, #2E0F30 100%)",
        }}
      >
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
