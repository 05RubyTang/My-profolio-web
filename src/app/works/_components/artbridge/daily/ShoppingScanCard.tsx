"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SHOPPING_AGENT_LONG_TEXT } from "../data/dailyOutfitScript";

/**
 * ShoppingScanCard —— 优选购物助手（Figma node 1211-5453 精确复刻）
 * ---------------------------------------------------------------
 * 视觉结构（自上而下）：
 *   ┌──────────────────────────────────┐
 *   │ 🛒 优选购物助手                     │  ← 卡头：金黄色购物车 icon + 标题
 *   │                                  │
 *   │ 正在根据 回头客多、销量高、真实评价好、 │  ← 描述文字（多行）
 *   │ 性价比高 为您寻找高品质的「绿色连帽卫衣」│
 *   │                                  │
 *   │ ┌──────────────────────────────┐ │
 *   │ │                              │ │
 *   │ │   ← 长图局部滚动窗口 ↓        │ │  ← 287x212 clip 窗口
 *   │ │                              │ │     内部长图 287x2318 从上往下滚
 *   │ │                              │ │
 *   │ └──────────────────────────────┘ │
 *   └──────────────────────────────────┘
 *
 * Figma 引用：
 *   - Frame 1211:5453  外框 308x300 · rounded-2xl · 白半透明底
 *   - Frame 1211:5465  窗口 287x212 · clipsContent: true
 *   - Rectangle 1211:5466 长图 287x2318 · imageRef 72c11d1b...
 *     → 已下载到 /picture/artbridge/daily/shopping-scan-long.png
 *
 * 动画：
 *   长图起始位置对齐窗口顶部（translateY: 0），激活后用 framer-motion
 *   从 0 匀速滚到 -(imgHeight - windowHeight)，展示图片全长的搜索过程。
 */

// 长图原始尺寸（Figma 里 rect 是 287x2318）
const IMG_WIDTH = 287;
const IMG_HEIGHT = 2318;
// 窗口尺寸
const WINDOW_WIDTH = 287;
const WINDOW_HEIGHT = 212;

export default function ShoppingScanCard({
  active,
  resetKey,
  /** 单次滚完所需秒数 · 越大越慢 */
  scrollDuration = 22,
}: {
  active: boolean;
  resetKey: unknown;
  scrollDuration?: number;
}) {
  // 长图在窗口里的高度（等比缩放到 WINDOW_WIDTH 宽度）
  const scaledImgHeight = (IMG_HEIGHT / IMG_WIDTH) * WINDOW_WIDTH;
  // 需要滚动的最大位移（负值：图往上走，暴露下方内容）
  const maxTranslate = -(scaledImgHeight - WINDOW_HEIGHT);

  // 触发动画（active + resetKey 变化）
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (active) setTick((n) => n + 1);
  }, [active, resetKey]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl bg-white/[0.78] backdrop-blur-md border border-white/70 p-2.5 overflow-hidden"
      style={{ boxShadow: "0 0 16px rgba(97,168,255,0.10)" }}
    >
      {/* -------- 卡头：购物车 icon + 优选购物助手 -------- */}
      <div className="flex items-center gap-1.5 px-0.5">
        <ShoppingCartIcon />
        <span className="text-[13px] font-semibold text-[#161A22] tracking-tight leading-none">
          优选购物助手
        </span>
      </div>

      {/* -------- 描述行 -------- */}
      <div className="mt-1.5 px-0.5">
        <div className="text-[10px] leading-[1.5] text-[#161A22]/85">
          正在根据{" "}
          <span className="text-[#B51A87] font-medium">
            回头客多、销量高、真实评价好、性价比高
          </span>{" "}
          为您寻找高品质的
          <span className="font-medium">「绿色连帽卫衣」</span>……
        </div>
      </div>

      {/* -------- 长图滚动窗口 -------- */}
      <div
        className="relative mt-2 rounded-xl overflow-hidden border border-white/60 mx-auto"
        style={{
          width: "100%",
          maxWidth: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F6F0FA 100%)",
        }}
      >
        {/* 长图容器：从 y=0 逐渐滚到 y=maxTranslate */}
        <motion.div
          key={tick}
          className="absolute left-0 top-0 w-full"
          initial={{ y: 0 }}
          animate={active ? { y: maxTranslate } : { y: 0 }}
          transition={{
            duration: scrollDuration,
            ease: "linear",
          }}
          style={{ height: scaledImgHeight }}
        >
          <Image
            src="/picture/artbridge/daily/shopping-scan-long.png"
            alt="小艺正在网络上检索优质商品"
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
            unoptimized
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* 上下微渐变遮罩：让画面像"卷轴"一样有柔和边缘（不影响长图内容） */}
        <div
          className="absolute inset-x-0 top-0 h-6 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-6 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* 右下角：滚动进度指示（一颗跳动的小点，提示是"正在检索") */}
        <div className="absolute right-2 bottom-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/80 border border-white/70">
          <span className="relative flex w-1.5 h-1.5">
            <span
              className="absolute inline-flex w-full h-full rounded-full bg-[#B51A87] opacity-60 animate-ping"
              style={{ animationDuration: "1.6s" }}
            />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#B51A87]" />
          </span>
          <span className="text-[8px] text-[#161A22]/75 leading-none">
            检索中
          </span>
        </div>
      </div>

      {/* 隐藏元素：兼容旧 export，避免 tree-shaking 引用告警 */}
      <span className="sr-only">{SHOPPING_AGENT_LONG_TEXT}</span>
    </motion.div>
  );
}

/**
 * Figma 卡头里的金黄色小购物车 icon（node 1211:5458 复刻）
 */
function ShoppingCartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16.55 14.35H7.36c-.46 0-.9-.16-1.25-.46-.35-.3-.58-.71-.65-1.16L4.49 6.26c-.08-.52-.41-.97-.89-1.19l-.78-.37c-.17-.08-.24-.28-.16-.45.08-.17.28-.24.45-.16l.78.37c.69.32 1.16.96 1.28 1.71l.97 6.46c.05.29.19.55.42.75.22.19.5.29.79.29h9.19c.19 0 .34.15.34.34s-.15.34-.34.34z"
        fill="#654115"
      />
      <path
        d="M7.75 12.76a.34.34 0 01-.35-.31c-.02-.19.12-.36.31-.38l7.28-.73c.43-.04.78-.37.85-.8l.51-3.38a.34.34 0 00-.34-.4H6.72c-.19 0-.34-.15-.34-.34s.15-.34.34-.34h9.03c.38 0 .74.16.98.45.25.29.36.67.3 1.05l-.51 3.38c-.11.74-.71 1.31-1.46 1.39l-7.28.73h-.03z"
        fill="#654115"
      />
      <path
        d="M8 10.83l6.12-.56c.24-.02.43-.2.46-.44l.21-1.53a.5.5 0 00-.5-.58H7.7c-.31 0-.55.27-.51.58l.25 2.09c.03.28.28.47.56.44z"
        fill="#FCCA25"
      />
      <path
        d="M14.59 9.54h-.05c-.19-.03-.32-.2-.29-.39l.12-.89a.15.15 0 00-.15-.17h-3.22a.34.34 0 010-.68h3.22c.24 0 .47.11.62.29.16.19.22.44.18.68l-.12.89a.34.34 0 01-.34.29zM7.99 16.5c-.66 0-1.19-.53-1.19-1.19 0-.19.15-.34.34-.34s.34.15.34.34c0 .28.23.51.51.51s.51-.23.51-.51c0-.19.15-.34.34-.34s.34.15.34.34c0 .66-.53 1.19-1.19 1.19zM14.34 16.5c-.66 0-1.19-.53-1.19-1.19 0-.19.15-.34.34-.34s.34.15.34.34c0 .28.23.51.51.51s.51-.23.51-.51c0-.19.15-.34.34-.34s.34.15.34.34c0 .66-.53 1.19-1.19 1.19z"
        fill="#654115"
      />
    </svg>
  );
}
