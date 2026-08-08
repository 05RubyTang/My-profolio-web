"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TypingText from "../TypingText";
import AppearAfter from "../AppearAfter";

/** 「灵感新品」胶囊标签字体（YouSheBiaoTiHei 替身 · 与 lab 首页一致） */
const BADGE_FONT =
  "var(--font-zcool-kuaile), 'YouSheBiaoTiHei', 'PingFang SC', sans-serif";

/**
 * 数字衣橱管家 · 内部分析过程（Figma 1211:10299 严格复刻）
 *
 * Figma 结构：每个城市块下方 4 张单品图横排（宽度 38/43/54/38 · 高 52）
 * 第 2 张左下角挂 43x15 白色半透明胶囊「灵感新品」（YouSheBiaoTiHei · #3D63BD）
 * 第 4 张右侧覆 19px 宽白→透明渐变蒙层，暗示还可以继续往右滑
 */

const HOKKAIDO_ITEMS: WardrobeItem[] = [
  { src: "/picture/artbridge/travel/agents/wardrobe-hokkaido-1.png", w: 38 },
  {
    src: "/picture/artbridge/travel/agents/wardrobe-hokkaido-2.png",
    w: 43,
    badge: "灵感新品",
  },
  { src: "/picture/artbridge/travel/agents/wardrobe-hokkaido-3.png", w: 54 },
  { src: "/picture/artbridge/travel/agents/wardrobe-hokkaido-4.png", w: 38 },
];

const TOKYO_ITEMS: WardrobeItem[] = [
  { src: "/picture/artbridge/travel/agents/wardrobe-tokyo-1.png", w: 38 },
  {
    src: "/picture/artbridge/travel/agents/wardrobe-tokyo-2.png",
    w: 43,
    badge: "灵感新品",
  },
  { src: "/picture/artbridge/travel/agents/wardrobe-tokyo-3.png", w: 54 },
  { src: "/picture/artbridge/travel/agents/wardrobe-tokyo-4.png", w: 38 },
];

type WardrobeItem = {
  src: string;
  w: number;
  badge?: string;
};

export default function WardrobeAgent({
  active,
  resetKey,
}: {
  active: boolean;
  resetKey: unknown;
}) {
  return (
    <div className="space-y-1.5">
      {/* 引言 */}
      <div className="rounded-xl bg-white/85 p-1.5 border border-white/80">
        <TypingText
          text="出行方案将结合您的衣橱：70% 来自过往衣物，30% 为新品"
          active={active}
          resetKey={resetKey}
          speed={34}
          startDelay={0}
          className="text-[8px] text-[#161A22] block leading-snug"
        />
      </div>

      {/* 北海道 · 延时到引言块打完再出现 */}
      <AppearAfter delay={2200} resetKey={resetKey}>
        <WardrobeBlock
          title="北海道专用"
          descLines={[
            "外套×2：中款过膝羽绒 · 短款羽绒",
            "内搭×2：短款高领羊毛衫 · 短款针织衫",
            "下装×2：高腰滑雪裤 · 高腰加绒牛仔",
            "鞋履：2cm 微跟防滑雪靴",
            "配饰：窄版厚围巾 · 米白色毛帽",
          ]}
          items={HOKKAIDO_ITEMS}
          titleDelay={200}
          descDelay={900}
          active={active}
          resetKey={resetKey}
        />
      </AppearAfter>

      {/* 东京 · 延时到北海道块结束再出现 */}
      <AppearAfter delay={8600} resetKey={resetKey}>
        <WardrobeBlock
          title="东京专用"
          descLines={[
            "外套×2：H 型羊毛大衣 · 修身轻薄羽绒",
            "内搭×2：短款高领针织 · 白色长袖衬衫",
            "下装×2：高腰直筒牛仔 · 高腰毛呢短裙",
            "鞋履：3cm 细跟裸靴",
            "配饰：窄版细围巾 · 小巧斜挎包",
          ]}
          items={TOKYO_ITEMS}
          titleDelay={200}
          descDelay={900}
          active={active}
          resetKey={resetKey}
        />
      </AppearAfter>
    </div>
  );
}

function WardrobeBlock({
  title,
  descLines,
  items,
  titleDelay,
  descDelay,
  active,
  resetKey,
}: {
  title: string;
  descLines: string[];
  items: WardrobeItem[];
  titleDelay: number;
  descDelay: number;
  active: boolean;
  resetKey: unknown;
}) {
  // Figma 4 张图总宽 38+43+54+38 = 173，间距忽略
  const totalW = items.reduce((s, it) => s + it.w, 0);

  // 每行严格顺序打字：第 i 行 startDelay = 上一行 startDelay + 上一行字符数 × speed + gap
  const DESC_SPEED = 36;
  const LINE_GAP = 120; // 每行结束后的呼吸间隙
  const descStartDelays: number[] = [];
  let cursor = descDelay;
  descLines.forEach((line) => {
    descStartDelays.push(cursor);
    cursor += line.length * DESC_SPEED + LINE_GAP;
  });
  // cursor 现在指向"最后一行完成 + LINE_GAP"的时间点
  const imagesRealDelay = cursor / 1000 + 0.2;

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
      <div className="mt-0.5 space-y-[1px]">
        {descLines.map((line, i) => (
          <TypingText
            key={line}
            text={line}
            active={active}
            resetKey={resetKey}
            speed={DESC_SPEED}
            startDelay={descStartDelays[i]}
            className="text-[7px] text-[#45474B] block leading-[1.3]"
          />
        ))}
      </div>

      {/* 4 张单品图横排 · 第 4 张会被右侧渐变蒙层压掉一部分 */}
      <motion.div
        key={String(resetKey) + title}
        initial={{ opacity: 0, y: 4 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ delay: imagesRealDelay, duration: 0.4 }}
        className="relative w-full mt-1 overflow-hidden"
      >
        <div className="flex gap-[2px]">
          {items.map((it) => (
            <div
              key={it.src}
              className="relative rounded-md overflow-hidden bg-[#F0EAF7] shrink-0"
              style={{
                flexBasis: `${(it.w / totalW) * 100}%`,
                aspectRatio: `${it.w} / 52`,
              }}
            >
              <Image
                src={it.src}
                alt=""
                fill
                sizes="55px"
                className="object-cover"
                unoptimized
              />
              {it.badge ? (
                <span
                  className="absolute left-[2px] bottom-[2px] px-[3px] py-[1px] rounded-[2px] bg-white/80 text-[6px] leading-none tracking-wide"
                  style={{ color: "#3D63BD", fontFamily: BADGE_FONT }}
                >
                  {it.badge}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        {/* 右侧白→透明渐变蒙层（Figma 19px on 147px ≈ 13%） */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[13%]"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
