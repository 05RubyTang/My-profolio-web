"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TypingText from "../TypingText";
import AppearAfter from "../AppearAfter";

/**
 * 风格策划顾问 · 内部分析过程
 *
 * 打字机顺序：
 *   0ms:「📝 您的身材数据：158cm/100 斤 🎯 …」
 *   1200ms:「结合您最近社交媒体上收藏…」
 *   2000ms: 北海道主题标题
 *   2400ms: 北海道主题说明
 *   3200ms: 北海道 3 张灵感图 fade-in
 *   4000ms: 东京主题标题
 *   4400ms: 东京主题说明
 *   5200ms: 东京 3 张灵感图 fade-in
 */

const HOKKAIDO_IMGS = [
  "/picture/artbridge/travel/agents/style-hokkaido-1.png",
  "/picture/artbridge/travel/agents/style-hokkaido-2.png",
  "/picture/artbridge/travel/agents/style-hokkaido-3.png",
];

const TOKYO_IMGS = [
  "/picture/artbridge/travel/agents/style-tokyo-1.png",
  "/picture/artbridge/travel/agents/style-tokyo-2.png",
  "/picture/artbridge/travel/agents/style-tokyo-3.png",
];

export default function StyleAgent({
  active,
  resetKey,
}: {
  active: boolean;
  resetKey: unknown;
}) {
  return (
    <div className="space-y-1.5">
      {/* 用户画像 + 引言 */}
      <div className="rounded-xl bg-white/85 p-1.5 border border-white/80">
        <TypingText
          text="📝 158cm/100 斤 · 🎯 小个子显高 + 显瘦不臃肿 · 👔 高腰短款 + 合身廓形"
          active={active}
          resetKey={resetKey}
          speed={34}
          startDelay={0}
          className="text-[8px] text-[#161A22] block leading-snug"
        />
        <TypingText
          text="结合您最近社交媒体收藏的穿搭笔记，规划以下出游风格主题："
          active={active}
          resetKey={resetKey}
          speed={34}
          startDelay={2000}
          className="text-[8px] text-[#45474B] block leading-snug mt-1"
        />
      </div>

      {/* 北海道主题 · 延时到引言块打完再出现 */}
      <AppearAfter delay={3600} resetKey={resetKey}>
        <ThemeBlock
          title="北海道札幌 · 雪境暖调户外风"
          desc="以「抗寒 + 雪景出片」为核心，柔和暖调中和冷感"
          images={HOKKAIDO_IMGS}
          active={active}
          resetKey={resetKey}
          titleDelay={200}
          descDelay={800}
          imagesDelay={2.4}
        />
      </AppearAfter>

      {/* 东京主题 · 延时到北海道块结束再出现 */}
      <AppearAfter delay={7000} resetKey={resetKey}>
        <ThemeBlock
          title="东京 · 都市简约 · 清楚系"
          desc="轻便保暖 + 时尚百搭，适配逛街、打卡、通勤"
          images={TOKYO_IMGS}
          active={active}
          resetKey={resetKey}
          titleDelay={200}
          descDelay={800}
          imagesDelay={2.4}
        />
      </AppearAfter>
    </div>
  );
}

function ThemeBlock({
  title,
  desc,
  images,
  active,
  resetKey,
  titleDelay,
  descDelay,
  imagesDelay,
}: {
  title: string;
  desc: string;
  images: string[];
  active: boolean;
  resetKey: unknown;
  titleDelay: number;
  descDelay: number;
  imagesDelay: number;
}) {
  return (
    <div className="rounded-xl bg-white/61 p-1.5 border border-white/70">
      <TypingText
        text={title}
        active={active}
        resetKey={resetKey}
        speed={38}
        startDelay={titleDelay}
        className="text-[9px] font-semibold text-[#161A22] block leading-tight"
      />
      <TypingText
        text={desc}
        active={active}
        resetKey={resetKey}
        speed={34}
        startDelay={descDelay}
        className="text-[8px] text-[#45474B] block leading-snug mt-0.5"
      />
      <div className="grid grid-cols-3 gap-1 mt-1" key={String(resetKey)}>
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 4 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ delay: imagesDelay + i * 0.15, duration: 0.35 }}
            className="relative aspect-[3/5] rounded-md overflow-hidden bg-[#F0EAF7]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="45px"
              className="object-cover"
              unoptimized
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
