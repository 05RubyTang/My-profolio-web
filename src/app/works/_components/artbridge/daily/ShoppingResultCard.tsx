"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw, ShoppingBag } from "lucide-react";
import { RESULT_PRODUCTS } from "../data/dailyOutfitScript";

/**
 * ShoppingResultCard —— 小艺为您找到的 3 款高品质好衣结果卡（Figma node 1211_6924）
 *
 * 视觉：
 *  - 白色半透明底 (rgba(255,255,255,0.77)) · 16px 圆角
 *  - 3 个商品竖排：图 + 标题 + 底部红色渐变「小艺下单」CTA
 *  - 卡片右下角有「换一换」小按钮
 *
 * 交互：每个商品都可点击「小艺下单」，触发 onOrder(key, title)
 */
export default function ShoppingResultCard({
  onOrder,
  disabled = false,
}: {
  onOrder: (key: string, title: string) => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-white/70 p-3 pb-2"
      style={{
        background: "rgba(255,255,255,0.77)",
        boxShadow: "0 0 16px rgba(97,168,255,0.10)",
      }}
    >
      <div className="space-y-2.5">
        {RESULT_PRODUCTS.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.12 }}
            className="flex gap-2.5 items-stretch"
          >
            <div className="relative w-[64px] h-[64px] shrink-0 rounded-[10px] overflow-hidden bg-[#F0EAF7]">
              <Image
                src={p.src}
                alt={p.title}
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </div>

            {/*
              信息区纵向 2 行：
                第 1 行：商品标题（跨整行）
                第 2 行：左「价格 + 销量 + 好评」 · 右「小艺下单」CTA
                        —— 二者在同一 flex 行 · items-center 让文字与按钮水平中线对齐
            */}
            <div className="flex-1 min-w-0 flex flex-col gap-1 py-0.5">
              {/* 标题 */}
              <div className="text-[10px] font-bold text-[#45474B] leading-[1.4] line-clamp-2">
                {p.title}
              </div>

              {/* 价格销量 + 小艺下单 · 同一水平线（items-center） */}
              <div className="flex items-center justify-between gap-2">
                {/* 左：价格（红）+ 月销量 + 好评率（灰） */}
                <div className="flex items-baseline gap-1.5 leading-none flex-wrap min-w-0">
                  <span className="text-[12px] font-bold text-[#E8414E]">
                    <span className="text-[9px] mr-[1px] font-semibold">¥</span>
                    {p.price}
                  </span>
                  <span className="text-[9px] text-[#9CA3AF] font-medium">
                    {p.monthlySales}
                  </span>
                  <span className="text-[9px] text-[#9CA3AF] font-medium">
                    {p.positiveRate}
                  </span>
                </div>

                {/* 右：小艺下单 CTA */}
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onOrder(p.key, p.title)}
                  className={[
                    "flex items-center gap-1 px-2 py-[3px] rounded-[3px] text-[10px] text-white",
                    "transition-all shrink-0",
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:brightness-105 active:scale-[0.97] cursor-pointer",
                  ].join(" ")}
                  style={{
                    background:
                      "linear-gradient(155deg, #E8414E 0%, #E66771 100%)",
                    boxShadow: "0 0 12px rgba(232,65,78,0.20)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <ShoppingBag size={9} strokeWidth={2.2} />
                  <span>小艺下单</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-end pt-2 pr-0.5">
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] text-[#4D4D4D] hover:opacity-80 transition-opacity"
        >
          <RefreshCcw size={10} strokeWidth={2.2} />
          换一换
        </button>
      </div>
    </motion.div>
  );
}
