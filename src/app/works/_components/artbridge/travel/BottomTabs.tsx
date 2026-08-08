"use client";

import { Brain, Shirt, Sparkles, Camera } from "lucide-react";

/**
 * 手机屏内 · 底部快捷 Tab 栏
 * 4 个 tab：深度思考 · 风格实验室 · 小艺看世界 · 相机
 * 全部代码实现（不使用 Figma 大图）
 */
type TabItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  /** 是否为强调色（紫色胶囊） */
  primary?: boolean;
};

const TABS: TabItem[] = [
  { key: "think",  label: "深度思考",  icon: <Brain size={12} strokeWidth={2} />, primary: true },
  { key: "style",  label: "风格实验室", icon: <Shirt size={12} strokeWidth={2} />, primary: true },
  { key: "world",  label: "小艺看世界", icon: <Sparkles size={12} strokeWidth={2} /> },
  { key: "camera", label: "",         icon: <Camera size={13} strokeWidth={2} /> },
];

export default function BottomTabs() {
  return (
    <div className="flex items-center gap-1.5 px-3 pt-1 pb-1.5">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={[
            "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium shrink-0 transition-colors",
            tab.primary
              ? "bg-[#EEE9F7] text-[#4C3B7A] border border-[#D9CFEE]/60"
              : "bg-white/70 text-[#5B4E82] border border-[#E4DDF3]/60",
            !tab.label && "w-7 h-7 justify-center p-0",
          ].join(" ")}
          style={
            tab.primary
              ? { boxShadow: "0 1px 4px rgba(90, 60, 150, 0.06)" }
              : undefined
          }
        >
          <span className="text-current">{tab.icon}</span>
          {tab.label && <span>{tab.label}</span>}
        </button>
      ))}

      {/* 最右侧的紫色渐变星辰 icon */}
      <button
        type="button"
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-auto text-white"
        style={{
          background: "linear-gradient(135deg,#B77BF0 0%,#7A5CE8 100%)",
          boxShadow: "0 2px 8px rgba(122, 92, 232, 0.35)",
        }}
        aria-label="小艺主入口"
      >
        <Sparkles size={13} strokeWidth={2.4} />
      </button>
    </div>
  );
}
