"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  WORLD_USER_JACKET_SRC,
  WORLD_AI_REPLY_1,
  WORLD_WARDROBE_CHIP,
} from "../data/seeTheWorldScript";

/**
 * AI 展示识别到的衣服 · AI 回复气泡（阶段 3）
 *
 * 严格对齐 Figma 1211:5031（用户问句已由 UserVoiceBubble 独立承担）：
 *   - 中间：花苞外套原图（214x172）居中
 *   - 下方：AI 回复文本（白色）
 *   - 图下方右侧：深灰胶囊 chip 「数字衣柜录入完成」（带勾选 icon）
 */
export default function UserJacketBubble({
  showJacket = true,
  showReply = false,
  showChip = false,
}: {
  showJacket?: boolean;
  showReply?: boolean;
  showChip?: boolean;
}) {
  return (
    <div className="flex flex-col items-stretch gap-3">
      {/* 花苞外套图片 */}
      {showJacket && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto rounded-xl overflow-hidden"
          style={{
            width: "65%",
            aspectRatio: "214 / 172",
            boxShadow: "0 8px 24px -6px rgba(0,0,0,0.35)",
          }}
        >
          <Image
            src={WORLD_USER_JACKET_SRC}
            alt="pink jacket"
            fill
            sizes="220px"
            className="object-cover"
          />
        </motion.div>
      )}

      {/* AI 回复文本 */}
      {showReply && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[13px] leading-[1.45] text-white text-center px-2"
        >
          {WORLD_AI_REPLY_1}
        </motion.p>
      )}

      {/* 数字衣柜录入完成 chip */}
      {showChip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="self-center mt-1 flex items-center gap-1 px-2 py-1 rounded"
          style={{ background: "rgba(48,48,48,0.6)" }}
        >
          <span
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
            }}
          >
            <Check size={9} strokeWidth={3} className="text-white" />
          </span>
          <span className="text-[10px] font-medium text-white tracking-wide">
            {WORLD_WARDROBE_CHIP}
          </span>
        </motion.div>
      )}
    </div>
  );
}
