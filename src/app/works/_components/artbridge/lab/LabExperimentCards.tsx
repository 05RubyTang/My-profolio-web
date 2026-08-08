"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import {
  EXPERIMENT_PLANS,
  PARADOX_ASK,
  PARADOX_SWAP,
  type ExperimentPlan,
} from "../data/styleLabScript";

/**
 * 「风格悖论」3 张实验方案卡（横排）
 *
 * 对齐 Figma node 1211:11939 Group 1000007998：
 *   - 3 张卡横排（每张 127×230 · r=16 · 半透白渐变底）
 *   - 顶部标题（w=700 sz=14 color=rgb(76,7,63)）
 *   - 副标题（sz=8 w=400 color=rgb(22,26,34)）
 *   - 底部大图（衣服 IMG）
 *
 * 场景 A 用（3 卡完整显示 · 用户点某张 → 触发 onPick）；
 * 场景 B 也复用（3 卡仍显示于顶部，用户已选的那张需要在外层染色 → 通过 pickedId prop）。
 */
export default function LabExperimentCards({
  onPick,
  pickedId,
  showSwap = true,
  showAsk = true,
}: {
  onPick?: (plan: ExperimentPlan) => void;
  /** 已选中的方案 id · 传入后其它卡片会变淡 */
  pickedId?: ExperimentPlan["id"] | null;
  /** 是否显示右上「换一换」（场景 B 里显示为「换个思路」，由外层单独渲染，这里默认 true） */
  showSwap?: boolean;
  /** 是否显示卡片下方「你想试试那一套？」问句 */
  showAsk?: boolean;
}) {
  return (
    <div className="relative">
      {/* 右上「换一换」CTA */}
      {showSwap && (
        <button
          type="button"
          className="absolute -top-1 right-1 z-[2] flex items-center gap-1 text-[11px]"
          style={{ color: "rgb(233,142,206)" }}
        >
          <RefreshCw size={10} />
          {PARADOX_SWAP}
        </button>
      )}

      {/* 3 卡横排 */}
      <div className="grid grid-cols-3 gap-1.5 pt-4">
        {EXPERIMENT_PLANS.map((plan, i) => {
          const isPicked = pickedId === plan.id;
          const dimmed = pickedId != null && !isPicked;
          return (
            <motion.button
              key={plan.id}
              type="button"
              onClick={() => onPick?.(plan)}
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: dimmed ? 0.45 : 1,
                y: 0,
                scale: isPicked ? 1.02 : 1,
              }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={pickedId ? undefined : { y: -2 }}
              className={[
                "relative overflow-hidden rounded-[14px] text-left transition-shadow",
                "flex flex-col",
                isPicked
                  ? "ring-2 ring-[rgba(233,142,206,0.9)]"
                  : "",
              ].join(" ")}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(241,241,241,0.55) 63%)",
                border: "0.5px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 16px rgba(97,168,255,0.10)",
                aspectRatio: "127 / 230",
              }}
            >
              {/* 标题 */}
              <div
                className="px-2 pt-2 text-[12px] font-bold leading-tight"
                style={{ color: "rgb(76,7,63)" }}
              >
                {plan.title}
              </div>
              {/* 描述 */}
              <div
                className="px-2 pt-1 text-[8px] leading-[1.4]"
                style={{ color: "rgb(22,26,34)" }}
              >
                {plan.desc}
              </div>
              {/* 图片 */}
              <div className="relative flex-1 mt-1">
                <Image
                  src={plan.imageSrc}
                  alt={plan.title}
                  fill
                  sizes="100px"
                  className="object-contain object-bottom"
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* 卡片下方问句 */}
      {showAsk && !pickedId && (
        <div
          className="mt-2 text-[13px]"
          style={{ color: "rgb(69,71,75)" }}
        >
          {PARADOX_ASK}
        </div>
      )}
    </div>
  );
}
