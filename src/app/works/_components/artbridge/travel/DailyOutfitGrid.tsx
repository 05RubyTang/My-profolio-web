"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DAILY_OUTFITS } from "../data/travelOutfitScript";

/**
 * 每日穿搭 6 张卡片：3 列 x 2 行
 * -----------------------------------------------------------
 * · 每张卡分两段：上方「日期 · 城市」小胶囊（居中独立一行），下方是穿搭图
 * · 两段严格上下排列，绝不重叠，避免遮挡模特脸部
 * · 图片区固定高度，object-contain 保证完整可见
 */
export default function DailyOutfitGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {DAILY_OUTFITS.map((card, i) => (
        <motion.div
          key={card.date}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.08 * i, duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* 顶部标签：日期 · 城市 · 独立一行居中，不叠在图上 */}
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/55 backdrop-blur-[2px] text-[9px] text-[#5B2E7A] font-medium leading-none">
            <span className="tabular-nums">{card.date}</span>
            <span className="opacity-70">·</span>
            <span>{card.city}</span>
          </div>

          {/* 下方图片区：固定高度，宽度自适应 */}
          <div className="relative w-full h-[150px] mt-1">
            <Image
              src={card.src}
              alt={`${card.date} ${card.scene}`}
              fill
              sizes="120px"
              className="object-contain"
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
