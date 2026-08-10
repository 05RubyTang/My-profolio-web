"use client";

import { useEffect } from "react";
import { PRELOAD_BATCHES } from "@/lib/preloadImages";

/**
 * 全站图片后台预加载
 * ---
 * - 用 `new window.Image()` 触发浏览器缓存，不插入 DOM，不影响布局
 * - 分批 + setTimeout 延迟，避免与首屏 LCP 抢带宽
 * - 只跑一次；useEffect 卸载时清理未触发的定时器
 *
 * 触发时机：
 *   T+0.8s → Experience 邮票 + ClickSparkle emoji
 *   T+2.0s → Works 封面 & 票根
 *   T+4.0s → Works 深层 gallery + Idea Salon 落地页大图
 */
export default function ImagePreloader() {
  useEffect(() => {
    // 已在 window 挂过缓存标记就跳过（防止 dev 热更 & 路由切换重复触发）
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.__RUBY_IMG_PRELOADED__) return;
    w.__RUBY_IMG_PRELOADED__ = true;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const loadBatch = (urls: string[]) => {
      urls.forEach((url) => {
        // 只创建 Image 对象；浏览器接管请求 & 缓存
        const img = new window.Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = url;
      });
    };

    PRELOAD_BATCHES.forEach(({ delayMs, urls }) => {
      const t = setTimeout(() => {
        // 优先在浏览器 idle 时段跑，退化为直接执行
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ric: any = (window as any).requestIdleCallback;
        if (typeof ric === "function") {
          ric(() => loadBatch(urls), { timeout: 2000 });
        } else {
          loadBatch(urls);
        }
      }, delayMs);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return null;
}
