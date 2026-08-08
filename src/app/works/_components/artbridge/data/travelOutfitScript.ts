/**
 * 旅游穿搭 Chatbot 演示所用的静态数据 & 时间线
 * ------------------------------------------------------
 * 详细时间线见下方 TIMELINE 注释块
 */

export type Phase = "idle" | "planning" | "outfit" | "purchase" | "closing";

/**
 * 兜底自动重播时长（ms）
 * - 正常路径：用户在 purchase_actions 阶段点击 CTA → AI 回复气泡出现 → 5s 后回首页
 * - 兜底路径：用户全程不点击，也在 TOTAL_DURATION 之后强制回首页避免死在最后一帧
 */
export const TOTAL_DURATION = 90000;

export type TimelineStep = {
  at: number;
  phase: Phase;
  step:
    | "userIntro"          // 底部输入框开始打字机
    | "userSend"           // 用户点发送：清空输入框 · 顶部瞬间出现完整用户气泡
    | "checklist_understood"
    | "checklist_planning"
    | "agents_show"
    | "checklist_output"
    | "agents_collapse"    // 4 卡分析完，整体向上淡出收起（让位给每日搭配）
    | "daily_grid"
    | "ai_ask_purchase"
    | "product_cards"
    | "purchase_actions"
    | "user_reply_typing"  // 用户回复：底部输入框开始打字机
    | "user_reply_send"    // 用户回复：发送出去
    | "reset";
};

/**
 * 时间线（V5 · desc 严格逐行打字，wardrobe 时间线相应放宽 1.5s）：
 *
 *   0.3s  : userIntro           → 底部输入框开始打字机（~36 字，约 2s）
 *   2.6s  : userSend            → 输入框清空 · 顶部瞬间出现完整用户气泡
 *   3.4s  : checklist_understood
 *   4.4s  : checklist_planning
 *   5.0s  : agents_show         → 4 卡 2×2 宫格同时出现
 *                                  · 各卡内部打字机严格逐行，最长约 13.5s（wardrobe）
 *  18.0s  : checklist_output    → planning 状态点亮为 ✓
 *  18.8s  : agents_collapse     → 4 张 Agent 卡向上淡出收起
 *  19.9s  : daily_grid          → 每日搭配 6 卡网格出现
 *  23.9s  : ai_ask_purchase     → AI 白气泡询问是否下单
 *  24.6s  : product_cards
 *  25.4s  : purchase_actions
 *  ——— 后续等待用户在 PurchaseActions 上手动点击 ———
 *  用户点击 CTA → 用户气泡 → 700ms 后 AI 分支回复 → 5s 停留 → 自动重播
 */
export const TIMELINE: TimelineStep[] = [
  { at: 300,   phase: "idle",     step: "userIntro" },
  { at: 2600,  phase: "idle",     step: "userSend" },
  { at: 3400,  phase: "planning", step: "checklist_understood" },
  { at: 4400,  phase: "planning", step: "checklist_planning" },
  { at: 5000,  phase: "planning", step: "agents_show" },
  { at: 18000, phase: "outfit",   step: "checklist_output" },
  { at: 18800, phase: "outfit",   step: "agents_collapse" },
  { at: 19900, phase: "outfit",   step: "daily_grid" },
  { at: 23900, phase: "purchase", step: "ai_ask_purchase" },
  { at: 24600, phase: "purchase", step: "product_cards" },
  { at: 25400, phase: "purchase", step: "purchase_actions" },
];

/** ------------------------ 用户 & AI 对话文本 ------------------------ */

export const USER_INTRO_TEXT =
  "小艺小艺，我 12.19 到 12.24 要去北海道和东京旅游一周，帮我看看穿什么吧！";

/** 用户点「一键下单」/ 商品卡的「小艺下单」→ 触发这句用户气泡 */
export const USER_REPLY_ORDER_TEXT = "帮我一键下单，谢谢～";
/** 用户点「我有相似款，暂不买」→ 触发这句用户气泡 */
export const USER_REPLY_SIMILAR_TEXT = "我有相似款，暂不买";

export const AI_PURCHASE_ASK = "以下是本次搭配需要新入手的单品，是否要一键下单？";

/** AI 对「一键下单」分支的回复 */
export const AI_REPLY_ORDER =
  "好滴，已为您在小红书商城下单，收货信息使用默认地址～ 稍后可在「订单」中查看物流。";
/** AI 对「我有相似款，暂不买」分支的回复 */
export const AI_REPLY_SIMILAR =
  "好滴，旅游穿搭方案已保存至「穿搭手帐」模块，您可前往进行局部单品替换～";

/** ------------------------ 需求分析 checklist ------------------------ */

export type ChecklistItem = {
  id: "understood" | "planning" | "output";
  text: string;
};

export const CHECKLIST: ChecklistItem[] = [
  { id: "understood", text: "已完成用户需求理解和任务拆分" },
  { id: "planning",   text: "正在为您规划北海道和东京六日游穿搭" },
  { id: "output",     text: "已完成 6 日游穿搭规划" },
];

/** ------------------------ 4 个 Sub-Agent 元信息 ------------------------ */

export type AgentKey = "weather" | "style" | "wardrobe" | "shopping";

export type AgentMeta = {
  key: AgentKey;
  emoji: string;
  title: string;
  subtitle: string;
};

export const AGENTS: AgentMeta[] = [
  { key: "weather",  emoji: "🌦️", title: "智慧天气助手", subtitle: "已查询到 12.19-12.24 气温" },
  { key: "style",    emoji: "💡", title: "风格策划顾问", subtitle: "已完成出游风格规划" },
  { key: "wardrobe", emoji: "👚", title: "数字衣橱管家", subtitle: "正在调取衣橱数据…" },
  { key: "shopping", emoji: "🛒", title: "优选购物助手", subtitle: "正在为您搜索灵感新品" },
];

/** ------------------------ 每日穿搭 6 张卡片 ------------------------ */

export type DailyOutfitCard = {
  date: string;
  city: string;
  scene: string;
  temp: string;
  src: string;
};

export const DAILY_OUTFITS: DailyOutfitCard[] = [
  { date: "12/19", city: "札幌", scene: "玩雪 · 白色童话",      temp: "-8 ~ -2°C", src: "/picture/artbridge/travel/daily-1219-hokkaido.png" },
  { date: "12/20", city: "小樽", scene: "运河散步 · 复古",       temp: "-6 ~ 0°C",  src: "/picture/artbridge/travel/daily-1220-hokkaido.png" },
  { date: "12/21", city: "函馆", scene: "夜景山顶 · 保暖优先",   temp: "-5 ~ 1°C",  src: "/picture/artbridge/travel/daily-1221-hokkaido.png" },
  { date: "12/22", city: "东京", scene: "涩谷逛街 · 港风",       temp: "5 ~ 12°C",  src: "/picture/artbridge/travel/daily-1222-tokyo.png" },
  { date: "12/23", city: "东京", scene: "浅草寺 · 学院风",       temp: "6 ~ 13°C",  src: "/picture/artbridge/travel/daily-1223-tokyo.png" },
  { date: "12/24", city: "东京", scene: "圣诞夜 · 红色主题",     temp: "4 ~ 11°C",  src: "/picture/artbridge/travel/daily-1224-tokyo.png" },
];

/** ------------------------ 商品购买卡 ------------------------ */

export type PurchaseProduct = {
  key: "boots" | "skirt";
  name: string;
  price: number;
  origPrice: number;
  brand: string;
  src: string;
};

export const PURCHASE_PRODUCTS: PurchaseProduct[] = [
  { key: "boots", name: "毛绒防滑雪地靴",  price: 328, origPrice: 499, brand: "SNOW·HOUSE", src: "/picture/artbridge/travel/product-boots.png" },
  { key: "skirt", name: "羊毛格纹百褶半裙", price: 259, origPrice: 399, brand: "OLLIN",      src: "/picture/artbridge/travel/product-skirt.png" },
];
