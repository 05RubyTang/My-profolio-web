"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PhoneFrame from "../../PhoneFrame";

/**
 * LockScreenPhone —— 「每日穿搭法则 × 小艺数字人智能衣橱」右侧联动样机
 *
 * 忠实还原 Figma 设计稿：
 *   - variant="today" → Figma 1252-3378「今日推荐」：顶栏两玻璃胶囊 + 3 张玻璃穿搭卡
 *   - variant="hello" → Figma 1252-3380「甜酷学姐 · 打招呼」：陪伴玻璃大卡 + 挥手粉外套全身数字人
 *   - variant="study" → Figma 1358-4913「学习模式」：陪伴玻璃大卡 + 全身 Q 版数字人
 *
 * 重要约束：
 *   背景图 lock-bg.png 本身已包含状态栏、时间「14:31」、日期「09/17 星期三 七月廿六」、
 *   4 个系统 iOS 组件（步数/天气/计算器/秒表）与底部锁屏指示条 —— 一律不自绘补充。
 *   本组件只叠加 Figma 稿里定义的「额外」元素。
 */

const LOCK_BG = "/picture/artbridge/daily/lockscreen/lock-bg.png";

const TODAY_CARDS = [
  {
    key: "safe",
    tag: "小突破",
    desc: "试试静奢通勤风怎么样？",
    src: "/picture/artbridge/daily/lockscreen/lock-outfit-1.png",
  },
  {
    key: "twist",
    tag: "微创新",
    desc: "用你的风衣塑造职场干练感。",
    src: "/picture/artbridge/daily/lockscreen/lock-outfit-2.png",
  },
  {
    key: "steady",
    tag: "稳稳不出错",
    desc: "用你的羊毛开衫打造职场亲和力。",
    src: "/picture/artbridge/daily/lockscreen/lock-outfit-3.png",
  },
];

export default function LockScreenPhone({
  variant,
  width = 300,
}: {
  variant: "today" | "hello" | "study";
  width?: number;
}) {
  return (
    <PhoneFrame width={width} showDynamicIsland>
      {/* 锁屏背景（已含时间、日期、系统组件、底部指示条） */}
      <div className="absolute inset-0">
        <Image
          src={LOCK_BG}
          alt="lock-bg"
          fill
          sizes={`${width}px`}
          className="object-cover"
          unoptimized
          priority
        />
      </div>

      <AnimatePresence mode="wait">
        {variant === "today" && (
          <motion.div
            key="today"
            className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[36px] px-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 顶栏组合：「今日推荐」大胶囊 + 天气/通勤/心情三 icon 胶囊 */}
            <div className="w-full flex items-center gap-1.5 mb-2">
              <div
                className="px-2.5 h-[34px] flex items-center rounded-[10px] border border-white/70 text-white/85 text-[13px] leading-none font-normal shrink-0"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow:
                    "inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.12)",
                  fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                }}
              >
                今日推荐
              </div>
              <div
                className="flex-1 h-[34px] flex items-center justify-around px-2 rounded-[10px] border border-white/70"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow:
                    "inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.12)",
                }}
              >
                <div className="flex items-center gap-0.5">
                  <div className="relative w-[20px] h-[20px] shrink-0">
                    <Image
                      src="/picture/artbridge/daily/lockscreen/lock-icon-weather.png"
                      alt="weather"
                      fill
                      sizes="20px"
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span
                    className="text-white/85 text-[12px] leading-none"
                    style={{
                      fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                    }}
                  >
                    21°C
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <div className="relative w-[15px] h-[15px] shrink-0">
                    <Image
                      src="/picture/artbridge/daily/lockscreen/lock-icon-commute.png"
                      alt="commute"
                      fill
                      sizes="15px"
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span
                    className="text-white text-[12px] leading-none"
                    style={{
                      fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                    }}
                  >
                    通勤
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <div className="relative w-[18px] h-[18px] shrink-0">
                    <Image
                      src="/picture/artbridge/daily/lockscreen/lock-icon-mood.png"
                      alt="mood"
                      fill
                      sizes="18px"
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span
                    className="text-white text-[12px] leading-none"
                    style={{
                      fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                    }}
                  >
                    良好
                  </span>
                </div>
              </div>
            </div>

            {/* 3 张玻璃穿搭卡横排 */}
            <div className="w-full grid grid-cols-3 gap-1.5">
              {TODAY_CARDS.map((c, i) => (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative aspect-[120/169] rounded-[16px] border border-white/70 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow:
                      "inset 0 0 0 0.5px rgba(255,255,255,0.55), 0 4px 10px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* 顶部标签 */}
                  <div
                    className="absolute top-1 left-0 right-0 text-center text-white/90 text-[10px] leading-none font-medium tracking-wide"
                    style={{
                      fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                    }}
                  >
                    {c.tag}
                  </div>
                  {/* 描述文案 */}
                  <div
                    className="absolute top-[16px] left-1 right-1 text-white/85 text-[7px] leading-[9px] text-center"
                    style={{
                      fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {c.desc}
                  </div>
                  {/* 单品图（Q 版数字人穿搭 · 从卡片底部长出来） */}
                  <div className="absolute left-0 right-0 bottom-0 top-[38px]">
                    <Image
                      src={c.src}
                      alt={c.tag}
                      fill
                      sizes="120px"
                      className="object-contain object-bottom"
                      unoptimized
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {variant === "hello" && (
          <motion.div
            key="hello"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 全身挥手数字人（粉外套 · 甜酷学姐 346x344） · z-20 盖在玻璃卡之上
                right 用负值把容器整体推出手机右缘，让人物往右靠 */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                right: "-16%",
                bottom: 28,
                width: "86%",
                aspectRatio: "346 / 344",
              }}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Image
                src="/picture/artbridge/daily/lockscreen/lock-hello-char.png"
                alt="小艺 · 甜酷学姐"
                fill
                sizes="300px"
                className="object-contain object-bottom drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                unoptimized
              />
            </motion.div>

            {/* 陪伴玻璃大卡（361x167 · z-10 · 位于数字人之下） */}
            <motion.div
              className="absolute left-3 right-3 bottom-[48px] z-10 rounded-[20px] border border-white/60 px-3.5 py-2.5"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                boxShadow:
                  "inset 0 0 0 0.5px rgba(255,255,255,0.7), inset 0 15px 30px rgba(255,255,255,0.2), 0 4px 12px rgba(158,158,158,0.28)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="relative w-[16px] h-[18px] shrink-0">
                  <Image
                    src="/picture/artbridge/daily/lockscreen/lock-hello-icon.png"
                    alt="hello"
                    fill
                    sizes="16px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div
                  className="text-white text-[16px] font-bold leading-none"
                  style={{
                    fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  甜酷学姐
                </div>
              </div>
              <div
                className="text-white/95 text-[12px] leading-none mt-1.5"
                style={{
                  fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                  fontWeight: 300,
                }}
              >
                青春日常
              </div>
              <div className="h-px w-[50%] bg-white/40 my-2" />
              <div
                className="text-white/85 text-[9px] leading-[13px] max-w-[62%]"
                style={{
                  fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                  fontWeight: 300,
                }}
              >
                粉外套柔和亮眼衬气色，衬衫 + 黑背心的叠穿显足层次感，配上白鞋利落又减龄，休闲又元气。
              </div>
            </motion.div>
          </motion.div>
        )}

        {variant === "study" && (
          <motion.div
            key="study"
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 全身 Q 版数字人（占右下大半屏，贴到锁屏指示条上方） · z-20 盖在玻璃卡之上
                right 负值把容器推出手机右缘，让看书学姐往右移约 30px */}
            <motion.div
              className="absolute pointer-events-none z-20"
              style={{
                right: "-10%",
                bottom: 28,
                width: "68%",
                aspectRatio: "281 / 392",
              }}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Image
                src="/picture/artbridge/daily/lockscreen/lock-study-char.png"
                alt="小艺 · 学习陪伴"
                fill
                sizes="240px"
                className="object-contain object-bottom drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                unoptimized
              />
            </motion.div>

            {/* 陪伴玻璃卡（占左下角 · z-10 · 位于数字人之下） */}
            <motion.div
              className="absolute left-3 right-3 bottom-[48px] z-10 rounded-[20px] border border-white/60 px-3.5 py-2.5"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                boxShadow:
                  "inset 0 0 0 0.5px rgba(255,255,255,0.7), inset 0 15px 30px rgba(255,255,255,0.2), 0 4px 12px rgba(158,158,158,0.28)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="text-white text-[16px] font-bold leading-none"
                style={{
                  fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                已学习45min
              </div>
              <div
                className="text-white/95 text-[12px] leading-none mt-1.5 flex items-center gap-1.5"
                style={{
                  fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                  fontWeight: 300,
                }}
              >
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#7BE6C8]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                学习模式中
              </div>
              <div className="h-px w-[50%] bg-white/40 my-2" />
              <div
                className="text-white/85 text-[9px] leading-[13px] max-w-[60%]"
                style={{
                  fontFamily: "Alibaba PuHuiTi 2.0, sans-serif",
                  fontWeight: 300,
                }}
              >
                书桌前的每一秒专注，都在为想要的未来铺路 ✨ 慢慢来，我陪着你把知识点都啃完～
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}
