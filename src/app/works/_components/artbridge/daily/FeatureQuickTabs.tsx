"use client";

import { motion } from "framer-motion";
import { HOME_FEATURE_CARDS } from "../data/dailyOutfitScript";

/**
 * FeatureQuickTabs —— 3 个渐变胶囊横向 Tab
 * 放在 ChatShell 的 aboveComposer 位（BottomTabs 上方 · Composer 上方 · 聊天区下方）
 *
 * 与 Figma node 1219-5666 / 5695 / 5688 保持一致：
 *   - 圆角 11px
 *   - 白色描边
 *   - 3 种渐变底色（粉 · 紫 · 蓝）
 *   - 内阴影 `inset 0 0 1px rgba(255,255,255,1)` + 外发光 `0 0 18px rgba(250,159,159,0.14)`
 */
export default function FeatureQuickTabs() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {HOME_FEATURE_CARDS.map((card, i) => (
        <motion.button
          key={card.key}
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
          className="rounded-[11px] px-2 py-1.5 text-left border border-white/80"
          style={{
            background: card.bg,
            boxShadow:
              "0 0 18px rgba(250,159,159,0.14), inset 0 0 1px rgba(255,255,255,1)",
          }}
        >
          <div
            className="text-[11px] font-bold leading-tight"
            style={{ color: card.titleColor }}
          >
            {card.title}
          </div>
          <div
            className="text-[8px] mt-0.5 leading-tight"
            style={{ color: card.subtitleColor }}
          >
            {card.subtitle}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
