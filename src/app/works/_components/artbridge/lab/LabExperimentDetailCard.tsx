"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import {
  PARADOX_RETRY,
  type ExperimentDetail,
} from "../data/styleLabScript";

/**
 * 「风格悖论」详情大卡（场景 B）
 *
 * 对齐 Figma node 1211:12423 里「已为您完善方案」下方的大卡：
 *   - 左：文字（标题 + summary + 「让我们来检查一下『实验器材』：」 + 3 行清单）
 *   - 右：大 IMG（方案对应的服装图）
 *   - 底：右下角 「换个思路」CTA
 */
export default function LabExperimentDetailCard({
  detail,
  onRetry,
}: {
  detail: ExperimentDetail;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative rounded-[14px] overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(245,232,246,0.6) 100%)",
        border: "0.5px solid rgba(255,255,255,0.9)",
        boxShadow: "0 6px 22px rgba(255,97,192,0.10)",
      }}
    >
      <div className="flex items-stretch">
        {/* 左：文字 */}
        <div className="flex-1 min-w-0 p-3 pr-2">
          <div
            className="text-[13px] font-bold leading-tight"
            style={{ color: "rgb(22,26,34)" }}
          >
            {detail.title}
          </div>
          <div
            className="mt-1 text-[10px] leading-[1.5]"
            style={{ color: "rgb(69,71,75)" }}
          >
            {detail.summary}
          </div>
          <div
            className="mt-2 text-[10px] leading-[1.5] font-medium"
            style={{ color: "rgb(22,26,34)" }}
          >
            {detail.equipmentTitle}
          </div>
          <ol
            className="mt-0.5 text-[10px] leading-[1.55] list-decimal list-inside space-y-[1px]"
            style={{ color: "rgb(69,71,75)" }}
          >
            {detail.equipmentItems.map((item, i) => (
              <li key={i} className="marker:text-[rgb(200,155,255)]">
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* 右：图片 */}
        <div
          className="relative shrink-0"
          style={{ width: 96, aspectRatio: "82 / 179" }}
        >
          <Image
            src={detail.imageSrc}
            alt={detail.title}
            fill
            sizes="100px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* 右下角 换个思路 CTA */}
      <div className="flex justify-end px-3 pb-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1 text-[11px]"
          style={{ color: "rgb(233,142,206)" }}
        >
          <RefreshCw size={10} />
          {PARADOX_RETRY}
        </button>
      </div>
    </motion.div>
  );
}
