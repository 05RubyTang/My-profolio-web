"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PurchaseProduct } from "../data/travelOutfitScript";

/**
 * 单张商品购买卡（竖式布局，用在 2 列宫格中）：
 *   ┌────────────┐
 *   │            │
 *   │   商品图   │  ← 上方大图 · 1:1 方形
 *   │            │
 *   ├────────────┤
 *   │ 商品名     │
 *   │ ¥xxx      │
 *   │ [店铺信息]│
 *   ├────────────┤
 *   │  小艺下单  │  ← 红字白底 CTA 按钮（可点击）
 *   └────────────┘
 */
export default function ProductPurchaseCard({
  product,
  delay = 0,
  onOrder,
}: {
  product: PurchaseProduct;
  delay?: number;
  onOrder?: (product: PurchaseProduct) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex flex-col rounded-xl bg-white/95 border border-white/80 overflow-hidden shadow-[0_2px_10px_rgba(60,60,90,0.06)]"
    >
      {/* 商品图 · 上方 1:1 */}
      <div className="relative w-full aspect-square bg-[#F8F5FA]">
        <Image
          src={product.src}
          alt={product.name}
          fill
          sizes="140px"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* 商品信息 */}
      <div className="px-2 pt-1.5 pb-1.5">
        <div className="text-[11px] leading-tight text-[#161A22] line-clamp-2 min-h-[26px]">
          {product.name}
        </div>
        <div className="flex items-baseline gap-0.5 mt-1">
          <span className="text-[10px] font-bold text-[#E8414E] tabular-nums leading-none">
            ¥
          </span>
          <span className="text-[15px] font-bold text-[#E8414E] tabular-nums leading-none">
            {product.price}
          </span>
          <span className="text-[9px] text-[#8b8f97] ml-1 truncate">
            {product.origPrice}+人付款
          </span>
        </div>
        {/* 店铺信息小胶囊 */}
        <div className="mt-1 inline-flex items-center gap-0.5 max-w-full px-1.5 py-0.5 rounded-full bg-[#F4EDF0] text-[8.5px] text-[#7A6D74]">
          <span className="truncate">回头客 10 万+ · {product.brand}</span>
          <span className="opacity-60">›</span>
        </div>
      </div>

      {/* 小艺下单 CTA · 独立可点击 */}
      <button
        type="button"
        onClick={() => onOrder?.(product)}
        className="mx-2 mb-2 h-6 rounded-md text-white text-[11px] font-medium leading-none flex items-center justify-center transition-transform active:scale-[0.97]"
        style={{
          background: "linear-gradient(180deg,#EF6570 0%,#E8414E 100%)",
          boxShadow: "0 2px 6px rgba(232,65,78,0.25)",
        }}
      >
        小艺下单
      </button>
    </motion.div>
  );
}
