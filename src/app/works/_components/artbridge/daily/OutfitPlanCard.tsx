"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type OutfitPlanCard as OutfitPlanCardType } from "../data/dailyOutfitScript";

/**
 * OutfitPlanCard — 「稳稳不出错」/「有点小不同」两张对比穿搭方案卡
 * Figma node 1211-3820 · 1211-3828 复刻
 * -------------------------------------------------------------
 *  卡片结构（自上而下）：
 *   ┌──────────────────────────┐
 *   │ 顶部渐变小 header 条       │ ← 6px 6px 10px 13px 白→半透明渐变
 *   │ ─────────────────────────│
 *   │ 卡片标题（14px 粗）        │
 *   │ 描述文案（8px 细）         │
 *   │                          │
 *   │   Q 版女孩 hero 插画       │ ← Figma 单张主图（含包 + 靴 + 人物）
 *   │   带粉色偏移阴影          │
 *   └──────────────────────────┘
 *  外层：
 *   - 白半透明底 rgba(255,255,255,0.77) + 16px 圆角
 *   - 外阴影 0 0 16px rgba(97,168,255,0.10)
 */
export default function OutfitPlanCardComponent({
  plan,
  delay = 0,
  onClick,
}: {
  plan: OutfitPlanCardType;
  delay?: number;
  onClick?: () => void;
}) {
  const Wrapper: React.ElementType = onClick ? motion.button : motion.div;
  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={onClick ? { y: -2 } : undefined}
      className="relative rounded-2xl border border-white/70 p-3 pt-2 text-left overflow-hidden w-full"
      style={{
        background: "rgba(255,255,255,0.77)",
        boxShadow: "0 0 16px rgba(97,168,255,0.10)",
      }}
    >
      {/* 顶部半透明白渐变小 header 条（Figma "Rectangle 34624296"） */}
      <div
        className="absolute left-3 right-3 top-2 h-[8px] pointer-events-none"
        style={{
          borderRadius: "6px 6px 10px 13px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.83) 0%, rgba(241,241,241,0.44) 62%)",
        }}
      />

      {/* 标题 */}
      <div className="relative text-[14px] font-bold leading-tight text-[#161A22] pt-1">
        {plan.title}
      </div>

      {/* 描述 */}
      <div className="text-[9px] leading-[1.5] text-[#161A22]/85 mt-1">
        {plan.description}
      </div>

      {/* Q 版女孩 hero 插画 · 去掉粉色偏移阴影 */}
      <div className="relative mt-2 aspect-[3/4] w-full rounded-lg overflow-hidden bg-white/40">
        <Image
          src={plan.heroImage}
          alt={plan.title}
          fill
          sizes="140px"
          className="object-contain"
          unoptimized
        />
      </div>
    </Wrapper>
  );
}
