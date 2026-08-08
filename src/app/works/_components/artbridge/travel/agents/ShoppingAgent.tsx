"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TypingText from "../TypingText";
import AppearAfter from "../AppearAfter";

/**
 * 优选购物助手 · 内部分析过程（Figma 1211:10343 严格复刻）
 *
 * 每品类 3 张商品图（Figma 尺寸：前 2 张 56x92 · 第 3 张 15x92 · r=5，左圆右直）
 * 说明第 3 张是"被截断预览"，暗示还可以继续横滑。
 * 右侧再叠 19px 宽白→透明渐变蒙层强化这层暗示。
 */

const BOOTS = [
  "/picture/artbridge/travel/agents/shop-boots-1.png",
  "/picture/artbridge/travel/agents/shop-boots-2.png",
  "/picture/artbridge/travel/agents/shop-boots-3.png",
];

const SKIRT = [
  "/picture/artbridge/travel/agents/shop-skirt-1.png",
  "/picture/artbridge/travel/agents/shop-skirt-2.png",
  "/picture/artbridge/travel/agents/shop-skirt-3.png",
];

export default function ShoppingAgent({
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
          text="核心灵感新品为「微跟防滑雪靴」与「高腰毛呢短裙」，正在根据回头客多、销量高、真实评价好、性价比高，为您寻找高品质店铺……"
          active={active}
          resetKey={resetKey}
          speed={30}
          startDelay={0}
          className="text-[8px] text-[#161A22] block leading-snug"
        />
      </div>

      {/* 靴子 · 延时到引言块打完再出现 */}
      <AppearAfter delay={4200} resetKey={resetKey}>
        <ShoppingBlock
          title="微跟防滑雪靴"
          images={BOOTS}
          titleDelay={200}
          imagesDelay={1.0}
          active={active}
          resetKey={resetKey}
        />
      </AppearAfter>

      {/* 短裙 · 延时到靴子块结束再出现 */}
      <AppearAfter delay={7600} resetKey={resetKey}>
        <ShoppingBlock
          title="高腰毛呢短裙"
          images={SKIRT}
          titleDelay={200}
          imagesDelay={1.0}
          active={active}
          resetKey={resetKey}
        />
      </AppearAfter>
    </div>
  );
}

function ShoppingBlock({
  title,
  images,
  titleDelay,
  imagesDelay,
  active,
  resetKey,
}: {
  title: string;
  images: string[];
  titleDelay: number;
  imagesDelay: number;
  active: boolean;
  resetKey: unknown;
}) {
  // Figma 尺寸：56 + 56 + 15 = 127px 总宽 · 高 92
  const widths = [56, 56, 15];
  const total = widths.reduce((s, w) => s + w, 0);
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
      <motion.div
        key={String(resetKey) + title}
        initial={{ opacity: 0, y: 4 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ delay: imagesDelay, duration: 0.4 }}
        className="relative w-full mt-1 overflow-hidden"
      >
        <div className="flex gap-[3px]">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 4 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{
                delay: imagesDelay + 0.1 + i * 0.12,
                duration: 0.3,
              }}
              className="relative overflow-hidden bg-[#F0EAF7] shrink-0"
              style={{
                flexBasis: `${(widths[i] / total) * 100}%`,
                aspectRatio: `${widths[i]} / 92`,
                // 第 3 张：左圆右直（对应 Figma r=5,0,0,5）
                borderRadius: i === 2 ? "5px 0 0 5px" : "5px",
              }}
            >
              <Image
                src={src}
                alt={title}
                fill
                sizes="60px"
                className="object-cover object-left"
                unoptimized
              />
            </motion.div>
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
