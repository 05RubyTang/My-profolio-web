"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import WorkLayout from "../_components/WorkLayout";
import { cdnUrl } from "@/lib/cdn";

/* ============================================================
   Photo Editor —— 修图助手（骨架，等素材）
   ============================================================ */

export default function PhotoEditorPage() {
  return (
    <WorkLayout navTheme="light" navTitle="Photo Editor" navSubtitle="AI 修图助手">
      {/* Hero 占位 */}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-[#F5F0E8] via-[#EDE4D3] to-[#DCC9A8] px-6 md:px-12 pt-28 md:pt-32 pb-20 overflow-hidden">
        {/* 装饰 */}
        <div className="absolute top-40 -left-20 w-96 h-96 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-[#861F15]/10 blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-black/8 text-xs tracking-widest uppercase text-ink-muted mb-6">
              Coming Soon · 即将上线
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-ink leading-[1.05] tracking-tight">
              修图助手
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-ink-muted font-light">
              让每一张日常照片，都值得被认真修一次
            </p>
            <p className="mt-6 max-w-xl text-base text-ink-muted/80 leading-relaxed mx-auto">
              一个懂你风格的 AI 修图伙伴，只需上传照片，它会自动分析场景、光线与主体，
              给你 3 套修图方案，你只需要选一个最喜欢的。
            </p>
          </motion.div>

          {/* 封面图占位（现有 CDN 封面） */}
          <motion.div
            className="mt-12 relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden bg-black/5 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Image
              src={cdnUrl("/picture/id-project/tongji-works/修图助手-封面.png")}
              alt="修图助手 封面"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </motion.div>

          <motion.div
            className="mt-16 p-8 rounded-3xl bg-white/50 border border-black/8 backdrop-blur-sm max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-ink-muted text-sm leading-relaxed">
              🎨 完整的产品设计故事、用户调研、技术架构与演示视频正在整理中，
              敬请期待更详细的落地页。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 底部返回 */}
      <section className="relative w-full bg-[#F5F0E8] py-16 px-6 text-center border-t border-black/8">
        <p className="text-ink-muted/70 text-sm mb-4">感谢你的耐心 ✿</p>
        <Link
          href="/#works"
          onClick={() => {
            try {
              sessionStorage.setItem("returnTo", "works");
            } catch {
              // ignore
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink/8 hover:bg-ink/12 text-ink text-sm transition-all"
        >
          ← 回到 Works 看更多
        </Link>
      </section>
    </WorkLayout>
  );
}
