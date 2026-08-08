"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, FlaskConical, Compass } from "lucide-react";

/** 四大功能入口 key */
export type FeatureKey = "daily" | "travel" | "lab" | "world";

export type FeatureEntry = {
  key: FeatureKey;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  /** 是否有实装的演示（未实装的会显示「敬请期待」） */
  ready?: boolean;
};

export const FEATURE_ENTRIES: FeatureEntry[] = [
  {
    key: "daily",
    icon: <Sparkles size={20} />,
    tag: "Daily Outfit",
    title: "每日穿搭法则",
    description: "根据今天的天气、行程、心情，主动推荐当日穿搭方案。",
    ready: true,
  },
  {
    key: "travel",
    icon: <MapPin size={20} />,
    tag: "Travel Planning",
    title: "旅游穿搭规划",
    description: "告诉小艺你要去哪、几天，帮你规划整趟行程的每日穿搭。",
    ready: true,
  },
  {
    key: "lab",
    icon: <FlaskConical size={20} />,
    tag: "Style Lab",
    title: "风格实验室",
    description: "任务式穿搭挑战，用「风格悖论」推翻你的固有认知。",
    ready: true,
  },
  {
    key: "world",
    icon: <Compass size={20} />,
    tag: "See The World",
    title: "小艺看世界",
    description: "打开摄像头让 AI 识别衣服，一键录入数字衣橱并推荐搭配。",
    ready: true,
  },
];

export default function FeatureEntries({
  active,
  onChange,
}: {
  active: FeatureKey;
  onChange: (key: FeatureKey) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {FEATURE_ENTRIES.map((entry, i) => {
        const isActive = entry.key === active;
        return (
          <motion.button
            key={entry.key}
            onClick={() => onChange(entry.key)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={[
              "group relative text-left rounded-2xl p-5 md:p-6 border transition-all overflow-hidden",
              isActive
                ? "bg-white/[0.08] border-[#FF88D9]/60 shadow-[0_10px_40px_-10px_rgba(255,136,217,0.35)]"
                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20",
            ].join(" ")}
          >
            {/* 顶部图标 + tag */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={
                  isActive ? "text-[#FF88D9]" : "text-white/60 group-hover:text-[#FF88D9] transition-colors"
                }
              >
                {entry.icon}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-white/45">
                {entry.tag}
              </span>
            </div>

            <h3
              className={[
                "text-base md:text-lg font-semibold leading-snug mb-2 transition-colors",
                isActive ? "text-white" : "text-white/90",
              ].join(" ")}
            >
              {entry.title}
              {entry.ready ? (
                <span className="ml-2 inline-flex items-center align-middle text-[10px] tracking-widest text-[#FF88D9]/90 border border-[#FF88D9]/40 rounded-full px-1.5 py-[1px]">
                  DEMO
                </span>
              ) : (
                <span className="ml-2 inline-flex items-center align-middle text-[10px] tracking-widest text-white/40 border border-white/15 rounded-full px-1.5 py-[1px]">
                  SOON
                </span>
              )}
            </h3>

            <p className="text-xs md:text-sm text-white/55 leading-relaxed">
              {entry.description}
            </p>

            {/* 底部激活指示条 */}
            <motion.div
              className="absolute left-6 right-6 bottom-0 h-[2px] rounded-full"
              initial={false}
              animate={{
                background: isActive
                  ? "linear-gradient(90deg, transparent, #FF88D9, transparent)"
                  : "transparent",
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
