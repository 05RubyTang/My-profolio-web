"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { CHECKLIST } from "../data/travelOutfitScript";

/**
 * 需求分析 · 系统推理进度
 * ------------------------------------------
 * 这是 AI 内部的分析过程展示，不属于「AI 说话的气泡」，因此：
 *   - 不使用白色底气泡背景，直接透明贴合整个聊天背景
 *   - 使用浅灰字体，字号比一般正文稍小，营造「系统推理」的观感
 *   - 三个 step 依次点亮：understood → planning → output
 *   - planning 项在 status === "planning" 时显示 loading spinner，
 *     在 status === "output" 时变为 ✅
 */
export type ChecklistStatus = "understood" | "planning" | "output";

const ORDER: ChecklistStatus[] = ["understood", "planning", "output"];

export default function RequirementChecklist({
  status,
}: {
  status: ChecklistStatus | null;
}) {
  if (!status) return null;

  const activeIdx = ORDER.indexOf(status);

  return (
    <div className="px-1 py-1 space-y-1.5">
      {CHECKLIST.map((item, i) => {
        if (i > activeIdx) return null;
        const isCurrent = i === activeIdx;
        const isLoading = isCurrent && item.id === "planning";
        const isDone = !isLoading;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-1.5"
          >
            <div className="mt-[1px] w-3 h-3 flex items-center justify-center shrink-0">
              {isLoading ? (
                <Loader2 size={11} className="text-[#8A8DA0] animate-spin" strokeWidth={2.4} />
              ) : isDone ? (
                <Check size={11} className="text-[#8A8DA0]" strokeWidth={3} />
              ) : null}
            </div>
            <div className="text-[11px] leading-[1.4] text-[#8A8DA0]">
              {item.text}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
