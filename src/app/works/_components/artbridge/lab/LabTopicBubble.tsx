"use client";

import { motion } from "framer-motion";
import { PARADOX_TOPIC } from "../data/styleLabScript";

/**
 * 「风格悖论」主课题气泡
 *
 * 对齐 Figma node 1211:11939 中：
 *   - 卡片：粉白渐变（rgba(255,210,238)→255→rgba(250,233,249)）
 *   - 圆角 13.6
 *   - 左边 4px 粉紫色 hairline（LINE=stroke gradient）
 *   - 右侧一个椭圆 dot 装饰（Ellipse 84）
 *   - 上方 chip「已生成今日研究课题」
 *   - 主标题 rgb(0,0,0) sz 17 w 400（本组件里加粗以更抢眼）
 *   - 副标题 rgb(103,103,103) sz 12 w 300
 *
 * 下方另有一段 AI 阐述文字（PARADOX_INTRO）用另一个 AIBubble 承接，
 * 本组件只承担「主课题卡」这一块。
 */
export default function LabTopicBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative rounded-[14px] overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgb(255,210,238) 0%, rgb(255,255,255) 34%, rgb(250,233,249) 91%)",
        border: "1px solid rgba(255,183,222,0.6)",
        boxShadow: "0 3.4px 41px rgba(255,97,192,0.08)",
      }}
    >
      {/* 左侧粉紫色 hairline · 对齐 Figma Line 155 */}
      <div
        aria-hidden
        className="absolute left-[10px] top-[12px] w-[3px] h-[24px] rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgb(255,97,192) 0%, rgb(255,183,222) 100%)",
        }}
      />

      {/* 右上装饰椭圆 dot · 对齐 Figma Ellipse 84 */}
      <div
        aria-hidden
        className="absolute right-[14px] top-[50%] -translate-y-1/2 w-[18px] h-[16px] rounded-full"
        style={{
          border: "1.6px solid rgba(255,97,192,0.35)",
        }}
      />

      <div className="px-4 py-3 pl-6">
        {/* 主标题 */}
        <h3
          className="text-[16px] font-semibold leading-snug"
          style={{ color: "rgb(22,26,34)" }}
        >
          {PARADOX_TOPIC.title}
        </h3>
        {/* 副标题（保留 \n 换行） */}
        <p
          className="mt-1 text-[11.5px] leading-relaxed whitespace-pre-line font-light"
          style={{ color: "rgb(103,103,103)" }}
        >
          {PARADOX_TOPIC.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
