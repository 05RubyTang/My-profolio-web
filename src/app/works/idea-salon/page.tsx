"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Search,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Users,
  GraduationCap,
  Play,
  ArrowRight,
  Layers,
  Workflow,
  Award,
} from "lucide-react";
import WorkLayout from "../_components/WorkLayout";
import { cdnUrl } from "@/lib/cdn";

/* ============================================================
   Idea Salon —— TT 设计学院 · AI 共创 Skill 落地页（浅色主题）
   ============================================================ */

const VIDEO_URL = "https://www.xiaohongshu.com/explore/6a4e65ec000000001503e8f5";
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

/* ============ 数据 · Section 2 4 大痛点断点 ============ */
const painPhases = [
  {
    step: "DISCOVER",
    stepCn: "发现期",
    pains: ["方法论会背，不会用", "访谈只剩用户原话"],
    aiRole: "方法论顾问 + 资深研究员",
    aiValue: "把工具用在当下问题，追问深层归因",
    tone: C.blue,
  },
  {
    step: "DEFINE",
    stepCn: "定义期",
    pains: ["问题定义模糊", "调研与方案逻辑断层"],
    aiRole: "逻辑检查员",
    aiValue: "用 HMW 收敛，接上调研到方案的逻辑",
    tone: C.orange,
  },
  {
    step: "DEVELOP",
    stepCn: "发展期",
    pains: ["头脑风暴冷场", "创意同质化、互相附和"],
    aiRole: "创意陪练",
    aiValue: "9 框架发散 + Moodboard，打破同质",
    tone: C.cyan,
  },
  {
    step: "DELIVER",
    stepCn: "交付期",
    pains: ["不知道作品好不好", "「感觉不对」无法行动"],
    aiRole: "设计评审员",
    aiValue: "六维量化评估 + 具体改法",
    tone: C.indigo,
  },
];

/* ============ 数据 · Section 4 5 个 Skill 分工 ============ */
const skills = [
  { num: "1", cn: "方法论顾问", phase: "DISCOVER", desc: "诊断调研阶段，推荐并陪你用完分析工具", icon: Compass },
  { num: "2", cn: "资深研究员", phase: "DISCOVER", desc: "提炼带置信度的洞察，每条可回溯到原话", icon: Search },
  { num: "3", cn: "逻辑检查员", phase: "DEFINE", desc: "生成 3–5 个 HMW，校验方案与洞察对齐", icon: CheckCircle2 },
  { num: "4", cn: "创意陪练", phase: "DEVELOP", desc: "9 个框架发散创意，自动生成 Moodboard", icon: Lightbulb },
  { num: "5", cn: "设计评审员", phase: "DELIVER", desc: "按设计法则量化评估，给出具体改法", icon: Award },
];

/* ============ 数据 · Section 6 3 个价值对象 ============ */
const values = [
  {
    tag: "FOR STUDENTS",
    tagCn: "对学生",
    title: "学会「怎么想」，不只是「做出来」",
    sub: "把方法论真正用起来",
    bullets: ["每一步都有专属 AI 老师陪练与追问", "留下自己的判断，而非 AI 代劳"],
    icon: GraduationCap,
    color: C.blue,
  },
  {
    tag: "FOR TEACHERS",
    tagCn: "对老师",
    title: "Skill 是引擎，专家是界面·老师控全局",
    sub: "只需要在关键环节介入",
    bullets: ["Skill 按流程自动到位", "老师专注引导，把控现场节奏"],
    icon: Users,
    color: C.cyan,
  },
  {
    tag: "FOR TEAMS",
    tagCn: "对团队",
    title: "让讨论真的收敛，而不是各说各话",
    sub: "分歧变共识，节奏不卡壳",
    bullets: ["先独立成型、再共享墙碰撞", "主持 AI 汇总共识、标出下一步"],
    icon: Workflow,
    color: C.orange,
  },
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
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-lg"
                style={{ background: "#FFB0DE", color: "#20112C", boxShadow: "0 10px 24px rgba(255, 176, 222, 0.35)" }}
              >
                <Play size={16} className="fill-current" />
                观看小红书演示视频
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
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

      {/* ============ Section 2 · 4 大痛点断点（1:1 复刻 Figma 301:316） ============ */}
      <section
        id="painpoints"
        className="relative w-full py-16 md:py-24 px-4 md:px-8 overflow-hidden"
        style={{ background: PAGE_BG }}
      >
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: `${C.orange}14` }} />

        {/* ---------- Desktop: 1920x1080 精确复刻 ---------- */}
        <div className="hidden md:block relative w-full max-w-[1440px] mx-auto">
          {/* 顶部导航行：SCENE INSIGHT 徽章 + logo 位 */}
          <div className="flex items-center justify-between mb-6">
            <SectionEyebrow code="02" en="SCENE INSIGHT" cn="FOUR BREAKPOINTS" />
          </div>

          {/* 标题 + 副标题 */}
          <ScrollFadeIn>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: C.text }}>
              学生卡住的地方，
              <span style={{ color: C.orange }}>分布在整个设计流程里</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: C.textSub }}>
              普通双非、92 院校、顶尖院校在设计教育资源上存在巨大差距 ——
              普通设计院校只看软件使用，忽略设计推导的元能力。
            </p>
          </ScrollFadeIn>

          {/* 双钻流程 bar */}
          <div className="mt-8 grid grid-cols-4 gap-3">
            {["DISCOVER · 发现期", "DEFINE · 定义期", "DEVELOP · 发展期", "DELIVER · 交付期"].map((s, i) => (
              <div
                key={s}
                className="rounded-full px-4 py-2 text-center text-xs md:text-sm font-bold tracking-wider"
                style={{
                  background: [C.blue, C.orange, C.cyan, C.indigo][i] + "18",
                  color: [C.blue, C.orange, C.cyan, C.indigo][i],
                  border: `1px solid ${[C.blue, C.orange, C.cyan, C.indigo][i]}44`,
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/*
             主展示区 · Figma 301:316 复刻
             层级顺序（z-index）：
               插画     z-10   底层
               PAIN 标签 z-20   贴在角色胸口
               气泡     z-20   角色两侧
               大卡片    z-30   浮到最上层，从底部往上盖住角色下半身（关键改动）
          */}
          <div
            className="relative mt-10 w-full mx-auto"
            style={{ aspectRatio: "1920 / 900", maxWidth: "1400px" }}
          >
            {(() => {
              const items = [
                {
                  key: "pain1",
                  img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain1-yun.png"),
                  imgL: 3, imgT: 6, imgW: 22, imgH: 62,
                  tag: "PAIN ONE",
                  tagText: "各种调研方法生搬硬套，流于形式",
                  tagL: 2, tagT: 46, tagW: 24,
                  bubble: "老师说要用SWOT先分析市场…这个产品的优势是便宜，劣势是不够智能化…",
                  bubbleL: 1, bubbleT: 15, bubbleW: 17,
                  bubbleRotate: -1.5,
                  phase: painPhases[0],
                },
                {
                  key: "pain2",
                  img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain2-fangtan.png"),
                  imgL: 28, imgT: 6, imgW: 22, imgH: 62,
                  tag: "PAIN TWO",
                  tagText: "不懂如何设计访谈提纲，问不出深层需求",
                  tagL: 27, tagT: 12, tagW: 22,
                  bubble: "王奶奶说腿脚不便、李爷爷说灯太暗了、刘阿姨说希望有一个显眼的按钮……到底怎么问有意义的问题？",
                  bubbleL: 27, bubbleT: 25, bubbleW: 18,
                  bubbleRotate: 1.2,
                  phase: painPhases[1],
                },
                {
                  key: "pain3",
                  img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain3-huatu.png"),
                  imgL: 53, imgT: 6, imgW: 22, imgH: 62,
                  tag: "PAIN THREE",
                  tagText: "急于画图，忽略需求，产出同质化",
                  tagL: 52, tagT: 46, tagW: 22,
                  bubble: "做一个炫酷的机械臂很帅，不如设计一个老年人适用的下肢外骨骼装置吧…怎么他也做机械臂！",
                  bubbleL: 52, bubbleT: 8, bubbleW: 18,
                  bubbleRotate: -1.2,
                  phase: painPhases[2],
                },
                {
                  key: "pain4",
                  img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain4-review.png"),
                  imgL: 78, imgT: 6, imgW: 22, imgH: 62,
                  tag: "PAIN FOUR",
                  tagText: "眼高手低，无法自我评估",
                  tagL: 77, tagT: 12, tagW: 21,
                  bubble: "老师说排版太乱……确实感觉怪怪的，但是我改不动了…",
                  bubbleL: 77, bubbleT: 28, bubbleW: 18,
                  bubbleRotate: 1.5,
                  phase: painPhases[3],
                },
              ];

              const iconMap = [Search, CheckCircle2, Lightbulb, Award];

              return (
                <>
                  {/* Layer 1: 插画（最底层） */}
                  {items.map((p, i) => (
                    <motion.div
                      key={`img-${p.key}`}
                      className="absolute z-10"
                      style={{
                        left: `${p.imgL}%`,
                        top: `${p.imgT}%`,
                        width: `${p.imgW}%`,
                        height: `${p.imgH}%`,
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                      <Image
                        src={p.img}
                        alt={p.tagText}
                        fill
                        sizes="(min-width: 768px) 22vw, 40vw"
                        className="object-contain"
                        unoptimized
                      />
                    </motion.div>
                  ))}

                  {/* Layer 2: PAIN 蓝色实心标签（贴角色胸口） */}
                  {items.map((p, i) => (
                    <motion.div
                      key={`tag-${p.key}`}
                      className="absolute z-20 rounded-md px-3 py-2 shadow-md"
                      style={{
                        left: `${p.tagL}%`,
                        top: `${p.tagT}%`,
                        width: `${p.tagW}%`,
                        background: C.indigo,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.15 }}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-[9px] tracking-[0.22em] font-bold text-white/90 flex-shrink-0">
                          {p.tag}
                        </span>
                        <span className="text-[11px] font-semibold text-white leading-snug">
                          {p.tagText}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Layer 3: 学生吐槽气泡（白底浅灰字，手写体） */}
                  {items.map((p, i) => (
                    <motion.div
                      key={`bubble-${p.key}`}
                      className="absolute z-20 rounded-xl px-3 py-2"
                      style={{
                        left: `${p.bubbleL}%`,
                        top: `${p.bubbleT}%`,
                        width: `${p.bubbleW}%`,
                        background: "#FFFFFF",
                        color: "#7B8299",
                        fontFamily: "var(--font-ma-shan-zheng), 'Kaiti', cursive",
                        fontSize: "10px",
                        lineHeight: "1.55",
                        boxShadow: "0 2px 8px rgba(40,60,120,0.08)",
                        border: `1px solid ${C.border}`,
                        transform: `rotate(${p.bubbleRotate}deg)`,
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.25 }}
                    >
                      {p.bubble}
                    </motion.div>
                  ))}

                  {/* Layer 4: 底部大卡片（最上层，从 70% 位置开始，盖住角色下半身） */}
                  <div className="absolute z-30 left-0 right-0 grid grid-cols-4 gap-4" style={{ top: "68%" }}>
                    {items.map((p, i) => {
                      const Icon = iconMap[i];
                      const ph = p.phase;
                      return (
                        <motion.div
                          key={`card-${p.key}`}
                          className="rounded-2xl p-4 md:p-5"
                          style={{
                            background: "rgba(255,255,255,0.96)",
                            border: `1px solid ${C.border}`,
                            boxShadow: "0 8px 24px rgba(40,60,120,0.08)",
                            backdropFilter: "blur(10px)",
                          }}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.55, delay: i * 0.1 + 0.35 }}
                        >
                          {/* 头部：icon + DISCOVER + 中文期名 */}
                          <div className="flex items-center gap-2.5 mb-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: `${ph.tone}18` }}
                            >
                              <Icon size={15} style={{ color: ph.tone }} />
                            </div>
                            <div className="min-w-0">
                              <div
                                className="text-[9px] tracking-[0.22em] font-bold"
                                style={{ color: ph.tone }}
                              >
                                {ph.step}
                              </div>
                              <div className="text-sm font-bold" style={{ color: C.text }}>
                                {ph.stepCn}
                              </div>
                            </div>
                          </div>

                          {/* 2 条痛点 bullet */}
                          <ul className="space-y-1.5 mb-3">
                            {ph.pains.map((pain) => (
                              <li key={pain} className="flex items-start gap-1.5 text-[12px] leading-snug" style={{ color: C.text }}>
                                <span
                                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                  style={{ background: ph.tone }}
                                />
                                {pain}
                              </li>
                            ))}
                          </ul>

                          {/* AI 如何介入 */}
                          <div className="pt-2.5 border-t" style={{ borderColor: C.border }}>
                            <div
                              className="text-[9px] tracking-[0.22em] font-bold mb-1"
                              style={{ color: C.textMuted }}
                            >
                              AI 如何介入
                            </div>
                            <div className="text-[12px] font-bold mb-0.5" style={{ color: ph.tone }}>
                              {ph.aiRole}
                            </div>
                            <div className="text-[10px] leading-snug" style={{ color: C.textSub }}>
                              {ph.aiValue}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          {/* 底部结论 */}
          <p className="mt-12 text-center text-base md:text-xl font-semibold leading-relaxed max-w-4xl mx-auto" style={{ color: C.text }}>
            从「方法论会背不会用」到「不知道作品好不好」，
            <br />
            Idea Salon 都可以为你一站式解决 —— 我们覆盖了
            <span style={{ color: C.cyan }}> 设计工作坊全流程</span>
          </p>
        </div>

        {/* ---------- Mobile: 4 张卡片纵向堆叠 ---------- */}
        <div className="md:hidden relative max-w-[520px] mx-auto">
          <SectionEyebrow code="02" en="SCENE INSIGHT" cn="FOUR BREAKPOINTS" />
          <h2 className="text-3xl font-bold leading-tight" style={{ color: C.text }}>
            学生卡住的地方，
            <br />
            <span style={{ color: C.orange }}>分布在整个设计流程里</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: C.textSub }}>
            普通设计院校教育与顶尖院校存在巨大资源差距 —— 只看软件使用，忽略设计推导的元能力。
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain1-yun.png"),
                tag: "PAIN ONE · DISCOVER",
                cn: "各种调研方法生搬硬套，流于形式",
                bubble: "老师说要用SWOT先分析市场…这个产品的优势是便宜，劣势是不够智能化…",
                tone: C.blue,
              },
              {
                img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain2-fangtan.png"),
                tag: "PAIN TWO · DEFINE",
                cn: "不懂如何设计访谈提纲，问不出深层需求",
                bubble: "王奶奶说腿脚不便、李爷爷说灯太暗了、刘阿姨说希望有一个显眼的按钮……到底怎么问有意义的问题？",
                tone: C.orange,
              },
              {
                img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain3-huatu.png"),
                tag: "PAIN THREE · DEVELOP",
                cn: "急于画图，忽略需求，产出同质化",
                bubble: "做一个炫酷的机械臂很帅，不如设计一个老年人适用的下肢外骨骼装置吧…怎么他也做机械臂！",
                tone: C.cyan,
              },
              {
                img: cdnUrl("/picture/id-project/tongji-works/idea-salon-figma/pain4-review.png"),
                tag: "PAIN FOUR · DELIVER",
                cn: "眼高手低，无法自我评估",
                bubble: "老师说排版太乱……确实感觉怪怪的，但是我改不动了…",
                tone: C.indigo,
              },
            ].map((p, i) => (
              <motion.div
                key={p.tag}
                className="rounded-2xl overflow-hidden"
                style={{ background: C.cardBg, border: `1px solid ${C.border}`, boxShadow: "0 4px 14px rgba(40,60,120,0.05)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="flex gap-3 p-4">
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image src={p.img} alt={p.cn} fill sizes="96px" className="object-contain" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.2em] font-bold mb-1" style={{ color: p.tone }}>
                      {p.tag}
                    </div>
                    <div className="text-sm font-bold leading-snug mb-2" style={{ color: C.text }}>
                      {p.cn}
                    </div>
                    <div
                      className="rounded-xl p-2.5 leading-relaxed"
                      style={{
                        background: "#FFFFFF",
                        color: "#7B8299",
                        fontFamily: "var(--font-ma-shan-zheng), 'Kaiti', cursive",
                        fontSize: "10px",
                        border: `1px solid ${C.border}`,
                        boxShadow: "0 2px 6px rgba(40,60,120,0.05)",
                      }}
                    >
                      {p.bubble}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center text-base font-semibold leading-relaxed" style={{ color: C.text }}>
            从「方法论会背不会用」到「不知道作品好不好」，
            <br />
            Idea Salon 一站式解决 ——
            <span style={{ color: C.cyan }}> 覆盖设计工作坊全流程</span>
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

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.tag}
                className="rounded-2xl p-6 md:p-7 flex flex-col"
                style={{ background: C.cardBg, border: `1px solid ${C.border}`, boxShadow: "0 4px 14px rgba(40,60,120,0.05)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${v.color}22`, color: v.color }}
                  >
                    <v.icon size={20} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] tracking-widest font-bold"
                      style={{ color: v.color }}
                    >
                      {v.tag}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: C.text }}>
                      {v.tagCn}
                    </div>
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold leading-snug mb-3" style={{ color: C.text }}>
                  {v.title}
                </div>
                <div className="text-sm mb-4" style={{ color: C.textSub }}>{v.sub}</div>
                <ul className="mt-auto space-y-2 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                  {v.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs leading-relaxed"
                      style={{ color: C.textSub }}
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: v.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* 3 步启动 */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest" style={{ border: `1px solid ${C.orange}44`, color: C.orange }}>
                使用流程
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold" style={{ color: C.text }}>
                三步启动 Idea Salon
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  s: "STEP 01",
                  t: "启动圆桌",
                  d: "输入项目定义句 · 明确用户/场景/痛点",
                  d2: "生成项目 Brief 与待确认问题 · 召集主持席与专家席位",
                  c: C.indigo,
                },
                {
                  s: "STEP 02",
                  t: "分阶段共创",
                  d: "发现 · 定义 · 发展 · 交付 · 每步调用专属子 Skill",
                  d2: "AI 给候选，团队做判断 · Sug 卡提示下一步，不强制分工",
                  c: C.orange,
                },
                {
                  s: "STEP 03",
                  t: "上墙确认",
                  d: "选择图表形式，同步到 Ardot · 补充、认领、确认后再推进",
                  d2: "调研版 + 设计产出版双板沉淀 · 支持团队投票、决策、讨论",
                  c: C.cyan,
                },
              ].map((s) => (
                <div
                  key={s.s}
                  className="rounded-2xl p-6"
                  style={{ background: C.cardBg, border: `1px solid ${C.border}`, boxShadow: "0 4px 14px rgba(40,60,120,0.05)" }}
                >
                  <div
                    className="text-[10px] tracking-[0.25em] font-bold mb-2"
                    style={{ color: s.c }}
                  >
                    {s.s}
                  </div>
                  <div className="text-xl font-bold mb-3" style={{ color: C.text }}>{s.t}</div>
                  <div className="text-sm mb-2 leading-relaxed" style={{ color: C.textSub }}>
                    {s.d}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                    {s.d2}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm md:text-base transition-all shadow-xl"
            style={{ background: "#FFB0DE", color: "#20112C", boxShadow: "0 12px 28px rgba(255, 176, 222, 0.35)" }}
          >
            <Play size={18} className="fill-current" />
            观看小红书演示视频
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </a>

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
