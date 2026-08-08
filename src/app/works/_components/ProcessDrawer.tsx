"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { ReactNode, useCallback, useEffect, useState } from "react";

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
 * 支持点击放大：如果传入了 onClick，会显示右上角放大图标 + hover 效果
 */
export function ProcessImageBlock({
  src,
  alt,
  caption,
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClick?: () => void;
}) {
  const clickable = typeof onClick === "function";
  return (
    <figure className="mb-6">
      <div
        className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/5 group ${
          clickable ? "cursor-zoom-in" : ""
        }`}
        onClick={onClick}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain transition-transform duration-500 ${
            clickable ? "group-hover:scale-[1.02]" : ""
          }`}
          unoptimized
        />
        {clickable && (
          <>
            {/* hover 半透明遮罩 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
            {/* 右上角放大图标 */}
            <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/45 backdrop-blur-sm text-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <ZoomIn size={16} />
            </div>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="text-xs text-black/50 text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * 图片组：把一组图片打包，任意一张被点击时以 lightbox 全屏展示，
 * 支持左右箭头 / ESC 关闭 / 键盘方向键切换
 */
export function ProcessImageGroup({
  srcs,
  altPrefix,
}: {
  srcs: string[];
  altPrefix: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      {srcs.map((src, i) => (
        <ProcessImageBlock
          key={i}
          src={src}
          alt={`${altPrefix} ${i + 1}`}
          onClick={() => setOpenIndex(i)}
        />
      ))}
      {openIndex !== null && (
        <ImageLightbox
          srcs={srcs}
          startIndex={openIndex}
          altPrefix={altPrefix}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}

/**
 * 图片灯箱：全屏遮罩 + 大图 + 左右切换 + ESC/方向键 + 计数
 */
function ImageLightbox({
  srcs,
  startIndex,
  altPrefix,
  onClose,
}: {
  srcs: string[];
  startIndex: number;
  altPrefix: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const total = srcs.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);
  const goNext = useCallback(() => {
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);

  // ESC / 方向键
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  // 禁止背景滚动（ProcessDrawer 已经锁 body 了，这里锁最外层也无副作用）
  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = original;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 半透明遮罩 */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        aria-label="关闭大图"
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* 计数 */}
      {total > 1 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm tracking-wider">
          {index + 1} / {total}
        </div>
      )}

      {/* 左箭头 */}
      {index > 0 && (
        <button
          onClick={goPrev}
          aria-label="上一张"
          className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* 右箭头 */}
      {index < total - 1 && (
        <button
          onClick={goNext}
          aria-label="下一张"
          className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/85 hover:text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* 大图 */}
      <motion.div
        key={index}
        className="relative z-[1] max-w-[92vw] max-h-[90vh] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={srcs[index]}
          alt={`${altPrefix} ${index + 1}`}
          className="max-w-[92vw] max-h-[90vh] object-contain rounded-lg select-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
