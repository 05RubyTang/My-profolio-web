"use client";

import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  type RefObject,
  type HTMLAttributes,
  type CSSProperties,
} from "react";

/* ============================================================
   基于 react-bits VariableProximity（MIT）改写
   —— 鼠标靠近时文字变粗/变亮，远离时恢复
   ============================================================ */

function useAnimationFrame(callback: () => void) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      cbRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

function useMousePositionRef(containerRef: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const update = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      }
    };
    const onMouse = (e: MouseEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      update(t.clientX, t.clientY);
    };
    const onLeave = () => {
      positionRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch);
    // 当鼠标离开容器时重置
    containerRef?.current?.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [containerRef]);

  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  /** 要显示的文字 */
  label: string;
  /** 鼠标远离时的 font-weight */
  fromFontWeight?: number;
  /** 鼠标靠近时的 font-weight */
  toFontWeight?: number;
  /** 鼠标远离时的 opacity */
  fromOpacity?: number;
  /** 鼠标靠近时的 opacity */
  toOpacity?: number;
  /** 鼠标远离时的颜色 */
  fromColor?: string;
  /** 鼠标靠近时的颜色 */
  toColor?: string;
  /** 容器 ref，用于计算鼠标相对位置 */
  containerRef: RefObject<HTMLElement | null>;
  /** 影响半径（px） */
  radius?: number;
  /** 衰减方式 */
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  function VariableProximity(props, ref) {
    const {
      label,
      fromFontWeight = 300,
      toFontWeight = 900,
      fromOpacity = 0.4,
      toOpacity = 1,
      fromColor,
      toColor,
      containerRef,
      radius = 80,
      falloff = "gaussian",
      className = "",
      style,
      ...restProps
    } = props;

    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mouseRef = useMousePositionRef(containerRef);
    const lastPos = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

    const dist = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calcFalloff = useCallback(
      (distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
          case "exponential":
            return norm ** 2;
          case "gaussian":
            return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
          case "linear":
          default:
            return norm;
        }
      },
      [radius, falloff]
    );

    // 解析颜色为 RGB
    const parseColor = useCallback((color: string): [number, number, number] | null => {
      if (!color) return null;
      // hex
      const hex = color.replace("#", "");
      if (hex.length === 6) {
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ];
      }
      return null;
    }, []);

    const fromRGB = fromColor ? parseColor(fromColor) : null;
    const toRGB = toColor ? parseColor(toColor) : null;

    useAnimationFrame(() => {
      if (!containerRef?.current) return;
      const { x, y } = mouseRef.current;
      if (lastPos.current.x === x && lastPos.current.y === y) return;
      lastPos.current = { x, y };

      const containerRect = containerRef.current.getBoundingClientRect();

      charRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - containerRect.left;
        const cy = rect.top + rect.height / 2 - containerRect.top;
        const d = dist(x, y, cx, cy);

        if (d >= radius) {
          el.style.fontWeight = String(fromFontWeight);
          el.style.opacity = String(fromOpacity);
          if (fromColor) el.style.color = fromColor;
          return;
        }

        const f = calcFalloff(d);
        const weight = Math.round(fromFontWeight + (toFontWeight - fromFontWeight) * f);
        const opacity = fromOpacity + (toOpacity - fromOpacity) * f;
        el.style.fontWeight = String(weight);
        el.style.opacity = String(opacity);

        if (fromRGB && toRGB) {
          const r = Math.round(fromRGB[0] + (toRGB[0] - fromRGB[0]) * f);
          const g = Math.round(fromRGB[1] + (toRGB[1] - fromRGB[1]) * f);
          const b = Math.round(fromRGB[2] + (toRGB[2] - fromRGB[2]) * f);
          el.style.color = `rgb(${r},${g},${b})`;
        }
      });
    });

    // 按字符拆分（支持中文）
    let charIdx = 0;

    // 判断是否为 CJK（中日韩）字符 —— CJK 字符之间天然可换行，不需要 nowrap
    const isCJK = (ch: string) => /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef\u3400-\u4dbf]/.test(ch);

    // 按空格分词，保留空格；然后对每个词再按 CJK/非CJK 边界拆分
    const words = label.split(/(\s+)/);

    return (
      <span
        ref={ref}
        className={className}
        style={{ ...style, display: "inline" }}
        aria-label={label}
        {...restProps}
      >
        {words.map((word, wi) => {
          if (/^\s+$/.test(word)) {
            // 空格
            charIdx += word.length;
            return (
              <span key={`space-${wi}`} style={{ display: "inline" }}>
                {word}
              </span>
            );
          }

          // 将词按 CJK/非CJK 边界拆分成片段
          const segments: { text: string; cjk: boolean }[] = [];
          const wordChars = Array.from(word);
          for (const ch of wordChars) {
            const c = isCJK(ch);
            if (c) {
              // CJK 字符每个都是独立片段（允许在任意位置换行）
              segments.push({ text: ch, cjk: true });
            } else {
              // 连续非 CJK 字符合并为一个片段（不允许中间换行）
              const last = segments[segments.length - 1];
              if (last && !last.cjk) {
                last.text += ch;
              } else {
                segments.push({ text: ch, cjk: false });
              }
            }
          }

          return (
            <span key={wi} style={{ display: "inline" }}>
              {segments.map((seg, si) => {
                if (seg.cjk) {
                  // CJK 单字符 —— inline，允许自然换行
                  const idx = charIdx++;
                  return (
                    <span
                      key={`${wi}-${si}`}
                      ref={(el) => {
                        charRefs.current[idx] = el;
                      }}
                      style={{
                        display: "inline",
                        fontWeight: fromFontWeight,
                        opacity: fromOpacity,
                        color: fromColor,
                        transition: "font-weight 0.05s, opacity 0.05s, color 0.05s",
                      }}
                      aria-hidden="true"
                    >
                      {seg.text}
                    </span>
                  );
                }
                // 非 CJK 片段（英文/数字/符号）—— inline-block + nowrap 防止单词中间断开
                const segChars = Array.from(seg.text);
                return (
                  <span key={`${wi}-${si}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {segChars.map((ch) => {
                      const idx = charIdx++;
                      return (
                        <span
                          key={idx}
                          ref={(el) => {
                            charRefs.current[idx] = el;
                          }}
                          style={{
                            display: "inline-block",
                            fontWeight: fromFontWeight,
                            opacity: fromOpacity,
                            color: fromColor,
                            transition: "font-weight 0.05s, opacity 0.05s, color 0.05s",
                          }}
                          aria-hidden="true"
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    );
  }
);

export default VariableProximity;
