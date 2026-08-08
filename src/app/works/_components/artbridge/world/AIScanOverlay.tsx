"use client";

import { motion } from "framer-motion";
import { ScanLine, Sparkles } from "lucide-react";
import {
  WORLD_ITEM_TAGS,
  WORLD_SCAN_CHIP,
} from "../data/seeTheWorldScript";

/**
 * AI 扫描覆盖层（阶段 2）
 *
 * 效果：
 *   - 半透明扫描框（矩形描边 + 4 个 L 型 corner）居中
 *   - 一条青色横线从上到下匀速扫过（3 秒 loop）
 *   - 上方 chip：AI 正在识别衣物...
 *   - 下方 4 个识别标签（花苞外套 / 浅粉色 / 羊毛针织 / 秋季）依次淡入
 *
 * 定位：内嵌到 VideoCallShell 的主内容区，撑满可用高度
 */
export default function AIScanOverlay({
  showTags = false,
}: {
  /** 扫描结束后是否展示 4 个识别标签 */
  showTags?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* ---------- 顶部 chip ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4"
        style={{
          background: "rgba(255,255,255,0.17)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Sparkles size={11} className="text-[#FF88D9]" />
        <span className="text-[11px] font-medium text-white/95 tracking-wide">
          {WORLD_SCAN_CHIP}
        </span>
      </motion.div>

      {/* ---------- 扫描框 ---------- */}
      <div
        className="relative"
        style={{ width: "58%", aspectRatio: "3 / 4" }}
      >
        {/* 4 个 L 型 corner */}
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {/* 内部半透明面板 */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,136,217,0.08) 0%, rgba(255,136,217,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* 扫描线（匀速上下往复） */}
        <motion.div
          className="absolute left-2 right-2 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,136,217,0) 0%, rgba(255,136,217,0.9) 50%, rgba(255,136,217,0) 100%)",
            boxShadow: "0 0 12px 2px rgba(255,136,217,0.6)",
          }}
          initial={{ top: "8%" }}
          animate={{ top: ["8%", "88%", "8%"] }}
          transition={{
            duration: 2.4,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* 中央 icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        >
          <ScanLine size={40} className="text-white/60" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* ---------- 识别标签（tags） ---------- */}
      {showTags && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-1.5 mt-4 px-2"
        >
          {WORLD_ITEM_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="text-[10px] font-medium tracking-wide text-white px-2 py-1 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,136,217,0.35) 0%, rgba(247,128,199,0.35) 100%)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              # {tag}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-4 h-4 border-white/85";
  const map: Record<typeof pos, string> = {
    tl: "top-0 left-0 border-l-2 border-t-2 rounded-tl-md",
    tr: "top-0 right-0 border-r-2 border-t-2 rounded-tr-md",
    bl: "bottom-0 left-0 border-l-2 border-b-2 rounded-bl-md",
    br: "bottom-0 right-0 border-r-2 border-b-2 rounded-br-md",
  };
  return <span className={`${base} ${map[pos]}`} />;
}
