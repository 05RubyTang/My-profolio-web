"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoCallShell from "./VideoCallShell";
import AIScanOverlay from "./AIScanOverlay";
import UserJacketBubble from "./UserJacketBubble";
import OutfitPairCard from "./OutfitPairCard";
import UserVoiceBubble from "./UserVoiceBubble";
import {
  WORLD_AI_REPLY_2,
  WORLD_USER_ASK,
  WORLD_USER_FEEDBACK,
  WORLD_OUTFIT_PAIRS,
} from "../data/seeTheWorldScript";

/**
 * 「小艺看世界」主编排 · 纯语音交互版
 *
 * 因为用户与小艺是语音通话，无需任何点击：
 *   - 用户说话时 · 摄像头按钮上方浮起音波条动效
 *   - 用户语音以 UserVoiceBubble（磨砂玻璃气泡 + 内嵌 mic icon + 小音波）呈现
 *   - AI 回复以居中白色文本呈现（与用户气泡视觉区分）
 *
 * timeline：
 *   t=0     用户语音气泡出现 + 摄像头上方音波开启（说"小艺，这件粉色外套..."）
 *   t=2200  用户说完 · 音波关闭
 *   t=2600  切到 AI 扫描场景
 *   t=5000  扫描完成 · 4 个识别标签淡入
 *   t=6200  切到"顾问"场景 · 展示花苞外套图
 *   t=7000  出现「数字衣柜录入完成」chip
 *   t=8000  AI 回复 1
 *   t=9700  AI 回复 2
 *   t=10800 出现 2 张搭配大卡（都未选中）
 *   t=13500 自动选中 left · 用户开始说话
 *   t=13800 用户 feedback 气泡出现
 *   t=16500 用户说完 · 音波关闭
 *   t=17500 onComplete
 */

type Phase = "userAsking" | "scanning" | "advising";

export default function SeeTheWorldChatbot({
  onBack,
  onComplete,
}: {
  onBack?: () => void;
  onComplete?: () => void;
}) {
  const [callDuration, setCallDuration] = useState(0);
  const [phase, setPhase] = useState<Phase>("userAsking");

  // 用户是否正在说话（控制音波指示器 + 用户气泡内部小音波）
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  // 扫描阶段
  const [showTags, setShowTags] = useState(false);

  // 顾问阶段可见性
  const [showJacket, setShowJacket] = useState(false);
  const [showChip, setShowChip] = useState(false);
  const [showReply1, setShowReply1] = useState(false);
  const [showReply2, setShowReply2] = useState(false);
  const [showPairs, setShowPairs] = useState(false);
  const [pickedId, setPickedId] = useState<(typeof WORLD_OUTFIT_PAIRS)[number]["id"] | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const timersRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  const scheduleTimer = (delay: number, fn: () => void) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  };
  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  // 通话时长跳动
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCallDuration((d) => d + 1000);
    }, 1000);
    return () => {
      if (intervalRef.current != null) window.clearInterval(intervalRef.current);
    };
  }, []);

  // feedback 出现后自动滚到底部（内容区高度不够时确保可见）
  useEffect(() => {
    if (!showFeedback) return;
    const t = window.setTimeout(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 60);
    return () => window.clearTimeout(t);
  }, [showFeedback]);

  // 主 timeline
  useEffect(() => {
    // 阶段 1 · 用户语音提问
    scheduleTimer(120, () => setIsUserSpeaking(true));
    scheduleTimer(2200, () => setIsUserSpeaking(false));

    // 阶段 2 · AI 扫描
    scheduleTimer(2600, () => setPhase("scanning"));
    scheduleTimer(5000, () => setShowTags(true));

    // 阶段 3 · AI 顾问
    scheduleTimer(6200, () => setPhase("advising"));
    scheduleTimer(6400, () => setShowJacket(true));
    scheduleTimer(7000, () => setShowChip(true));
    scheduleTimer(8000, () => setShowReply1(true));
    scheduleTimer(9700, () => setShowReply2(true));
    scheduleTimer(10800, () => setShowPairs(true));

    // 阶段 4 · AI 自动帮用户选中 + 用户口头反馈
    scheduleTimer(13500, () => {
      setPickedId("left");
      setIsUserSpeaking(true);
    });
    scheduleTimer(13800, () => setShowFeedback(true));
    scheduleTimer(16500, () => setIsUserSpeaking(false));

    // 阶段 5 · 完成
    scheduleTimer(17500, () => onComplete?.());

    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VideoCallShell
      onBack={onBack}
      callDuration={callDuration}
      isUserSpeaking={isUserSpeaking}
    >
      <AnimatePresence mode="wait">
        {phase === "userAsking" && (
          <motion.div
            key="userAsking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            <UserVoiceBubble text={WORLD_USER_ASK} speaking={isUserSpeaking} />
          </motion.div>
        )}

        {phase === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <AIScanOverlay showTags={showTags} />
          </motion.div>
        )}

        {phase === "advising" && (
          <motion.div
            key="advising"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full h-full overflow-y-auto pr-1 hide-scrollbar"
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
            <div className="space-y-3 pb-2">
              {/* AI 展示花苞外套 + AI 回复 + 录入衣橱 chip */}
              <UserJacketBubble
                showJacket={showJacket}
                showReply={showReply1}
                showChip={showChip}
              />

              {/* AI 回复 2 */}
              {showReply2 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[13px] leading-[1.45] text-white text-center px-2"
                >
                  {WORLD_AI_REPLY_2}
                </motion.p>
              )}

              {/* 2 张搭配大卡 · 由 timeline 自动选中 */}
              {showPairs && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <OutfitPairCard pickedId={pickedId} />
                </motion.div>
              )}

              {/* 用户 feedback · 语音气泡（自动滚到可见） */}
              {showFeedback && (
                <div ref={feedbackRef}>
                  <UserVoiceBubble
                    text={WORLD_USER_FEEDBACK}
                    speaking={isUserSpeaking}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoCallShell>
  );
}
