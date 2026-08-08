"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect } from "react";

export type ProcessItem = {
  id: string;
  icon: ReactNode;
  label: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
};

/**
 * 右侧滑出抽屉：装项目背后的"过程性内容"（技术架构 / 用户调研 / 市场调研 / 完整视频）
 * 遮罩 + ESC 关闭 + body scroll lock
 */
export default function ProcessDrawer({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: ProcessItem | null;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            key="mask"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 h-screen w-full sm:w-[560px] md:w-[640px] bg-white z-[70] shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <header className="flex items-start justify-between px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-black/6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3E1740] to-[#2E0F30] text-white flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#2E0F30] leading-tight">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-black/60 mt-0.5">{item.subtitle}</p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="关闭"
                className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-black/60 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              {item.content}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * 抽屉里的一个简单图片段落组件，方便复用
 */
export function ProcessImageBlock({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="mb-6">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/5">
        <Image src={src} alt={alt} fill className="object-contain" unoptimized />
      </div>
      {caption && (
        <figcaption className="text-xs text-black/50 text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
