"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

/**
 * 「风格悖论」系统状态 chip
 *
 * 对齐 Figma node 1211:11939 / 1211:12423 Frame 1000007843：
 *   - 圆角胶囊 r=(0,20,20,20)
 *   - 左侧 rgb(36,155,71) 绿色 check icon
 *   - 主文本 rgb(22,26,34) sz 14 w 400
 *   - 右侧下拉小箭头 rgb(144,144,144) 12x12
 *
 * 常用文案：
 *   - "已生成今日研究课题"
 *   - "已为您完善方案"
 */
export default function LabSystemChip({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center gap-1.5 px-2 py-1"
      style={{ borderRadius: "0 14px 14px 14px" }}
    >
      <Check
        size={12}
        strokeWidth={3}
        style={{ color: "rgb(36,155,71)" }}
      />
      <span
        className="text-[12px] leading-none"
        style={{ color: "rgb(22,26,34)" }}
      >
        {text}
      </span>
      <ChevronDown
        size={10}
        strokeWidth={2.5}
        style={{ color: "rgb(144,144,144)" }}
      />
    </motion.div>
  );
}
