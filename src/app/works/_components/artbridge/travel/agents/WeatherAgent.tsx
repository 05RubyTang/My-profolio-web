"use client";

import { motion } from "framer-motion";
import TypingText from "../TypingText";
import AppearAfter from "../AppearAfter";

type WeatherGridItem = {
  date: string;
  emoji: string;
  temp: string;
  wind: string;
};

const HOKKAIDO: WeatherGridItem[] = [
  { date: "12.19", emoji: "☀️",  temp: "-11℃~-6℃", wind: "北风 2-3 级" },
  { date: "12.20", emoji: "❄️",  temp: "-9℃~-5℃",  wind: "东北风 2 级" },
  { date: "12.21", emoji: "☁️",  temp: "-9℃~-4℃",  wind: "西南风 3 级" },
];

const TOKYO: WeatherGridItem[] = [
  { date: "12.22", emoji: "☀️",  temp: "5℃~11℃",   wind: "北风 2-3 级" },
  { date: "12.23", emoji: "☀️",  temp: "5℃~9℃",    wind: "东北风 1 级" },
  { date: "12.24", emoji: "🌧️", temp: "4℃~9℃",    wind: "北风 2 级" },
];

/**
 * 智慧天气助手 · 内部分析过程
 *
 * 打字机顺序：
 *   0ms   :「北海道札幌 (12.19-12.21)」标题
 *   400ms:「整体特征：极寒，已积雪…」
 *   1500ms: 北海道 3 个天气格出现（fade-in）
 *   2200ms:「东京 (12.22-12.24)」标题
 *   2600ms:「整体特征：温和寒冷…」
 *   3700ms: 东京 3 个天气格出现
 */
export default function WeatherAgent({
  active,
  resetKey,
}: {
  active: boolean;
  resetKey: unknown;
}) {
  return (
    <div className="space-y-1.5">
      {/* 北海道块 */}
      <div className="rounded-xl bg-white/85 p-1.5 border border-white/80">
        <TypingText
          text="北海道札幌 (12.19-12.21)"
          active={active}
          resetKey={resetKey}
          speed={40}
          startDelay={0}
          className="text-[9px] font-semibold text-[#161A22] block leading-tight"
        />
        <TypingText
          text="整体特征：极寒，已积雪，白天体感 -10℃ 以下，风力较大"
          active={active}
          resetKey={resetKey}
          speed={32}
          startDelay={600}
          className="text-[8px] text-[#45474B] block leading-snug mt-0.5"
        />
        <WeatherGrid items={HOKKAIDO} active={active} resetKey={resetKey} delay={3.4} />
      </div>

      {/* 东京块 · 延时挂载：等北海道块内容 & 图片都出完再出现，避免早期撑起空白 */}
      <AppearAfter delay={4400} resetKey={resetKey}>
        <div className="rounded-xl bg-white/85 p-1.5 border border-white/80">
          <TypingText
            text="东京 (12.22-12.24)"
            active={active}
            resetKey={resetKey}
            speed={40}
            startDelay={200}
            className="text-[9px] font-semibold text-[#161A22] block leading-tight"
          />
          <TypingText
            text="整体特征：温和寒冷，白天舒适，早晚温差大 (可达 8℃)，空气湿润"
            active={active}
            resetKey={resetKey}
            speed={32}
            startDelay={1000}
            className="text-[8px] text-[#45474B] block leading-snug mt-0.5"
          />
          <WeatherGrid items={TOKYO} active={active} resetKey={resetKey} delay={3.8} />
        </div>
      </AppearAfter>
    </div>
  );
}

function WeatherGrid({
  items,
  active,
  resetKey,
  delay,
}: {
  items: WeatherGridItem[];
  active: boolean;
  resetKey: unknown;
  delay: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-1 mt-1" key={String(resetKey)}>
      {items.map((it, i) => (
        <motion.div
          key={it.date}
          initial={{ opacity: 0, y: 4 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ delay: delay + i * 0.15, duration: 0.3 }}
          className="rounded-md bg-[#F5F0FA] px-1 py-0.5 text-center"
        >
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[7px] tabular-nums font-semibold text-[#161A22]">
              {it.date}
            </span>
            <span className="text-[7px] leading-none">{it.emoji}</span>
          </div>
          <div className="text-[6px] tabular-nums text-[#3D63BD] font-medium leading-tight">
            {it.temp}
          </div>
          <div className="text-[6px] text-[#45474B] leading-tight">{it.wind}</div>
        </motion.div>
      ))}
    </div>
  );
}
