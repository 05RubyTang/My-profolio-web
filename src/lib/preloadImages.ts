import { cdnUrl } from "@/lib/cdn";

/**
 * 全站图片预加载清单
 * ---
 * 目的：用户打开首页后，浏览器 idle 时段在后台悄悄下载所有大图，
 *      等用户滚到 Experience 邮票 / 打开 Works 项目详情时直接命中缓存，
 *      避免"点开才开始 loading"的白屏体验。
 *
 * 分批策略：按重要性 & 触发时机分成 3 批
 *   1. HIGH   —— 首屏后立即可能滚到（Experience 邮票 13 张）
 *   2. MEDIUM —— Works 封面 + 一屏内可能点开的项目图
 *   3. LOW    —— Works 深层 gallery + Idea Salon 落地页大图
 */

// —— 1. Experience 章节 · 拍立得墙 13 张（用户滚一屏就到）——
const EXPERIENCE_PIN_WALL = [
  "/picture/pin-wall/合工大-毕业1.png",
  "/picture/pin-wall/合工大-毕业2.png",
  "/picture/pin-wall/合工大-毕业3.png",
  "/picture/pin-wall/合工大-科三.png",
  "/picture/pin-wall/合工大-摩托.png",
  "/picture/pin-wall/合工大-钢琴社.png",
  "/picture/pin-wall/新疆-旅游.png",
  "/picture/pin-wall/抖音电商-last day.png",
  "/picture/pin-wall/抖音电商-团建.png",
  "/picture/pin-wall/小红书-团建.png",
  "/picture/pin-wall/小红书-实习.png",
  "/picture/pin-wall/同济-毕业.png",
  "/picture/pin-wall/同济-tt设计学院.png",
].map(cdnUrl);

// —— 2. Works 章节 · 首屏可见的封面 & 票根 ——
const WORKS_COVERS = [
  // Tongji 项目封面
  "/picture/id-project/tongji-works/艺起搭-封面-v2.png",
  "/picture/id-project/tongji-works/idea-salon-封面.png",
  "/picture/id-project/tongji-works/hci-paper-skill-封面.png",
  // books 封面
  "/picture/id-project/In Tongji Works.png",
  "/picture/id-project/My Industrial Design.png",
  // 5 个 project 主图 + 5 张邮票票根
  "/picture/id-project/project1.png",
  "/picture/id-project/project2.png",
  "/picture/id-project/project3.png",
  "/picture/id-project/project4.png",
  "/picture/id-project/project5.png",
  "/picture/id-project/piaogen1.png",
  "/picture/id-project/piaogen2.png",
  "/picture/id-project/piaogen3.png",
  "/picture/id-project/piaogen4.png",
  "/picture/id-project/piaogen5.png",
].map(cdnUrl);

// —— 3. Works 深层 · My Industrial Design 5 个项目的 gallery ——
const WORKS_ID_GALLERY = [
  // project 1 · FitBox AI
  "/picture/id-project/projct1/project1-设计背景.png",
  "/picture/id-project/projct1/project2-用户调研.png",
  "/picture/id-project/projct1/project3-设计定义.png",
  "/picture/id-project/projct1/project4-设计产出.png",
  "/picture/id-project/projct1/project5-设计验证.png",
  // project 2 · 心守成长金
  "/picture/id-project/project2/project2-设计背景.png",
  "/picture/id-project/project2/project2-用户调研.png",
  "/picture/id-project/project2/project2-设计定义.png",
  "/picture/id-project/project2/project2-服务设计.png",
  "/picture/id-project/project2/project2-设计产出.png",
  // project 3 · AKSO
  "/picture/id-project/project3/project3-设计背景.png",
  "/picture/id-project/project3/project3-设计定义.png",
  "/picture/id-project/project3/project3-设计推导.png",
  "/picture/id-project/project3/project3-渲染图.png",
  // project 4 · DENTGUARD
  "/picture/id-project/project4/project4-设计背景.png",
  "/picture/id-project/project4/project4-用户研究.png",
  "/picture/id-project/project4/project4-技术研究.png",
  "/picture/id-project/project4/project4-渲染图.png",
  // project 5 · OTHERS
  "/picture/id-project/project5/project5.png",
].map(cdnUrl);

// —— 4. Works · 艺起搭模块 18 张 gallery ——
// 路径规则：/picture/id-project/tongji-works/艺起搭/N.jpg
// N ∈ 1..19，跳过 13（原代码所示）
const WORKS_YIQIDA_GALLERY = Array.from({ length: 19 }, (_, i) => i + 1)
  .filter((n) => n !== 13)
  .map((n) => cdnUrl(`/picture/id-project/tongji-works/艺起搭/${n}.jpg`));

// —— 5. Idea Salon 落地页大图 ——
const IDEA_SALON_HEROES = [
  "/picture/id-project/tongji-works/idea-salon/scene-insight.webp",
  "/picture/id-project/tongji-works/idea-salon/innovations.webp",
  "/picture/id-project/tongji-works/idea-salon/mentor-layer.webp",
  "/picture/id-project/tongji-works/idea-salon/workshop-flow.webp",
  "/picture/id-project/tongji-works/idea-salon/why-it-matters.webp",
  "/picture/id-project/tongji-works/idea-salon-圆桌.png",
].map(cdnUrl);

// —— 6. ClickSparkle 5 个 emoji ——
const CLICK_SPARKLE_EMOJIS = [
  "/picture/emoji/point.png",
  "/picture/emoji/point1.png",
  "/picture/emoji/point2.png",
  "/picture/emoji/point3.png",
  "/picture/emoji/point4.png",
].map(cdnUrl);

/**
 * 按优先级分批
 * - HIGH：用户滚一屏就能看到，延迟 800ms 触发
 * - MEDIUM：可能点开的封面 / 常用项目图，延迟 2000ms
 * - LOW：深层 gallery / 落地页大图，延迟 4000ms + requestIdleCallback
 */
export const PRELOAD_BATCHES: { delayMs: number; urls: string[] }[] = [
  {
    delayMs: 800,
    urls: [...EXPERIENCE_PIN_WALL, ...CLICK_SPARKLE_EMOJIS],
  },
  {
    delayMs: 2000,
    urls: WORKS_COVERS,
  },
  {
    delayMs: 4000,
    urls: [...WORKS_ID_GALLERY, ...WORKS_YIQIDA_GALLERY, ...IDEA_SALON_HEROES],
  },
];

/** 扁平化后的所有 URL，方便调试 / 统计 */
export const ALL_PRELOAD_IMAGES: string[] = PRELOAD_BATCHES.flatMap(
  (b) => b.urls
);
