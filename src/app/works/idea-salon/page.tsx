"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Search,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Play,
  ArrowRight,
  Layers,
  Award,
  X,
} from "lucide-react";
import WorkLayout from "../_components/WorkLayout";
import { cdnUrl } from "@/lib/cdn";

/* ============================================================
   Idea Salon —— TT 设计学院 · AI 共创 Skill 落地页（浅色主题）
   ============================================================ */

// Bilibili 项目视频（点击按钮 → 弹窗打开）
const VIDEO_IFRAME_SRC =
  "//player.bilibili.com/player.html?isOutside=true&aid=117071044154443&bvid=BV1KduR6dE4q&cid=40782661079&p=1&high_quality=1&danmaku=0";
const ROUNDTABLE_IMG = cdnUrl("/picture/id-project/tongji-works/idea-salon-圆桌.png");

/* 全站统一背景：linear-gradient(90deg, #F1F6FF 0%, #F9FEFF 100%) */
const PAGE_BG = "linear-gradient(90deg, #F1F6FF 0%, #F9FEFF 100%)";

/* 主色 token（浅色主题下的可读色） */
const C = {
  blue: "#4353FE",       // 主蓝
  cyan: "#22B8CC",       // 青色（比 #4AD6E5 更深，白底更可读）
  orange: "#FF6B2C",     // 橙
  pink: "#E070C0",       // 粉
  purple: "#7B5AA8",     // 紫
  indigo: "#4B55FF",     // 靛
  text: "#20233A",       // 主文本
  textSub: "#5B6180",    // 次级文本
  textMuted: "#8A90A8",  // 弱化文本
  border: "#D8DEF0",     // 边框
  cardBg: "#FFFFFF",     // 卡片底
};

/* ============ 数据 · Section 4 5 个 Skill 分工 ============ */
const skills = [
  { num: "1", cn: "方法论顾问", phase: "DISCOVER", desc: "诊断调研阶段，推荐并陪你用完分析工具", icon: Compass },
  { num: "2", cn: "资深研究员", phase: "DISCOVER", desc: "提炼带置信度的洞察，每条可回溯到原话", icon: Search },
  { num: "3", cn: "逻辑检查员", phase: "DEFINE", desc: "生成 3–5 个 HMW，校验方案与洞察对齐", icon: CheckCircle2 },
  { num: "4", cn: "创意陪练", phase: "DEVELOP", desc: "9 个框架发散创意，自动生成 Moodboard", icon: Lightbulb },
  { num: "5", cn: "设计评审员", phase: "DELIVER", desc: "按设计法则量化评估，给出具体改法", icon: Award },
];


/* ============ 小节标题组件（浅色版） ============ */
function SectionEyebrow({ code, en, cn }: { code: string; en: string; cn: string }) {
  return (
    <div className="mb-4 flex items-center gap-3" style={{ color: C.textMuted }}>
      <Sparkles size={14} style={{ color: C.cyan }} />
      <span className="text-xs tracking-[0.25em] font-semibold" style={{ color: C.cyan }}>
        {en}
      </span>
      <span className="text-xs" style={{ color: C.textMuted }}>/</span>
      <span className="text-xs tracking-widest" style={{ color: C.textSub }}>{cn}</span>
      <span className="ml-auto text-xs font-bold" style={{ color: C.textMuted }}>{code}</span>
    </div>
  );
}

/* ============================================================
   页面
   ============================================================ */
export default function IdeaSalonPage() {
  const [videoOpen, setVideoOpen] = useState(false);

  // ESC 关闭 & 滚动锁定
  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [videoOpen]);

  return (
    <WorkLayout navTheme="light" navTitle="Idea Salon" navSubtitle="AI 共创 Skill">
      {/* ============ Hero · 01 OPENING ============ */}
      <section className="relative min-h-screen w-full overflow-hidden" style={{ background: PAGE_BG }}>
        {/* 淡淡光斑（浅色主题下柔和一点） */}
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] rounded-full blur-3xl" style={{ background: `${C.blue}18` }} />
        <div className="absolute bottom-10 right-10 w-[380px] h-[380px] rounded-full blur-3xl" style={{ background: `${C.cyan}22` }} />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 flex flex-col md:flex-row items-center gap-10">
          {/* 左：文案 */}
          <motion.div
            className="flex-1 z-10"
            style={{ color: C.text }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionEyebrow code="01" en="TT DESIGN ACADEMY" cn="OPENING" />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight" style={{ color: C.text }}>
              Idea{" "}
              <span style={{ color: C.cyan }}>Salon</span>
            </h1>
            <p className="mt-5 text-xl md:text-3xl font-light tracking-wide leading-snug" style={{ color: C.textSub }}>
              面向设计工作坊场景的
              <br className="hidden md:inline" />
              <span style={{ color: C.pink }}>AI 共创 Skill</span> 设计
            </p>
            <p className="mt-3 text-sm md:text-base tracking-wide" style={{ color: C.textMuted }}>
              Moderation · Roles · Flow
            </p>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: C.textSub }}>
              让 AI 辅助创意真正走入团队设计
            </p>

            {/* 主 CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer"
                style={{ background: "#FFB0DE", color: "#20112C", boxShadow: "0 10px 24px rgba(255, 176, 222, 0.35)" }}
              >
                <Play size={16} className="fill-current" />
                项目视频
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="#painpoints"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm transition-all"
                style={{ border: `1px solid ${C.border}`, color: C.textSub, background: "#FFFFFF" }}
              >
                向下了解项目
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-wider" style={{ color: C.textMuted }}>
              <span>
                <span style={{ color: C.textSub }}>项目时间：</span>2026 / 07
              </span>
              <span>
                <span style={{ color: C.textSub }}>腾讯云 × TT 设计学院 skill 创新大赛</span>
                <span style={{ color: C.orange }}> · 二等奖</span>
              </span>
            </div>
          </motion.div>

          {/* 右：直接用官方圆桌图（图2） */}
          <motion.div
            className="flex-1 relative z-10 flex items-center justify-center min-h-[420px] md:min-h-[620px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="relative w-full max-w-[600px] aspect-square">
              <Image
                src={ROUNDTABLE_IMG}
                alt="Idea Salon 圆桌角色"
                fill
                sizes="(min-width: 768px) 600px, 90vw"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest" style={{ color: C.textMuted }}>
          SCROLL ↓
        </div>
      </section>

      {/* ============ Section 2 · SCENE INSIGHT · 4 大痛点断点（直接贴图） ============ */}
      <section
        id="painpoints"
        className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: `${C.orange}14` }} />

        <div className="relative w-full max-w-[1440px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="02" en="SCENE INSIGHT" cn="FOUR BREAKPOINTS" />
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: C.text }}>
              学生卡住的地方，
              <span style={{ color: C.orange }}>分布在整个设计流程里</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: C.textSub }}>
              普通双非、92 院校、顶尖院校在设计教育资源上存在巨大差距 ——
              普通设计院校只看软件使用，忽略设计推导的元能力。
            </p>
          </ScrollFadeIn>

          {/* 4 大痛点 · DISCOVER / DEFINE / DEVELOP / DELIVER · 直接贴图 */}
          <motion.div
            className="mt-12 relative w-full mx-auto"
            style={{ aspectRatio: "3578 / 970", maxWidth: "1400px" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/scene-insight.webp")}
              alt="SCENE INSIGHT · 学生在设计流程 4 个阶段的痛点"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <p className="mt-12 text-center text-base md:text-xl font-semibold leading-relaxed max-w-4xl mx-auto" style={{ color: C.text }}>
            从「方法论会背不会用」到「不知道作品好不好」，
            <br />
            Idea Salon 都可以为你一站式解决 —— 我们覆盖了
            <span style={{ color: C.cyan }}> 设计工作坊全流程</span>
          </p>
        </div>
      </section>

      {/* ============ Section 3 · 四大创新点 ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute top-1/3 -left-24 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: `${C.blue}14` }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="04" en="OUR INNOVATIONS" cn="FOUR BREAKTHROUGHS" />
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: C.text }}>
              <span style={{ color: C.textSub }}>竞品痛点</span>
              <span className="mx-2" style={{ color: C.indigo }}>→</span>
              <span style={{ color: C.indigo }}>转化为四个创新点</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: C.textSub }}>
              不是补一个 AI 功能，而是重组设计工作坊的推进机制 —— 左侧是现有 AI 设计工具的断点，右侧是
              Idea Salon 的对应回应。
            </p>
          </ScrollFadeIn>

          {/* 竞品痛点 → 四大创新点 · 直接贴图 */}
          <motion.div
            className="mt-14 relative w-full mx-auto"
            style={{ aspectRatio: "3372 / 1163", maxWidth: "1400px" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/innovations.webp")}
              alt="竞品痛点 → Idea Salon 四大创新点"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <p className="mt-14 text-center text-base md:text-lg font-semibold" style={{ color: C.text }}>
            四个创新点共同解决：
            <span style={{ color: C.cyan }}>上下文 · 团队协作 · 流程推进 · 深层洞察</span>
          </p>
        </div>
      </section>

      {/* ============ Section 4 · 解决机制 Skill × Mentor ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: `${C.cyan}12` }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="05" en="SOLUTION MECHANISM" cn="SKILL × MENTOR" />
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: C.text }}>
              <span style={{ color: C.cyan }}>Skill 是引擎</span>
              ，专家是界面
            </h2>
            <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: C.textSub }}>
              让 AI 不再停留于 ChatGPT、Midjourney、Figma AI 等万能聊天框，
              而像一场有主持、有角色、有节奏的工作坊。
              <br />
              <span className="text-xs md:text-sm" style={{ color: C.textMuted }}>
                结构化任务由 Skill 完成 · 人格化表达由老师分身包装
              </span>
            </p>
          </ScrollFadeIn>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
            {/* 引擎层 */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: `${C.blue}0D`, border: `1px solid ${C.blue}33` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.blue }}>
                  <Layers size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div className="text-xs tracking-widest font-bold" style={{ color: C.textMuted }}>
                    ① SKILL LAYER
                  </div>
                  <div className="text-lg font-bold" style={{ color: C.text }}>引擎层</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.textSub }}>
                结构化任务由 5 个专业 Skill 分工完成
              </p>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div
                    key={s.num}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: C.cardBg, border: `1px solid ${C.border}` }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${C.blue}18`, border: `1px solid ${C.blue}44` }}>
                      <s.icon size={14} style={{ color: C.blue }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold" style={{ color: C.text }}>{s.cn}</span>
                        <span className="text-[10px] tracking-widest font-bold" style={{ color: C.cyan }}>
                          {s.phase}
                        </span>
                      </div>
                      <div className="text-xs mt-1 leading-relaxed" style={{ color: C.textSub }}>
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 中间连接符 */}
            <div className="hidden lg:flex items-center justify-center h-full pt-32">
              <div className="text-3xl" style={{ color: C.textMuted }}>×</div>
            </div>

            {/* 界面层 · 直接贴图（图内已包含 ② MENTOR LAYER 标题、6 能力徽章、3 老师详细名片） */}
            <div className="relative w-full" style={{ aspectRatio: "2028 / 1482" }}>
              <Image
                src={cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/mentor-layer.webp")}
                alt="Idea Salon 界面层 · 老师阵容"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ Section 5 · 3 步工作坊流程 ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: `${C.blue}14` }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="06" en="HOW IT RUNS" cn="WORKSHOP FLOW" />
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: C.text }}>
              先独立思考，再团队收敛
              <br />
              <span style={{ color: C.indigo }}>Ardot 共创看板</span>
              <span style={{ color: C.text }}> 打造一场有节奏的圆桌工作坊</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: C.textSub }}>
              不是一起发散到底，而是「个人先成型，团队再碰撞」，每一步都有 AI 主持推进。
            </p>
          </ScrollFadeIn>

          {/* 3 步流程 + 人机协作旅程图 · 直接贴图 */}
          <motion.div
            className="mt-14 relative w-full mx-auto"
            style={{ aspectRatio: "3365 / 1234", maxWidth: "1400px" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/workshop-flow.webp")}
              alt="Idea Salon 工作坊流程 · 人机协作旅程图"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-contain"
              unoptimized
            />
          </motion.div>
        </div>
      </section>

      {/* ============ Section 6 · 三对象价值 ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute -top-24 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: `${C.cyan}14` }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="07" en="WHY IT MATTERS" cn="VALUE & CLOSING" />
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: C.text }}>
              三方启动，从概念到方案
              <br />
              <span style={{ color: C.cyan }}>带走一套能复用的推进力</span>
            </h2>
          </ScrollFadeIn>

          {/* WHY IT MATTERS · 三对象价值 + 三步启动 · 直接贴图 */}
          <motion.div
            className="mt-14 relative w-full mx-auto"
            style={{ aspectRatio: "3478 / 1382", maxWidth: "1400px" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/why-it-matters.webp")}
              alt="Idea Salon 三对象价值 · 三步启动"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-contain"
              unoptimized
            />
          </motion.div>
        </div>
      </section>

      {/* ============ 底部 CTA · 观看视频 + 返回 ============ */}
      <section
        className="relative w-full py-20 md:py-24 px-6 text-center overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ background: `${C.blue}18` }} />
        <div className="relative">
          <h3 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: C.text }}>
            想看真实运行的样子？
          </h3>
          <p className="text-sm md:text-base mb-8" style={{ color: C.textSub }}>
            我们把完整的工作坊流程录成了一支视频 · 3 分钟看懂 Idea Salon
          </p>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm md:text-base transition-all shadow-xl cursor-pointer"
            style={{ background: "#FFB0DE", color: "#20112C", boxShadow: "0 12px 28px rgba(255, 176, 222, 0.35)" }}
          >
            <Play size={18} className="fill-current" />
            项目视频
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          <div className="mt-12">
            <Link
              href="/#works"
              onClick={() => {
                try {
                  sessionStorage.setItem("returnTo", "works");
                } catch {
                  // ignore
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all"
              style={{ background: C.cardBg, border: `1px solid ${C.border}`, color: C.textSub }}
            >
              ← 回到 Works 看更多
            </Link>
          </div>
        </div>
      </section>
      {/* ============ 视频弹窗 · Bilibili iframe ============ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
            style={{ background: "rgba(15,20,45,0.72)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "#000" }}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                aria-label="关闭视频"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
                style={{ background: "rgba(0,0,0,0.55)", color: "#FFF", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <X size={18} />
              </button>
              <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  src={VIDEO_IFRAME_SRC}
                  title="Idea Salon 项目视频"
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorkLayout>
  );
}

/* ============ 小组件 · Scroll Fade In ============ */
function ScrollFadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
