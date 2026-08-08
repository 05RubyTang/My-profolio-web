"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";

/**
 * 手机屏内 · 顶部固定操作栏
 * 布局：左「返回」箭头 + 右侧 3 个 icon（电话 · 音量 · 更多）
 * 三个右侧 icon 是从 Figma 精确导出的 PNG
 */
export default function HeaderActions({
  onBack,
  title,
}: {
  /** 可选：点返回箭头触发（daily demo 里用于回到首页明星单品卡） */
  onBack?: () => void;
  /** 可选：返回按钮右侧的标题（lab chatbot 显示「风格悖论」） */
  title?: React.ReactNode;
} = {}) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* 左侧：返回按钮 + 可选标题 */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          className={[
            "w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center border border-white/70 shadow-[0_1px_4px_rgba(60,60,90,0.06)] transition-all shrink-0",
            onBack ? "cursor-pointer hover:bg-white/80 active:scale-95" : "",
          ].join(" ")}
        >
          <ArrowLeft size={16} className="text-[#161A22]" strokeWidth={2.2} />
        </button>
        {title && (
          <span
            className="text-[16px] font-bold leading-none truncate"
            style={{ color: "rgb(69,71,75)" }}
          >
            {title}
          </span>
        )}
      </div>

      {/* 右侧 3 个 icon */}
      <div className="flex items-center gap-1.5">
        <HeaderIcon src="/picture/artbridge/travel/ui/header-call.png" alt="电话" />
        <HeaderIcon src="/picture/artbridge/travel/ui/header-volume.png" alt="音量" />
        <HeaderIcon src="/picture/artbridge/travel/ui/header-more.png" alt="更多" />
      </div>
    </div>
  );
}

function HeaderIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-8 h-8">
      <Image src={src} alt={alt} fill sizes="32px" className="object-contain" unoptimized />
    </div>
  );
}
