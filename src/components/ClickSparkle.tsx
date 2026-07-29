"use client";

import { useEffect, useRef, useCallback } from "react";
import { cdnUrl } from "@/lib/cdn";

// 5 张随机小表情
const SPARKLE_ICONS = [
  cdnUrl("/emoji-face1.png"),
  cdnUrl("/emoji-face2.png"),
  cdnUrl("/emoji-face3.png"),
  cdnUrl("/emoji-face4.png"),
  cdnUrl("/emoji-face5.png"),
];

// 图标大小（px）
const ICON_SIZE = 32;
// 动画持续时间（ms）
const DURATION = 600;

/**
 * 全局点击闪烁特效：
 * 点击页面空白处时，在鼠标位置附近弹出一个随机小表情图标，
 * 带有缩放 + 上浮 + 淡出的动画效果，像闪星星一样一闪而过。
 */
export default function ClickSparkle() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 预加载图片
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 预加载所有图标
    SPARKLE_ICONS.forEach((src) => {
      const img = new Image();
      img.src = src;
      imagesRef.current.push(img);
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    // 如果点击的是按钮、链接、输入框等交互元素，不触发
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select") ||
      target.closest("[role='button']") ||
      target.closest("[data-no-sparkle]")
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // 随机选一个表情
    const idx = Math.floor(Math.random() * SPARKLE_ICONS.length);
    const src = SPARKLE_ICONS[idx];

    // 随机偏移，让图标出现在鼠标附近而不是正中心
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20 - 10; // 稍微偏上

    // 创建图标元素
    const el = document.createElement("img");
    el.src = src;
    el.alt = "";
    el.draggable = false;
    el.style.cssText = `
      position: fixed;
      left: ${e.clientX - ICON_SIZE / 2 + offsetX}px;
      top: ${e.clientY - ICON_SIZE / 2 + offsetY}px;
      width: ${ICON_SIZE}px;
      height: ${ICON_SIZE}px;
      pointer-events: none;
      z-index: 99999;
      animation: clickSparkleAnim ${DURATION}ms ease-out forwards;
      will-change: transform, opacity;
    `;

    container.appendChild(el);

    // 动画结束后移除
    setTimeout(() => {
      el.remove();
    }, DURATION + 50);
  }, []);

  useEffect(() => {
    // 移动端（触摸设备）不启用点击特效，避免干扰滚动/点击体验
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(max-width: 767px)").matches);
    if (isTouchDevice) return;

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  return <div ref={containerRef} className="click-sparkle-container" />;
}
