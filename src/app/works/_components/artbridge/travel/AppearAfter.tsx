"use client";

import { useEffect, useState } from "react";

/**
 * 延时挂载 helper
 * -------------------------------------------------------------
 * 在 `delay` 毫秒之前完全不渲染 children（保持 DOM 里没有骨架），
 * `delay` 到达后才把 children 挂载出来。
 *
 * 用途：4 个 Sub-Agent 卡片里第 2/3 个子块只有等到自己那一段的
 * 打字机时机才出现，避免早期就撑起大量空白 div，配合 AgentCard
 * 的 max-height 自适应做到"文字有多少 → 卡就多高"。
 *
 * @param delay    从挂载起多少毫秒后开始显示（默认 0）
 * @param resetKey 依赖变化时会重新计时（与 4 个 agent 的循环 loop 对齐）
 */
export default function AppearAfter({
  delay = 0,
  resetKey,
  children,
}: {
  delay?: number;
  resetKey?: unknown;
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(delay <= 0);

  useEffect(() => {
    if (delay <= 0) {
      setReady(true);
      return;
    }
    setReady(false);
    const id = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(id);
  }, [delay, resetKey]);

  if (!ready) return null;
  return <>{children}</>;
}
