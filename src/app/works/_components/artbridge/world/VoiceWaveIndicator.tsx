"use client";

import { motion } from "framer-motion";

/**
 * 音波条动效 · 用户说话时的可视化反馈
 *
 * 用途：
 *   - 摄像头按钮上方 · 悬浮细长音波（说话中）
 *   - 用户语音气泡前 · 内嵌小音波（区分 AI 文本 vs 用户语音）
 *
 * 表现：
 *   - N 根竖条 · 每根用 sin 波的相位偏移做高度波动
 *   - 支持 size (px 单位控制单根条的宽度和最大高度) 和 barCount
 *   - 支持不同颜色（active = 白色 · inactive = 灰色/透明）
 */
export default function VoiceWaveIndicator({
  active = true,
  barCount = 5,
  barWidth = 2,
  maxHeight = 14,
  color = "#ffffff",
  gap = 2,
}: {
  active?: boolean;
  barCount?: number;
  barWidth?: number;
  maxHeight?: number;
  color?: string;
  gap?: number;
}) {
  // 每根条的动画延时错开（对称从中间往两侧）
  const delays = Array.from({ length: barCount }, (_, i) => {
    const mid = (barCount - 1) / 2;
    return Math.abs(i - mid) * 0.08;
  });

  return (
    <div
      className="flex items-center"
      style={{ gap: `${gap}px`, height: `${maxHeight}px` }}
      aria-hidden
    >
      {delays.map((delay, i) => (
        <motion.span
          key={i}
          className="rounded-full inline-block"
          style={{
            width: `${barWidth}px`,
            background: color,
          }}
          animate={
            active
              ? {
                  height: [
                    `${maxHeight * 0.3}px`,
                    `${maxHeight}px`,
                    `${maxHeight * 0.45}px`,
                    `${maxHeight * 0.85}px`,
                    `${maxHeight * 0.3}px`,
                  ],
                  opacity: [0.6, 1, 0.7, 0.95, 0.6],
                }
              : {
                  height: `${maxHeight * 0.3}px`,
                  opacity: 0.35,
                }
          }
          transition={
            active
              ? {
                  duration: 1.1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}
