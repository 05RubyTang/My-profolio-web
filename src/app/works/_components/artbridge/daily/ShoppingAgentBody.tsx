"use client";

import TypingText from "../travel/TypingText";
import { SHOPPING_AGENT_LONG_TEXT } from "../data/dailyOutfitScript";

/**
 * ShoppingAgentBody —— 每日穿搭 · 优选购物助手 AgentCard 内部内容
 *
 * 复用 travel 里 ShoppingAgent 的排版思路（rounded-xl bg-white/85 小盒 + TypingText 打字机）
 * 只不过这里只需要一个大段落，把 4 个维度分成 2 段依次打字机呈现。
 */

const SEG_1 = "正在根据 回头客多、销量高、真实评价好、性价比高";
const SEG_2 = "为您寻找高品质的「绿色连帽卫衣」……";

export default function ShoppingAgentBody({
  active,
  resetKey,
}: {
  active: boolean;
  resetKey: unknown;
}) {
  return (
    <div className="space-y-1.5">
      {/* 段 1：维度枚举 */}
      <div className="rounded-xl bg-white/85 p-2 border border-white/80">
        <TypingText
          text={SEG_1}
          active={active}
          resetKey={resetKey}
          speed={36}
          startDelay={0}
          className="text-[9px] text-[#161A22] block leading-snug"
        />
      </div>

      {/* 段 2：明确目标 */}
      <div className="rounded-xl bg-white/85 p-2 border border-white/80">
        <TypingText
          text={SEG_2}
          active={active}
          resetKey={resetKey}
          speed={40}
          startDelay={1800}
          className="text-[9px] font-semibold text-[#161A22] block leading-snug"
        />
      </div>

      {/* 段 3：静态兜底（Figma 提示语） */}
      <div className="text-[8px] text-[#8A8DA0] pl-1 leading-tight">
        · 小艺正在检索店铺与商品清单…
      </div>

      {/* 隐藏元素：保证 data 使用（避免 tree-shaking 引用告警） */}
      <span className="sr-only">{SHOPPING_AGENT_LONG_TEXT}</span>
    </div>
  );
}
