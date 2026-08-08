"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { WORLD_OUTFIT_PAIRS, type OutfitPair } from "../data/seeTheWorldScript";

/**
 * AI 生成的 2 套搭配大卡（阶段 4 · 纯展示）
 *
 * 因为整个通话是语音交互，用户不会点击卡片。
 * 编排层根据 timeline 传入 pickedId（例如 "left"）时，对应卡片自动出现高亮 + 勾选 badge。
 *
 * 严格对齐 Figma 1211:5127：
 *   - 两张卡水平并排 · 每张宽 154x212（带磨砂玻璃背板 rgba(255,255,255,0.21) fx=blur 9）
 *   - 内嵌图片 137x200 · 圆角 7
 */
export default function OutfitPairCard({
  pickedId,
}: {
  /** 被选中的搭配（由编排层根据 timeline 传入 · 用户不点击） */
  pickedId?: OutfitPair["id"] | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 px-1">
      {WORLD_OUTFIT_PAIRS.map((pair, i) => {
        const isPicked = pickedId === pair.id;
        const isDim = pickedId != null && !isPicked;

        return (
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isDim ? 0.55 : 1,
              y: 0,
              scale: isPicked ? 1.04 : 1,
            }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="relative rounded-[10px] p-1 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.21)",
              backdropFilter: "blur(9px)",
              WebkitBackdropFilter: "blur(9px)",
              border: isPicked
                ? "1.5px solid rgba(255,176,222,0.85)"
                : "1px solid rgba(255,255,255,0.25)",
              boxShadow: isPicked
                ? "0 10px 24px -6px rgba(255,176,222,0.5)"
                : "0 6px 16px -6px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="relative w-full rounded-[7px] overflow-hidden"
              style={{ aspectRatio: "137 / 200" }}
            >
              <Image
                src={pair.imageSrc}
                alt={pair.label}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            {/* 选中态 · 右上角勾 */}
            <AnimatePresence>
              {isPicked && (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(192,63,170) 0%, rgb(223,171,192) 100%)",
                    boxShadow: "0 4px 10px -2px rgba(192,63,170,0.5)",
                  }}
                >
                  <Check size={14} strokeWidth={3} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
