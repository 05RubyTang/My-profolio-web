"use client";

import Image from "next/image";
import type { StarItemCard } from "../data/dailyOutfitScript";

/**
 * StarItemMiniCard —— 聊天页顶部用户诉求气泡右上角贴附的迷你明星单品卡
 *
 * 参考 Figma node 1211_3765：约 80x50 尺寸，保留：
 *  - 特殊圆角：6px 37px 6px 6px（右上大圆角）
 *  - 渐变底（A 粉紫 / B 蓝白 / C 绿白）
 *  - 内部左下角小图 + 右侧编号与风格
 */
export default function StarItemMiniCard({
  card,
  className = "",
}: {
  card: StarItemCard;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative w-[90px] h-[54px] px-1.5 py-1.5 shrink-0 overflow-hidden",
        className,
      ].join(" ")}
      style={{
        background: card.bg,
        borderRadius: "6px 37px 6px 6px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center gap-1.5 h-full">
        {/* 左：小图 */}
        <div className="relative w-[38px] h-[38px] shrink-0 rounded-[4px] overflow-hidden bg-white/60">
          <Image
            src={card.src}
            alt={card.style}
            fill
            sizes="38px"
            className="object-cover"
            unoptimized
          />
        </div>

        {/* 右：编号 + 风格 */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
          <div
            className="text-[8px] font-bold leading-none"
            style={{ color: card.styleColor, letterSpacing: "-0.02em" }}
          >
            {card.code}
          </div>
          <div
            className="text-[9px] font-bold leading-tight truncate"
            style={{ color: card.styleColor }}
          >
            {card.style}
          </div>
          <div
            className="text-[6px] leading-none opacity-70"
            style={{ color: card.styleColor }}
          >
            {card.date} · {card.year}
          </div>
        </div>
      </div>
    </div>
  );
}
