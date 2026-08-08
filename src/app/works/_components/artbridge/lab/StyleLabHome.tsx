"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shirt,
  Gem,
  Sparkles,
  Footprints,
  Layers,
} from "lucide-react";
import {
  CATEGORIES,
  COLOR_ROWS,
  COLORFUL_LABEL,
  LAB_PROFILE,
  LAB_TASKS,
  NEUTRAL_LABEL,
  STATS_DATE_RANGE,
  STATS_SUMMARY,
  type LabTask,
} from "../data/styleLabScript";

/** 标题字体（Figma 稿件使用 YouSheBiaoTiHei，web 端用 ZCOOL KuaiLe 作为替身） */
const TITLE_FONT = "var(--font-zcool-kuaile), 'YouSheBiaoTiHei', 'PingFang SC', sans-serif";
/** 标题渐变（Figma 一致 · 深红→紫红） */
const TITLE_GRADIENT =
  "linear-gradient(135deg, rgb(143,12,56) 0%, rgb(181,27,135) 73%)";

/**
 * 「风格试验台」首页 —— 严格对齐 Figma node 1211:11576
 *
 * 三段式：
 *   ① 顶部粉色渐变英雄卡（用户资料 · 穿搭力 · 徽章 · 精调机会点 tooltip）
 *   ② 风格数据统计卡（色彩分布 · 品类图标）
 *   ③ 穿搭任务列表（3 条任务，每条右侧 "去完成" CTA）
 *
 * 与 chatbot 页复用同一 PhoneFrame 尺寸（width=340），
 * 由外层 StyleLabScene 负责 wrapper，本组件只渲染屏幕内内容。
 */
export default function StyleLabHome({
  onTaskClick,
  power,
}: {
  /** 用户点某条任务时的回调（外层根据 task.route 派发） */
  onTaskClick: (task: LabTask) => void;
  /** 当前穿搭力值（外部注入 · 完成 chatbot 后会 +10） */
  power: number;
}) {
  const percentage = Math.min(100, (power / LAB_PROFILE.powerTarget) * 100);

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgb(189,72,196) 0%, rgb(225,185,216) 32%, rgb(239,239,239) 64%, rgb(234,234,234) 100%)",
      }}
    >
      {/* 状态栏 · 与 chatbot 保持一致 */}
      <div className="h-9 shrink-0 flex items-center justify-between px-5 pt-1 text-[10px] text-white">
        <span className="tabular-nums font-semibold">9:41</span>
        <span className="tracking-wider">•••</span>
      </div>

      {/* 顶部 Header · 返回箭头 + 标题 + 3 个 icon（call / volume / more）
          与 travel/daily/world 的 chatbot 顶栏保持一致，图标用 Figma 原稿导出的 PNG */}
      <div className="shrink-0 flex items-center justify-between px-4 pt-1 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/40"
            aria-label="返回"
          >
            <ArrowLeft size={16} strokeWidth={2.2} />
          </button>
          <h1 className="text-white text-[16px] font-bold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
            风格试验台
          </h1>
        </div>
        <div className="flex items-center gap-1.5">
          <LabHeaderIcon src="/picture/artbridge/travel/ui/header-call.png" alt="电话" />
          <LabHeaderIcon src="/picture/artbridge/travel/ui/header-volume.png" alt="音量" />
          <LabHeaderIcon src="/picture/artbridge/travel/ui/header-more.png" alt="更多" />
        </div>
      </div>

      {/* 主体：可滚动 */}
      <div
        className="flex-1 overflow-y-auto px-3 pb-4 space-y-3 no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ==================== ① 用户英雄卡 ==================== */}
        <HeroCard power={power} percentage={percentage} />

        {/* ==================== ② 风格数据统计卡 ==================== */}
        <StatsCard />

        {/* ==================== ③ 穿搭任务卡 ==================== */}
        <TasksCard onTaskClick={onTaskClick} />
      </div>
    </div>
  );
}

/* ============================================================
 *                        ① 用户英雄卡
 *
 * Figma 稿件：用户名 / 穿搭力 / 进度条直接贴在页面顶部粉紫渐变上，
 * 无独立粉色底板；右侧仅呈现纯圆头像 —— 移除斜坡蒙层残缺矩形。
 * 精调机会点 tooltip 已在下方「风格数据统计」饼图旁展示，此处不再重复。
 * ============================================================ */
function HeroCard({ power, percentage }: { power: number; percentage: number }) {
  return (
    <div className="relative px-3 pt-2 pb-3">
      {/* 内容层：左侧信息 + 右侧圆头像 */}
      <div className="relative flex items-stretch gap-3">
        {/* 左侧信息栏（直接贴在页面渐变上 · 无卡片底板） */}
        <div className="flex-1 min-w-0">
          {/* 穿搭力标签 + 数字（先显示，与 Figma 稿一致） */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-white text-[14px] leading-none font-bold drop-shadow-[0_1px_2px_rgba(76,7,63,0.35)]"
              style={{ fontFamily: TITLE_FONT }}
            >
              我的穿搭力
            </span>
            <span
              className="text-[36px] leading-none tabular-nums bg-clip-text text-transparent"
              style={{
                fontFamily: TITLE_FONT,
                backgroundImage:
                  "linear-gradient(135deg, rgb(211,165,255) 0%, rgb(249,238,247) 64%, rgb(255,165,200) 97%)",
                WebkitBackgroundClip: "text",
                filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.4))",
              }}
            >
              {power}
            </span>
          </div>

          {/* 用户名 + 徽章 */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-white text-[16px] font-bold truncate drop-shadow-[0_1px_2px_rgba(76,7,63,0.35)]">
              {LAB_PROFILE.nickname}
            </span>
            <span
              className="inline-flex items-center px-2 py-[2px] rounded-[4px] text-white text-[10px] font-bold shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgb(243,112,134) 0%, rgb(218,54,158) 100%)",
              }}
            >
              {LAB_PROFILE.currentBadge}
            </span>
          </div>

          {/* 进度条 · 白色底 + 粉色进度 */}
          <div className="mt-2.5 h-[6px] w-full rounded-full bg-white/70 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "rgb(231,58,162)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* 进度数值 + 下一级徽章（加粗） */}
          <div className="mt-1.5 flex items-center justify-between">
            <span
              className="text-[12px] font-bold tabular-nums"
              style={{ color: "rgb(76,7,63)" }}
            >
              {power}/{LAB_PROFILE.powerTarget}
            </span>
            <span
              className="text-[11px] font-medium"
              style={{ color: "rgb(76,7,63)" }}
            >
              {LAB_PROFILE.nextBadge}
            </span>
          </div>
        </div>

        {/* 右侧圆头像 · 独立呈现（无背景蒙层） */}
        <div className="relative w-[96px] h-[96px] shrink-0 self-center">
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-[0_4px_16px_rgba(227,110,205,0.45)]">
            <Image
              src={LAB_PROFILE.avatarSrc}
              alt={LAB_PROFILE.nickname}
              fill
              sizes="96px"
              className="object-cover"
              style={{ objectPosition: "35% 20%" }}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 *                       ② 风格数据统计卡
 * ============================================================ */
function StatsCard() {
  const categoryIcon = (key: string) => {
    switch (key) {
      case "top":
        return <Shirt size={12} />;
      case "coat":
        return <Layers size={12} />;
      case "bottom":
        return <Sparkles size={12} />;
      case "accessory":
        return <Gem size={12} />;
      case "shoes":
        return <Footprints size={12} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative rounded-[12px] p-4"
      style={{
        background:
          "linear-gradient(180deg, rgb(255,210,238) 0%, rgb(255,255,255) 34%)",
        boxShadow:
          "0 0 18px rgba(250,159,159,0.14), inset 0 0.5px 2px rgba(255,255,255,1)",
      }}
    >
      {/* 顶部两栏：左（标题 / 日期 / 品类 icon 列） + 右（甜甜圈 pie chart） */}
      <div className="flex items-start gap-3">
        {/* 左：标题 + 日期 + 品类图例 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          <div className="flex items-center gap-1.5">
            <PieIcon />
            <h2
              className="text-[18px] leading-none bg-clip-text text-transparent"
              style={{
                fontFamily: TITLE_FONT,
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
              }}
            >
              风格数据统计
            </h2>
          </div>

          {/* 日期 */}
          <div
            className="mt-1 text-[11px] font-medium bg-clip-text text-transparent"
            style={{
              backgroundImage: TITLE_GRADIENT,
              WebkitBackgroundClip: "text",
            }}
          >
            {STATS_DATE_RANGE}
          </div>

          {/* 品类图标网格 · 3 行 × 2 列（更紧凑） */}
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-[5px]">
            {CATEGORIES.map((c) => (
              <div key={c.key} className="flex items-center gap-1">
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white shrink-0"
                  style={{
                    background: c.color,
                    boxShadow: "0 2px 8px rgba(255,53,252,0.20)",
                  }}
                >
                  {categoryIcon(c.key)}
                </span>
                <span
                  className="text-[11px] font-medium"
                  style={{ color: "rgb(76,7,63)" }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 右：甜甜圈 pie chart · 「配饰」段外凸 + 深色 tooltip 尾巴气泡 */}
        <div className="relative w-[120px] h-[120px] shrink-0">
          <CategoryDonut tip={LAB_PROFILE.tip} />
        </div>
      </div>

      {/* 分隔 · 色彩分布小标题 */}
      <div className="mt-4 flex items-center gap-1.5">
        <PaletteIcon />
        <h3
          className="text-[16px] leading-none bg-clip-text text-transparent"
          style={{
            fontFamily: TITLE_FONT,
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
          }}
        >
          色彩分布
        </h3>
      </div>

      {/* 统计总结 */}
      <div
        className="mt-2 text-[13px] font-medium bg-clip-text text-transparent"
        style={{
          backgroundImage: TITLE_GRADIENT,
          WebkitBackgroundClip: "text",
        }}
      >
        {STATS_SUMMARY}
      </div>

      {/* 一整行色彩胶囊（中性色 + 彩色） */}
      <div className="mt-2 h-[16px] w-full rounded-full overflow-hidden flex">
        {COLOR_ROWS.flat().map((cell, i, arr) => (
          <span
            key={i}
            className="flex-1"
            style={{
              background: cell.color,
              borderTopLeftRadius: i === 0 ? 8 : 0,
              borderBottomLeftRadius: i === 0 ? 8 : 0,
              borderTopRightRadius: i === arr.length - 1 ? 8 : 0,
              borderBottomRightRadius: i === arr.length - 1 ? 8 : 0,
            }}
          />
        ))}
      </div>

      {/* 中性色 / 彩色 图例 */}
      <div
        className="mt-2 flex items-center justify-between text-[11px] font-medium"
        style={{ color: "rgb(22,26,34)" }}
      >
        <span>{NEUTRAL_LABEL}</span>
        <span>{COLORFUL_LABEL}</span>
      </div>
    </div>
  );
}

/**
 * 甜甜圈饼图 · 5 段品类占比 · 「配饰」段外凸表示精调机会点
 * Figma 视觉估算比例（顺时针从 12 点开始）：
 *   上衣 25% · 外套 20% · 下装 18% · 鞋子 20% · 配饰 17%（外凸 · 深紫）
 * 顶部有一条深色 tooltip 尾巴气泡指向配饰段。
 */
function CategoryDonut({ tip }: { tip: string }) {
  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 48;
  const rInner = 24;
  const rBulge = 55; // 配饰段外凸半径

  // 5 段占比（角度和 = 360）
  const segments = [
    { key: "top", pct: 0.25, color: "rgb(255,105,195)" },
    { key: "coat", pct: 0.2, color: "rgb(248,141,186)" },
    { key: "bottom", pct: 0.18, color: "rgb(240,165,247)" },
    { key: "shoes", pct: 0.2, color: "rgb(227,110,204)" },
    { key: "accessory", pct: 0.17, color: "rgb(183,91,225)", bulge: true },
  ];

  // 从 12 点方向开始（-90°）
  let acc = -Math.PI / 2;
  const paths = segments.map((seg, i) => {
    const angle = seg.pct * Math.PI * 2;
    const start = acc;
    const end = acc + angle;
    acc = end;
    const rO = seg.bulge ? rBulge : rOuter;
    const largeArc = angle > Math.PI ? 1 : 0;
    // 外圈起点/终点
    const xO1 = cx + rO * Math.cos(start);
    const yO1 = cy + rO * Math.sin(start);
    const xO2 = cx + rO * Math.cos(end);
    const yO2 = cy + rO * Math.sin(end);
    // 内圈起点/终点（内圈始终 rInner · 不外凸）
    const xI1 = cx + rInner * Math.cos(start);
    const yI1 = cy + rInner * Math.sin(start);
    const xI2 = cx + rInner * Math.cos(end);
    const yI2 = cy + rInner * Math.sin(end);
    const d = [
      `M ${xO1} ${yO1}`,
      `A ${rO} ${rO} 0 ${largeArc} 1 ${xO2} ${yO2}`,
      `L ${xI2} ${yI2}`,
      `A ${rInner} ${rInner} 0 ${largeArc} 0 ${xI1} ${yI1}`,
      "Z",
    ].join(" ");
    return { d, color: seg.color, key: seg.key, bulge: seg.bulge };
  });

  return (
    <div className="relative w-full h-full">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-[0_4px_12px_rgba(227,110,205,0.25)]"
      >
        {paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill={p.color}
            stroke="white"
            strokeWidth={1.2}
          />
        ))}
      </svg>

      {/* tooltip 尾巴气泡 · 指向配饰段（右上角） */}
      <div
        className="absolute -top-2 right-0 translate-x-2 px-2 py-1 rounded-[4px] text-white text-[9px] whitespace-nowrap"
        style={{
          background: "rgb(62,57,57)",
          border: "1px solid rgb(84,71,79)",
          boxShadow: "0 2px 4px rgba(255,112,224,0.2)",
        }}
      >
        {tip}
        {/* 尾巴三角指向配饰段 */}
        <span
          aria-hidden
          className="absolute left-3 -bottom-[3px] w-0 h-0"
          style={{
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderTop: "4px solid rgb(62,57,57)",
          }}
        />
      </div>
    </div>
  );
}

/** 「风格数据统计」标题旁边的粉色饼图小 icon */
function PieIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      className="shrink-0"
    >
      <path
        d="M8 1.5 A6.5 6.5 0 1 0 14.5 8 L8 8 Z"
        fill="rgb(240,165,247)"
      />
      <path
        d="M8 1.5 A6.5 6.5 0 0 1 14.5 8 L8 8 Z"
        fill="rgb(183,91,225)"
      />
    </svg>
  );
}

/** 「色彩分布」标题旁边的调色盘小 icon */
function PaletteIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      className="shrink-0"
    >
      <path
        d="M8 1.5 C4 1.5 1.5 4 1.5 7.5 C1.5 11 4 13.5 7.5 13.5 C8.3 13.5 8.8 12.8 8.5 12 C8.2 11.2 8.6 10.3 9.5 10.2 C10.5 10.1 11.5 10.5 12.2 10 C13.5 9 14.5 7.5 14.5 6 C14.5 3.5 11.5 1.5 8 1.5 Z"
        fill="rgb(240,165,247)"
        stroke="rgb(183,91,225)"
        strokeWidth={0.6}
      />
      <circle cx="4.5" cy="7" r="0.9" fill="rgb(255,105,195)" />
      <circle cx="6.5" cy="4.5" r="0.9" fill="rgb(183,91,225)" />
      <circle cx="9.5" cy="4.5" r="0.9" fill="rgb(248,141,186)" />
      <circle cx="11.5" cy="7" r="0.9" fill="rgb(227,110,204)" />
    </svg>
  );
}

/* ============================================================
 *                        ③ 穿搭任务卡
 * ============================================================ */
function TasksCard({
  onTaskClick,
}: {
  onTaskClick: (task: LabTask) => void;
}) {
  /* 异形双层设计（Figma node 1676:8569）：
       - 底层：粉色渐变卡（rgb(227,110,205) → rgb(240,165,247)）· 高度略高
       - 上层：白色卡（有边框描边和内阴影）· 上移 4px 露出底部粉色边
     视觉效果：像一叠"粉色底 + 白色内衬"的双层卡片 */
  return (
    <div className="relative">
      {/* 底部粉色装饰卡 */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full rounded-[12px] translate-y-1"
        style={{
          background:
            "linear-gradient(135deg, rgb(227,110,205) 0%, rgb(240,165,247) 100%)",
        }}
      />

      {/* 上层白色卡 */}
      <div
        className="relative rounded-[12px] p-4 border border-white"
        style={{
          background:
            "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(255,255,255) 67%)",
          borderImage:
            "linear-gradient(135deg, rgb(231,102,220) 8%, rgb(255,225,225) 71%) 1",
          boxShadow:
            "0 0 18px rgba(250,159,159,0.14), inset 0 0.5px 2px rgba(255,255,255,1)",
        }}
      >
        {/* 粉色淡色装饰糊光（对齐 Figma Ellipse 63 · rgb(201,210,255) 大 blur） */}
        <div
          aria-hidden
          className="absolute left-6 top-16 w-32 h-32 rounded-full opacity-40 pointer-events-none"
          style={{
            background: "rgba(201,210,255,0.5)",
            filter: "blur(60px)",
          }}
        />

        {/* 标题 · YouSheBiaoTiHei */}
        <h2
          className="relative text-[20px] leading-none bg-clip-text text-transparent"
          style={{
            fontFamily: TITLE_FONT,
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
          }}
        >
          穿搭任务
        </h2>

        {/* 3 条任务 */}
        <div className="relative mt-3 flex flex-col gap-2">
          {LAB_TASKS.map((task) => (
            <TaskRow key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, onClick }: { task: LabTask; onClick: () => void }) {
  return (
    <div
      className="flex items-center justify-between rounded-[12px] px-3 py-2.5"
      style={{ background: "rgb(247,247,247)" }}
    >
      <div className="min-w-0 flex-1 pr-2">
        <div
          className="text-[14px] font-semibold leading-tight truncate bg-clip-text text-transparent"
          style={{
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
          }}
        >
          {task.title}
        </div>
        <div
          className="mt-0.5 text-[11px] bg-clip-text text-transparent"
          style={{
            backgroundImage: TITLE_GRADIENT,
            WebkitBackgroundClip: "text",
          }}
        >
          穿搭力 +{task.points}
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.94 }}
        className="shrink-0 inline-flex items-center justify-center rounded-full px-3 h-[26px] text-white text-[11px] font-bold"
        style={{
          background:
            "linear-gradient(135deg, rgb(192,63,170) 0%, rgb(223,171,192) 100%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 2px 8px rgba(192,63,170,0.25)",
        }}
      >
        {task.ready ? "去完成" : "敬请期待"}
      </motion.button>
    </div>
  );
}

/* ============================================================
 *                    顶栏 3 icon 辅助组件
 *                    与 travel HeaderActions 保持一致
 * ============================================================ */
function LabHeaderIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-8 h-8">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="32px"
        className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        unoptimized
      />
    </div>
  );
}
