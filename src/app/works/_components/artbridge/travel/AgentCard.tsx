"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * 4 个子 Agent 卡片外壳（2×2 宫格里的一格）
 * -------------------------------------------------------------
 * 设计规范（v2 · 自适应高度）：
 * - 卡头（emoji + 标题 + 副标题）绝对静止，永远在最上方
 * - 卡体是一个**弹性画框**（自适应高度 + 有上限）：
 *   · 打字机阶段：文字有多少，画框就多高；
 *   · 出图阶段：图片高度撑开，画框继续扩展；
 *   · 达到 `bodyHeight` 上限后：停在上限值 + 内部滚动，
 *     后续新增内容会像聊天流一样把早期内容"卷"上去。
 *
 * 外层 `<motion.div layout>` 让高度扩展有丝滑的 spring 过渡，
 * 每张卡随内容各自呼吸，避免 2×2 宫格四角一开始就顶着 154px 的空白。
 *
 * 自动滚底通过 MutationObserver 监听子树变化实现，
 * sub-agent 自身无需做任何配合（仅在内容溢出 bodyHeight 后才会生效）。
 */
export default function AgentCard({
  emoji,
  title,
  subtitle,
  children,
  delay = 0,
  /** 卡体画框**最大**高度（默认 154px）· 内容未达上限时按实际高度自适应 */
  bodyHeight = 154,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
  bodyHeight?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // 每当子树里有新节点 / 文本变化：
    //   - 若已达到最大高度上限，则平滑滚到最底（像聊天流一样"卷"上去）
    //   - 否则不主动干预，让容器自然被内容撑开
    const scrollToBottom = () => {
      // scrollHeight > clientHeight 意味着当前已进入"滚动模式"（触顶上限）
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      }
    };

    const observer = new MutationObserver(scrollToBottom);
    observer.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.5, delay, ease: "easeOut" },
        y: { duration: 0.5, delay, ease: "easeOut" },
        // layout 高度变化用 spring · 让打字机 → 出图的过渡更自然
        layout: { type: "spring", stiffness: 260, damping: 30, mass: 0.7 },
      }}
      className="rounded-2xl bg-white/[0.72] backdrop-blur-md border border-white/70 p-2 flex flex-col overflow-hidden self-start"
      style={{ boxShadow: "0 0 16px rgba(97,168,255,0.10)" }}
    >
      {/* 卡头：emoji + 标题（静态，一开始就在） */}
      <motion.div layout="position" className="flex items-center gap-1 px-0.5 shrink-0">
        <span className="text-[13px] leading-none">{emoji}</span>
        <span className="text-[12px] font-semibold text-[#161A22] tracking-tight">
          {title}
        </span>
      </motion.div>

      {/* 副标题（静态） */}
      <motion.div layout="position" className="text-[10px] text-[#161A22]/85 mt-0.5 px-0.5 leading-snug shrink-0">
        {subtitle}
      </motion.div>

      {/* 卡体画框：max-height 自适应 · 达到上限后内部滚动 */}
      <div
        ref={scrollRef}
        className="mt-1.5 overflow-y-auto no-scrollbar"
        style={{ maxHeight: bodyHeight }}
      >
        {children}
      </div>
    </motion.div>
  );
}
