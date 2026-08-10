"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Sparkles, Trophy } from "lucide-react";
import PhoneFrame from "../../PhoneFrame";
import StyleLabHome from "./StyleLabHome";
import StyleParadoxChatbot from "./StyleParadoxChatbot";
import { LAB_PROFILE, LAB_TASKS, type LabTask } from "../data/styleLabScript";

type Scene = "home" | "paradox";

/**
 * 「风格实验台」整块场景 · 双栏 layout
 * 左：手机演示（首页 ↔ chatbot 切换 · 完成后加分回首页）
 * 右：文案说明 + 阶段指示
 */
export default function StyleLabScene() {
  const [scene, setScene] = useState<Scene>("home");
  const [power, setPower] = useState(LAB_PROFILE.power);
  const [pointsToast, setPointsToast] = useState<number | null>(null);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    if (pointsToast === null) return;
    const t = window.setTimeout(() => setPointsToast(null), 2200);
    return () => window.clearTimeout(t);
  }, [pointsToast]);

  const handleTaskClick = (task: LabTask) => {
    if (!task.ready) return;
    if (task.route === "paradox") {
      setScene("paradox");
    }
  };

  const handleParadoxComplete = () => {
    // +10 积分 · 回首页
    setPower((p) => Math.min(LAB_PROFILE.powerTarget, p + 10));
    setPointsToast(10);
    setScene("home");
  };

  const handleParadoxBack = () => {
    setScene("home");
  };

  const handleReset = () => {
    setScene("home");
    setPower(LAB_PROFILE.power);
    setPointsToast(null);
    setLoop((n) => n + 1);
  };

  const paradoxTask = useMemo(
    () => LAB_TASKS.find((t) => t.route === "paradox"),
    []
  );

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-10 py-8">
      {/* 左：手机演示 */}
      <div className="relative">
        <PhoneFrame width={340} showDynamicIsland>
          <AnimatePresence mode="wait">
            {scene === "home" ? (
              <motion.div
                key={`home-${loop}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <StyleLabHome onTaskClick={handleTaskClick} power={power} />
              </motion.div>
            ) : (
              <motion.div
                key={`paradox-${loop}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                <StyleParadoxChatbot
                  onBack={handleParadoxBack}
                  onComplete={handleParadoxComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneFrame>

        {/* +10 积分 toast · 悬浮在手机顶部 */}
        <AnimatePresence>
          {pointsToast !== null && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="absolute left-1/2 -translate-x-1/2 -top-12 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{
                background:
                  "linear-gradient(135deg, rgb(192,63,170) 0%, rgb(223,171,192) 100%)",
                boxShadow: "0 8px 24px -6px rgba(192,63,170,0.45)",
              }}
            >
              <Trophy size={14} />
              穿搭力 +{pointsToast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 右：文案说明 */}
      <div className="max-w-md text-left text-white/85 space-y-6">
        <div>
          <div className="text-[11px] tracking-widest uppercase text-[#FFB0DE] mb-2">
            Feature Demo · 风格实验台
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
            分阶段
            <span className="text-[#FFB0DE]">改造计划</span>
            <br />
            找到你的最优解
          </h3>
        </div>

        <p className="text-white/75 text-sm leading-relaxed">
          害怕风格突变？<span className="text-[#FFB0DE]">分阶段的风格介入</span>，让你偷偷变美！
        </p>
        <p className="text-white/45 text-xs leading-relaxed">
          不认识服装风格？不知道怎么搭配？领取穿搭 Agent 为你定制的每日穿搭任务，让学习穿搭知识更轻松
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <PhaseTag
            active={scene === "home" && pointsToast === null}
            label="① 任务首页"
            note="穿搭力 · 徽章 · 3 张待办任务"
          />
          <PhaseTag
            active={scene === "paradox"}
            label="② 风格悖论"
            note="AI 生成课题 + 3 套实验方案"
          />
          <PhaseTag
            active={scene === "paradox"}
            label="③ 方案详情"
            note="展开实验器材清单"
          />
          <PhaseTag
            active={pointsToast !== null}
            label="④ 收获积分"
            note="穿搭力 +10 · 解锁下一等级"
          />
        </div>

        {/* 当前进度提示 */}
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Sparkles size={12} className="text-[#FFB0DE]" />
          <span>
            当前穿搭力{" "}
            <span className="text-white/80 tabular-nums">
              {power}/{LAB_PROFILE.powerTarget}
            </span>
            {paradoxTask && (
              <>
                {" · 完成「"}
                <span className="text-[#FFB0DE]">{paradoxTask.title}</span>
                {"」+"}
                {paradoxTask.points}
              </>
            )}
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
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
          ? "bg-white/[0.08] border-[#FFB0DE]/60 shadow-[0_6px_20px_-6px_rgba(255,176,222,0.35)]"
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
