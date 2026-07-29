"use client";

import { useState } from "react";

/**
 * MarqueeFooter — 底部横向滚动文字 + hover 放大关键词
 *
 * 默认状态：深色背景上，文字无限横向滚动
 * Hover 状态：滚动暂停，切换为放大的关键词
 */

const SCROLL_TEXT =
  "I'm not a designer for art's sake, I just want to find a better way to live.";
const HOVER_TEXT = "DESIGN IS SOLVING PROBLEMS.";

export default function MarqueeFooter() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer
      className="relative overflow-hidden cursor-default select-none border-t border-ink/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 滚动文字层 — 居中，宽度 50% */}
      <div
        className="mx-auto transition-all duration-700 ease-out"
        style={{
          width: "50%",
          opacity: isHovered ? 0 : 1,
          transform: isHovered ? "scale(0.95)" : "scale(1)",
        }}
      >
        <div className="py-8 md:py-10 whitespace-nowrap overflow-hidden">
          <div
            className="inline-flex marquee-footer-scroll"
            style={{
              animationPlayState: isHovered ? "paused" : "running",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="inline-flex items-center gap-8 mx-8 text-lg md:text-xl lg:text-2xl font-handwriting tracking-wide text-ink-muted"
              >
                <span>{SCROLL_TEXT}</span>
                <span className="text-sm opacity-30">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover 关键词层 — 绝对定位叠在滚动层上方 */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "scale(1)" : "scale(0.75)",
          pointerEvents: isHovered ? "auto" : "none",
        }}
      >
        <div className="text-center px-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-handwriting font-bold tracking-widest text-ink uppercase">
            {HOVER_TEXT}
          </h3>
        </div>
      </div>

      {/* 底部版权信息 */}
      <div className="relative z-10 pb-5 text-center">
        <p
          className="text-[11px] tracking-wider text-ink-muted/30 transition-opacity duration-500"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          © 2026 Ruby Tang · Built with Next.js + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
