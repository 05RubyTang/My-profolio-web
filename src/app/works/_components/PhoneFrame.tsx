"use client";

import { ReactNode, CSSProperties } from "react";

/**
 * iPhone 15 Pro 风格的手机骨架
 *
 * 用于把 App 截图/内容包装成有真实感的手机 mockup。
 * 特点：
 * - 黑色圆角边框（3px 边宽，模拟金属边框）
 * - 顶部灵动岛（Dynamic Island）
 * - 内嵌屏幕（内容 slot 支持传 img/video/自定义 UI）
 * - 阴影 + 微高光模拟真实光泽
 */
export default function PhoneFrame({
  children,
  width = 280,
  className = "",
  style,
  showDynamicIsland = true,
  rotate = 0,
}: {
  children: ReactNode;
  /** 手机外框宽度（含边框），单位 px；默认 280 */
  width?: number;
  className?: string;
  style?: CSSProperties;
  showDynamicIsland?: boolean;
  /** 旋转角度，单位 deg */
  rotate?: number;
}) {
  // iPhone 15 Pro 宽高比约为 1179 × 2556 ≈ 0.461
  const aspectRatio = 1179 / 2556;
  const height = width / aspectRatio;
  // 边框、屏幕圆角按比例缩放，避免小尺寸下比例失真
  const borderWidth = Math.max(3, width * 0.014);
  const outerRadius = width * 0.14;
  const innerRadius = outerRadius - borderWidth;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {/* 外壳：金属边框（深黑色 + 微高光渐变） */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: `${outerRadius}px`,
          background:
            "linear-gradient(135deg, #2b2b2f 0%, #0d0d10 45%, #1a1a1e 80%, #2f2f34 100%)",
          padding: `${borderWidth}px`,
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.55), 0 12px 24px -8px rgba(0,0,0,0.4), inset 0 0 0 0.5px rgba(255,255,255,0.15)",
        }}
      >
        {/* 内屏容器：内嵌黑边 + 屏幕内容 */}
        <div
          className="relative w-full h-full overflow-hidden bg-black"
          style={{ borderRadius: `${innerRadius}px` }}
        >
          {/* 屏幕内容 */}
          <div className="absolute inset-0 overflow-hidden">
            {children}
          </div>

          {/* 灵动岛 */}
          {showDynamicIsland && (
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
              style={{
                top: `${width * 0.035}px`,
                width: `${width * 0.34}px`,
                height: `${width * 0.09}px`,
                zIndex: 20,
              }}
            />
          )}

          {/* 屏幕高光层（左上淡淡的白色反光） */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: `${innerRadius}px`,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%)",
              mixBlendMode: "screen",
              zIndex: 25,
            }}
          />
        </div>
      </div>

      {/* 侧边按钮：静音键 + 音量键（左侧） */}
      <div
        className="absolute -left-[3px] bg-neutral-800"
        style={{
          top: `${height * 0.14}px`,
          width: `${borderWidth}px`,
          height: `${height * 0.03}px`,
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        className="absolute -left-[3px] bg-neutral-800"
        style={{
          top: `${height * 0.22}px`,
          width: `${borderWidth}px`,
          height: `${height * 0.055}px`,
          borderRadius: "2px 0 0 2px",
        }}
      />
      <div
        className="absolute -left-[3px] bg-neutral-800"
        style={{
          top: `${height * 0.29}px`,
          width: `${borderWidth}px`,
          height: `${height * 0.055}px`,
          borderRadius: "2px 0 0 2px",
        }}
      />

      {/* 侧边按钮：电源键（右侧） */}
      <div
        className="absolute -right-[3px] bg-neutral-800"
        style={{
          top: `${height * 0.24}px`,
          width: `${borderWidth}px`,
          height: `${height * 0.085}px`,
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}
