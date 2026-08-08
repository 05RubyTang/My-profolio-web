"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Sparkles, Video } from "lucide-react";
import PhoneFrame from "../../PhoneFrame";
import SeeTheWorldChatbot from "./SeeTheWorldChatbot";
import LockScreenPhone from "../daily/LockScreenPhone";
import { WORLD_COMPLETE_POINTS, WORLD_COMPLETE_TIP } from "../data/seeTheWorldScript";

/**
 * 「小艺看世界」双栏 layout
 * 左：手机 (视频通话样式 chatbot)
 * 右：文案说明 + 4 阶段指示 + 重播按钮
 */
export default function SeeTheWorldScene() {
  const [pointsToast, setPointsToast] = useState<number | null>(null);
  const [loop, setLoop] = useState(0);
  const [phase, setPhase] = useState<"userAsking" | "scanning" | "advising" | "picked" | "done">(
    "userAsking"
  );
  /** 右侧联动锁屏变体：进入 tab 就点亮，每 5.2s 在 hello ↔ study 之间轮播 */
  const [lockVariant, setLockVariant] = useState<"hello" | "study">("hello");

  useEffect(() => {
    if (pointsToast === null) return;
    const t = window.setTimeout(() => setPointsToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [pointsToast]);

  // 根据 loop 重置内部阶段（与 SeeTheWorldChatbot 的 timeline 对齐）
  useEffect(() => {
    setPhase("userAsking");
    setLockVariant("hello");
    const t1 = window.setTimeout(() => setPhase("scanning"), 2600);
    const t2 = window.setTimeout(() => setPhase("advising"), 6200);
    const t3 = window.setTimeout(() => setPhase("picked"), 13500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [loop]);

  // 右侧锁屏始终点亮，每 5.2s 在 hello ↔ study 之间轮播（跟随 loop 重置节奏）
  useEffect(() => {
    const id = window.setInterval(() => {
      setLockVariant((v) => (v === "hello" ? "study" : "hello"));
    }, 5200);
    return () => window.clearInterval(id);
  }, [loop]);

  const handleComplete = () => {
    setPointsToast(WORLD_COMPLETE_POINTS);
    setPhase("done");
    // 停 3s 后自动重播一次
    window.setTimeout(() => {
      setLoop((n) => n + 1);
    }, 3200);
  };

  const handleBack = () => {
    // 直接重播
    setLoop((n) => n + 1);
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-start justify-center gap-8 py-8">
      {/* 左：手机演示 */}
      <div className="relative shrink-0">
        <PhoneFrame width={340} showDynamicIsland>
          <AnimatePresence mode="wait">
            <motion.div
              key={`world-${loop}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              <SeeTheWorldChatbot
                onBack={handleBack}
                onComplete={handleComplete}
              />
            </motion.div>
          </AnimatePresence>
        </PhoneFrame>

        {/* +10 积分 toast */}
        <AnimatePresence>
          {pointsToast !== null && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="absolute left-1/2 -translate-x-1/2 -top-12 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(135deg, rgb(192,63,170) 0%, rgb(223,171,192) 100%)",
                boxShadow: "0 8px 24px -6px rgba(192,63,170,0.45)",
              }}
            >
              <Sparkles size={14} />
              {WORLD_COMPLETE_TIP}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 中：小艺数字人智能衣橱 · 联动锁屏样机（跟左侧手机同宽 340，进入 tab 就点亮） */}
      <div className="relative shrink-0 flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`lock-${lockVariant}`}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <LockScreenPhone variant={lockVariant} width={340} />
          </motion.div>
        </AnimatePresence>
        <div className="max-w-[340px] text-center space-y-1.5">
          <div className="text-[11px] tracking-widest uppercase text-[#FF88D9]">
            Digital Companion · 小艺数字人智能衣橱
          </div>
          <p className="text-white/70 text-[12px] leading-relaxed">
            粉色花苞外套一录入衣橱，右边锁屏立刻联动 ——
            甜酷学姐打招呼、书桌前学习陪伴，一整天都在你身边。
          </p>
        </div>
      </div>

      {/* 右：文案说明 */}
      <div className="max-w-xs text-left text-white/85 space-y-6">
        <div>
          <div className="text-[11px] tracking-widest uppercase text-[#FF88D9] mb-2 flex items-center gap-2">
            <Video size={12} />
            Feature Demo · 小艺看世界
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
            打开摄像头
            <br />
            <span className="text-[#FF88D9]">让 AI</span>
            识别你身上的衣服
          </h3>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          与小艺视频通话，把新买的衣服举到摄像头前。AI 视觉引擎会实时识别品类、色彩、材质与季节标签，一键录入你的数字衣柜，并结合已有单品生成 2 套推荐搭配。看到世界里明星、博主与街拍的灵感，都可以随手复刻。
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <PhaseTag
            active={phase === "userAsking" || phase === "scanning"}
            label="① 语音开麦扫描"
            note="用户口述 · AI 视觉识别品类色彩"
          />
          <PhaseTag
            active={phase === "advising"}
            label="② 一键录入衣橱"
            note="识别结果沉淀到你的衣柜数据库"
          />
          <PhaseTag
            active={phase === "advising" || phase === "picked"}
            label="③ AI 生成搭配"
            note="结合已有单品 · 2 套推荐"
          />
          <PhaseTag
            active={phase === "picked" || phase === "done"}
            label="④ 语音表达喜好"
            note="穿搭力 +10 · 记录偏好"
          />
        </div>

        <button
          type="button"
          onClick={() => setLoop((n) => n + 1)}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs tracking-widest"
        >
          <RotateCcw size={12} />
          重新播放
        </button>
      </div>
    </div>
  );
}

function PhaseTag({
  label,
  note,
  active,
}: {
  label: string;
  note: string;
  active: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border p-3 transition-all",
        active
          ? "bg-white/[0.08] border-[#FF88D9]/60 shadow-[0_6px_20px_-6px_rgba(255,136,217,0.35)]"
          : "bg-white/[0.03] border-white/10",
      ].join(" ")}
    >
      <div
        className={[
          "text-[13px] font-medium leading-tight",
          active ? "text-white" : "text-white/60",
        ].join(" ")}
      >
        {label}
      </div>
      <div className="text-[10px] text-white/45 mt-1 leading-snug">{note}</div>
    </div>
  );
}
