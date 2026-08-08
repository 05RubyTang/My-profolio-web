/**
 * 「艺起搭 / ArtBridge · 小艺看世界」数据脚本
 *
 * 场景灵感严格对齐 Figma 稿件的「视频通话 · AI 造型咨询」样式：
 *   - node 1211:5079 → 用户提问出现在中部（历史文案）
 *   - node 1211:5031 → 用户展示衣服 · AI 回复 · 数字衣柜录入完成 chip
 *   - node 1211:5127 → AI 生成 2 套搭配大卡
 *   - node 1211:5173 → 用户选择完毕（"左边那套不错"）
 *
 * 业务链路（在 Figma 视频通话样式外壳里，实装"拍照 → AI 识别 → 录入衣橱 → 推荐"完整流程）：
 *   1 视频接通           → CallHeader 显示"小艺"+通话时长
 *   2 拍照 / AI 扫描      → CameraCaptureCard（扫描线动画）
 *   3 AI 识别出粉色外套   → 出现 user-jacket 缩略图 + AI 语音气泡
 *   4 数字衣柜录入完成    → 出现绿色勾选 chip
 *   5 AI 生成 2 套搭配    → OutfitPairCards
 *   6 用户挑选 + 结束     → +积分回首页
 *
 * 图片资源经 Figma REST API 下载到：public/picture/artbridge/world/
 */

// ==================== 顶部通话信息 ====================

export const WORLD_CONTACT_NAME = "小艺";
/** 通话时长起始值（用于底部计时 · 进入场景后开始跳动） */
export const WORLD_CALL_START_SEC = 0;
/** 底部三个通话控件文案 */
export const WORLD_CALL_ACTIONS = ["静音", "摄像头", "挂断"] as const;

// ==================== 通话背景（Figma imageRef 已下载） ====================

/** 全屏视频背景（用户拿粉色外套 · 半透明黑覆盖以保证字幕对比度） */
export const WORLD_BACKGROUND_SRC = "/picture/artbridge/world/call-bg.png";
export const WORLD_BACKGROUND_OVERLAY = "rgba(0,0,0,0.31)";

// ==================== AI 扫描（拍照识别）阶段 ====================

/** 扫描进度条 chip 上的文案（模拟"AI 视觉检测中"） */
export const WORLD_SCAN_CHIP = "AI 正在识别衣物...";
/** 扫描完成后过场文案（用户气泡） */
export const WORLD_USER_ASK = "小艺，这件粉色外套我新买的，怎么搭配？";
/** 用户展示的衣服图（AI 识别到的那一件 · 花苞外套原图） */
export const WORLD_USER_JACKET_SRC = "/picture/artbridge/world/user-jacket.png";
/** 识别输出的单品标签（chip · 展示在 AI 识别卡上） */
export const WORLD_ITEM_TAGS = ["花苞外套", "浅粉色", "羊毛针织", "秋季"] as const;

// ==================== 数字衣柜录入 ====================

/** 录入衣橱完成后的 chip（Figma 图下方的深灰胶囊 chip） */
export const WORLD_WARDROBE_CHIP = "数字衣柜录入完成";

// ==================== AI 生成搭配 ====================

/** AI 首句回复（严格对齐 Figma） */
export const WORLD_AI_REPLY_1 =
  "哇！很少女的粉色！你衣柜里还有一件白色毛衣和格子衬衫，很适合搭配穿去上课～";
/** AI 承接一句（Figma 场景 3 的第二气泡） */
export const WORLD_AI_REPLY_2 = "我为你生成了 2 套搭配，你看看～";

/** 2 张搭配大卡 · 图片路径均对齐 Figma imageRef */
export type OutfitPair = {
  id: "left" | "right";
  imageSrc: string;
  /** 卡片下方角标（此处按视频通话样式隐藏，仅数据保留） */
  label: string;
};

export const WORLD_OUTFIT_PAIRS: OutfitPair[] = [
  {
    id: "left",
    imageSrc: "/picture/artbridge/world/outfit-2.png",
    label: "青春款",
  },
  {
    id: "right",
    imageSrc: "/picture/artbridge/world/outfit-1.png",
    label: "温柔款",
  },
];

// ==================== 用户反馈 ====================

/** 用户挑选完毕后的评价气泡（严格对齐 Figma 1211:5173） */
export const WORLD_USER_FEEDBACK =
  "左边那套不错，很青春。这两套都是我已经有的衣服呀，真不错！";

/** 完成后 toast · 展示积分 */
export const WORLD_COMPLETE_POINTS = 10;
export const WORLD_COMPLETE_TIP = "看世界任务完成 +10 穿搭力";
