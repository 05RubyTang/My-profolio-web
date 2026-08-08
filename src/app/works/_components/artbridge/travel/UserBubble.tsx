"use client";

import { motion } from "framer-motion";

/**
 * 用户气泡：右对齐 · 白色半透明 · 尾角在右上
 * 用于顶部固定的用户诉求，也用于底部用户回复
 */
export default function UserBubble({
  children,
  align = "right",
  compact = false,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  compact?: boolean;
}) {
  const isRight = align === "right";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={["flex", isRight ? "justify-end" : "justify-start"].join(" ")}
    >
      <div
        className={[
          "max-w-[86%] text-[13px] leading-[1.5] text-[#161A22]",
          "bg-white/[0.62] backdrop-blur-md border border-white/60",
          "shadow-[0_2px_10px_rgba(60,60,90,0.06)]",
          compact ? "px-3 py-2" : "px-4 py-3",
          isRight
            ? "rounded-[16px_2px_16px_16px]"
            : "rounded-[2px_16px_16px_16px]",
        ].join(" ")}
      >
        {children}
      </div>
    </motion.div>
  );
}
