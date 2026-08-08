"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, RotateCcw } from "lucide-react";
import PhoneFrame from "../../PhoneFrame";
import ChatShell from "../travel/ChatShell";
import UserBubble from "../travel/UserBubble";
import AIBubble from "../travel/AIBubble";
import HomeScene from "./HomeScene";
import OutfitPlanCardComponent from "./OutfitPlanCard";
import ShoppingResultCard from "./ShoppingResultCard";
import ShoppingScanCard from "./ShoppingScanCard";
import LockScreenPhone from "./LockScreenPhone";
import {
  AI_FREEFORM_REPLY,
  AI_ORDER_ACK,
  AI_ORDER_DETAIL,
  AI_PLAN_SAFE_CONFIRM,
  AI_PLAN_TWIST_CONFIRM,
  AI_REASON_1,
  AI_REASON_2,
  AI_RESULTS_INTRO,
  AI_SEARCH_HINT,
  DEFAULT_PICKED_KEY,
  OUTFIT_PLANS,
  STAR_ITEMS,
  TIMELINE,
  USER_REPLACE_TEXT,
  buildUserOrderText,
  type DailyTimelineStep,
  type OutfitPlanCard as OutfitPlanCardType,
  type StarItemCard,
} from "../data/dailyOutfitScript";
import FeatureQuickTabs from "./FeatureQuickTabs";

/** 底部输入框打字机 hook（与 travel 同款） */
function useComposerTyping(
  text: string,
  active: boolean,
  resetKey: unknown,
  speed = 55
) {
  const [visible, setVisible] = useState("");
  useEffect(() => {
    setVisible("");
    if (!active) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setVisible(text.slice(0, i));
      if (i >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, active, speed, resetKey]);
  return visible;
}

/** 每一步之后要 flip 的状态位 */
type DailyChatState = {
  scene: "home" | "chat";
  pickedKey: StarItemCard["key"];
  userIntroSent: boolean;
  aiReason1Visible: boolean;
  aiReason2Visible: boolean;
  plansVisible: boolean;
  /** 用户已在推荐卡阶段做出选择（点卡 or 输入文字），锁定后不再自动推进 */
  planPicked: OutfitPlanCardType["key"] | "freeform" | null;
  /** 用户点了 safe 卡后 AI 的收尾回复 */
  aiPlanSafeConfirmVisible: boolean;
  /** 用户点了 twist 卡后 AI 的承接回复 */
  aiPlanTwistConfirmVisible: boolean;
  /** 用户从输入框自由发送的文字（作为用户气泡展示） */
  userFreeformText: string | null;
  /** 用户自由输入后 AI 的回复 */
  aiFreeformReplyVisible: boolean;
  userReplaceSent: boolean;
  aiReplaceReplyVisible: boolean;
  aiReplaceDoneVisible: boolean;
  aiSearchHintVisible: boolean;
  shoppingAgentVisible: boolean;
  aiResultsIntroVisible: boolean;
  resultsVisible: boolean;
  userOrder: { key: string; title: string } | null;
  aiOrderAckVisible: boolean;
  aiOrderDetailVisible: boolean;
};

const INIT_STATE: DailyChatState = {
  scene: "home",
  pickedKey: DEFAULT_PICKED_KEY,
  userIntroSent: false,
  aiReason1Visible: false,
  aiReason2Visible: false,
  plansVisible: false,
  planPicked: null,
  aiPlanSafeConfirmVisible: false,
  aiPlanTwistConfirmVisible: false,
  userFreeformText: null,
  aiFreeformReplyVisible: false,
  userReplaceSent: false,
  aiReplaceReplyVisible: false,
  aiReplaceDoneVisible: false,
  aiSearchHintVisible: false,
  shoppingAgentVisible: false,
  aiResultsIntroVisible: false,
  resultsVisible: false,
  userOrder: null,
  aiOrderAckVisible: false,
  aiOrderDetailVisible: false,
};

type StepName = DailyTimelineStep["step"];

export default function DailyOutfitChatbot() {
  const [loop, setLoop] = useState(0);
  const [state, setState] = useState<DailyChatState>(INIT_STATE);
  const [scrollTick, setScrollTick] = useState(0);
  /** 底部输入框当前是否在打「没有绿色卫衣」 */
  const [composerPhase, setComposerPhase] = useState<"replace" | null>(null);
  /** 是否用户主动点了首页明星单品卡（决定 timeline 是否启动） */
  const [entered, setEntered] = useState(false);
  const timersRef = useRef<number[]>([]);

  const replaceTyping = useComposerTyping(
    USER_REPLACE_TEXT,
    composerPhase === "replace",
    loop,
    55
  );

  /** 循环重置 · 不再自动进入 chat，等用户主动点击首页任一明星单品卡 */
  useEffect(() => {
    setState(INIT_STATE);
    setComposerPhase(null);
    setEntered(false);
    setScrollTick(0);
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop]);

  const bumpScroll = () => setScrollTick((n) => n + 1);

  /** 清空并派发一批 timers */
  const scheduleTimer = (delay: number, fn: () => void) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  };

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  /** 用户点击首页明星单品卡 · 启动 timeline
   *  timeline 只跑到 plans_show 就停，等用户在推荐卡阶段做主动选择
   */
  const handleEnter = (pickedKey: StarItemCard["key"]) => {
    if (entered) return;
    setEntered(true);
    setState((s) => ({
      ...s,
      scene: "chat",
      pickedKey,
      userIntroSent: true,
    }));
    bumpScroll();

    // 只派发到「两张对比卡出现」为止，后续等用户交互
    const stopStep: StepName = "plans_show";
    for (const t of TIMELINE) {
      scheduleTimer(t.at, () => applyStep(t.step));
      if (t.step === stopStep) break;
    }
  };

  const applyStep = (step: StepName) => {
    switch (step) {
      case "user_pick":
        // 首页点击 → 已在 handleEnter 处理
        break;
      case "ai_reason_1":
        setState((s) => ({ ...s, aiReason1Visible: true }));
        bumpScroll();
        break;
      case "ai_reason_2":
        setState((s) => ({ ...s, aiReason2Visible: true }));
        bumpScroll();
        break;
      case "plans_show":
        setState((s) => ({ ...s, plansVisible: true }));
        bumpScroll();
        break;
      case "user_replace_typing":
        setComposerPhase("replace");
        break;
      case "user_replace_send":
        setComposerPhase(null);
        setState((s) => ({ ...s, userReplaceSent: true }));
        bumpScroll();
        break;
      case "ai_replace_reply":
        setState((s) => ({ ...s, aiReplaceReplyVisible: true }));
        bumpScroll();
        break;
      case "ai_replace_done":
        setState((s) => ({ ...s, aiReplaceDoneVisible: true }));
        bumpScroll();
        break;
      case "ai_search_hint":
        setState((s) => ({ ...s, aiSearchHintVisible: true }));
        bumpScroll();
        break;
      case "shopping_agent":
        setState((s) => ({ ...s, shoppingAgentVisible: true }));
        bumpScroll();
        break;
      case "shopping_agent_collapse":
        setState((s) => ({ ...s, shoppingAgentVisible: false }));
        break;
      case "ai_results_intro":
        setState((s) => ({ ...s, aiResultsIntroVisible: true }));
        bumpScroll();
        break;
      case "results_cards":
        setState((s) => ({ ...s, resultsVisible: true }));
        bumpScroll();
        break;
      case "reset":
        break;
    }
  };

  /** 用户主动在推荐卡阶段点了某张 plan 卡 */
  const handlePlanPick = (planKey: OutfitPlanCardType["key"]) => {
    if (!state.plansVisible) return;
    if (state.planPicked) return; // 已选过就锁

    // 清掉后续 timeline（虽然已经在 handleEnter 里做了截断，但保险起见）
    clearAllTimers();

    setState((s) => ({ ...s, planPicked: planKey }));
    bumpScroll();

    if (planKey === "safe") {
      // safe 分支：一条 AI 短回复收尾，停留等用户点右侧「重新播放」
      scheduleTimer(900, () => {
        setState((s) => ({ ...s, aiPlanSafeConfirmVisible: true }));
        bumpScroll();
      });
    } else {
      // twist 分支：先给一条 AI 承接，再直接跳到「优选购物助手」流程
      scheduleTimer(900, () => {
        setState((s) => ({ ...s, aiPlanTwistConfirmVisible: true }));
        bumpScroll();
      });
      // 复用原来的购物助手/结果段落
      scheduleTimer(2400, () => applyStep("ai_search_hint"));
      scheduleTimer(3400, () => applyStep("shopping_agent"));
      scheduleTimer(14400, () => applyStep("shopping_agent_collapse"));
      scheduleTimer(15400, () => applyStep("ai_results_intro"));
      scheduleTimer(16200, () => applyStep("results_cards"));
      // 结果卡出现后停留，等用户主动点「小艺下单」，不再自动循环
    }
  };

  /** 用户在推荐卡阶段主动从输入框「发送」自由文本 */
  const handleUserFreeformSend = () => {
    if (!state.plansVisible) return;
    if (state.planPicked) return;

    clearAllTimers();

    const text = USER_REPLACE_TEXT; // demo：默认用「没有绿色卫衣」文案
    setState((s) => ({
      ...s,
      planPicked: "freeform",
      userFreeformText: text,
    }));
    bumpScroll();

    scheduleTimer(900, () => {
      setState((s) => ({ ...s, aiFreeformReplyVisible: true }));
      bumpScroll();
    });
    // 直接进入 shopping 流程
    scheduleTimer(2400, () => applyStep("ai_search_hint"));
    scheduleTimer(3400, () => applyStep("shopping_agent"));
    scheduleTimer(14400, () => applyStep("shopping_agent_collapse"));
    scheduleTimer(15400, () => applyStep("ai_results_intro"));
    scheduleTimer(16200, () => applyStep("results_cards"));
    // 结果卡出现后停留，等用户主动点「小艺下单」，不再自动循环
  };

  /** 用户点某张结果卡的「小艺下单」→ 立刻显示用户气泡 + AI 分段回复 →
   *  最后 AI 详情气泡出现后停留约 5s 自动 loop 回首页
   */
  const handleOrder = (key: string, title: string) => {
    if (state.userOrder) return;
    setState((s) => ({ ...s, userOrder: { key, title } }));
    bumpScroll();

    const t1 = window.setTimeout(() => {
      setState((s) => ({ ...s, aiOrderAckVisible: true }));
      bumpScroll();
    }, 700);
    const t2 = window.setTimeout(() => {
      setState((s) => ({ ...s, aiOrderDetailVisible: true }));
      bumpScroll();
    }, 2200);
    // 详情气泡（t2 = 2200ms）出现后再停留 5s，自动重播回首页
    const t3 = window.setTimeout(() => {
      setLoop((n) => n + 1);
    }, 2200 + 5000);
    timersRef.current.push(t1, t2, t3);
  };

  const pickedCard = useMemo(
    () => STAR_ITEMS.find((c) => c.key === state.pickedKey) ?? STAR_ITEMS[1],
    [state.pickedKey]
  );

  /** stickyTop：聊天场景下顶部固定的用户诉求气泡（去掉右上粉色卡壳，仅保留纯气泡） */
  const stickyTopNode = useMemo(() => {
    if (state.scene !== "chat" || !state.userIntroSent) return null;
    return (
      <UserBubble align="right" compact>
        为我搭配一套「{pickedCard.style}」风格的今日穿搭
      </UserBubble>
    );
  }, [state.scene, state.userIntroSent, pickedCard]);

  /** 底部输入框正在被打的文字 & 光标 */
  const { composerTyping, composerCaret } = useMemo(() => {
    if (composerPhase === "replace") {
      return {
        composerTyping: replaceTyping,
        composerCaret: replaceTyping.length < USER_REPLACE_TEXT.length,
      };
    }
    return { composerTyping: undefined, composerCaret: false };
  }, [composerPhase, replaceTyping]);

  // 顶部动态 header 标题（chat 场景下变为「城市酷感风」等）—— 通过 ChatShell 无法直接改，
  // 这里仅用于文案面板的相位提示。

  /** 底部 Composer 是否处于「可点发送」交互态（推荐卡出现且用户尚未选择） */
  const composerInteractive =
    state.scene === "chat" && state.plansVisible && !state.planPicked;

  const composerPlaceholder = composerInteractive
    ? "点击这里也可以告诉小艺您的想法～"
    : undefined;

  /** 顶部返回箭头 · chat 场景可点，回到首页明星单品卡 */
  const handleBackToHome = () => {
    clearAllTimers();
    setLoop((n) => n + 1);
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-10 py-8">
      {/* 左：手机演示 */}
      <div className="relative">
        <PhoneFrame width={340} showDynamicIsland>
          <ChatShell
            key={loop}
            stickyTop={stickyTopNode}
            scrollKey={scrollTick}
            composerTyping={composerTyping}
            composerCaret={composerCaret}
            composerPlaceholder={composerPlaceholder}
            aboveComposer={
              state.scene === "home" ? <FeatureQuickTabs /> : undefined
            }
            hideBottomTabs={state.scene === "home"}
            onComposerClickInput={
              composerInteractive ? handleUserFreeformSend : undefined
            }
            onComposerSend={
              composerInteractive ? handleUserFreeformSend : undefined
            }
            composerInteractive={composerInteractive}
            onBack={
              state.scene === "chat" ? handleBackToHome : undefined
            }
          >
            <AnimatePresence mode="popLayout">
              {/* -------- 场景 1：首页 -------- */}
              {state.scene === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <HomeScene onPick={(k) => handleEnter(k)} />
                </motion.div>
              )}

              {/* -------- 场景 2：聊天 -------- */}
              {state.scene === "chat" && (
                <>
                  {/* AI 系统推理 1 */}
                  {state.aiReason1Visible && (
                    <SystemReasoningLine
                      key="reason1"
                      text={AI_REASON_1}
                      done
                    />
                  )}

                  {/* AI 系统推理 2 */}
                  {state.aiReason2Visible && (
                    <SystemReasoningLine
                      key="reason2"
                      text={AI_REASON_2}
                      done={state.plansVisible}
                    />
                  )}

                  {/* 两张对比推荐搭配卡 · 横排 */}
                  {state.plansVisible && (
                    <motion.div
                      key="plans"
                      className="grid grid-cols-2 gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {OUTFIT_PLANS.map((p, i) => (
                        <OutfitPlanCardComponent
                          key={p.key}
                          plan={p}
                          delay={i * 0.12}
                          onClick={
                            state.planPicked
                              ? undefined
                              : () => handlePlanPick(p.key)
                          }
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* 用户点了 safe/twist 卡 · 用户气泡「我要第 X 套」 */}
                  {state.planPicked === "safe" && (
                    <motion.div
                      key="user-pick-safe"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UserBubble align="right" compact>
                        我选「稳稳不出错」这套
                      </UserBubble>
                    </motion.div>
                  )}

                  {state.planPicked === "twist" && (
                    <motion.div
                      key="user-pick-twist"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UserBubble align="right" compact>
                        我选「有点小不同」这套
                      </UserBubble>
                    </motion.div>
                  )}

                  {/* safe 分支 AI 收尾回复 */}
                  {state.aiPlanSafeConfirmVisible && (
                    <motion.div
                      key="ai-plan-safe-confirm"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <AIBubble>{AI_PLAN_SAFE_CONFIRM}</AIBubble>
                    </motion.div>
                  )}

                  {/* twist 分支 AI 承接回复 */}
                  {state.aiPlanTwistConfirmVisible && (
                    <motion.div
                      key="ai-plan-twist-confirm"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <AIBubble>{AI_PLAN_TWIST_CONFIRM}</AIBubble>
                    </motion.div>
                  )}

                  {/* 用户在推荐卡阶段主动输入自由文本 */}
                  {state.userFreeformText && (
                    <motion.div
                      key="user-freeform"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <UserBubble align="right" compact>
                        {state.userFreeformText}
                      </UserBubble>
                    </motion.div>
                  )}

                  {state.aiFreeformReplyVisible && (
                    <motion.div
                      key="ai-freeform-reply"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <AIBubble>{AI_FREEFORM_REPLY}</AIBubble>
                    </motion.div>
                  )}

                  {/* 系统推理：正在为您寻找优质好衣 */}
                  {state.aiSearchHintVisible && (
                    <SystemReasoningLine
                      key="search-hint"
                      text={AI_SEARCH_HINT}
                      done={state.aiResultsIntroVisible}
                    />
                  )}

                  {/* 优选购物助手 · 长图局部滚动展示网络检索过程（Figma 1211-5453） */}
                  {state.shoppingAgentVisible && (
                    <motion.div
                      key="shopping-agent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ShoppingScanCard
                        active
                        resetKey={loop}
                        scrollDuration={10.5}
                      />
                    </motion.div>
                  )}

                  {/* AI 白气泡：小艺已为您找到 3 款高品质好衣 */}
                  {state.aiResultsIntroVisible && (
                    <motion.div
                      key="results-intro"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <AIBubble>{AI_RESULTS_INTRO}</AIBubble>
                    </motion.div>
                  )}

                  {/* 3 款结果卡（每款独立可点小艺下单） */}
                  {state.resultsVisible && (
                    <motion.div
                      key="results-cards"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      <ShoppingResultCard
                        onOrder={handleOrder}
                        disabled={state.userOrder !== null}
                      />
                    </motion.div>
                  )}

                  {/* 用户下单确认 */}
                  {state.userOrder && (
                    <motion.div
                      key="user-order"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <UserBubble align="right" compact>
                        {buildUserOrderText(state.userOrder.title)}
                      </UserBubble>
                    </motion.div>
                  )}

                  {/* AI 确认下单成功 */}
                  {state.aiOrderAckVisible && (
                    <motion.div
                      key="ai-ack"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <AIBubble>{AI_ORDER_ACK}</AIBubble>
                    </motion.div>
                  )}

                  {/* AI 后续详情说明 */}
                  {state.aiOrderDetailVisible && (
                    <motion.div
                      key="ai-detail"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <AIBubble>{AI_ORDER_DETAIL}</AIBubble>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </ChatShell>
        </PhoneFrame>
      </div>

      {/* 右：随场景切换 —— 未选择套装时是文案面板，用户选完后是「小艺数字人智能衣橱」联动锁屏 */}
      <div className="max-w-md text-left text-white/85">
        <AnimatePresence mode="wait">
          {state.planPicked ? (
            <motion.div
              key="lock-today"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5"
            >
              <LockScreenPhone variant="today" width={300} />
              <div className="max-w-[300px] text-center space-y-2">
                <div className="text-[11px] tracking-widest uppercase text-[#FFB0DE]">
                  Digital Companion · 小艺数字人智能衣橱
                </div>
                <p className="text-white/70 text-[13px] leading-relaxed">
                  你在左边一按选择，右手机锁屏立刻同步「小突破 / 微创新 / 稳稳不出错」三张玻璃卡，出门前一眼就能挑定。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLoop((n) => n + 1)}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs tracking-widest"
              >
                <RotateCcw size={12} />
                重新播放
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <div className="text-[11px] tracking-widest uppercase text-[#FFB0DE] mb-2">
                  Feature Demo · 每日穿搭法则
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
                  早安，一张卡开始，
                  <br />
                  <span className="text-[#FFB0DE]">一衣多穿</span>
                  + 一键补货
                </h3>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                清晨打开小艺，明星单品卡片替你先选好当天的风格。选中即进入对话：
                AI 结合衣橱、天气、体征生成两套对比方案，你若说「没有绿色卫衣」，
                「优选购物助手」立刻从回头客、销量、评价、性价比 4 个维度筛好衣，
                代下单后自动收录进穿搭手帐。
                <span className="text-[#FFB0DE]">
                  {" "}选完套装的瞬间，右侧样机的锁屏会同步亮起「小艺数字人智能衣橱」——
                  3 张玻璃卡挂上今日方案，一整天都陪着你。
                </span>
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <PhaseTag
                  active={state.scene === "home"}
                  label="① 首页明星单品"
                  note="早安 + 3 卡横排（大 + 竖排 2）"
                />
                <PhaseTag
                  active={state.scene === "chat" && !state.planPicked}
                  label="② 推荐两套方案"
                  note="点卡片 or 输入框回复皆可"
                />
                <PhaseTag
                  active={
                    (state.planPicked === "twist" ||
                      state.planPicked === "freeform") &&
                    !state.resultsVisible
                  }
                  label="③ 优选购物助手"
                  note="4 维度筛选高品质好衣"
                />
                <PhaseTag
                  active={state.resultsVisible}
                  label="④ 代下单 · 收录手帐"
                  note="下单成功自动写入日记"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * 系统推理小行：Check/Loader 图标 + 灰字，与 travel 的 RequirementChecklist 视觉一致
 * done=true 显示 ✔；done=false 显示 loading spinner
 */
function SystemReasoningLine({
  text,
  done,
}: {
  text: string;
  done: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-1.5 px-1"
    >
      <div className="mt-[1px] w-3 h-3 flex items-center justify-center shrink-0">
        {done ? (
          <Check size={11} className="text-[#8A8DA0]" strokeWidth={3} />
        ) : (
          <Loader2
            size={11}
            className="text-[#8A8DA0] animate-spin"
            strokeWidth={2.4}
          />
        )}
      </div>
      <div className="text-[11px] leading-[1.4] text-[#8A8DA0]">{text}</div>
    </motion.div>
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

