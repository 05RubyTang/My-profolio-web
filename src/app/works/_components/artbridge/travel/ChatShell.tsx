"use client";

import { useEffect, useRef } from "react";
import HeaderActions from "./HeaderActions";
import BottomTabs from "./BottomTabs";
import BottomComposer from "./BottomComposer";

/**
 * 手机屏幕内容外壳
 * 布局（自上而下，三段式）：
 *  ┌──────────────────────────┐
 *  │ [固定] 状态栏             │
 *  │ [固定] HeaderActions      │  ← 返回箭头 + 3 个 icon
 *  ├──────────────────────────┤
 *  │ [固定] stickyTop 用户诉求 │  ← 传入的顶部固定 slot
 *  │ [可滚动] 主体 children    │  ← 需求分析 + 4 卡宫格
 *  ├──────────────────────────┤
 *  │ [固定] BottomTabs         │  ← 4 个快捷 tab
 *  │ [固定] BottomComposer     │  ← 输入框「随时随地问问小艺」
 *  └──────────────────────────┘
 */
export default function ChatShell({
  stickyTop,
  children,
  scrollKey,
  composerTyping,
  composerCaret,
  composerPlaceholder,
  aboveComposer,
  onComposerSend,
  onComposerClickInput,
  composerInteractive = false,
  onBack,
  backgroundOverride,
  backdrop,
  headerTitle,
  hideBottomTabs = false,
}: {
  stickyTop?: React.ReactNode;
  children: React.ReactNode;
  scrollKey?: string | number;
  /** 底部输入框正在被打字机打入的文字（有值时会在输入框内展示） */
  composerTyping?: string;
  /** 打字机是否还在进行中（决定是否显示闪烁光标） */
  composerCaret?: boolean;
  /** 空态时的 placeholder 文案 */
  composerPlaceholder?: string;
  /** 底部（BottomTabs + Composer）上方的额外横向 Tab slot（daily 场景专用） */
  aboveComposer?: React.ReactNode;
  /** 打字完成后点击发送 → 触发一条用户消息（daily 分支使用） */
  onComposerSend?: () => void;
  /** 空态下用户点击输入框（可用于「用户自己主动输入回复」） */
  onComposerClickInput?: () => void;
  /** 空态 placeholder 是否呈可点击强调色 */
  composerInteractive?: boolean;
  /** 顶部返回箭头点击回调（daily 场景专用 · 回到首页明星单品卡） */
  onBack?: () => void;
  /** 自定义整屏背景（lab 场景使用白底 + 糊光装饰） */
  backgroundOverride?: string;
  /** 内容层背后的绝对定位装饰层（lab 场景糊光椭圆） */
  backdrop?: React.ReactNode;
  /** 顶部 header 的自定义标题（lab chatbot 显示「风格悖论」） */
  headerTitle?: React.ReactNode;
  /** 是否隐藏底部 4 个快捷 Tab（lab chatbot 场景不显示 BottomTabs） */
  hideBottomTabs?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [scrollKey]);

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          backgroundOverride ??
          "linear-gradient(134deg, #F0E4E8 0%, #EEE4EC 28%, #F3EEF2 53%, #EEF0F3 67%, #EAE2F5 100%)",
      }}
    >
      {/* 背景装饰糊光层（lab 场景使用） */}
      {backdrop && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {backdrop}
        </div>
      )}

      {/* 状态栏（预留灵动岛避让空间） */}
      <div className="h-9 shrink-0 flex items-center justify-between px-5 pt-1 text-[10px] text-[#161A22] relative z-10">
        <span className="tabular-nums font-semibold">8:30</span>
        <span className="tracking-wider">•••</span>
      </div>

      {/* 顶部固定操作栏 */}
      <div className="shrink-0 relative z-10">
        <HeaderActions onBack={onBack} title={headerTitle} />
      </div>

      {/* 顶部固定的用户诉求气泡 */}
      {stickyTop && (
        <div className="px-3 pt-1 pb-2 shrink-0 relative z-10">{stickyTop}</div>
      )}

      {/* 可滚动主体区（占中间所有剩余空间） */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 pb-3 space-y-2 no-scrollbar relative z-10"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>

      {/* 底部固定：aboveComposer（可选 · daily 3 卡横向 Tab） + BottomTabs + BottomComposer
          背景与聊天区一致（透明），让 Composer 的胶囊呈现"透明底 + 渐变描边"的悬浮感 */}
      <div className="shrink-0 relative z-10">
        {aboveComposer && <div className="px-3 pt-1 pb-1">{aboveComposer}</div>}
        {!hideBottomTabs && <BottomTabs />}
        <BottomComposer
          typingText={composerTyping}
          showCaret={composerCaret}
          placeholder={composerPlaceholder}
          onSend={onComposerSend}
          onClickInput={onComposerClickInput}
          interactivePlaceholder={composerInteractive}
        />
      </div>
    </div>
  );
}
