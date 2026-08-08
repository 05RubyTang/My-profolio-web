"use client";

/**
 * 「风格悖论」chatbot 场景的装饰糊光背景层
 *
 * 严格对齐 Figma node 1211:11939 / 1211:12423 里的 4 个 blur 椭圆：
 *   - 大粉紫色椭圆（顶部）        : rgba(219,201,255,1) blur=192
 *   - 淡蓝椭圆（中下）           : rgba(62,239,255,0.17) blur=108
 *   - 淡绿椭圆（左下）           : rgba(97,255,62,0.17) blur=108
 *   - 淡蓝椭圆（3 卡上方装饰点缀）: rgba(201,210,255,1) blur=225
 *
 * 使用绝对定位 + inset 覆盖整个 ChatShell，pointer-events-none 不影响交互
 */
export default function LabParadoxBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 顶部大粉紫色椭圆 */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "-6%",
          right: "-8%",
          width: "72%",
          height: "24%",
          background: "rgba(219,201,255,1)",
          filter: "blur(56px)",
          opacity: 0.85,
        }}
      />
      {/* 中下淡蓝椭圆 */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "48%",
          right: "-12%",
          width: "64%",
          height: "26%",
          background: "rgba(62,239,255,0.35)",
          filter: "blur(52px)",
        }}
      />
      {/* 左下淡绿椭圆 */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "60%",
          left: "-14%",
          width: "56%",
          height: "20%",
          background: "rgba(97,255,62,0.28)",
          filter: "blur(50px)",
        }}
      />
      {/* 主气泡下方点缀淡蓝椭圆 */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "38%",
          left: "16%",
          width: "40%",
          height: "16%",
          background: "rgba(201,210,255,0.9)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
