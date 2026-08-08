"use client";

import { motion } from "framer-motion";

/**
 * AI 主动询问是否下单后，给用户的两个选择按钮
 * ---------------------------------------------
 * · 一键下单     → 红字白底胶囊（红色主色 CTA）
 * · 我有相似款，暂不买 → 黑字白底胶囊（次要 CTA）
 *
 * 两个按钮都是**独立可点击**的，点击后通过回调告诉父组件
 * 让父组件决定后续气泡分支
 */
export default function PurchaseActions({
  delay = 0,
  onOrder,
  onSimilar,
  disabled = false,
}: {
  delay?: number;
  onOrder?: () => void;
  onSimilar?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center gap-2 pt-0.5"
    >
      {/* 一键下单：白底 · 红字 · 红色描边 */}
      <button
        type="button"
        onClick={onOrder}
        disabled={disabled}
        className="h-8 px-4 rounded-full text-[12px] font-medium bg-white text-[#E8414E] border border-[#F2C0C4] shadow-[0_2px_8px_rgba(232,65,78,0.12)] transition-all active:scale-[0.97] hover:bg-[#FFF6F7] disabled:opacity-50"
      >
        一键下单
      </button>

      {/* 我有相似款，暂不买：白底 · 黑字 */}
      <button
        type="button"
        onClick={onSimilar}
        disabled={disabled}
        className="h-8 px-4 rounded-full text-[12px] text-[#161A22] bg-white/90 border border-[#EDE7EE] transition-all active:scale-[0.97] hover:bg-white disabled:opacity-50"
      >
        我有相似款，暂不买
      </button>
    </motion.div>
  );
}
