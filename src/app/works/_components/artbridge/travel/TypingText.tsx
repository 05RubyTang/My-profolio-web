"use client";

import { useEffect, useState } from "react";

/**
 * 通用打字机文本组件
 *
 * @param text 完整文本
 * @param active 是否开始打字（如 false 则完全不显示）
 * @param resetKey 依赖变化时会重置从头再打
 * @param speed 每个字符间隔 ms
 * @param startDelay 开始前延迟 ms
 * @param showCaret 打字未完成时是否显示光标（默认 false，Agent 卡场景不显示光标）
 */
export default function TypingText({
  text,
  active,
  resetKey,
  speed = 32,
  startDelay = 0,
  className = "",
  showCaret = false,
  as: Tag = "span",
}: {
  text: string;
  active: boolean;
  resetKey?: unknown;
  speed?: number;
  startDelay?: number;
  className?: string;
  showCaret?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const [visible, setVisible] = useState("");

  useEffect(() => {
    setVisible("");
    if (!active) return;

    let cancelled = false;
    let intervalId: number | null = null;

    const startTimer = window.setTimeout(() => {
      if (cancelled) return;
      let i = 0;
      intervalId = window.setInterval(() => {
        i += 1;
        setVisible(text.slice(0, i));
        if (i >= text.length && intervalId !== null) {
          window.clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [text, active, speed, startDelay, resetKey]);

  const done = visible.length >= text.length;

  const Element = Tag as unknown as React.ElementType;
  return (
    <Element className={className}>
      {visible}
      {showCaret && !done && active && (
        <span className="inline-block align-[-2px] ml-[1px] w-[3px] h-[10px] bg-current opacity-70 animate-pulse" />
      )}
    </Element>
  );
}
