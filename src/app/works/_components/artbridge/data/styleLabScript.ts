/**
 * 「艺起搭 / ArtBridge · 风格实验台」数据脚本
 *
 * 严格对齐 Figma 稿件：
 *   - 首页任务列表 → node 1211:11576
 *   - 风格悖论 chatbot 场景 A（3 张实验方案卡） → node 1211:11939
 *   - 风格悖论 chatbot 场景 B（用户选完 · 详情大卡）→ node 1211:12423
 *
 * 图片资源经 Figma REST API 下载到：public/picture/artbridge/lab/
 */

// ==================== 用户画像（首页英雄卡） ====================

export type LabProfile = {
  /** 用户显示名（Figma：华为用户_小李） */
  nickname: string;
  /** 当前徽章文案（Figma：复古小白 Lv2） */
  currentBadge: string;
  /** 待解锁徽章文案（Figma：复古学徒 Lv3 待解锁） */
  nextBadge: string;
  /** 当前穿搭力值 */
  power: number;
  /** 升级到下一等级所需的总穿搭力 */
  powerTarget: number;
  /** 精调机会点提示（Figma：配饰是您的精调机会点！） */
  tip: string;
  /** 用户头像（Q 版女孩 · Figma node 1676:8566） */
  avatarSrc: string;
};

export const LAB_PROFILE: LabProfile = {
  nickname: "华为用户_小李",
  currentBadge: "复古小白 Lv2",
  nextBadge: "复古学徒 Lv3 待解锁",
  power: 80,
  powerTarget: 150,
  tip: "配饰是您的精调机会点！",
  avatarSrc: "/picture/artbridge/lab/user-avatar.png",
};

// ==================== 风格数据统计（首页第二张卡） ====================

/** 色彩分布单元格 —— 3 行 × N 列 */
export type ColorCell = {
  /** css 颜色 */
  color: string;
  /** 是否为一行的最左单元格（用于左圆角） */
  isFirst?: boolean;
  /** 是否为一行的最右单元格（用于右圆角） */
  isLast?: boolean;
};

/**
 * 三行色彩分布（对齐 Figma 1211:11576 中 Group 1000007981 的 3 行块）
 *   第 1 行：中性色 → 米色/驼色系
 *   第 2 行：中性色 → 卡其/橄榄色系
 *   第 3 行：彩色  → 粉紫渐变色系
 */
export const COLOR_ROWS: ColorCell[][] = [
  [
    { color: "rgb(215,214,205)", isFirst: true },
    { color: "rgb(224,209,187)" },
    { color: "rgb(224,209,187)" },
    { color: "rgb(224,209,187)" },
    { color: "rgb(224,209,187)" },
    { color: "rgb(224,209,187)" },
    { color: "rgb(224,209,187)" },
    { color: "rgb(19,25,36)", isLast: true },
  ],
  [
    { color: "rgb(178,173,136)", isFirst: true },
    { color: "rgb(178,173,136)" },
    { color: "rgb(178,173,136)" },
    { color: "rgb(178,173,136)" },
    { color: "rgb(65,49,48)" },
    { color: "rgb(65,49,48)" },
    { color: "rgb(65,49,48)" },
    { color: "rgb(65,49,48)", isLast: true },
  ],
  [
    { color: "rgb(210,173,255)", isFirst: true },
    { color: "rgb(255,33,166)" },
    { color: "rgb(247,128,199)" },
    { color: "rgb(226,72,216)" },
    { color: "rgb(246,188,222)" },
    { color: "rgb(18,101,255)", isLast: true },
  ],
];

/** 品类图标（对齐 Figma：上衣 · 外套 · 鞋子 / 配饰 · 下装） */
export type Category = {
  key: "top" | "coat" | "shoes" | "accessory" | "bottom";
  label: string;
  /** 图标色（Figma 里都是粉紫系渐变，这里各取一个代表色） */
  color: string;
};

export const CATEGORIES: Category[] = [
  { key: "top", label: "上衣", color: "rgb(255,105,195)" },
  { key: "accessory", label: "配饰", color: "rgb(183,91,225)" },
  { key: "coat", label: "外套", color: "rgb(248,141,186)" },
  { key: "bottom", label: "下装", color: "rgb(240,165,247)" },
  { key: "shoes", label: "鞋子", color: "rgb(227,110,204)" },
];

export const STATS_DATE_RANGE = "8.01-8.30";
export const STATS_SUMMARY = "本月已尝试3次新色彩，很棒！";
export const NEUTRAL_LABEL = "中性色70％";
export const COLORFUL_LABEL = "彩色30％";

// ==================== 穿搭任务（首页第三张卡） ====================

/** 任务对应的 chatbot 场景 —— 目前只有「风格悖论」实装 */
export type LabTaskRoute = "paradox" | "roulette" | "singleItem";

export type LabTask = {
  id: string;
  title: string;
  points: number;
  route: LabTaskRoute;
  /** 是否已实装（未实装的点击提示敬请期待） */
  ready: boolean;
};

export const LAB_TASKS: LabTask[] = [
  {
    id: "paradox",
    title: "今日完成一次风格悖论游戏",
    points: 10,
    route: "paradox",
    ready: true,
  },
  {
    id: "roulette",
    title: "完成一次风格轮盘挑战",
    points: 10,
    route: "roulette",
    ready: false,
  },
  {
    id: "singleItem",
    title: "完成任意单品的搭配试验",
    points: 10,
    route: "singleItem",
    ready: false,
  },
];

// ==================== 风格悖论 · chatbot 编排 ====================

/** AI 系统状态条 chip */
export const PARADOX_SYS_TOPIC_READY = "已生成今日研究课题";
export const PARADOX_SYS_PLAN_READY = "已为您完善方案";

/** 主课题气泡（Figma 场景 A 的 AI 主气泡） */
export const PARADOX_TOPIC = {
  title: "如何穿得紧绷，却看起来非常松弛？",
  subtitle: "“在这里，\n我们挑战关于穿搭的固有认知。”",
};

/** AI 假设阐述气泡（Figma 场景 A 中间的长文本） */
export const PARADOX_INTRO =
  "我们今天来研究一个风格悖论，如何穿得紧绷，却看起来非常松弛？\n" +
  "我的假设是： 通过「柔软紧绷」的面料与「慵懒随意」的线条相结合，可以欺骗眼睛，达成此效果。\n" +
  "我已根据此假设，构想了三套实验方案。";

/** 3 张实验方案卡 —— 图片路径均对齐 Figma imageRef */
export type ExperimentPlan = {
  id: "material" | "structure" | "visual";
  title: string;
  desc: string;
  imageSrc: string;
};

export const EXPERIMENT_PLANS: ExperimentPlan[] = [
  {
    id: "material",
    title: "材质骗局",
    desc: "利用柔软贴身与硬挺宽松的材质对比，在视觉上制造矛盾感",
    imageSrc: "/picture/artbridge/lab/material-trick.png",
  },
  {
    id: "structure",
    title: "结构把戏",
    desc: "通过非常规的穿着方式，打破单品的固有结构，营造不经意的随意感",
    imageSrc: "/picture/artbridge/lab/structure-trick.png",
  },
  {
    id: "visual",
    title: "视觉引导",
    desc: "用超长线条包裹住紧身内搭，引导视觉感知到的是“流动的线条”而非“紧绷的躯体”",
    imageSrc: "/picture/artbridge/lab/visual-guide.png",
  },
];

/** AI 询问引导语（3 卡下方） */
export const PARADOX_ASK = "你想试试那一套？";

/** 「换一换」CTA 文案（3 卡右上角） */
export const PARADOX_SWAP = "换一换";

// ==================== 场景 B · 用户选完的详情大卡 ====================

export type ExperimentDetail = {
  /** 对应 ExperimentPlan.id */
  id: ExperimentPlan["id"];
  /** 卡片标题（复用 plan.title） */
  title: string;
  /** 卡片一句话概述 */
  summary: string;
  /** 「实验器材」清单，每一项一行 */
  equipmentTitle: string;
  equipmentItems: string[];
  /** 详情卡右侧的插图（复用 plan.imageSrc） */
  imageSrc: string;
};

export const EXPERIMENT_DETAILS: Record<ExperimentPlan["id"], ExperimentDetail> = {
  structure: {
    id: "structure",
    title: "结构把戏",
    summary: "通过非常规的穿着方式，打破单品的固有结构，营造不经意的随意感。",
    equipmentTitle: "让我们来检查一下「实验器材」：",
    equipmentItems: [
      "一件紧身内搭（您衣橱里那件黑色修身T恤就非常完美）。",
      "一条宽松的背带裤。",
      "一双休闲鞋。",
    ],
    imageSrc: "/picture/artbridge/lab/structure-trick.png",
  },
  // 另两条也预置，避免用户选它们时 fallback 到空
  material: {
    id: "material",
    title: "材质骗局",
    summary: "利用柔软贴身与硬挺宽松的材质对比，在视觉上制造矛盾感。",
    equipmentTitle: "让我们来检查一下「实验器材」：",
    equipmentItems: [
      "一件柔软贴身的针织内搭。",
      "一件硬挺廓形的西装外套。",
      "一条微阔版直筒裤。",
    ],
    imageSrc: "/picture/artbridge/lab/material-trick.png",
  },
  visual: {
    id: "visual",
    title: "视觉引导",
    summary: "用超长线条包裹住紧身内搭，引导视觉感知到的是“流动的线条”而非“紧绷的躯体”。",
    equipmentTitle: "让我们来检查一下「实验器材」：",
    equipmentItems: [
      "一件贴身的高领打底。",
      "一件及踝长风衣或长开衫。",
      "一双简洁的乐福鞋。",
    ],
    imageSrc: "/picture/artbridge/lab/visual-guide.png",
  },
};

/** 详情大卡下方的 AI 收尾提示 */
export const PARADOX_OUTRO = "您可以前往衣橱里找到相应的单品尝试～";

/** 详情大卡右下角的「换个思路」CTA */
export const PARADOX_RETRY = "换个思路";

// ==================== chatbot 顶栏 & composer ====================

export const PARADOX_TITLE = "风格悖论";
export const PARADOX_COMPOSER_PLACEHOLDER = "随时随地问问小艺";
