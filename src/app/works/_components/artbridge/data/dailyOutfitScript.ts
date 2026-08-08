/**
 * 每日穿搭法则 Chatbot 演示所用的静态数据 & 时间线
 * ------------------------------------------------------
 *  4 步链路：
 *    Step 1 · 首页          - 早上好 + 天气欢迎语 + 3 张斜堆叠明星单品卡（可点击）
 *    Step 2 · 聊天页        - 用户「选中风格 X」气泡 → AI 系统推理 2 段 →
 *                            两张对比推荐卡（稳稳不出错 / 有点小不同）
 *    Step 3 · 用户追问替换  - 用户「第 3 套挺好的，不过我没有绿色卫衣」→
 *                            AI「没关系，可以替换」→「替代方案已生成」→
 *                            「正在为您寻找优质好衣」→ 优选购物助手 Agent 卡（复用 AgentCard）
 *    Step 4 · 结果推送      - 优选购物助手向上收起 → AI 白气泡「小艺已经为您
 *                            找到了 3 款高品质的『绿色连帽卫衣』」→ 3 张结果卡
 *                            （每张含红渐变「小艺下单」CTA + 右下「换一换」）
 */

export type DailyPhase =
  | "home"
  | "chatting"
  | "recommending"
  | "asking"
  | "shopping"
  | "results"
  | "closing";

export type DailyTimelineStep = {
  at: number;
  phase: DailyPhase;
  step:
    | "user_pick"
    | "ai_reason_1"
    | "ai_reason_2"
    | "plans_show"
    | "user_replace_typing"
    | "user_replace_send"
    | "ai_replace_reply"
    | "ai_replace_done"
    | "ai_search_hint"
    | "shopping_agent"
    | "shopping_agent_collapse"
    | "ai_results_intro"
    | "results_cards"
    | "reset";
};

/**
 * 时间线（V1 · 参考 travelOutfitScript）
 */
export const TOTAL_DURATION = 42000;

export const TIMELINE: DailyTimelineStep[] = [
  { at: 100,   phase: "chatting",     step: "user_pick" },
  { at: 800,   phase: "chatting",     step: "ai_reason_1" },
  { at: 2300,  phase: "chatting",     step: "ai_reason_2" },
  { at: 3400,  phase: "recommending", step: "plans_show" },
  { at: 8000,  phase: "asking",       step: "user_replace_typing" },
  { at: 11800, phase: "asking",       step: "user_replace_send" },
  { at: 12600, phase: "asking",       step: "ai_replace_reply" },
  { at: 15000, phase: "shopping",     step: "ai_replace_done" },
  { at: 16000, phase: "shopping",     step: "ai_search_hint" },
  { at: 17000, phase: "shopping",     step: "shopping_agent" },
  { at: 28000, phase: "results",      step: "shopping_agent_collapse" },
  { at: 29000, phase: "results",      step: "ai_results_intro" },
  { at: 29800, phase: "results",      step: "results_cards" },
  { at: 40000, phase: "home",         step: "reset" },
];

/** ------------------------ 首页数据 ------------------------ */

export const GREETING_HEADLINE = "早上好，";
export const GREETING_WEATHER =
  "今天天气晴转多云 ☀️☁️，体感温度 18-25℃，小艺已为你准备好了今日穿搭～";

export type FeatureQuickCard = {
  key: "lab" | "travel" | "diary";
  title: string;
  subtitle: string;
  bg: string;
  titleColor: string;
  subtitleColor: string;
};

/** Figma 首页底部的 3 张彩色渐变功能方块 */
export const HOME_FEATURE_CARDS: FeatureQuickCard[] = [
  {
    key: "lab",
    title: "风格实验台",
    subtitle: "探索你的多样可能",
    bg: "linear-gradient(152deg, #FFD2EE 6%, #FFFFFF 68%)",
    titleColor: "#B51A87",
    subtitleColor: "#8C1C6B",
  },
  {
    key: "travel",
    title: "旅游穿搭规划",
    subtitle: "打造更好穿的旅行",
    bg: "linear-gradient(152deg, #F2DBFF 6%, #FFFFFF 68%)",
    titleColor: "#7716AF",
    subtitleColor: "#4B0E7D",
  },
  {
    key: "diary",
    title: "穿搭手帐",
    subtitle: "能看见的风格成长",
    bg: "linear-gradient(152deg, #DBEBFF 6%, #FFFFFF 68%)",
    titleColor: "#0B6397",
    subtitleColor: "#054E78",
  },
];

/** ------------------------ 3 张明星单品卡（首页斜堆叠） ------------------------ */

export type StarItemCard = {
  key: "A" | "B" | "C";
  code: string;
  style: string;
  date: string;
  year: string;
  bg: string;
  src: string;
  styleColor: string;
};

export const STAR_ITEMS: StarItemCard[] = [
  {
    key: "A",
    code: "A1053",
    style: "清爽假日",
    date: "11/17",
    year: "2025",
    bg: "linear-gradient(224deg, #EBD9FC 0%, #FAEFF9 48%, #F5CEDD 100%)",
    src: "/picture/artbridge/daily/star-a.png",
    styleColor: "#9B0E44",
  },
  {
    key: "B",
    code: "B1002",
    style: "城市酷感",
    date: "11/17",
    year: "2025",
    bg: "linear-gradient(224deg, #D6E5FF 0%, #F0F5FF 48%, #C8D6F5 100%)",
    src: "/picture/artbridge/daily/star-b.png",
    styleColor: "#1F3E9B",
  },
  {
    key: "C",
    code: "A1043",
    style: "韩系通勤",
    date: "11/17",
    year: "2025",
    bg: "linear-gradient(224deg, #E4F5E0 0%, #F5FBEF 48%, #C7E7C8 100%)",
    src: "/picture/artbridge/daily/star-c.png",
    styleColor: "#276A2A",
  },
];

/** 用户默认点击的卡（用于自动 demo · Figma 上示例的是 "城市酷感风"） */
export const DEFAULT_PICKED_KEY: StarItemCard["key"] = "B";

/** ------------------------ AI 系统推理气泡 ------------------------ */

export const AI_REASON_1 = "已完成用户衣橱检索、天气分析、用户体征识别";
export const AI_REASON_2 = "正在为您推荐一衣多穿思路";
export const AI_REPLACE_DONE = "替代方案已生成";
export const AI_SEARCH_HINT = "正在为您寻找优质好衣";

/** ------------------------ 两张对比推荐搭配卡 ------------------------ */

export type OutfitPlanCard = {
  key: "safe" | "twist";
  title: string;
  description: string;
  /** Figma 主插画（Q 版女孩 + 包 + 靴子合成整图） */
  heroImage: string;
  /** 兼容旧代码（未使用时可忽略） */
  images: [string, string, string];
  bg: string;
};

export const OUTFIT_PLANS: OutfitPlanCard[] = [
  {
    key: "safe",
    title: "稳稳不出错",
    description:
      "适合中午午休和同事一起下楼散步，浅色系在中午的自然光下拍照很出片！",
    /** Figma 上是「一张 Q 版女孩全身 + 包 + 短靴」的整体插画（同一张 hero 图） */
    heroImage: "/picture/artbridge/daily/outfit-safe.png",
    /** 保留 images 数组以兼容旧接口（等值填 heroImage） */
    images: [
      "/picture/artbridge/daily/outfit-safe.png",
      "/picture/artbridge/daily/outfit-safe.png",
      "/picture/artbridge/daily/outfit-safe.png",
    ],
    bg: "linear-gradient(152deg, rgba(255,210,238,0.85) 6%, rgba(255,255,255,0.9) 68%)",
  },
  {
    key: "twist",
    title: "有点小不同",
    description:
      "酷感的休闲叠穿，机车款自带松弛的「潮感」，比软质更有风格记忆点！",
    heroImage: "/picture/artbridge/daily/outfit-twist.png",
    images: [
      "/picture/artbridge/daily/outfit-twist.png",
      "/picture/artbridge/daily/outfit-twist.png",
      "/picture/artbridge/daily/outfit-twist.png",
    ],
    bg: "linear-gradient(152deg, rgba(242,219,255,0.85) 6%, rgba(255,255,255,0.9) 68%)",
  },
];

/** ------------------------ 用户追问「没有绿色卫衣」的对话 ------------------------ */

export const USER_REPLACE_TEXT = "第 3 套挺好的，不过我没有绿色卫衣";
export const AI_REPLACE_REPLY =
  "没关系，绿色 T 恤、白色卫衣都可以替换，您有哪一款衣服也可以告诉我～";

/** ------------------------ 用户主动选择 · 分支文案 ------------------------ */

/** 用户点了「稳稳不出错」safe 卡，AI 稳态收尾回复 */
export const AI_PLAN_SAFE_CONFIRM =
  "好眼光～这套「稳稳不出错」已为您保存到今日穿搭，明天早上再见！";

/** 用户点了「有点小不同」twist 卡，AI 承接台词，走后续购物助手流程 */
export const AI_PLAN_TWIST_CONFIRM =
  "机车叠穿确实有记忆点～ 稍等，我先看看您衣橱里的对应单品～";

/** 用户在推荐卡阶段主动从输入框发送自由文本时，AI 使用的通用回复（引入购物助手） */
export const AI_FREEFORM_REPLY =
  "收到，正在根据您的补充为您调整搭配，稍等～";

/** ------------------------ 优选购物助手 AgentCard 元信息 ------------------------ */

export const SHOPPING_AGENT_TITLE = "优选购物助手";
export const SHOPPING_AGENT_SUBTITLE = "正在为您筛选高品质好衣";
export const SHOPPING_AGENT_LONG_TEXT =
  "正在根据 回头客多、销量高、真实评价好、性价比高 为您寻找高品质的「绿色连帽卫衣」……";

/** ------------------------ 3 张结果卡 ------------------------ */

export const AI_RESULTS_INTRO =
  "小艺为您寻找到 3 款高品质的「绿色连帽卫衣」，您可以点击选择喜欢的购买～";

export type ResultProduct = {
  key: string;
  title: string;
  src: string;
  /** 售价（不含 ¥ 符号，UI 里统一加） */
  price: string;
  /** 月销量文案（灰色小字，如 "月销 3.2w+"） */
  monthlySales: string;
  /** 30 天好评率文案（灰色小字，如 "好评 98%"） */
  positiveRate: string;
};

export const RESULT_PRODUCTS: ResultProduct[] = [
  {
    key: "miniso",
    title: "名创优品 (MINISO) 连帽卫衣（30 天好评率、销量最高）",
    src: "/picture/artbridge/travel/shopping-skirt-1.png",
    price: "89",
    monthlySales: "月销 3.2w+",
    positiveRate: "好评 96%",
  },
  {
    key: "shelley",
    title: "Shelley Jones 连帽卫衣（30 天好评率、性价比最优）",
    src: "/picture/artbridge/travel/shopping-skirt-2.png",
    price: "129",
    monthlySales: "月销 8600+",
    positiveRate: "好评 98%",
  },
  {
    key: "cozy",
    title: "COZY LAB 连帽卫衣（30 天好评率、回头客最多）",
    src: "/picture/artbridge/travel/shopping-skirt-3.png",
    price: "179",
    monthlySales: "月销 4200+",
    positiveRate: "好评 99%",
  },
];

/** 用户点某张结果卡的「小艺下单」→ 触发用户气泡 + AI 回复 */
export const buildUserOrderText = (title: string) =>
  `帮我下单「${title.split("（")[0].trim()}」`;
export const AI_ORDER_ACK = "小艺为您代下单完成";
export const AI_ORDER_DETAIL =
  "后台已经下单成功啦，您可前往「京东 app」查看订单详情。物流签收后，该商品将自动收录至「穿搭手帐」模块～";
