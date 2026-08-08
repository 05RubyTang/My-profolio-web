"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import {
  GREETING_HEADLINE,
  GREETING_WEATHER,
  STAR_ITEMS,
  type StarItemCard,
} from "../data/dailyOutfitScript";

/**
 * 每日穿搭法则 · 首页
 * -----------------------------------------------------------
 * Figma node 1219-5592 复刻（严格参考）：
 *   顶部：早上好 大标题 + 天气欢迎语（左对齐）
 *   中部：明星单品 3 卡的经典「1 大 + 2 小」布局
 *     - 左侧大卡：A（清爽假日） · 占约 55% 宽 · 竖长比例
 *     - 右侧小卡（上）：B（城市酷感）
 *     - 右侧小卡（下）：C（韩系通勤）
 *   底部：换一换（右对齐）
 *
 * 【本次调整重点】
 * 卡片内是「衣服图片全卡撑满」+「文字信息绝对定位悬浮在图片上层」
 *   - 图片区 absolute inset-0，object-contain 竖向占满
 *   - 文字用 absolute 定位在卡片四角：
 *       左上 → 日期
 *       右上 → 明星单品 X（竖排）
 *       左下 → 风格标签
 *       右下 → 编号
 *   - 有轻微白色渐变遮罩过渡，让文字在图片上有可读性
 */
export default function HomeScene({
  onPick,
}: {
  onPick: (key: StarItemCard["key"]) => void;
}) {
  const cardA = STAR_ITEMS.find((c) => c.key === "A")!;
  const cardB = STAR_ITEMS.find((c) => c.key === "B")!;
  const cardC = STAR_ITEMS.find((c) => c.key === "C")!;

  return (
    <div className="flex flex-col gap-3 pt-1">
      {/* -------- 欢迎语 -------- */}
      <div className="px-1 pt-1">
        <div
          className="text-[22px] font-bold leading-[1.3] text-[#161A22] tracking-tight"
          style={{ fontFamily: "'Alibaba PuHuiTi 2.0', 'PingFang SC', sans-serif" }}
        >
          {GREETING_HEADLINE}
        </div>
        <div className="text-[12px] text-[#161A22]/85 mt-1.5 leading-[1.5]">
          {GREETING_WEATHER}
        </div>
      </div>

      {/* -------- 明星单品 1 大 + 2 小 布局 -------- */}
      <div className="grid grid-cols-[55%_1fr] gap-2 px-1 pt-2">
        {/* 左：大卡 A */}
        <StarCardLarge card={cardA} onClick={() => onPick("A")} />

        {/* 右：B / C 竖排两张小卡 */}
        <div className="flex flex-col gap-2">
          <StarCardSmall card={cardB} onClick={() => onPick("B")} />
          <StarCardSmall card={cardC} onClick={() => onPick("C")} />
        </div>
      </div>

      {/* -------- 换一换（右对齐） -------- */}
      <div className="flex items-center justify-end pr-1 pt-1">
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] text-[#AB468D] hover:opacity-80 transition-opacity"
        >
          <RefreshCcw size={11} strokeWidth={2.2} />
          换一换
        </button>
      </div>
    </div>
  );
}

/**
 * 左侧大卡：Figma 12px 78px 12px 12px 特殊圆角
 * 卡内元素叠层（从下到上）：
 *   1. 底图（Image object-contain，撑满整卡）
 *   2. 顶部/底部微渐变遮罩（提升文字可读性）
 *   3. 悬浮文字（绝对定位 · 四角）
 */
function StarCardLarge({
  card,
  onClick,
}: {
  card: StarItemCard;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden border border-white/80 w-full text-left"
      style={{
        borderRadius: "12px 78px 12px 12px",
        background: card.bg,
        boxShadow:
          "0 5px 10px rgba(249,162,203,0.18), inset 0 5px 5px rgba(255,255,255,0.25)",
        aspectRatio: "145 / 240",
      }}
    >
      {/* 底层：衣服图片 · 撑满整卡（object-contain 保持完整可见） */}
      <div className="absolute inset-0">
        <Image
          src={card.src}
          alt={`明星单品 ${card.key}`}
          fill
          sizes="180px"
          className="object-contain p-1"
          unoptimized
        />
      </div>

      {/* 顶部微渐变（保证左上日期 · 右上竖排文字有对比度） */}
      <div
        className="absolute top-0 left-0 right-0 h-14 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* 底部微渐变（保证风格 · 编号有对比度） */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* 左上：年 · 日期 · 明星单品 X（横排，位于日期下方，避开右上被袖子遮挡） */}
      <div className="absolute top-2 left-2 leading-tight">
        <div className="text-[10px] font-light text-[#161A22]">2025</div>
        <div className="text-[10px] font-light text-[#161A22]">{card.date}</div>
        <div
          className="text-[10px] font-medium text-[#161A22]/85 mt-1"
          style={{ letterSpacing: "0.05em" }}
        >
          明星单品{card.key}
        </div>
      </div>

      {/* 左下：风格标签 */}
      <div
        className="absolute bottom-2 left-2 text-[12px] font-semibold leading-tight"
        style={{ color: card.styleColor }}
      >
        {card.style}
      </div>

      {/* 右下：编号 */}
      <div
        className="absolute bottom-2 right-2 text-[7px] font-bold"
        style={{ color: "#CEADBF", letterSpacing: "0.05em" }}
      >
        {card.code}
      </div>
    </motion.button>
  );
}

/**
 * 右侧小卡：Figma 6px 37px 6px 6px 圆角
 * 结构与大卡同款：图片撑满 + 文字叠在四角
 */
function StarCardSmall({
  card,
  onClick,
}: {
  card: StarItemCard;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden border border-white/80 w-full text-left"
      style={{
        borderRadius: "6px 37px 6px 6px",
        background: card.bg,
        boxShadow:
          "0 2px 4px rgba(252,174,211,0.24), inset 0 2px 2px rgba(255,255,255,0.25)",
        aspectRatio: "100 / 115",
      }}
    >
      {/* 底层：衣服图片 */}
      <div className="absolute inset-0">
        <Image
          src={card.src}
          alt={`明星单品 ${card.key}`}
          fill
          sizes="120px"
          className="object-contain p-1"
          unoptimized
        />
      </div>

      {/* 顶部微渐变 */}
      <div
        className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* 底部微渐变 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* 左上：日期 · 明星单品 X（横排，位于日期下方，避开右上被袖子遮挡） */}
      <div className="absolute top-1.5 left-1.5 leading-tight">
        <div className="text-[7px] font-light text-[#161A22]">2025</div>
        <div className="text-[7px] font-light text-[#161A22]">{card.date}</div>
        <div
          className="text-[8px] font-medium text-[#161A22]/85 mt-0.5"
          style={{ letterSpacing: "0.04em" }}
        >
          明星单品{card.key}
        </div>
      </div>

      {/* 左下：风格标签 */}
      <div
        className="absolute bottom-1.5 left-1.5 text-[9px] font-semibold leading-tight"
        style={{ color: card.styleColor }}
      >
        {card.style}
      </div>

      {/* 右下：编号 */}
      <div
        className="absolute bottom-1 right-1.5 text-[6px] font-bold"
        style={{ color: "#CEADBF", letterSpacing: "0.05em" }}
      >
        {card.code}
      </div>
    </motion.button>
  );
}
