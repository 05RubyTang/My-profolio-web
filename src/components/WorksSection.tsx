"use client";

import { useState, useEffect, useCallback } from "react";
import { cdnUrl } from "@/lib/cdn";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import IndustrialDesignGallery from "./IndustrialDesignGallery";

/* ============================================================
   数据结构 & 模板
   ============================================================ */

interface WorkPage {
  title: string;
  desc: string;
  image?: string;
}

interface BookData {
  name: string;
  subtitle: string;
  coverColor: string;
  coverImage: string;
  rotation: number;
  /** 展示模式：book = 翻页书本（默认），id-gallery = 工业设计画廊 */
  displayMode?: "book" | "id-gallery";
  pages: WorkPage[];
}

const books: BookData[] = [
  {
    name: "My Vibe Coding",
    subtitle: "用 AI 做产品",
    coverColor: "#A8C4D8",
    coverImage: "/picture/books/My Vibe Coding.png",
    rotation: -6,
    pages: [
      {
        title: "个人作品集网站",
        desc: "你正在看的这个网站！用 Next.js + Tailwind CSS 搭建，复古纸张风格。\n\n从零开始用 Cursor + Claude 完成全部开发。",
      },
      {
        title: "项目名称（待填写）",
        desc: "在这里描述你的第二个 Vibe Coding 项目...",
      },
    ],
  },
  {
    name: "My Industrial Design",
    subtitle: "设计保研作品集",
    coverColor: "#E8D5B7",
    coverImage: "/picture/books/My Industrial Design.png",
    rotation: 0,
    displayMode: "id-gallery",
    pages: [],
  },
  {
    name: "In Tongji Works",
    subtitle: "同济课程作业",
    coverColor: "#C8CC8A",
    coverImage: "/picture/books/In Tongji Works.png",
    rotation: 5,
    pages: [
      {
        title: "课程项目一（待填写）",
        desc: "在这里描述你的同济课程作业项目...\n\n可以包含课程名称、项目目标、你的贡献等。",
      },
      {
        title: "课程项目二（待填写）",
        desc: "在这里描述第二个课程项目...",
      },
    ],
  },
];

/* ============================================================
   书本封面组件
   ============================================================ */
function BookCover({
  book,
  onClick,
}: {
  book: BookData;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex-shrink-0 transition-all duration-500 hover:scale-105 hover:-translate-y-3 focus:outline-none"
      style={{
        transform: `rotate(${book.rotation}deg)`,
        width: "200px",
      }}
    >
      <div className="relative rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl">
        <img
          src={book.coverImage}
          alt={book.name}
          className="w-full h-auto block"
          draggable={false}
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.04) 40%, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(225deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 40%, transparent 55%)",
          }}
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-base font-bold text-ink font-handwriting leading-tight">{book.name}</p>
        <p className="text-[11px] text-ink-muted mt-1">{book.subtitle}</p>
      </div>
    </button>
  );
}

/* ============================================================
   弧形画廊全屏弹窗组件
   ============================================================ */

/* ============================================================
   打开的书本弹窗组件（用于非 gallery 模式的书本）
   ============================================================ */
function OpenBook({
  book,
  onClose,
}: {
  book: BookData;
  onClose: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = book.pages.length;

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const page = book.pages[currentPage];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease-out" }}
      />

      <div
        className="relative z-10 w-[90vw] max-w-[900px] mx-4"
        style={{ animation: "bookOpen 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-ink hover:bg-white transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div className="flex rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
          {/* 左页 - 图片 */}
          <div className="w-1/2 relative" style={{ backgroundColor: book.coverColor }}>
            <div
              className="absolute right-0 top-0 bottom-0 w-6"
              style={{ background: "linear-gradient(to left, rgba(0,0,0,0.08), transparent)" }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-[2px]"
              style={{ background: "rgba(0,0,0,0.12)" }}
            />
            {page.image ? (
              <img src={page.image} alt={page.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8">
                <div className="w-20 h-20 rounded-xl border-2 border-dashed border-ink/15 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-ink/20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <p className="text-xs text-ink/30 text-center">
                  在 pages 数组中添加<br />image 字段放置图片
                </p>
              </div>
            )}
          </div>

          {/* 右页 - 文字 */}
          <div className="w-1/2 bg-[#FEFCF8] relative p-8 flex flex-col">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
            <div
              className="absolute left-0 top-0 bottom-0 w-6"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.06), transparent)" }}
            />

            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] text-ink-muted uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
                {book.name}
              </span>
              <span className="text-[10px] text-ink-muted">
                {currentPage + 1} / {totalPages}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <h3 className="text-2xl font-bold text-ink mb-4 leading-tight">{page.title}</h3>
              <div className="w-10 h-[2px] bg-accent/30 mb-5 rounded-full" />
              <p className="text-ink-light leading-relaxed whitespace-pre-line text-sm">{page.desc}</p>
            </div>

            <div className="flex items-center justify-between mt-6 relative z-10">
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  currentPage === 0 ? "text-ink-muted/30 cursor-not-allowed" : "text-ink-muted hover:text-accent"
                }`}
              >
                <ChevronLeft size={14} />
                上一页
              </button>
              <button
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  currentPage === totalPages - 1 ? "text-ink-muted/30 cursor-not-allowed" : "text-ink-muted hover:text-accent"
                }`}
              >
                下一页
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Works Section 主组件
   ============================================================ */
export default function WorksSection() {
  const [openBookIndex, setOpenBookIndex] = useState<number | null>(null);

  const openedBook = openBookIndex !== null ? books[openBookIndex] : null;

  return (
    <section id="works" className="pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-8">
            <div className="relative inline-flex items-center">
              <svg className="absolute -left-9 -top-3 w-5 h-5 pointer-events-none" viewBox="0 0 24 24" fill="none">
                <path d="M12 4 C12 4, 13 9, 12 12 C12 12, 17 11, 20 12 C20 12, 17 13, 12 12 C12 12, 13 17, 12 20 C12 20, 11 17, 12 12 C12 12, 7 13, 4 12 C4 12, 7 11, 12 12 C12 12, 11 9, 12 4Z" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.45" strokeLinecap="round" />
              </svg>
              <svg className="absolute -right-10 -top-2 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 C12 2, 13 8, 12 12 C12 12, 18 11, 22 12 C22 12, 18 13, 12 12 C12 12, 13 18, 12 22 C12 22, 11 18, 12 12 C12 12, 6 13, 2 12 C2 12, 6 11, 12 12 C12 12, 11 8, 12 2Z" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="absolute -left-5 bottom-0 w-3 h-3 pointer-events-none" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="2" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.25" />
                <path d="M6 1 L6 3 M6 9 L6 11 M1 6 L3 6 M9 6 L11 6" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
              </svg>
              <h2 className="text-3xl md:text-4xl font-handwriting font-bold text-ink">Works</h2>
            </div>
            <div className="w-12 h-[2px] bg-accent/30 mt-3 rounded-full" />
            <p className="text-sm text-ink-muted mt-3">点击任意一本书，翻开看看</p>
          </div>
        </ScrollReveal>
      </div>

      {/* 笔记本线圈装饰 + 暖色背景区域 */}
      <div className="relative">
        <div
          className="w-full h-[50px] bg-repeat-x bg-center bg-contain relative z-10"
          style={{
            backgroundImage: `url(${cdnUrl("/notebook-rings.png")})`,
            backgroundSize: "auto 50px",
          }}
        />
        <div className="pb-24 px-6" style={{ backgroundColor: "rgb(242, 227, 207)" }}>
          <div className="max-w-5xl mx-auto pt-12 pb-8">
            <ScrollReveal delay={100}>
              <div className="flex items-end justify-center gap-8 md:gap-14">
                {books.map((book, index) => (
                  <BookCover key={book.name} book={book} onClick={() => setOpenBookIndex(index)} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* 弹窗：根据 displayMode 选择展示方式 */}
      {openedBook && openedBook.displayMode === "id-gallery" && (
        <IndustrialDesignGallery onClose={() => setOpenBookIndex(null)} />
      )}
      {openedBook && openedBook.displayMode !== "id-gallery" && (
        <OpenBook book={openedBook} onClose={() => setOpenBookIndex(null)} />
      )}
    </section>
  );
}
