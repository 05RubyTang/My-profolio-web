"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneOff, Video, MicOff, User, ChevronLeft } from "lucide-react";
import VoiceWaveIndicator from "./VoiceWaveIndicator";
import {
  WORLD_BACKGROUND_SRC,
  WORLD_BACKGROUND_OVERLAY,
  WORLD_CALL_ACTIONS,
  WORLD_CONTACT_NAME,
} from "../data/seeTheWorldScript";

/**
 * 视频通话外壳（严格对齐 Figma iPhone 14 & 15 Pro 稿件 · 393x852）
 *
 * 组成：
 *   - 全屏视频背景（call-bg.png · 用户拿粉色外套的自拍视角）
 *   - 半透明黑色遮罩（保证顶部/底部对比度）
 *   - 顶栏：返回箭头 + 小艺头像 + 通话姓名 + 右侧 头像 icon + 拨号 icon
 *   - 底栏：静音 · 摄像头（高亮 · 主色） · 挂断
 *   - 主内容 slot（居中滚动区）
 */
export default function VideoCallShell({
  children,
  onBack,
  callDuration,
  isUserSpeaking = false,
}: {
  children: ReactNode;
  /** 返回箭头 · 点击直接回首页 */
  onBack?: () => void;
  /** 通话时长（毫秒），会格式化为 mm:ss */
  callDuration?: number;
  /** 用户是否正在说话（说话中会在摄像头按钮上方浮起音波条动效） */
  isUserSpeaking?: boolean;
}) {
  const seconds = Math.floor((callDuration ?? 0) / 1000);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-white select-none">
      {/* ---------- 全屏视频背景 ---------- */}
      <Image
        src={WORLD_BACKGROUND_SRC}
        alt="video call background"
        fill
        priority
        sizes="360px"
        className="object-cover object-center"
      />
      {/* 半透明黑遮罩 · 提升字幕/图标对比度 */}
      <div
        className="absolute inset-0"
        style={{ background: WORLD_BACKGROUND_OVERLAY }}
      />

      {/* ---------- 顶栏 ---------- */}
      <div
        className="absolute inset-x-0 top-0 z-30 pointer-events-none"
        style={{ paddingTop: "12%" }}
      >
        <div className="flex items-center justify-between px-4 pointer-events-auto">
          {/* 左：返回箭头 */}
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "rgba(255,255,255,0.17)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            aria-label="返回"
          >
            <ChevronLeft size={20} strokeWidth={2.4} className="text-white" />
          </button>

          {/* 中：小艺名字 + 时长 */}
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[16px] font-semibold tracking-wide">
              {WORLD_CONTACT_NAME}
            </span>
            <span className="text-[10px] text-white/70 tabular-nums mt-0.5">
              {mm}:{ss}
            </span>
          </div>

          {/* 右：头像 icon + 更多 icon */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.17)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <User size={16} className="text-white" />
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.17)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {/* 4 点 icon（对齐 Figma Union） */}
              <div className="grid grid-cols-2 gap-[3px]">
                <span className="w-[3px] h-[3px] rounded-full bg-white" />
                <span className="w-[3px] h-[3px] rounded-full bg-white" />
                <span className="w-[3px] h-[3px] rounded-full bg-white" />
                <span className="w-[3px] h-[3px] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- 主内容区（居中偏下 · 覆盖聊天气泡 / 图片 / 卡片） ---------- */}
      <div
        className="absolute inset-x-0 z-20 flex flex-col items-stretch"
        style={{ top: "28%", bottom: "22%" }}
      >
        <div className="flex-1 overflow-hidden px-4">{children}</div>
      </div>

      {/* ---------- 底栏：3 个通话按钮 ---------- */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
        style={{ paddingBottom: "6%" }}
      >
        <div className="flex items-end justify-center gap-6 pointer-events-auto">
          <CallActionButton icon={<MicOff size={18} strokeWidth={2.2} />} label={WORLD_CALL_ACTIONS[0]} />
          <CallActionButton
            icon={<Video size={18} strokeWidth={2.2} className="text-[#345BE3]" />}
            label={WORLD_CALL_ACTIONS[1]}
            highlight
            floatAbove={
              <AnimatePresence>
                {isUserSpeaking && (
                  <motion.div
                    key="wave"
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ duration: 0.32 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center justify-center px-2.5 py-1.5 rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,176,222,0.4)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      boxShadow:
                        "0 6px 16px -4px rgba(255,176,222,0.35)",
                    }}
                  >
                    <VoiceWaveIndicator
                      active
                      barCount={5}
                      barWidth={2.4}
                      maxHeight={12}
                      gap={2.5}
                      color="#ffffff"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            }
          />
          <CallActionButton
            icon={<PhoneOff size={18} strokeWidth={2.2} className="text-[#EE5C44]" />}
            label={WORLD_CALL_ACTIONS[2]}
          />
        </div>
      </div>
    </div>
  );
}

function CallActionButton({
  icon,
  label,
  highlight,
  floatAbove,
}: {
  icon: ReactNode;
  label: string;
  highlight?: boolean;
  /** 挂在按钮圆圈上方的浮动元素（用于承接音波指示器） */
  floatAbove?: ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center gap-1">
      <div className="relative">
        {floatAbove}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: highlight ? "#ffffff" : "rgba(255,255,255,0.17)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: highlight
              ? "0 6px 16px -4px rgba(255,255,255,0.35)"
              : undefined,
          }}
        >
          {icon}
        </div>
      </div>
      <span className="text-[10px] font-semibold text-white">{label}</span>
    </div>
  );
}
