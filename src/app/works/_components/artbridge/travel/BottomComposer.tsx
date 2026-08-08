"use client";

/**
 * 手机屏内 · 底部固定输入框（Figma 1219_5175 复刻）
 * -----------------------------------------------------------
 * 视觉：一整个大胶囊，外圈锥形渐变描边，内部完全透明（露出后面的
 *      聊天区背景），三个元素并排在同一个胶囊内：
 *
 *   ┌────────────────────────────────────────────────┐
 *   │ (🎙️)  随时随地问小艺              (＋)        │
 *   └────────────────────────────────────────────────┘
 *     ↑ 麦克风：渐变圆环 + 内部音波（Figma SVG 精确复刻）
 *     中间：占位符 / 打字机文字（无独立底色）
 *     ↑ 加号：与右侧加号 SVG 描边样式一致
 *
 * 打字态时右侧加号变为紫色渐变实心圆 + 白色右箭头（表示可发送）
 */
export default function BottomComposer({
  typingText,
  showCaret = false,
  placeholder = "随时随地问小艺",
  onSend,
  onClickInput,
  interactivePlaceholder = false,
}: {
  typingText?: string;
  showCaret?: boolean;
  placeholder?: string;
  /** 打字完成后点击右侧箭头发送 · 或用户主动点整个输入框都会触发 */
  onSend?: () => void;
  /** 空态时点击输入框（demo 里用来支持"用户自己想输入回复"） */
  onClickInput?: () => void;
  /** 空态下 placeholder 是否呈"可点击"（下划光晕）状态 */
  interactivePlaceholder?: boolean;
}) {
  const isTyping = typeof typingText === "string" && typingText.length > 0;
  const canSend = isTyping && !showCaret; // 打字完成才可点击发送
  const showSendButton = isTyping;

  const handleCapsuleClick = () => {
    if (canSend) onSend?.();
    else if (!isTyping && onClickInput) onClickInput();
  };

  const capsuleClickable = canSend || (!isTyping && Boolean(onClickInput));

  return (
    <div className="px-3 pt-2 pb-3">
      {/*
        外层胶囊 · Figma node 1669:8102 复刻：
          - 内部半透明白 rgba(255,255,255,0.85)
          - 1.5px 内描边（多段 angular gradient · 紫→蓝→天青→紫→粉→紫）
          - 顶部内高光：inset 0 -6px 19.8 rgba(255,255,255,0.4)
          - 淡紫下阴影：0 2px 6.4 rgba(229,210,255,1)
          - Figma 是 h=54 / 圆角 30 / padding 16,17；此处按 h-11 (44px) 等比缩至圆角 22 / padding 13
      */}
      <div
        className="relative h-11 rounded-full p-[1.5px]"
        style={{
          // 1.5px 渐变描边（通过外层 padding + 内层扣白实现）
          background:
            "conic-gradient(from 90deg at 50% 50%, #9B99EE 0deg, #9FD3F6 90deg, #9C98EF 180deg, #E3A4F9 223deg, #A1B7EB 258deg, #80B2FB 325deg, #9B99EE 360deg)",
          // 淡紫外阴影（Figma DROP_SHADOW · 按 44/54 缩比 → 0 1.6 5.2）
          boxShadow: "0 1.6px 5.2px rgba(229,210,255,1)",
        }}
      >
        <div
          role={capsuleClickable ? "button" : undefined}
          tabIndex={capsuleClickable ? 0 : -1}
          onClick={capsuleClickable ? handleCapsuleClick : undefined}
          onKeyDown={
            capsuleClickable
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") handleCapsuleClick();
                }
              : undefined
          }
          className={[
            "relative w-full h-full rounded-full flex items-center px-2.5",
            capsuleClickable ? "cursor-pointer" : "",
          ].join(" ")}
          style={{
            // 中间层：半透明白 + 顶部内高光（inset 0 -6px 19.8 → 缩至 0 -5px 16.2）
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "inset 0 -5px 16.2px rgba(255,255,255,0.4)",
          }}
        >
          {/* 左：麦克风 icon */}
          <MicIcon />

          {/* 中间：占位符 / 正在输入的文字 */}
          <div className="flex-1 min-w-0 pl-2 pr-2">
            {isTyping ? (
              <span className="text-[13px] leading-none text-[#161A22] truncate block">
                {typingText}
                {showCaret && (
                  <span
                    className="inline-block w-[1.5px] h-[12px] align-[-1px] ml-[1px] bg-[#161A22] animate-pulse"
                    aria-hidden
                  />
                )}
              </span>
            ) : (
              <span
                className={[
                  "text-[13px] leading-none truncate block",
                  interactivePlaceholder
                    ? "text-[#7716AF] font-medium"
                    : "text-[#8C8FA3]",
                ].join(" ")}
              >
                {placeholder}
              </span>
            )}
          </div>

          {/* 右：加号 / 发送箭头（双态） */}
          {showSendButton ? (
            <SendArrowIcon
              onClick={canSend ? onSend : undefined}
              disabled={!canSend}
            />
          ) : (
            <PlusRingIcon />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 麦克风图标 · 完全复刻 Figma node 1219_5175：
 * - 外圈：锥形渐变（conic gradient）圆环描边
 * - 内部：6 条不同高度的竖线，模拟音波（每条也是同色渐变）
 * Figma SVG 用了 foreignObject + conic-gradient，浏览器 SVG 支持有限，
 * 因此这里改用「渐变描边 + 用 SVG 直接绘制音波」的等效方案。
 */
function MicIcon() {
  return (
    <button
      type="button"
      aria-label="语音输入"
      tabIndex={-1}
      className="w-6 h-6 shrink-0 rounded-full p-[1px] flex items-center justify-center"
      style={{
        background:
          "conic-gradient(from 90deg at 50% 50%, #9B99EE 0deg, #9FD3F6 90deg, #9C98EF 180deg, #E3A4F9 223deg, #A1B7EB 258deg, #80B2FB 325deg, #9B99EE 360deg)",
      }}
    >
      <div className="w-full h-full rounded-full bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
        {/* 6 条音波竖线，高度由内向外递增再递减，用同一套渐变色 stroke */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <defs>
            <linearGradient id="micWaveGrad" x1="0" y1="0" x2="14" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9B99EE" />
              <stop offset="50%" stopColor="#9C98EF" />
              <stop offset="65%" stopColor="#E3A4F9" />
              <stop offset="80%" stopColor="#A1B7EB" />
              <stop offset="100%" stopColor="#80B2FB" />
            </linearGradient>
          </defs>
          {/* 竖线：从左到右 x=1.5, 3.5, 5.5, 7.5, 9.5, 11.5，成对对称 */}
          <line x1="1.5" y1="6" x2="1.5" y2="8" stroke="url(#micWaveGrad)" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="3.75" y1="4.75" x2="3.75" y2="9.25" stroke="url(#micWaveGrad)" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="5.75" y1="3.25" x2="5.75" y2="10.75" stroke="url(#micWaveGrad)" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="7.75" y1="2" x2="7.75" y2="12" stroke="url(#micWaveGrad)" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="9.75" y1="3.75" x2="9.75" y2="10.25" stroke="url(#micWaveGrad)" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="11.75" y1="5.25" x2="11.75" y2="8.75" stroke="url(#micWaveGrad)" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  );
}

/**
 * 空态右侧：紫色渐变的圆环 + 加号
 * 与外层胶囊描边同色系，但保持独立圆形以匹配 Figma 层次
 */
function PlusRingIcon() {
  return (
    <button
      type="button"
      aria-label="更多"
      tabIndex={-1}
      className="w-6 h-6 shrink-0 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 25 25"
        fill="none"
      >
        <g clipPath="url(#composerClip0)">
          <path
            d="M12.1777 24.3555C5.46299 24.3555 0 18.8928 0 12.1777C0 5.46299 5.46299 0 12.1777 0C18.8928 0 24.3555 5.46299 24.3555 12.1777C24.3555 18.8928 18.8928 24.3555 12.1777 24.3555ZM12.1777 1.69922C6.39982 1.69922 1.69922 6.39982 1.69922 12.1777C1.69922 17.9556 6.39982 22.6562 12.1777 22.6562C17.9556 22.6562 22.6562 17.9556 22.6562 12.1777C22.6562 6.39982 17.9556 1.69922 12.1777 1.69922Z"
            fill="url(#composerPaint0)"
          />
          <path
            d="M12.1777 4.9209C12.647 4.9209 13.0273 5.30124 13.0273 5.77051V11.3281H18.5801C19.0489 11.3283 19.4297 11.7086 19.4297 12.1777C19.4297 12.6469 19.0489 13.0272 18.5801 13.0273H13.0273V18.5859C13.0273 19.0549 12.647 19.4355 12.1777 19.4355C11.7085 19.4355 11.3281 19.0549 11.3281 18.5859V13.0273H5.76367C5.2944 13.0273 4.91406 12.647 4.91406 12.1777C4.91406 11.7085 5.2944 11.3281 5.76367 11.3281H11.3281V5.77051C11.3281 5.30124 11.7085 4.9209 12.1777 4.9209Z"
            fill="url(#composerPaint1)"
          />
        </g>
        <defs>
          <linearGradient
            id="composerPaint0"
            x1="30.5"
            y1="31"
            x2="0.5"
            y2="-1"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9B99EE" />
            <stop offset="0.474123" stopColor="#AF98EF" />
            <stop offset="0.903846" stopColor="#81B3FC" />
          </linearGradient>
          <linearGradient
            id="composerPaint1"
            x1="23.0918"
            y1="23.3956"
            x2="5.21206"
            y2="4.32393"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9B99EE" />
            <stop offset="0.474123" stopColor="#AF98EF" />
            <stop offset="0.903846" stopColor="#81B3FC" />
          </linearGradient>
          <clipPath id="composerClip0">
            <rect width="24.3555" height="24.3555" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}

/**
 * 打字态右侧：紫色渐变实心圆 + 白色向右箭头
 * disabled 状态用于「打字尚未完成」的中间态
 */
function SendArrowIcon({
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label="发送"
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onClick?.();
      }}
      disabled={disabled}
      className={[
        "w-6 h-6 shrink-0 flex items-center justify-center rounded-full transition-all",
        disabled
          ? "opacity-70 cursor-not-allowed"
          : "hover:scale-105 active:scale-95 cursor-pointer",
      ].join(" ")}
      style={{
        background:
          "linear-gradient(315deg,#81B3FC 0%,#AF98EF 52.6%,#9B99EE 100%)",
        boxShadow: "0 2px 6px rgba(155,153,238,0.35)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.6 7h8.8M7.4 3l4 4-4 4"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
