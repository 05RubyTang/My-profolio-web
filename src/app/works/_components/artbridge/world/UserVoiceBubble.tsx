"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import VoiceWaveIndicator from "./VoiceWaveIndicator";

/**
 * 用户语音气泡
 *
 * 与 AI 白色文本区分：
 *   - 磨砂玻璃背板（半透明白 + backdrop-blur）
 *   - 左侧内嵌 mic icon + 音波条（区分是"用户在说话"）
 *   - 文本颜色偏亮白
 *
 * 使用场景：
 *   - "小艺，这件粉色外套我新买的，怎么搭配？"（阶段 1）
 *   - "左边那套不错，很青春。这两套都是我已经有的衣服呀，真不错！"（阶段结束前）
 */
export default function UserVoiceBubble({
  text,
  speaking = false,
}: {
  text: string;
  /** 是否正在说话中（会展示音波动效 · 否则静止） */
  speaking?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto max-w-[92%] flex items-start gap-2 px-3 py-2 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.18)",
        border: "1px solid rgba(255,255,255,0.28)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 6px 16px -6px rgba(0,0,0,0.35)",
      }}
    >
      {/* mic + 小音波 */}
      <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
        <Mic size={12} strokeWidth={2.2} className="text-white" />
        <VoiceWaveIndicator
          active={speaking}
          barCount={3}
          barWidth={1.5}
          maxHeight={8}
          gap={1.5}
        />
      </div>

      {/* 文本 */}
      <p className="text-[13px] leading-[1.45] text-white font-medium flex-1">
        {text}
      </p>
    </motion.div>
  );
}
