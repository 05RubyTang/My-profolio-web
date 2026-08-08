"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AIBubble from "../travel/AIBubble";
import UserBubble from "../travel/UserBubble";
import ChatShell from "../travel/ChatShell";
import LabTopicBubble from "./LabTopicBubble";
import LabExperimentCards from "./LabExperimentCards";
import LabExperimentDetailCard from "./LabExperimentDetailCard";
import LabSystemChip from "./LabSystemChip";
import LabParadoxBackdrop from "./LabParadoxBackdrop";
import {
  EXPERIMENT_DETAILS,
  EXPERIMENT_PLANS,
  PARADOX_COMPOSER_PLACEHOLDER,
  PARADOX_INTRO,
  PARADOX_OUTRO,
  PARADOX_SYS_PLAN_READY,
  PARADOX_SYS_TOPIC_READY,
  type ExperimentPlan,
} from "../data/styleLabScript";

/**
 * 「风格悖论」chatbot 编排
 *
 * timeline（自动 · 直到 3 卡出现停下等用户）：
 *   0     : 显示系统 chip「已生成今日研究课题」
 *   500   : 显示主课题气泡（LabTopicBubble）
 *   1400  : 显示 AI 阐述气泡（AIBubble · PARADOX_INTRO）
 *   3000  : 显示 3 张实验方案卡（LabExperimentCards）
 *   ---   等待用户点其中某张 ---
 *
 * 用户点某张卡后（handlePick）：
 *   +0    : 显示用户气泡「结构把戏」
 *   +900  : 显示系统 chip「已为您完善方案」
 *   +1600 : 显示方案详情大卡（LabExperimentDetailCard）
 *   +2500 : 显示 AI 收尾提示「您可以前往衣橱里找到相应的单品尝试～」
 *   +5500 : 触发 onComplete 回调（外层加 10 分并回首页）
 */
export default function StyleParadoxChatbot({
  onBack,
  onComplete,
}: {
  /** 顶部返回箭头点击 · 直接回首页 */
  onBack?: () => void;
  /** 用户完成一次完整流程（选完方案 + 停留一段时间）→ 外层 +10 积分并回首页 */
  onComplete?: () => void;
}) {
  const [scrollTick, setScrollTick] = useState(0);

  // 各阶段可见性
  const [topicChipVisible, setTopicChipVisible] = useState(false);
  const [topicBubbleVisible, setTopicBubbleVisible] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [plansVisible, setPlansVisible] = useState(false);
  const [pickedId, setPickedId] = useState<ExperimentPlan["id"] | null>(null);
  const [planChipVisible, setPlanChipVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [outroVisible, setOutroVisible] = useState(false);

  const timersRef = useRef<number[]>([]);

  const bumpScroll = () => setScrollTick((n) => n + 1);

  const scheduleTimer = (delay: number, fn: () => void) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  };

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  // 入场 timeline · 只跑到「3 卡出现」为止
  useEffect(() => {
    scheduleTimer(0, () => {
      setTopicChipVisible(true);
      bumpScroll();
    });
    scheduleTimer(500, () => {
      setTopicBubbleVisible(true);
      bumpScroll();
    });
    scheduleTimer(1400, () => {
      setIntroVisible(true);
      bumpScroll();
    });
    scheduleTimer(3000, () => {
      setPlansVisible(true);
      bumpScroll();
    });
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickedDetail = useMemo(
    () => (pickedId ? EXPERIMENT_DETAILS[pickedId] : null),
    [pickedId]
  );

  const pickedPlan = useMemo(
    () => (pickedId ? EXPERIMENT_PLANS.find((p) => p.id === pickedId) : null),
    [pickedId]
  );

  const handlePick = (plan: ExperimentPlan) => {
    if (pickedId) return;
    clearAllTimers();
    setPickedId(plan.id);
    bumpScroll();

    scheduleTimer(900, () => {
      setPlanChipVisible(true);
      bumpScroll();
    });
    scheduleTimer(1600, () => {
      setDetailVisible(true);
      bumpScroll();
    });
    scheduleTimer(2500, () => {
      setOutroVisible(true);
      bumpScroll();
    });
    // 停留 3s 让用户看清 → 完成回调
    scheduleTimer(5500, () => {
      onComplete?.();
    });
  };

  return (
    <ChatShell
      scrollKey={scrollTick}
      composerPlaceholder={PARADOX_COMPOSER_PLACEHOLDER}
      onBack={onBack}
      backgroundOverride="linear-gradient(180deg, rgba(243,144,223,0.22) 0%, rgba(254,246,255,0.6) 29%, rgba(225,227,255,0.55) 65%, rgba(255,166,224,0.15) 89%), #ffffff"
      backdrop={<LabParadoxBackdrop />}
      headerTitle="风格悖论"
      hideBottomTabs
    >
      <div className="space-y-2">
        <AnimatePresence>
          {topicChipVisible && (
            <div key="topic-chip">
              <LabSystemChip text={PARADOX_SYS_TOPIC_READY} />
            </div>
          )}

          {topicBubbleVisible && (
            <div key="topic-bubble">
              <LabTopicBubble />
            </div>
          )}

          {introVisible && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AIBubble>
                <span className="whitespace-pre-line">{PARADOX_INTRO}</span>
              </AIBubble>
            </motion.div>
          )}

          {plansVisible && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <LabExperimentCards
                onPick={handlePick}
                pickedId={pickedId}
                showSwap={!pickedId}
                showAsk={!pickedId}
              />
            </motion.div>
          )}

          {/* 用户选完 · 用户气泡「结构把戏」 */}
          {pickedPlan && (
            <motion.div
              key="user-pick"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserBubble align="right" compact>
                {pickedPlan.title}
              </UserBubble>
            </motion.div>
          )}

          {planChipVisible && (
            <div key="plan-chip">
              <LabSystemChip text={PARADOX_SYS_PLAN_READY} />
            </div>
          )}

          {detailVisible && pickedDetail && (
            <div key="detail">
              <LabExperimentDetailCard
                detail={pickedDetail}
                onRetry={() => {
                  // 「换个思路」→ 重置到 3 卡选择状态
                  clearAllTimers();
                  setPickedId(null);
                  setPlanChipVisible(false);
                  setDetailVisible(false);
                  setOutroVisible(false);
                  bumpScroll();
                }}
              />
            </div>
          )}

          {outroVisible && (
            <motion.div
              key="outro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AIBubble>{PARADOX_OUTRO}</AIBubble>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChatShell>
  );
}
