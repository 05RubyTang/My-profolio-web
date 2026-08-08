"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhoneFrame from "../../PhoneFrame";
import ChatShell from "./ChatShell";
import UserBubble from "./UserBubble";
import AIBubble from "./AIBubble";
import RequirementChecklist, { ChecklistStatus } from "./RequirementChecklist";
import AgentCard from "./AgentCard";
import WeatherAgent from "./agents/WeatherAgent";
import StyleAgent from "./agents/StyleAgent";
import WardrobeAgent from "./agents/WardrobeAgent";
import ShoppingAgent from "./agents/ShoppingAgent";
import DailyOutfitGrid from "./DailyOutfitGrid";
import ProductPurchaseCard from "./ProductPurchaseCard";
import PurchaseActions from "./PurchaseActions";
import {
  AGENTS,
  AI_PURCHASE_ASK,
  AI_REPLY_ORDER,
  AI_REPLY_SIMILAR,
  PURCHASE_PRODUCTS,
  TIMELINE,
  TOTAL_DURATION,
  USER_REPLY_ORDER_TEXT,
  USER_REPLY_SIMILAR_TEXT,
  USER_INTRO_TEXT,
  type TimelineStep,
} from "../data/travelOutfitScript";
import { RotateCcw } from "lucide-react";

/** 用户在 PurchaseActions 或商品卡上点击的选择 */
type UserChoice = "order" | "similar" | null;

/** 时间线里所有 step 的 union，用于类型收敛 */
type StepName = TimelineStep["step"];

/** 每个 step 之后要 flip 的状态位 */
type ChatState = {
  /** 顶部固定的用户诉求气泡是否已经"发出" · 发出后瞬间显示完整文案 */
  userIntroSent: boolean;
  checklist: ChecklistStatus | null;
  /** 4 卡宫格是否展示（false 时会触发 AnimatePresence exit 动画） */
  agentsVisible: boolean;
  dailyGridVisible: boolean;
  aiAskPurchaseVisible: boolean;
  productCardsVisible: boolean;
  purchaseActionsVisible: boolean;
  /** 用户已选择的分支（order / similar / null） */
  userChoice: UserChoice;
  /** AI 对分支的回复气泡是否可见 */
  aiReplyVisible: boolean;
};

const INIT_STATE: ChatState = {
  userIntroSent: false,
  checklist: null,
  agentsVisible: false,
  dailyGridVisible: false,
  aiAskPurchaseVisible: false,
  productCardsVisible: false,
  purchaseActionsVisible: false,
  userChoice: null,
  aiReplyVisible: false,
};

/**
 * 简易打字机（专供底部输入框，模拟用户在输入）
 * - active：是否正在打字
 * - resetKey：变化时清空重新开始
 * - speed：单字符间隔
 */
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
      if (i >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, active, speed, resetKey]);
  return visible;
}

const AGENT_COMPONENTS = {
  weather: WeatherAgent,
  style: StyleAgent,
  wardrobe: WardrobeAgent,
  shopping: ShoppingAgent,
} as const;

export default function TravelOutfitChatbot() {
  // 循环计数，key 变化即可强制所有子组件重挂载
  const [loop, setLoop] = useState(0);
  // 底部输入框当前"该显示"哪段用户文字（目前只保留 intro，用户交互不再走底部输入框）
  const [composerPhase, setComposerPhase] = useState<"intro" | null>(null);
  const [state, setState] = useState<ChatState>(INIT_STATE);
  const [scrollTick, setScrollTick] = useState(0);
  const timersRef = useRef<number[]>([]);

  // intro 用户文字的打字机
  const introTyping = useComposerTyping(
    USER_INTRO_TEXT,
    composerPhase === "intro",
    loop,
    55
  );

  /** 每次 loop 变化，重置所有状态并按时间线派发 */
  useEffect(() => {
    setState(INIT_STATE);
    setComposerPhase(null);
    setScrollTick(0);

    // 清理旧 timer
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];

    const schedule = (delay: number, fn: () => void) => {
      const id = window.setTimeout(fn, delay);
      timersRef.current.push(id);
    };

    TIMELINE.forEach((t) => {
      schedule(t.at, () => {
        applyStep(t.step);
      });
    });

    // 兜底循环：即使用户始终不点击 CTA，也会在很久之后（TOTAL_DURATION）自动重播
    // 正常路径下，用户点击「一键下单 / 我有相似款」→ AI 回复气泡 → 5s 后 setLoop 触发重播
    // 见 handleUserChoice 里的 loopTimer
    schedule(TOTAL_DURATION, () => {
      setLoop((n) => n + 1);
    });

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop]);

  const applyStep = (step: StepName) => {
    switch (step) {
      case "userIntro":
        // 底部输入框开始打字机
        setComposerPhase("intro");
        break;
      case "userSend":
        // 用户点发送：输入框清空 + 顶部气泡瞬间出现完整文案
        setComposerPhase(null);
        setState((s) => ({ ...s, userIntroSent: true }));
        break;
      case "checklist_understood":
        setState((s) => ({ ...s, checklist: "understood" }));
        bumpScroll();
        break;
      case "checklist_planning":
        setState((s) => ({ ...s, checklist: "planning" }));
        bumpScroll();
        break;
      case "agents_show":
        setState((s) => ({ ...s, agentsVisible: true }));
        bumpScroll();
        break;
      case "checklist_output":
        setState((s) => ({ ...s, checklist: "output" }));
        break;
      case "agents_collapse":
        // 4 卡分析完，向上淡出收起（触发 AnimatePresence exit 动画）
        setState((s) => ({ ...s, agentsVisible: false }));
        break;
      case "daily_grid":
        setState((s) => ({ ...s, dailyGridVisible: true }));
        bumpScroll();
        break;
      case "ai_ask_purchase":
        setState((s) => ({ ...s, aiAskPurchaseVisible: true }));
        bumpScroll();
        break;
      case "product_cards":
        setState((s) => ({ ...s, productCardsVisible: true }));
        bumpScroll();
        break;
      case "purchase_actions":
        setState((s) => ({ ...s, purchaseActionsVisible: true }));
        bumpScroll();
        break;
      case "user_reply_typing":
      case "user_reply_send":
        // V5：这两步不再自动执行 — 等待用户手动点击「一键下单 / 我有相似款」
        break;
      case "reset":
        // 让下一个 loop 触发重挂载
        break;
    }
  };

  const bumpScroll = () => setScrollTick((n) => n + 1);

  /**
   * 用户在 PurchaseActions 或商品卡上点击了某个 CTA
   * → 立即出现用户气泡 · 0.6s 后 AI 分支回复气泡出现
   * → 已选择后按钮组置灰不可再点
   */
  const handleUserChoice = (choice: Exclude<UserChoice, null>) => {
    if (state.userChoice) return; // 已选择过，忽略
    setState((s) => ({ ...s, userChoice: choice }));
    bumpScroll();

    // 700ms 后 AI 回复气泡出现
    const replyTimer = window.setTimeout(() => {
      setState((s) => ({ ...s, aiReplyVisible: true }));
      bumpScroll();
    }, 700);
    timersRef.current.push(replyTimer);

    // AI 回复气泡出现后再停留 5s，自动回首页/重播
    const loopTimer = window.setTimeout(() => {
      setLoop((n) => n + 1);
    }, 700 + 5000);
    timersRef.current.push(loopTimer);
  };

  // ---------- 底部输入框正在被打的文字 & 光标 ----------
  const { composerTyping, composerCaret } = useMemo(() => {
    if (composerPhase === "intro") {
      return {
        composerTyping: introTyping,
        composerCaret: introTyping.length < USER_INTRO_TEXT.length,
      };
    }
    return { composerTyping: undefined, composerCaret: false };
  }, [composerPhase, introTyping]);

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-10 py-8">
      {/* 左：手机演示 */}
      <div className="relative">
        <PhoneFrame width={340} showDynamicIsland>
          {/* 用 loop 做 key，触发内部所有动画从头再演一遍 */}
          <ChatShell
            key={loop}
            scrollKey={scrollTick}
            composerTyping={composerTyping}
            composerCaret={composerCaret}
          >
            <AnimatePresence>
              {/* 用户诉求气泡 · 作为聊天流第一条消息，随后续内容自然向上滚动 */}
              {state.userIntroSent && (
                <motion.div
                  key="user-intro"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <UserBubble align="right">{USER_INTRO_TEXT}</UserBubble>
                </motion.div>
              )}

              {/* 需求分析 · 系统推理内容（无白气泡，浅灰小字） */}
              {state.checklist && (
                <motion.div
                  key="checklist"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <RequirementChecklist status={state.checklist} />
                </motion.div>
              )}

              {/* 4 个 Sub-Agent · 2×2 宫格同时展示 · 分析完向上淡出收起
                  · items-start：每张卡从顶部对齐，配合 AgentCard 内的 max-height 自适应
                  · 同一行的 2 张卡会各自沿顶生长（不再强制统一高度到 154） */}
              {state.agentsVisible && (
                <motion.div
                  key="agents-grid"
                  className="grid grid-cols-2 gap-2 items-start overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12, height: 0, marginTop: 0, marginBottom: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                >
                  {AGENTS.map((meta, i) => {
                    const Comp = AGENT_COMPONENTS[meta.key];
                    return (
                      <AgentCard
                        key={meta.key}
                        emoji={meta.emoji}
                        title={meta.title}
                        subtitle={meta.subtitle}
                        delay={i * 0.1}
                      >
                        <Comp active={state.agentsVisible} resetKey={loop} />
                      </AgentCard>
                    );
                  })}
                </motion.div>
              )}

              {/* 每日搭配 · 也是系统推理内容 · 无白气泡，标题浅灰小字 */}
              {state.dailyGridVisible && (
                <motion.div
                  key="daily-grid"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="px-1"
                >
                  <div className="text-[11px] text-[#8A8DA0] px-0.5 pb-1.5 leading-[1.4]">
                    每日搭配 · 12/19 - 12/24
                  </div>
                  <DailyOutfitGrid />
                </motion.div>
              )}

              {/* AI 询问下单 · 属于「AI 主动说话」，保留白色气泡 */}
              {state.aiAskPurchaseVisible && (
                <motion.div
                  key="ai-ask"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <AIBubble>{AI_PURCHASE_ASK}</AIBubble>
                </motion.div>
              )}

              {/* 2 张商品卡 · 左右横排 · 每张卡独立可点「小艺下单」 */}
              {state.productCardsVisible && (
                <motion.div
                  key="products"
                  className="grid grid-cols-2 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {PURCHASE_PRODUCTS.map((p, i) => (
                    <ProductPurchaseCard
                      key={p.key}
                      product={p}
                      delay={i * 0.12}
                      onOrder={() => handleUserChoice("order")}
                    />
                  ))}
                </motion.div>
              )}

              {/* 下单按钮组 · 两个按钮均可独立点击 */}
              {state.purchaseActionsVisible && (
                <motion.div key="actions">
                  <PurchaseActions
                    onOrder={() => handleUserChoice("order")}
                    onSimilar={() => handleUserChoice("similar")}
                    disabled={state.userChoice !== null}
                  />
                </motion.div>
              )}

              {/* 用户选择后的回复气泡 */}
              {state.userChoice && (
                <motion.div
                  key="user-choice"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <UserBubble align="right" compact>
                    {state.userChoice === "order"
                      ? USER_REPLY_ORDER_TEXT
                      : USER_REPLY_SIMILAR_TEXT}
                  </UserBubble>
                </motion.div>
              )}

              {/* AI 对用户选择的分支回复 */}
              {state.aiReplyVisible && state.userChoice && (
                <motion.div
                  key="ai-reply"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <AIBubble>
                    {state.userChoice === "order"
                      ? AI_REPLY_ORDER
                      : AI_REPLY_SIMILAR}
                  </AIBubble>
                </motion.div>
              )}
            </AnimatePresence>
          </ChatShell>
        </PhoneFrame>
      </div>

      {/* 右：文案 · 说明当前展示的是什么 */}
      <div className="max-w-md text-left text-white/85 space-y-6">
        <div>
          <div className="text-[11px] tracking-widest uppercase text-[#FFB0DE] mb-2">
            Feature Demo · 旅游穿搭规划
          </div>
          <h3 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
            一句诉求，
            <br />
            <span className="text-[#FFB0DE]">4 个 Agent</span> 帮你搞定
            <br />6 天旅程的穿搭
          </h3>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          小艺会同时启动天气、风格、衣橱、购物 4 个子 Agent，交叉规划每一天的搭配，
          并主动识别你衣橱里缺少的关键单品，把补货一次性完成。
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <PhaseTag active={!state.dailyGridVisible} label="① 规划阶段" note="需求理解 · 4 Agent 协作" />
          <PhaseTag
            active={state.dailyGridVisible && !state.productCardsVisible}
            label="② 出套装阶段"
            note="6 天日程 · 每日搭配卡"
          />
          <PhaseTag
            active={state.productCardsVisible}
            label="③ 推商品阶段"
            note="需要新买的单品 · 一键下单"
          />
          <PhaseTag active={state.userChoice !== null} label="④ 收尾" note="用户反馈 · 记忆写入" />
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
