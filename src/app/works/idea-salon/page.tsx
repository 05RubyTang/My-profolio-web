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
   Idea Salon —— TT 设计学院 · AI 共创 Skill 落地页
   ============================================================ */

const VIDEO_URL = "https://www.xiaohongshu.com/explore/6a4e65ec000000001503e8f5";
const COVER_IMG = cdnUrl("/picture/id-project/tongji-works/IdeaSalon-封面.png");

/* ============ 数据 · Section 1 六大 AI 角色 ============ */
const roles = [
  { key: "method", cn: "方法论顾问", en: "METHODOLOGY", color: "#4353FE" },
  { key: "research", cn: "资深研究员", en: "RESEARCH", color: "#4AD6E5" },
  { key: "review", cn: "设计评审员", en: "REVIEW", color: "#FF6B2C" },
  { key: "creative", cn: "创意陪练", en: "CREATIVE", color: "#E070C0" },
  { key: "logic", cn: "逻辑检查员", en: "LOGIC", color: "#7B5AA8" },
  { key: "host", cn: "圆桌主持", en: "FACILITATOR", color: "#4B55FF" },
];

/* ============ 数据 · Section 2 4 大痛点断点 ============ */
const painPhases = [
  {
    step: "DISCOVER",
    stepCn: "发现期",
    pains: ["方法论会背，不会用", "访谈只剩用户原话"],
    aiRole: "方法论顾问 + 资深研究员",
    aiValue: "把工具用在当下问题，追问深层归因",
    tone: "#4353FE",
  },
  {
    step: "DEFINE",
    stepCn: "定义期",
    pains: ["问题定义模糊", "调研与方案逻辑断层"],
    aiRole: "逻辑检查员",
    aiValue: "用 HMW 收敛，接上调研到方案的逻辑",
    tone: "#FF6B2C",
  },
  {
    step: "DEVELOP",
    stepCn: "发展期",
    pains: ["头脑风暴冷场", "创意同质化、互相附和"],
    aiRole: "创意陪练",
    aiValue: "9 框架发散 + Moodboard，打破同质",
    tone: "#4AD6E5",
  },
  {
    step: "DELIVER",
    stepCn: "交付期",
    pains: ["不知道作品好不好", "「感觉不对」无法行动"],
    aiRole: "设计评审员",
    aiValue: "六维量化评估 + 具体改法",
    tone: "#4B55FF",
  },
];

/* ============ 数据 · Section 3 四大创新点 ============ */
const innovations = [
  {
    idx: "01",
    painTitle: "上下文丢失",
    painDesc: "换对话就像重新开始",
    innoTitle: "把记忆交给 Skill",
    innoDesc: "项目状态持续写入",
    result: "结果：流程可追溯、可恢复、可接续。",
  },
  {
    idx: "02",
    painTitle: "单用户模式",
    painDesc: "成员各自生成，信息形成孤岛",
    innoTitle: "把协作分层",
    innoDesc: "先独立，再汇聚",
    result: "结果：避免信息孤岛，也避免过早从众。",
  },
  {
    idx: "03",
    painTitle: "缺乏流程指导",
    painDesc: "工具只会生成，学生仍要自己判断何时用什么方法",
    innoTitle: "把方法嵌入阶段",
    innoDesc: "给模板和下一步",
    result: "结果：AI 提供起点，但不替学生完成判断。",
  },
  {
    idx: "04",
    painTitle: "表面化处理",
    painDesc: "停在摘要和关键词，洞察、HMW 与方案容易断裂",
    innoTitle: "把摘要变成洞察",
    innoDesc: "保留证据链",
    result: "结果：洞察可解释、可回溯、可推进。",
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

/* ============ 数据 · Section 5 3 步工作坊流程 ============ */
const flowSteps = [
  {
    step: "STEP 01",
    title: "独立思考",
    desc: "与专属 AI 角色一对一 半生成式共创",
    highlight: "私人空间 · PRIVATE",
    color: "#4353FE",
  },
  {
    step: "STEP 02",
    title: "团队碰撞",
    desc: "生成结构化设计流程，团队在 Ardot 平台完成共创",
    highlight: "共创界面 · SHARED WALL",
    color: "#FF6B2C",
  },
  {
    step: "STEP 03",
    title: "收敛推进",
    desc: "汇总、设计、执行，AI 导师评审，产出质量 up",
    highlight: "下一步 · NEXT STEP",
    color: "#4353FE",
  },
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
    color: "#4353FE",
  },
  {
    tag: "FOR TEACHERS",
    tagCn: "对老师",
    title: "Skill 是引擎，专家是界面·老师控全局",
    sub: "只需要在关键环节介入",
    bullets: ["Skill 按流程自动到位", "老师专注引导，把控现场节奏"],
    icon: Users,
    color: "#4AD6E5",
  },
  {
    tag: "FOR TEAMS",
    tagCn: "对团队",
    title: "让讨论真的收敛，而不是各说各话",
    sub: "分歧变共识，节奏不卡壳",
    bullets: ["先独立成型、再共享墙碰撞", "主持 AI 汇总共识、标出下一步"],
    icon: Workflow,
    color: "#FF6B2C",
  },
];

/* ============ 小节标题组件 ============ */
function SectionEyebrow({ code, en, cn }: { code: string; en: string; cn: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-white/45">
      <Sparkles size={14} className="text-[#4AD6E5]" />
      <span className="text-xs tracking-[0.25em] font-semibold text-[#4AD6E5]">
        {en}
      </span>
      <span className="text-xs text-white/30">/</span>
      <span className="text-xs tracking-widest text-white/60">{cn}</span>
      <span className="ml-auto text-xs font-bold text-white/40">{code}</span>
    </div>
  );
}

/* ============================================================
   页面
   ============================================================ */
export default function IdeaSalonPage() {
  return (
    <WorkLayout navTheme="dark" navTitle="Idea Salon" navSubtitle="AI 共创 Skill">
      {/* ============ Hero · 01 OPENING ============ */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0A0F1F 0%, #14203A 55%, #0F1830 100%)",
          }}
        />
        {/* 光斑 */}
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] rounded-full bg-[#4353FE]/25 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[380px] h-[380px] rounded-full bg-[#4AD6E5]/18 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] rounded-full bg-[#FF6B2C]/8 blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-20 flex flex-col md:flex-row items-center gap-10">
          {/* 左：文案 */}
          <motion.div
            className="flex-1 text-white z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionEyebrow code="01" en="TT DESIGN ACADEMY" cn="OPENING" />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              Idea{" "}
              <span className="text-[#4AD6E5]">Salon</span>
            </h1>
            <p className="mt-5 text-xl md:text-3xl text-white/85 font-light tracking-wide leading-snug">
              面向设计工作坊场景的
              <br className="hidden md:inline" />
              <span className="text-[#FFB0DE]">AI 共创 Skill</span> 设计
            </p>
            <p className="mt-3 text-sm md:text-base text-white/50 tracking-wide">
              Moderation · Roles · Flow
            </p>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
              让 AI 辅助创意真正走入团队设计
            </p>

            {/* 主 CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FFB0DE] hover:bg-[#FF95CE] text-[#20112C] font-semibold text-sm transition-all shadow-lg shadow-[#FFB0DE]/25"
              >
                <Play size={16} className="fill-current" />
                观看小红书演示视频
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#painpoints"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-white/80 hover:text-white text-sm transition-all"
              >
                向下了解项目
              </a>
            </div>

            <p className="mt-10 text-xs text-white/45 tracking-wider">
              小组成员：何佩珍、唐茹冰、王鹏翔
            </p>
            <p className="mt-2 text-xs text-white/35">
              腾讯云 × TT 设计学院 skill 创新大赛 · 二等奖
            </p>
          </motion.div>

          {/* 右：封面 + 6 角色 orbit */}
          <motion.div
            className="flex-1 relative z-10 flex items-center justify-center min-h-[420px] md:min-h-[620px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="relative w-full max-w-[560px] aspect-square">
              {/* 虚线圆环 */}
              <div className="absolute inset-[10%] rounded-full border-2 border-dashed border-[#4AD6E5]/40" />
              <div className="absolute inset-[22%] rounded-full border border-white/10" />

              {/* 中心封面 */}
              <div className="absolute inset-[28%] rounded-full overflow-hidden shadow-2xl shadow-[#4353FE]/30 border-2 border-white/10">
                <Image
                  src={COVER_IMG}
                  alt="Idea Salon"
                  fill
                  sizes="(min-width: 768px) 260px, 180px"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* 6 个角色环绕分布 */}
              {roles.map((r, i) => {
                const angle = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 44; // 百分比
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={r.key}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.08 }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-[11px] shadow-lg backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${r.color}, ${r.color}88)`,
                          boxShadow: `0 8px 20px ${r.color}55`,
                        }}
                      >
                        {r.cn.slice(0, 2)}
                      </div>
                      <div className="text-[10px] tracking-[0.15em] font-bold text-white/70">
                        {r.en}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
          SCROLL ↓
        </div>
      </section>

      {/* ============ Section 2 · 4 大痛点断点 ============ */}
      <section
        id="painpoints"
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #0F1830 0%, #14203A 55%, #10192E 100%)",
        }}
      >
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#FF6B2C]/12 blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="02" en="SCENE INSIGHT" cn="FOUR BREAKPOINTS" />
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              学生卡住的地方，
              <br />
              <span className="text-[#FF6B2C]">分布在整个设计流程里</span>
            </h2>
            <p className="mt-4 max-w-3xl text-white/60 text-sm md:text-base leading-relaxed">
              普通设计院校教育与顶尖院校存在巨大资源差距——只看软件使用，忽略设计推导的元能力。
              我们把学生的卡点，铺进了 Double Diamond 全流程。
            </p>
          </ScrollFadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPhases.map((p, i) => (
              <motion.div
                key={p.step}
                className="relative rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-6 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="text-[10px] tracking-[0.25em] font-bold mb-1"
                  style={{ color: p.tone }}
                >
                  {p.step}
                </div>
                <div className="text-2xl font-bold text-white mb-4">{p.stepCn}</div>

                <ul className="space-y-2 mb-5">
                  {p.pains.map((pain) => (
                    <li
                      key={pain}
                      className="flex items-start gap-2 text-sm text-white/70 leading-relaxed"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: p.tone }}
                      />
                      {pain}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="text-[10px] tracking-widest text-white/40 mb-1">
                    AI 如何介入
                  </div>
                  <div
                    className="text-sm font-bold mb-1"
                    style={{ color: p.tone }}
                  >
                    {p.aiRole}
                  </div>
                  <div className="text-xs text-white/50 leading-relaxed">
                    {p.aiValue}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 text-center text-base md:text-xl font-semibold text-white/85 leading-relaxed max-w-4xl mx-auto">
            从「方法论会背不会用」到「不知道作品好不好」，
            <br />
            Idea Salon 都可以为你一站式解决 —— 我们覆盖了
            <span className="text-[#4AD6E5]"> 设计工作坊全流程</span>
          </p>
        </div>
      </section>

      {/* ============ Section 3 · 四大创新点 ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #10192E 0%, #182346 60%, #10192E 100%)",
        }}
      >
        <div className="absolute top-1/3 -left-24 w-[400px] h-[400px] rounded-full bg-[#4353FE]/15 blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="04" en="OUR INNOVATIONS" cn="FOUR BREAKTHROUGHS" />
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              <span className="text-white/70">竞品痛点</span>
              <span className="text-[#4B55FF] mx-2">→</span>
              <span className="text-[#4B55FF]">转化为四个创新点</span>
            </h2>
            <p className="mt-4 max-w-3xl text-white/60 text-sm md:text-base leading-relaxed">
              不是补一个 AI 功能，而是重组设计工作坊的推进机制 —— 左侧是现有 AI 设计工具的断点，右侧是
              Idea Salon 的对应回应。
            </p>
          </ScrollFadeIn>

          <div className="mt-14 space-y-4">
            {innovations.map((it, i) => (
              <motion.div
                key={it.idx}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_60px_1fr] gap-4 md:gap-5 items-stretch rounded-2xl overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* 序号 */}
                <div className="hidden md:flex items-center justify-center bg-[#FF6B2C]/10 text-[#FF6B2C] text-3xl font-bold">
                  {it.idx}
                </div>

                {/* 痛点 */}
                <div className="p-5 bg-white/[0.03]">
                  <div className="text-[10px] tracking-widest text-[#FF6B2C] font-bold mb-2 md:hidden">
                    痛点 {it.idx}
                  </div>
                  <div className="text-xs tracking-widest text-white/40 mb-2 hidden md:block">
                    现有 AI 设计工具痛点
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{it.painTitle}</div>
                  <div className="text-sm text-white/55 leading-relaxed">
                    {it.painDesc}
                  </div>
                </div>

                {/* 转化 */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="text-[#4B55FF] text-3xl">→</div>
                </div>

                {/* 创新 */}
                <div className="p-5 bg-[#4B55FF]/10 border-l border-[#4B55FF]/30">
                  <div className="text-xs tracking-widest text-[#4B55FF] font-bold mb-2">
                    创新 · Idea Salon
                  </div>
                  <div className="text-lg font-bold text-[#7FA6FF] mb-1">
                    {it.innoTitle}
                  </div>
                  <div className="text-sm text-white/70 leading-relaxed mb-2">
                    {it.innoDesc}
                  </div>
                  <div className="text-xs text-[#4AD6E5] font-medium leading-relaxed">
                    {it.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 text-center text-base md:text-lg font-semibold text-white/80">
            四个创新点共同解决：
            <span className="text-[#4AD6E5]">上下文 · 团队协作 · 流程推进 · 深层洞察</span>
          </p>
        </div>
      </section>

      {/* ============ Section 4 · 解决机制 Skill × Mentor ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #10192E 0%, #14203A 55%, #0F1830 100%)",
        }}
      >
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4AD6E5]/10 blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="05" en="SOLUTION MECHANISM" cn="SKILL × MENTOR" />
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              <span className="text-[#4AD6E5]">Skill 是引擎</span>
              ，专家是界面
            </h2>
            <p className="mt-4 max-w-3xl text-white/60 text-sm md:text-base leading-relaxed">
              让 AI 不再停留于 ChatGPT、Midjourney、Figma AI 等万能聊天框，
              而像一场有主持、有角色、有节奏的工作坊。
              <br />
              <span className="text-white/45 text-xs md:text-sm">
                结构化任务由 Skill 完成 · 人格化表达由老师分身包装
              </span>
            </p>
          </ScrollFadeIn>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
            {/* 引擎层 */}
            <div className="rounded-2xl p-6 md:p-8 bg-[#4353FE]/10 border border-[#4353FE]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4353FE] flex items-center justify-center">
                  <Layers size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs tracking-widest text-white/50 font-bold">
                    ① SKILL LAYER
                  </div>
                  <div className="text-lg font-bold text-white">引擎层</div>
                </div>
              </div>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                结构化任务由 5 个专业 Skill 分工完成
              </p>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div
                    key={s.num}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#4353FE]/20 border border-[#4353FE]/40 flex items-center justify-center flex-shrink-0">
                      <s.icon size={14} className="text-[#7FA6FF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-white">{s.cn}</span>
                        <span className="text-[10px] tracking-widest text-[#4AD6E5] font-bold">
                          {s.phase}
                        </span>
                      </div>
                      <div className="text-xs text-white/55 mt-1 leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 中间连接符 */}
            <div className="hidden lg:flex items-center justify-center h-full pt-32">
              <div className="text-3xl text-white/30">×</div>
            </div>

            {/* 界面层 */}
            <div className="rounded-2xl p-6 md:p-8 bg-[#FF6B2C]/10 border border-[#FF6B2C]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B2C] flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs tracking-widest text-white/50 font-bold">
                    ② MENTOR LAYER
                  </div>
                  <div className="text-lg font-bold text-white">界面层</div>
                </div>
              </div>
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                可选择数位老师参与到设计的各个阶段，
                人格化表达由老师分身包装。
              </p>

              {/* 6 张老师卡片 */}
              <div className="grid grid-cols-3 gap-3">
                {roles.map((r) => (
                  <div
                    key={r.key}
                    className="rounded-xl p-3 bg-white/[0.04] border border-white/10 text-center"
                  >
                    <div
                      className="mx-auto w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white font-bold text-[11px]"
                      style={{
                        background: `linear-gradient(135deg, ${r.color}, ${r.color}88)`,
                        boxShadow: `0 4px 12px ${r.color}44`,
                      }}
                    >
                      {r.cn.slice(0, 2)}
                    </div>
                    <div className="text-xs font-bold text-white/80 leading-tight">
                      {r.cn}
                    </div>
                    <div className="text-[9px] tracking-widest text-white/40 mt-0.5">
                      {r.en}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                {["主持/系统价值", "用户/服务系统", "交互锚点", "AI/HCI", "原型落地", "表达/Ardot"].map(
                  (t) => (
                    <div
                      key={t}
                      className="text-[10px] py-1.5 px-1 rounded-lg bg-[#4AD6E5]/10 text-white/70"
                    >
                      {t}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Section 5 · 3 步工作坊流程 ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #0F1830 0%, #14203A 55%, #10192E 100%)",
        }}
      >
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] rounded-full bg-[#4353FE]/15 blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="06" en="HOW IT RUNS" cn="WORKSHOP FLOW" />
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              先独立思考，再团队收敛
              <br />
              <span className="text-[#4B55FF]">Ardot 共创看板</span>
              <span className="text-white/80"> 打造一场有节奏的圆桌工作坊</span>
            </h2>
            <p className="mt-4 max-w-3xl text-white/60 text-sm md:text-base leading-relaxed">
              不是一起发散到底，而是「个人先成型，团队再碰撞」，每一步都有 AI 主持推进。
            </p>
          </ScrollFadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {flowSteps.map((f, i) => (
              <motion.div
                key={f.step}
                className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* 大序号背景 */}
                <div className="absolute top-3 right-4 text-6xl font-bold opacity-10 text-white select-none">
                  0{i + 1}
                </div>

                <div
                  className="text-[10px] tracking-[0.25em] font-bold mb-2"
                  style={{ color: f.color }}
                >
                  {f.step}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {f.title}
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-5">
                  {f.desc}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    background: `${f.color}18`,
                    color: f.color,
                    borderColor: `${f.color}44`,
                  }}
                >
                  {f.highlight}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 人机协作旅程图（简化文字版） */}
          <div className="mt-16 rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8 overflow-x-auto">
            <div className="text-center text-sm md:text-base font-bold bg-gradient-to-r from-[#6C79FF] to-[#8B93EA] bg-clip-text text-transparent mb-6">
              人机协作旅程图（以双钻模型为例）
            </div>
            <div className="min-w-[720px] grid grid-cols-[110px_1fr_1fr_1fr_1fr_1fr] gap-2 text-xs">
              {/* 表头 */}
              <div />
              {["项目初始化", "发现期", "定义期", "发展期", "交付期"].map((h) => (
                <div
                  key={h}
                  className="text-center py-2 px-2 rounded-md bg-[#4B55FF]/15 text-[#B0BCFF] font-bold"
                >
                  {h}
                </div>
              ))}

              {/* Row · 学生/团队 */}
              <div className="flex items-center px-2 py-2 text-white/75 font-semibold">
                学生 / 团队
              </div>
              {[
                "输入学科主题",
                "认领调研任务、思考 HMW",
                "确认设计洞察、思考用户痛点",
                "私人空间发散、组内评审",
                "汇报与交付",
              ].map((c) => (
                <div
                  key={c}
                  className="px-2 py-2 rounded-md bg-white/5 text-white/60 text-center"
                >
                  {c}
                </div>
              ))}

              {/* Row · LearnBuddy AI */}
              <div className="flex items-center px-2 py-2 text-white/75 font-semibold">
                LearnBuddy AI
              </div>
              {[
                "匹配导师",
                "推荐工具、辅助调研",
                "HMW 撰写辅助、需求逻辑审查",
                "框架发散、1v1 出图",
                "六维评审、实操建议",
              ].map((c) => (
                <div
                  key={c}
                  className="px-2 py-2 rounded-md bg-[#4AD6E5]/10 text-[#B7EAF0] text-center"
                >
                  {c}
                </div>
              ))}

              {/* Row · Ardot 共享看板 */}
              <div className="flex items-center px-2 py-2 text-white/75 font-semibold">
                Ardot 共享看板
              </div>
              {[
                "Brief 页生成",
                "调研计划板 / 结论可视化",
                "HMW 看板 / 定义图",
                "概念方向板 / Moodboard",
                "高保真与产品图",
              ].map((c) => (
                <div
                  key={c}
                  className="px-2 py-2 rounded-md bg-[#FF6B2C]/10 text-[#FFC8A8] text-center"
                >
                  {c}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40 text-center md:hidden">
              ← 左右滑动查看完整流程 →
            </p>
          </div>
        </div>
      </section>

      {/* ============ Section 6 · 三对象价值 ============ */}
      <section
        className="relative w-full py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #10192E 0%, #182346 55%, #0F1830 100%)",
        }}
      >
        <div className="absolute -top-24 left-1/3 w-[400px] h-[400px] rounded-full bg-[#4AD6E5]/12 blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollFadeIn>
            <SectionEyebrow code="07" en="WHY IT MATTERS" cn="VALUE & CLOSING" />
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              三方启动，从概念到方案
              <br />
              <span className="text-[#4AD6E5]">带走一套能复用的推进力</span>
            </h2>
          </ScrollFadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.tag}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-7 backdrop-blur-sm flex flex-col"
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
                    <div className="text-sm text-white/80 font-semibold">
                      {v.tagCn}
                    </div>
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold text-white leading-snug mb-3">
                  {v.title}
                </div>
                <div className="text-sm text-white/70 mb-4">{v.sub}</div>
                <ul className="mt-auto space-y-2 pt-4 border-t border-white/10">
                  {v.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs text-white/60 leading-relaxed"
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
              <div className="inline-block px-4 py-1.5 rounded-full border border-[#FF6B2C]/40 text-[#FF6B2C] text-xs font-semibold tracking-widest">
                使用流程
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white">
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
                  c: "#4B55FF",
                },
                {
                  s: "STEP 02",
                  t: "分阶段共创",
                  d: "发现 · 定义 · 发展 · 交付 · 每步调用专属子 Skill",
                  d2: "AI 给候选，团队做判断 · Sug 卡提示下一步，不强制分工",
                  c: "#FF6B2C",
                },
                {
                  s: "STEP 03",
                  t: "上墙确认",
                  d: "选择图表形式，同步到 Ardot · 补充、认领、确认后再推进",
                  d2: "调研版 + 设计产出版双板沉淀 · 支持团队投票、决策、讨论",
                  c: "#4AD6E5",
                },
              ].map((s) => (
                <div
                  key={s.s}
                  className="rounded-2xl p-6 bg-white/[0.04] border border-white/10"
                >
                  <div
                    className="text-[10px] tracking-[0.25em] font-bold mb-2"
                    style={{ color: s.c }}
                  >
                    {s.s}
                  </div>
                  <div className="text-xl font-bold text-white mb-3">{s.t}</div>
                  <div className="text-sm text-white/70 mb-2 leading-relaxed">
                    {s.d}
                  </div>
                  <div className="text-xs text-white/50 leading-relaxed">
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
        style={{
          background:
            "linear-gradient(180deg, #0F1830 0%, #0A0F1F 100%)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full bg-[#4353FE]/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
            想看真实运行的样子？
          </h3>
          <p className="text-white/60 text-sm md:text-base mb-8">
            我们把完整的工作坊流程录成了一支视频 · 3 分钟看懂 Idea Salon
          </p>
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FFB0DE] hover:bg-[#FF95CE] text-[#20112C] font-semibold text-sm md:text-base transition-all shadow-xl shadow-[#FFB0DE]/25"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm transition-all"
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
