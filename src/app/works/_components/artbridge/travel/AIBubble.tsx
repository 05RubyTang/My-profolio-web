"use client";

import { motion } from "framer-motion";

/** AI 气泡：左对齐 · 浅灰底 · 尾角在左上 */
export default function AIBubble({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex justify-start"
    >
      <div
        className={[
          "max-w-[86%] text-[13px] leading-[1.5] text-[#161A22]",
          "bg-[#F2F2F2] rounded-[2px_18px_18px_18px]",
          compact ? "px-3 py-2" : "px-4 py-3",
        ].join(" ")}
      >
        {children}
      </div>
    </motion.div>
  );
}
