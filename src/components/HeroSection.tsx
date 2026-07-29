"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  MapPin,
  Sun,
  MoonStar,
} from "lucide-react";
import Image from "next/image";
import { cdnUrl } from "@/lib/cdn";
import ResumeBook from "./ResumeBook";

/* ============================================================
   打字机内容序列
   每一段是一个 "行"，按顺序逐字打出
   ============================================================ */
interface TypeLine {
  /** 纯文本内容（用于打字机逐字输出） */
  text: string;
  /** 该行的 className */
  className?: string;
  /** 打完这行后的停顿时间 (ms) */
  pauseAfter?: number;
}

const typeLines: TypeLine[] = [
  {
    text: "「在研究人和 AI 怎么相处」",
    className: "text-ink-light text-[15px] leading-relaxed",
    pauseAfter: 300,
  },
  {
    text: "本科工业设计，目前人机交互在读研究生 0v0",
    className: "text-ink-muted text-sm leading-relaxed",
    pauseAfter: 200,
  },
  {
    text: "从用户体验设计一路走到 AI 产品，励志实习打卡BAT",
    className: "text-ink-muted text-sm leading-relaxed",
    pauseAfter: 300,
  },
  {
    text: "日均网络冲浪时长6h+，喜欢搞抽象",
    className: "text-ink-muted text-sm leading-relaxed",
    pauseAfter: 200,
  },
  {
    text: "工作人格 ESTJ，生活中是 ISTP（苯人Ti浓度很高）",
    className: "text-ink-muted text-sm leading-relaxed",
    pauseAfter: 300,
  },
  {
    text: "业余时间是半吊子塔罗牌选手，相信好的产品应该像好的游戏一样让人忍不住多玩一会儿",
    className: "text-ink-muted text-sm leading-relaxed",
    pauseAfter: 200,
  },
];

/* ============================================================
   动态文字轮播（底部）
   ============================================================ */
const dynamicTexts = [
  "今天也在驯服 AI 🤖",
  "正在和大模型斗智斗勇",
  "半吊子塔罗牌选手 🔮",
  "高强度网络冲浪中 🏄‍♀️",
  "40% 抽象浓度警告 ⚠️",
];

/* ============================================================
   富文本渲染：将打出的文字中的特殊标记渲染为高亮
   ============================================================ */
function renderTypedText(text: string) {
  // 匹配 ESTJ / ISTP 关键词，渲染为 marker-highlight
  const parts = text.split(/(ESTJ|ISTP)/g);
  return parts.map((part, i) => {
    if (part === "ESTJ" || part === "ISTP") {
      return (
        <span key={i} className="marker-highlight">
          {part}
        </span>
      );
    }
    // 匹配「」内的内容加粗
    if (part.startsWith("「") && part.endsWith("」")) {
      const inner = part.slice(1, -1);
      // 找到 "人和 AI 怎么相处" 加粗
      const boldParts = inner.split(/(人和 AI 怎么相处)/g);
      return (
        <span key={i}>
          「
          {boldParts.map((bp, j) =>
            bp === "人和 AI 怎么相处" ? (
              <span key={j} className="text-ink font-bold">
                {bp}
              </span>
            ) : (
              <span key={j}>{bp}</span>
            )
          )}
          」
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ============================================================
   主组件
   ============================================================ */
export default function HeroSection() {
  // 简历大书弹窗
  const [showResume, setShowResume] = useState(false);

  // 打字机状态
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const skipRef = useRef(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 底部动态文字轮播
  const [dynTextIndex, setDynTextIndex] = useState(0);
  const [dynDisplayText, setDynDisplayText] = useState("");
  const [isDynDeleting, setIsDynDeleting] = useState(false);

  // 快速跳过：双击屏幕
  const handleSkip = useCallback(() => {
    if (isTypingDone) return;
    skipRef.current = true;
    // 立即展示所有内容
    setTypedLines(typeLines.map((l) => l.text));
    setLineIndex(typeLines.length);
    setCharIndex(0);
    setIsTypingDone(true);
  }, [isTypingDone]);

  // 监听双击
  useEffect(() => {
    const handleClick = () => {
      if (isTypingDone) return;
      clickCountRef.current += 1;
      if (clickCountRef.current >= 2) {
        handleSkip();
        clickCountRef.current = 0;
        if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
        return;
      }
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 400);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [isTypingDone, handleSkip]);

  // 打字机核心逻辑
  useEffect(() => {
    if (isTypingDone || skipRef.current) return;
    if (lineIndex >= typeLines.length) {
      setIsTypingDone(true);
      return;
    }

    const currentLine = typeLines[lineIndex];
    const fullText = currentLine.text;

    // 行间停顿
    if (isPausing) {
      const pauseTimer = setTimeout(() => {
        setIsPausing(false);
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, currentLine.pauseAfter || 200);
      return () => clearTimeout(pauseTimer);
    }

    if (charIndex <= fullText.length) {
      const speed = 35; // 每个字符的打字速度 (ms)
      const timer = setTimeout(() => {
        if (skipRef.current) return;
        // 更新当前行的已打文字
        const newTyped = [...typedLines];
        newTyped[lineIndex] = fullText.slice(0, charIndex);
        setTypedLines(newTyped);

        if (charIndex === fullText.length) {
          // 当前行打完，进入停顿
          setIsPausing(true);
        } else {
          setCharIndex((prev) => prev + 1);
        }
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, isTypingDone, isPausing, typedLines]);

  // 底部动态文字轮播（打字机完成后才开始）
  useEffect(() => {
    if (!isTypingDone) return;
    const currentText = dynamicTexts[dynTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDynDeleting) {
          setDynDisplayText(currentText.slice(0, dynDisplayText.length + 1));
          if (dynDisplayText.length === currentText.length) {
            setTimeout(() => setIsDynDeleting(true), 2000);
          }
        } else {
          setDynDisplayText(currentText.slice(0, dynDisplayText.length - 1));
          if (dynDisplayText.length === 0) {
            setIsDynDeleting(false);
            setDynTextIndex((prev) => (prev + 1) % dynamicTexts.length);
          }
        }
      },
      isDynDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [dynDisplayText, isDynDeleting, dynTextIndex, isTypingDone]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12"
    >
      {/* 装饰性背景元素 */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-ink/5 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 left-10 w-20 h-20 border border-accent/20 rotate-45" />
      <div className="absolute top-40 left-20 text-6xl opacity-[0.04] font-serif select-none">
        冰
      </div>
      <div className="absolute bottom-40 right-20 text-8xl opacity-[0.04] font-serif select-none">
        R
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* ===== 主卡片：个人信息 ===== */}
        <div className="paper-card rounded-2xl p-8 md:p-10 relative overflow-hidden">
          {/* 胶带装饰 */}
          <div className="absolute -top-1 left-10 w-20 h-6 bg-tape-yellow/60 -rotate-3 rounded-sm" />
          <div className="absolute -top-1 right-14 w-16 h-6 bg-tape-yellow/40 rotate-2 rounded-sm" />

          <div className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-10 pt-3">
            {/* 左侧：照片 + 贴纸标签 */}
            <div className="flex flex-col items-center md:items-start gap-4">
              {/* 照片区域 */}
              <div className="relative w-full">
                <div className="relative w-full">
                  <Image
                    src={cdnUrl("/avatar.png")}
                    alt="Ruby Tang"
                    width={349}
                    height={329}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* MBTI 红色胶带标签 */}
                <div className="absolute -top-4 -left-4 z-10 -rotate-6">
                  <div className="mbti-tape relative px-4 py-1.5 flex items-center gap-1.5">
                    <Image src={cdnUrl("/icons/pixel-cat.png")} alt="" width={18} height={18} className="relative z-10" style={{ imageRendering: "pixelated" }} />
                    <span className="relative z-10 font-mono text-white text-sm font-bold tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" style={{ fontWeight: 800 }}>
                      纯血T人
                    </span>
                  </div>
                </div>
              </div>

              {/* 星座标签 */}
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="tag">
                  <Sun size={13} />
                  上升/太阳双金牛
                </span>
                <span className="tag">
                  <MoonStar size={13} />
                  月双子
                </span>
              </div>

              {/* MY RESUME 按钮 —— 撑满照片宽度，无边框无背景 */}
              <button
                onClick={() => setShowResume(true)}
                className="mt-3 w-full group flex items-center gap-3 transition-all duration-300 hover:opacity-70 active:scale-[0.97]"
              >
                <span className="text-ink font-black text-[36px] leading-none tracking-wide uppercase whitespace-nowrap" style={{ fontWeight: 900 }}>
                  MY RESUME
                </span>
                <svg viewBox="0 0 1024 1024" className="w-9 h-9 transition-transform group-hover:translate-x-1 flex-shrink-0" fill="var(--accent)">
                  <path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" />
                  <path d="M732.959548 501.152426c-0.032684-0.127295-0.192662-0.25631-0.25631-0.383604-1.536138-3.615858-3.648542-7.071738-6.591802-10.047682-0.032684-0.032684-0.063647-0.032684-0.096331-0.063647-0.032684-0.032684-0.032684-0.063647-0.063647-0.096331l-158.911974-159.359226c-12.480043-12.480043-32.704421-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l103.328907 103.616181L320 480.00258c-17.664722 0-31.99914 14.336138-31.99914 32.00086s14.336138 32.00086 31.99914 32.00086l306.752748 0-106.112189 104.959656c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l160.25545-158.495686C735.328262 526.592447 737.72794 512.767209 732.959548 501.152426z" />
                </svg>
              </button>
            </div>

            {/* 右侧：文字介绍 */}
            <div className="space-y-5">
              {/* 名字 + 标题（立即显示，不参与打字机） */}
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-ink leading-tight mb-2" style={{ fontWeight: 900 }}>
                  Hi，I'm
                  <span className="text-accent ml-1">
                    Ruby Tang
                  </span>
                </h1>
                <p className="text-base md:text-lg text-ink-light tracking-wide flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-accent text-sm">
                    <MapPin size={14} />
                    上海
                  </span>
                  <span className="text-ink/20">·</span>
                  03 年 · AI 产品经理 · <span className="font-bold text-ink">人机交互</span>
                </p>
                <p className="text-xs text-ink-muted mt-1 typewriter">
                  同济28届 | 理科生学设计 | 抖音生服设计/小红书用研/抖音电商产品/阿里AI产品/小红书AI产品
                </p>
              </div>

              {/* 打字机输出区域 */}
              <div className="space-y-2.5 min-h-[140px]">
                {typeLines.map((line, i) => {
                  const typed = typedLines[i];
                  // 还没轮到这一行
                  if (typed === undefined && i >= lineIndex) return null;
                  const displayStr = typed ?? "";
                  const isCurrentLine = i === lineIndex && !isTypingDone;

                  return (
                    <p key={i} className={line.className}>
                      {renderTypedText(displayStr)}
                      {/* 光标：只在当前正在打的行显示 */}
                      {isCurrentLine && (
                        <span className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle animate-pulse" />
                      )}
                    </p>
                  );
                })}
              </div>

              {/* 底部动态文字轮播（打字机完成后出现） */}
              <div className={`h-6 flex items-center transition-opacity duration-500 ${isTypingDone ? "opacity-100" : "opacity-0"}`}>
                <span className="text-accent font-mono text-xs tracking-wider">
                  {`> ${dynDisplayText}`}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              {/* 双击跳过提示 */}
              {!isTypingDone && (
                <p className="text-[10px] text-ink-muted/40 animate-pulse">
                  双击屏幕跳过打字效果
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="mt-10 animate-bounce flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-ink/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-ink/30 rounded-full" />
          </div>
          <p className="text-xs text-ink-muted mt-2 font-handwriting text-base">scroll down</p>
        </div>
      </div>

      {/* 简历大书弹窗 */}
      {showResume && <ResumeBook onClose={() => setShowResume(false)} />}
    </section>
  );
}
