#!/usr/bin/env node
/**
 * 一次性下载 Figma 文件里指定 imageRef 的原图到 public/picture/artbridge/daily/
 *
 * 用法：
 *   node scripts/download-figma-images.mjs
 *
 * 环境变量：
 *   FIGMA_TOKEN  —— Figma Personal Access Token，从 .env.local 里读
 *
 * 原理：
 *   1. GET https://api.figma.com/v1/files/:file_key/images
 *      返回 { meta: { images: { imageRef: signedS3Url } } }
 *   2. 遍历需要的 imageRef，下载到本地
 */

import fs from "node:fs";
import path from "node:path";

// ------ 手动加载 .env.local（不引入 dotenv 依赖） ------
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.+)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
if (!FIGMA_TOKEN) {
  console.error("❌ 请在 .env.local 里设置 FIGMA_TOKEN=figd_...");
  process.exit(1);
}

// Figma file key：https://www.figma.com/design/mSChl72e9N1qUgRzHPQWuk/...
const FILE_KEY = "mSChl72e9N1qUgRzHPQWuk";

/**
 * 需要下载的 imageRef 列表，命名对齐每日穿搭法则设计稿：
 *   - outfit-safe-hero    「稳稳不出错」主插画（Q 版女孩正面 · 白毛毛外套版）
 *   - outfit-twist-hero   「有点小不同」主插画（Q 版女孩机车叠穿 · 黑外套版）
 *   - bag                 黑色手提包（两卡都用）
 *   - boots               棕色雪地靴（两卡都用）
 *
 *  imageRef 来自 Figma dev-mode 抓取的 node 1211-3820 / 1211-3828：
 *   - 2c47a97d02d665be133746b6957475fbec692ac9 → 「稳稳不出错」大图（Q 版女孩全身 + 包 + 短靴合成大图）
 *   - d7c75d1fb624e29a679d508e376db50912d66feb → 「有点小不同」主图（Q 版女孩叠穿主体）
 */
const TARGETS = [
  // 两张对比推荐搭配卡（1211-3820 / 1211-3828）
  {
    imageRef: "2c47a97d02d665be133746b6957475fbec692ac9",
    filename: "outfit-safe.png",
  },
  {
    imageRef: "d7c75d1fb624e29a679d508e376db50912d66feb",
    filename: "outfit-twist.png",
  },
  // 3 张明星单品卡（首页 1219-5592）
  {
    imageRef: "3af46d905c52904c248739671e64769d67010c85",
    filename: "star-a.png", // 清爽假日 · 无肩上衣
  },
  {
    imageRef: "3da73be3fd586cca2a18d8b2f31a4ec9a9488fcd",
    filename: "star-b.png", // 城市酷感 · 牛仔裤
  },
  {
    imageRef: "eab1d1a930503dc7d4595b6b796de609dfbaa29f",
    filename: "star-c.png",
    // ⚠ Figma 原素材是 500x500 的 3 件毛衣拼图（左上/右上/左下），单件展示会显得"多此一举"。
    // 下载完请手动裁「右上 V 领灰毛衣」一件（sharp 不支持同路径读写，需借助 buffer 中转）：
    //   node -e "const sharp=require('sharp');const p='public/picture/artbridge/daily/star-c.png';sharp(p).extract({left:250,top:0,width:250,height:250}).toBuffer().then(b=>require('fs').writeFileSync(p,b))"
  },
  // 优选购物助手 body 里的超长搜索过程 PNG (Figma node 1211-5466, 287x2318)
  {
    imageRef: "72c11d1b53bf538961ce2565d4d19ad6b0bc562b",
    filename: "shopping-scan-long.png",
  },
  // -------- 风格实验台 · 风格悖论 3 张实验方案卡（Figma node 1211-11939 / 1211-12423） --------
  {
    imageRef: "c656f7aa23f51e732cd26a0b002d55101dad6667",
    filename: "material-trick.png", // 材质骗局
    subDir: "lab",
  },
  {
    imageRef: "faa09bc3786a6e4116569f06e584180d14730ed6",
    filename: "structure-trick.png", // 结构把戏（首页 + 详情卡共用）
    subDir: "lab",
  },
  {
    imageRef: "da74c64fe97d7ab102f9ecf88a646f4b2b490741",
    filename: "visual-guide.png", // 视觉引导
    subDir: "lab",
  },
  // -------- 小艺看世界 · 视频通话咨询场景（Figma nodes 1211-5031/5079/5127/5173） --------
  // 通话背景（人像大图，用户拿粉色外套自拍视角）
  {
    imageRef: "93cfac4c9eddc31602a6ab4ee33c13ad8d840be7",
    filename: "call-bg.png",
    subDir: "world",
  },
  // 用户展示的粉色花苞外套（对话中"这件粉色外套怎么搭配"缩略图）
  {
    imageRef: "8e0a2ff3424f978afe7ee2aa0f8f98c39767d373",
    filename: "user-jacket.png",
    subDir: "world",
  },
  // AI 生成的 2 套搭配卡（外套穿搭 1 / 外套穿搭 2）
  {
    imageRef: "e239589ccd0f0de6c2f3778fc203e96682ed3e63",
    filename: "outfit-1.png",
    subDir: "world",
  },
  {
    imageRef: "ad6ab8a39a69703bb92823cc3ff0d93ad3d28e35",
    filename: "outfit-2.png",
    subDir: "world",
  },
  // -------- 4 Agent 卡片内部原生素材（Figma nodes 1211:10205/10261/10299/10343） --------
  // ===== 风格策划顾问 · 6 张灵感竖图（44x75） =====
  // 北海道 3 张
  { imageRef: "f357a8dec0d00628f7f822b73d930625ff019d04", filename: "style-hokkaido-1.png", subDir: "travel/agents" },
  { imageRef: "8fac9e14b004c6b4b5201810666e2769e409c100", filename: "style-hokkaido-2.png", subDir: "travel/agents" },
  { imageRef: "b1ca0d4b4362ec496adb6c3c5a2d0dae78e1be54", filename: "style-hokkaido-3.png", subDir: "travel/agents" },
  // 东京 3 张
  { imageRef: "7ed620f707e69e3b63ac0e142068f56cdfc12ed8", filename: "style-tokyo-1.png", subDir: "travel/agents" },
  { imageRef: "d6b6e9bfdb54d0a6f8f3f52ee0dda17a73ebdbe7", filename: "style-tokyo-2.png", subDir: "travel/agents" },
  { imageRef: "53544b630c9b731056b602df28067e64972b5f07", filename: "style-tokyo-3.png", subDir: "travel/agents" },

  // ===== 数字衣橱管家 · 每城 4 张单品图（38/43/54/38 宽 · 52 高） =====
  // 北海道 4 张（第 4 张与东京第 4 张同一 imageRef 7ed620f... 但独立存文件方便定位）
  { imageRef: "e5db91f9e189098e9f7728db5773c1db4c601e4f", filename: "wardrobe-hokkaido-1.png", subDir: "travel/agents" },
  { imageRef: "18665ec10da8d2fd03c6fb4d9aec37415e82786e", filename: "wardrobe-hokkaido-2.png", subDir: "travel/agents" },
  { imageRef: "afdd44e99bb6e05439528726d621bde050d175ea", filename: "wardrobe-hokkaido-3.png", subDir: "travel/agents" },
  { imageRef: "7ed620f707e69e3b63ac0e142068f56cdfc12ed8", filename: "wardrobe-hokkaido-4.png", subDir: "travel/agents" },
  // 东京 4 张
  { imageRef: "5f1bfecbd974f9e3590e4427613191ef4b9cb5ab", filename: "wardrobe-tokyo-1.png", subDir: "travel/agents" },
  { imageRef: "a7c73d1fb3f76286018a7ad75976502ba2f251c7", filename: "wardrobe-tokyo-2.png", subDir: "travel/agents" },
  { imageRef: "cc3fb13f75aaee801ff6980b7d54abc66ab1cdfe", filename: "wardrobe-tokyo-3.png", subDir: "travel/agents" },
  { imageRef: "7ed620f707e69e3b63ac0e142068f56cdfc12ed8", filename: "wardrobe-tokyo-4.png", subDir: "travel/agents" },

  // ===== 优选购物助手 · 每品类 3 张商品竖图（56x92） =====
  // 微跟防滑雪靴 3 张
  { imageRef: "a9c78f326caf361dd8163cf86ce29e71301f6f0f", filename: "shop-boots-1.png", subDir: "travel/agents" },
  { imageRef: "1d53e72dd64cd48df69797fee3cf7c67089fd0c2", filename: "shop-boots-2.png", subDir: "travel/agents" },
  { imageRef: "1e96dee8f463903026e4796d29632df753a84c71", filename: "shop-boots-3.png", subDir: "travel/agents" },
  // 高腰毛呢短裙 3 张
  { imageRef: "3f391f79927c8a52140fb209742474655030777d", filename: "shop-skirt-1.png", subDir: "travel/agents" },
  { imageRef: "0167164a8e4f4230704a47768b70d95b0012004d", filename: "shop-skirt-2.png", subDir: "travel/agents" },
  { imageRef: "bc3ad332553578ab0b4c6be0b6015303a103ab5e", filename: "shop-skirt-3.png", subDir: "travel/agents" },

  // -------- 小艺数字人智能衣橱 · 手机锁屏（Figma nodes 1252-3378 「今日推荐」/ 1358-4913 「学习模式」） --------
  // 通用背景（雪山湖泊城市远景，两张锁屏共用）
  { imageRef: "a112ad0263609cae8c228fc19bf845dcb778c822", filename: "lock-bg.png", subDir: "daily/lockscreen" },
  // 「今日推荐」3 张 120x169 玻璃卡里的单品图
  { imageRef: "bd478933ad289db6ccdd5ea6bacbceaf13bf93d1", filename: "lock-outfit-1.png", subDir: "daily/lockscreen" }, // 小突破
  { imageRef: "ac72821dda00ad7c940f8582f0df6ed241bb8b76", filename: "lock-outfit-2.png", subDir: "daily/lockscreen" }, // 微创新
  { imageRef: "c0b652776e76ba03bb50aa4edb98fc02fdc704cb", filename: "lock-outfit-3.png", subDir: "daily/lockscreen" }, // 稳稳不出错
  // 「今日推荐」顶栏 3 个小 icon（天气 / 通勤路况 / 心情）
  { imageRef: "86d3238b42683f20789c77aaed2ba54514f3bfa2", filename: "lock-icon-weather.png", subDir: "daily/lockscreen" }, // 太阳 33x33
  { imageRef: "e197791283f9e02f7d2a8b88f1d294e73fdc7dda", filename: "lock-icon-commute.png", subDir: "daily/lockscreen" }, // 通勤 23x23
  { imageRef: "304f34060508808e4b049fb7e08a575e78c65357", filename: "lock-icon-mood.png",    subDir: "daily/lockscreen" }, // 心情 30x30
  // 「学习模式」全身 Q 版数字人插画（281x392）
  { imageRef: "1d5875a89d47f7c11bb6106d2dacd358152722df", filename: "lock-study-char.png", subDir: "daily/lockscreen" },
  // 「打招呼」卡片 icon（小人 23x25.52，Figma 1252-3380）
  { imageRef: "66afb708f3cc62ac882066356934ae59f6508655", filename: "lock-hello-icon.png", subDir: "daily/lockscreen" },
  // 「打招呼」全身 Q 版数字人（甜酷学姐 · 粉外套 · 346x344，Figma 1252-3380）
  { imageRef: "201275f8fc7fb8ec25ecee8ff509689e2d0efa5c", filename: "lock-hello-char.png", subDir: "daily/lockscreen" },
];

const BASE_DIR = path.resolve(
  process.cwd(),
  "public",
  "picture",
  "artbridge"
);
// 默认落到 daily/ 目录，若 target 指定 subDir 则改用它
const defaultSubDir = "daily";
fs.mkdirSync(path.join(BASE_DIR, defaultSubDir), { recursive: true });

async function main() {
  console.log(`▶ 请求 Figma file images 列表：${FILE_KEY}`);
  const listRes = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/images`,
    { headers: { "X-Figma-Token": FIGMA_TOKEN } }
  );
  if (!listRes.ok) {
    console.error(`❌ Figma API 失败 ${listRes.status}: ${await listRes.text()}`);
    process.exit(1);
  }
  const listJson = await listRes.json();
  const images = listJson?.meta?.images ?? {};
  console.log(`✔ 拿到 ${Object.keys(images).length} 个 imageRef 的 signed URL`);

  const skipExisting = process.env.SKIP_EXISTING === "1";
  for (const t of TARGETS) {
    const url = images[t.imageRef];
    if (!url) {
      console.warn(`⚠ imageRef ${t.imageRef} 不在文件里，跳过`);
      continue;
    }
    const subDir = t.subDir || defaultSubDir;
    const outDir = path.join(BASE_DIR, subDir);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, t.filename);
    if (skipExisting && fs.existsSync(outPath)) {
      console.log(`  = 已存在，跳过 ${subDir}/${t.filename}`);
      continue;
    }
    console.log(`  ↓ 下载 ${subDir}/${t.filename}`);
    const imgRes = await fetch(url);
    if (!imgRes.ok) {
      console.error(`   × 失败 ${imgRes.status}`);
      continue;
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync(outPath, buf);
    console.log(`   ✔ ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`\n✅ 完成，共 ${TARGETS.length} 张图`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
