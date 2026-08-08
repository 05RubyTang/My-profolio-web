"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TravelOutfitChatbot from "./travel/TravelOutfitChatbot";
import DailyOutfitChatbot from "./daily/DailyOutfitChatbot";
import StyleLabScene from "./lab/StyleLabScene";
import SeeTheWorldScene from "./world/SeeTheWorldScene";
import { FEATURE_ENTRIES, FeatureKey } from "./FeatureEntries";

/**
 * 根据 activeFeature 切换渲染对应的功能演示
 * - travel: 完整 Chatbot 演示
 * - 其他: 占位「敬请期待」
 */
export default function FeatureShowcase({
  active,
}: {
  active: FeatureKey;
}) {
  const meta = FEATURE_ENTRIES.find((e) => e.key === active);

  return (
    <div className="relative min-h-[720px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {active === "travel" ? (
            <TravelOutfitChatbot />
          ) : active === "daily" ? (
            <DailyOutfitChatbot />
          ) : active === "lab" ? (
            <StyleLabScene />
          ) : active === "world" ? (
            <SeeTheWorldScene />
          ) : (
            <ComingSoonPanel title={meta?.title ?? ""} description={meta?.description ?? ""} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ComingSoonPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-6">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <Sparkles size={26} className="text-[#FFB0DE]" />
      </div>
      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">{title}</h3>
      <p className="max-w-md text-white/55 text-sm md:text-base leading-relaxed">{description}</p>
      <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB0DE] animate-pulse" />
        FIGMA 稿件就绪后开发中
      </div>
    </div>
  );
}
