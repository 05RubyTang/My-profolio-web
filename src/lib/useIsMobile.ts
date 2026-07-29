"use client";

import { useState, useEffect } from "react";

/**
 * 检测是否为移动端设备
 * 判断依据：屏幕宽度 <= 767px 或触屏无 hover 能力
 *
 * ⚠️ 首次渲染服务端始终返回 false，客户端 mount 后立即根据 matchMedia 更新，
 * 使用时请把移动端专属 UI 放在客户端组件内（"use client"）。
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const touch = window.matchMedia("(hover: none)").matches;
      setIsMobile(narrow || touch);
    };
    check();
    const mq1 = window.matchMedia("(max-width: 767px)");
    const mq2 = window.matchMedia("(hover: none)");
    mq1.addEventListener("change", check);
    mq2.addEventListener("change", check);
    return () => {
      mq1.removeEventListener("change", check);
      mq2.removeEventListener("change", check);
    };
  }, []);

  return isMobile;
}
