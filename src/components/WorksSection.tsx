"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { cdnUrl } from "@/lib/cdn";
import { useIsMobile } from "@/lib/useIsMobile";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

/* ============================================================
   数据结构
   ============================================================ */

interface WorkPage {
  title: string;
  desc: string;
  image?: string;
}

interface IDProject {
  id: number;
  name: string;
  nameCn: string;
  subtitle: string;
  subtitleEn: string;
  tags: string;
  slogan: string;
  sloganEn: string;
  projectImage: string;
  ticketImage: string;
  themeColor?: string;
  galleryItems: { image: string; text: string }[];
  videoUrl?: string;
  /** 独立落地页路由，若填写则点击直接跳到该路由（优先级高于内联详情） */
  detailHref?: string;
}

interface BookData {
  name: string;
  subtitle: string;
  coverColor: string;
  coverImage: string;
  rotation: number;
  displayMode?: "book" | "id-gallery" | "tongji-gallery";
  pages: WorkPage[];
  projects?: IDProject[];
}

/* ============================================================
   工业设计项目数据
   ============================================================ */

const idProjects: IDProject[] = [
  {
    id: 1,
    name: "FitBox AI",
    nameCn: "体医融合的青少年肥胖拳击治疗产品交互设计",
    subtitle: "人机交互 / 人工智能应用设计\n/ 智慧健康 / AR+AI",
    subtitleEn:
      "Interaction design of an adolescent obesity boxing treatment product for body-medicine integration",
    tags: "人机交互 / AI应用设计 / 智慧健康 / AR+AI",
    slogan: "开拓下一代AR+AI辅助康复",
    sloganEn: "Pioneering the Next Generation of AR+AI Assisted Rehabilitation",
    projectImage: cdnUrl("/picture/id-project/project1.png"),
    ticketImage: cdnUrl("/picture/id-project/piaogen1.png"),
    themeColor: "#7B5AA8",
    galleryItems: [
      { image: cdnUrl("/picture/id-project/projct1/project1-设计背景.png"), text: "" },
      { image: cdnUrl("/picture/id-project/projct1/project2-用户调研.png"), text: "" },
      { image: cdnUrl("/picture/id-project/projct1/project3-设计定义.png"), text: "" },
      { image: cdnUrl("/picture/id-project/projct1/project4-设计产出.png"), text: "" },
      { image: cdnUrl("/picture/id-project/projct1/project5-设计验证.png"), text: "" },
    ],
  },
  {
    id: 2,
    name: "心守成长金",
    nameCn: "农村留守家庭亲子成长储蓄服务设计",
    subtitle: "服务设计 / 金融创新\n/ 包容性设计",
    subtitleEn:
      "Design of Parent-Child Growth Savings Service for Rural Left-behind Families",
    tags: "服务设计 / 金融创新 / 包容性设计",
    slogan: "做有温度的储蓄",
    sloganEn: "Making warm savings",
    projectImage: cdnUrl("/picture/id-project/project2.png"),
    ticketImage: cdnUrl("/picture/id-project/piaogen2.png"),
    themeColor: "#4A8B6F",
    galleryItems: [
      { image: cdnUrl("/picture/id-project/project2/project2-设计背景.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project2/project2-用户调研.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project2/project2-设计定义.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project2/project2-服务设计.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project2/project2-设计产出.png"), text: "" },
    ],
  },
  {
    id: 3,
    name: "AKSO",
    nameCn: "脑瘫儿童居家康复训练智能轮椅设计",
    subtitle: "工业设计 / 结构设计 /\n人机工程 / 量化研究",
    subtitleEn:
      "Wheelchair for home rehabilitation training of children with cerebral palsy",
    tags: "工业设计 / 结构设计 / 人机工程 / 量化研究",
    slogan: "智能康复点亮儿童未来",
    sloganEn: "Intelligent Rehabilitation Brightens Children's Future",
    projectImage: cdnUrl("/picture/id-project/project3.png"),
    ticketImage: cdnUrl("/picture/id-project/piaogen3.png"),
    themeColor: "#2C5F8D",
    galleryItems: [
      { image: cdnUrl("/picture/id-project/project3/project3-设计背景.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project3/project3-设计定义.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project3/project3-设计推导.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project3/project3-渲染图.png"), text: "" },
    ],
  },
  {
    id: 4,
    name: "DENTGUARD",
    nameCn: "基于AI卷积神经网络的早期龋坏预警系统设计",
    subtitle: "智能穿戴产品设计 / 人工智能\n辅助医疗健康 / 技术驱动设计",
    subtitleEn:
      "Design of early caries warning system based on AI convolutional neural network",
    tags: "智能穿戴产品设计 / AI / 辅助医疗健康 / 技术驱动设计",
    slogan: "守护笑容，守护你",
    sloganEn: "Guard the smile, guard you",
    projectImage: cdnUrl("/picture/id-project/project4.png"),
    ticketImage: cdnUrl("/picture/id-project/piaogen4.png"),
    themeColor: "#1F1F1F",
    galleryItems: [
      { image: cdnUrl("/picture/id-project/project4/project4-设计背景.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project4/project4-用户研究.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project4/project4-技术研究.png"), text: "" },
      { image: cdnUrl("/picture/id-project/project4/project4-渲染图.png"), text: "" },
    ],
  },
  {
    id: 5,
    name: "OTHERS",
    nameCn: "其他设计作品",
    subtitle: "可视化设计 / 绘画 /\n摄影 / 手工 / 其他",
    subtitleEn:
      "Digital Product Design / Interaction Design / Painting / Photography / Other Competition Designs",
    tags: "可视化设计 / 绘画 / 摄影 / 手工 / 其他",
    slogan: "多维度发展的设计能力",
    sloganEn: "Multi-dimensional development of design capabilities",
    projectImage: cdnUrl("/picture/id-project/project5.png"),
    ticketImage: cdnUrl("/picture/id-project/piaogen5.png"),
    themeColor: "#3AA5A8",
    galleryItems: [
      { image: cdnUrl("/picture/id-project/project5/project5.png"), text: "" },
    ],
    videoUrl: "https://www.xiaohongshu.com/explore/68c59e9e000000001b035c92",
  },
];

/* ============================================================
   同济课程作业 — 模块分类数据结构
   ============================================================ */

interface TongjiModule {
  key: string;
  label: string;
  labelEn: string;
  images: { image: string; text: string }[];
}

/** 修图助手的两大模块（Research+PainPoints 合并、Concept+Output 合并） */
const xiutuModules: TongjiModule[] = [
  {
    key: "research-insights",
    label: "调研与洞察",
    labelEn: "Research & Insights",
    images: [
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/2.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/3.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/4.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/5.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/6.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/7.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/8.jpg"), text: "" },
    ],
  },
  {
    key: "concept-output",
    label: "概念与产出",
    labelEn: "Design",
    images: [
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/9.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/10.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/11.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/12.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/13.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/14.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/15.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/16.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/17.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/修图助手/18.jpg"), text: "" },
    ],
  },
];

/** 艺起搭的两大模块（Research+PainPoints 合并、Concept+Output 合并） */
const yiqidaModules: TongjiModule[] = [
  {
    key: "research-insights",
    label: "调研与洞察",
    labelEn: "Research & Insights",
    images: [
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/1 86.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/2 26.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/3 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/4 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/5 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/6 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/7 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/8 1.jpg"), text: "" },
    ],
  },
  {
    key: "concept-output",
    label: "概念与产出",
    labelEn: "Design",
    images: [
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/9 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/10 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/11 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/12 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/14 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/15 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/16 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/17 1.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/18 6.jpg"), text: "" },
      { image: cdnUrl("/picture/id-project/tongji-works/艺起搭/19 1.jpg"), text: "" },
    ],
  },
];

/** 项目 id → 模块映射 */
const tongjiModulesMap: Record<number, TongjiModule[]> = {
  101: xiutuModules,
  102: yiqidaModules,
};

/* ============================================================
   同济课程作业项目数据
   ============================================================ */

const tongjiProjects: IDProject[] = [
  {
    id: 102,
    name: "ArtBridge",
    nameCn: "艺起搭",
    subtitle: "同济课程作业",
    subtitleEn: "Tongji Course Project",
    tags: "课程作业",
    slogan: "",
    sloganEn: "",
    projectImage: cdnUrl("/picture/id-project/tongji-works/艺起搭-封面.png"),
    ticketImage: "",
    galleryItems: [],
    detailHref: "/works/artbridge",
  },
  {
    id: 101,
    name: "Photo Editor",
    nameCn: "修图助手",
    subtitle: "同济课程作业",
    subtitleEn: "Tongji Course Project",
    tags: "课程作业",
    slogan: "",
    sloganEn: "",
    projectImage: cdnUrl("/picture/id-project/tongji-works/修图助手-封面.png"),
    ticketImage: "",
    galleryItems: [],
    detailHref: "/works/photo-editor",
  },
  {
    id: 103,
    name: "IdeaSalon",
    nameCn: "IdeaSalon设计Skill",
    subtitle: "腾讯云 × TT设计学院 skill 创新大赛二等奖",
    subtitleEn: "Tencent Cloud × Tongji D&I Skill Innovation Contest",
    tags: "课程作业 / 竞赛",
    slogan: "",
    sloganEn: "",
    projectImage: cdnUrl("/picture/id-project/tongji-works/IdeaSalon-封面.png"),
    ticketImage: "",
    galleryItems: [],
    // 点击直接打开外链，不进入二级页
    videoUrl: "https://www.xiaohongshu.com/explore/6a4e65ec000000001503e8f5",
  },
];

/* ============================================================
   书本数据
   ============================================================ */

const books: BookData[] = [
  {
    name: "In Tongji Works",
    subtitle: "Agent 设计项目",
    coverColor: "#C8CC8A",
    coverImage: cdnUrl("/picture/books/In Tongji Works.png"),
    rotation: -4,
    displayMode: "tongji-gallery",
    pages: [],
    projects: tongjiProjects,
  },
  {
    name: "My Industrial Design",
    subtitle: "设计保研作品集",
    coverColor: "#E8D5B7",
    coverImage: cdnUrl("/picture/books/My Industrial Design.png"),
    rotation: 4,
    displayMode: "id-gallery",
    pages: [],
    projects: idProjects,
  },
];

/* ============================================================
   书本封面组件
   ============================================================ */
function BookCover({
  book,
  onClick,
  variant = "normal",
  isActive = false,
}: {
  book: BookData;
  onClick: () => void;
  variant?: "normal" | "selected" | "unselected";
  isActive?: boolean;
}) {
  const isMobile = useIsMobile();
  const styles: Record<string, { width: string; opacity: number }> = isMobile
    ? {
        normal: { width: "140px", opacity: 1 },
        selected: { width: "120px", opacity: 1 },
        unselected: { width: "70px", opacity: 0.7 },
      }
    : {
        normal: { width: "200px", opacity: 1 },
        selected: { width: "200px", opacity: 1 },
        unselected: { width: "100px", opacity: 0.7 },
      };
  const s = styles[variant];

  return (
    <button
      onClick={onClick}
      className={`group relative flex-shrink-0 transition-all duration-700 ease-out focus:outline-none ${
        variant === "normal" ? "hover:scale-105 hover:-translate-y-3" : ""
      } ${variant === "unselected" ? "hover:opacity-90" : ""}`}
      style={{
        transform: `rotate(${variant === "selected" ? -3 : variant === "unselected" ? 3 : book.rotation}deg)`,
        width: s.width,
        opacity: s.opacity,
      }}
    >
      <div className={`relative rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 ${
        isActive ? "ring-2 ring-accent/50 shadow-2xl" : "group-hover:shadow-2xl"
      }`}>
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
      </div>
      <div className="mt-2 text-center">
        <p className={`font-bold text-ink font-handwriting leading-tight ${
          variant === "unselected" ? "text-[11px]" : "text-base"
        }`}>{book.name}</p>
        {variant !== "unselected" && (
          <p className="text-[11px] text-ink-muted mt-1">{book.subtitle}</p>
        )}
      </div>
    </button>
  );
}

/* ============================================================
   票根撕开卡片组件（内嵌版）
   ============================================================ */

function ProjectTicket({
  project,
  onTearComplete,
}: {
  project: IDProject;
  onTearComplete: (id: number) => void;
}) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [tearState, setTearState] = useState<"attached" | "tearing" | "torn">("attached");
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const TEAR_THRESHOLD = 80;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (tearState !== "attached") return;
    isDragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  }, [tearState]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    const offset = Math.max(0, dx);
    setDragOffset(offset);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.preventDefault();
    e.stopPropagation();

    if (dragOffset >= TEAR_THRESHOLD) {
      setTearState("tearing");
      setTimeout(() => {
        setTearState("torn");
        onTearComplete(project.id);
      }, 600);
    } else {
      setDragOffset(0);
    }
  }, [dragOffset, onTearComplete, project.id]);

  const getTicketTransform = () => {
    if (tearState === "tearing") return "translateX(200px) rotate(8deg)";
    if (tearState === "torn") return "translateX(300px) rotate(12deg) scale(0.9)";
    if (dragOffset > 0) {
      const rotate = (dragOffset / TEAR_THRESHOLD) * 5;
      return `translateX(${dragOffset}px) rotate(${rotate}deg)`;
    }
    return "translateX(0)";
  };

  const getTicketOpacity = () => {
    if (tearState === "tearing" || tearState === "torn") return 0;
    return 1;
  };

  const tearProgress = Math.min(dragOffset / TEAR_THRESHOLD, 1);

  const PROJECT_W = 318;
  const TICKET_W = 57;
  const IMG_H = 1138;
  const TOTAL_W = PROJECT_W + TICKET_W;

  return (
    <div
      className="relative group"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div className="flex h-full w-full">
        {/* 左侧：项目封面 */}
        <div
          className="relative overflow-hidden shadow-xl rounded-l-md"
          style={{ width: `${(PROJECT_W / TOTAL_W) * 100}%`, height: "100%" }}
        >
          <img
            src={project.projectImage}
            alt={project.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* 右侧：票根 */}
        <div
          ref={ticketRef}
          className="relative select-none"
          style={{
            width: `${(TICKET_W / TOTAL_W) * 100}%`,
            height: "100%",
            transform: getTicketTransform(),
            opacity: getTicketOpacity(),
            transition: isDragging.current
              ? "none"
              : tearState === "tearing"
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out 0.2s"
              : "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
            cursor: tearState === "attached" ? "grab" : "default",
            zIndex: 10,
            transformOrigin: "left center",
            filter:
              isDragging.current && dragOffset > 20
                ? "drop-shadow(-4px 2px 8px rgba(0,0,0,0.2))"
                : "none",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img
            src={project.ticketImage}
            alt={`${project.name} 票根`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          {tearState === "attached" && dragOffset === 0 && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <img
                src={cdnUrl("/picture/id-project/arrow-right.png")}
                alt=""
                className="w-8 h-auto tear-arrow-hint"
                draggable={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* 撕裂锯齿效果 */}
      {tearState === "attached" && tearProgress > 0 && (
        <div
          className="absolute top-0 h-full pointer-events-none z-[5]"
          style={{
            left: `${(PROJECT_W / TOTAL_W) * 100}%`,
            width: "4px",
            transform: "translateX(-2px)",
            opacity: tearProgress,
            background: `repeating-linear-gradient(
              180deg,
              transparent 0px, transparent 3px,
              rgba(255,255,255,0.6) 3px, rgba(255,255,255,0.6) 5px,
              transparent 5px, transparent 8px
            )`,
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   自由摆放画布 — 票根可长按拖拽到任意位置
   ============================================================ */

/** 票根在画布上的位置和旋转 */
interface TicketPosition {
  id: number;
  /** 百分比坐标 (0~100)，相对于画布 */
  x: number;
  y: number;
  rotation: number;
}

/** 计算 5 个票根的默认位置：均匀分布在画布上 */
function getDefaultPositions(count: number): TicketPosition[] {
  const positions: TicketPosition[] = [];
  const cols = Math.min(count, 5);
  const colWidth = 100 / cols;
  const rotations = [-3, 2, -1, 3, -2];

  for (let i = 0; i < count; i++) {
    positions.push({
      id: i + 1,
      x: colWidth * i + colWidth * 0.1,
      y: 5 + (i % 2 === 0 ? 0 : 8),
      rotation: rotations[i % rotations.length],
    });
  }
  return positions;
}

/** 票根卡片的宽高比 */
const TICKET_ASPECT = 375 / 1138;
/** 每个票根占画布宽度的百分比 */
const TICKET_WIDTH_PCT = 16;

function FreePositionCanvas({
  projects,
  onTearComplete,
}: {
  projects: IDProject[];
  onTearComplete: (id: number) => void;
}) {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<TicketPosition[]>(() =>
    getDefaultPositions(projects.length)
  );
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [activeZId, setActiveZId] = useState<number | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActive = useRef(false);
  const dragStartMouse = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  /** 长按开始 → 激活拖拽 */
  const handlePointerDown = useCallback((e: React.PointerEvent, id: number) => {
    // 不要阻止默认行为，让票根撕开的 pointerDown 也能工作
    const startX = e.clientX;
    const startY = e.clientY;

    longPressTimer.current = setTimeout(() => {
      isLongPressActive.current = true;
      setDraggingId(id);
      setActiveZId(id);
      dragStartMouse.current = { x: startX, y: startY };
      const pos = positions.find((p) => p.id === id);
      if (pos) {
        dragStartPos.current = { x: pos.x, y: pos.y };
      }
    }, 400);
  }, [positions]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isLongPressActive.current || draggingId === null || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dx = e.clientX - dragStartMouse.current.x;
    const dy = e.clientY - dragStartMouse.current.y;

    // 转换为百分比
    const dxPct = (dx / rect.width) * 100;
    const dyPct = (dy / rect.height) * 100;

    setPositions((prev) =>
      prev.map((p) =>
        p.id === draggingId
          ? {
              ...p,
              x: Math.max(0, Math.min(100 - TICKET_WIDTH_PCT, dragStartPos.current.x + dxPct)),
              y: Math.max(0, Math.min(85, dragStartPos.current.y + dyPct)),
            }
          : p
      )
    );

    e.preventDefault();
  }, [draggingId]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (isLongPressActive.current) {
      isLongPressActive.current = false;
      setDraggingId(null);
    }
  }, []);

  // 全局 pointer up 兜底
  useEffect(() => {
    const handleGlobalUp = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      if (isLongPressActive.current) {
        isLongPressActive.current = false;
        setDraggingId(null);
      }
    };
    window.addEventListener("pointerup", handleGlobalUp);
    window.addEventListener("pointercancel", handleGlobalUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalUp);
      window.removeEventListener("pointercancel", handleGlobalUp);
    };
  }, []);

  // ============ 移动端垂直列表模式 ============
  if (isMobile) {
    return (
      <div className="w-full space-y-4 pb-6">
        {projects.map((project) => {
          // 手机端使用项目详情页第一张横版图；主题色兜底为墨色
          const coverImage =
            project.galleryItems[0]?.image || project.projectImage;
          const themeColor = project.themeColor || "#2C2C2C";
          return (
            <button
              key={project.id}
              onClick={() => onTearComplete(project.id)}
              className="w-full block rounded-lg overflow-hidden shadow-lg bg-white active:scale-[0.98] transition-transform"
              style={{ minHeight: "48px" }}
            >
              {/* 横版底图区 */}
              <div
                className="relative w-full"
                style={{ aspectRatio: "375 / 220" }}
              >
                <img
                  src={coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              {/* 主题色块 + 白色标题（底部铺色） */}
              <div
                className="px-4 py-3 text-left"
                style={{ backgroundColor: themeColor }}
              >
                <p className="text-white text-base font-bold leading-tight tracking-wide">
                  {project.name}
                </p>
                <p className="text-white/85 text-[11px] mt-1 leading-snug">
                  {project.tags}
                </p>
              </div>
            </button>
          );
        })}
        <p className="text-[11px] text-ink-muted/40 tracking-wider text-center pt-2">
          点击卡片查看项目详情
        </p>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full select-none"
      style={{
        /* 画布高度：足够放下票根 + 自由摆放空间 */
        height: "clamp(420px, 65vh, 700px)",
        cursor: draggingId !== null ? "grabbing" : "default",
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 画布底部网格装饰 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {positions.map((pos) => {
        const project = projects.find((p) => p.id === pos.id);
        if (!project) return null;

        const isDragging = draggingId === pos.id;
        const isTopZ = activeZId === pos.id;

        return (
          <div
            key={pos.id}
            className="absolute transition-shadow duration-200"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${TICKET_WIDTH_PCT}%`,
              /* 高度由宽度和比例决定 */
              aspectRatio: `${TICKET_ASPECT}`,
              transform: `rotate(${pos.rotation}deg) ${isDragging ? "scale(1.05)" : ""}`,
              transition: isDragging
                ? "transform 0.1s ease, box-shadow 0.2s ease"
                : "left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease",
              zIndex: isDragging ? 100 : isTopZ ? 50 : 1,
              filter: isDragging
                ? "drop-shadow(0 12px 24px rgba(0,0,0,0.25))"
                : "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
            }}
            onPointerDown={(e) => handlePointerDown(e, pos.id)}
          >
            <ProjectTicket
              project={project}
              onTearComplete={onTearComplete}
            />
          </div>
        );
      })}

      {/* 提示文字 */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-[11px] text-ink-muted/40 tracking-wider">
          长按票根可自由拖拽摆放 · 向右拖拽票根撕开进入详情
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   同济项目封面卡片 — 带右下角箭头引导
   ============================================================ */

function TongjiProjectCard({
  project,
  onClick,
}: {
  project: IDProject;
  onClick: () => void;
}) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      {/* 封面图 — 大小跟随图片本身 */}
      <img
        src={project.projectImage}
        alt={project.nameCn}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
        draggable={false}
      />

      {/* 底部渐变遮罩 */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
        }}
      />

      {/* 项目名称 */}
      <div className="absolute bottom-3 left-3 pointer-events-none">
        <p className="text-white text-sm font-bold drop-shadow-md leading-tight">
          {project.name}
        </p>
      </div>

      {/* 右下角红色圆形箭头引导图标 */}
      <div className="absolute bottom-2.5 right-2.5 transition-all duration-300 group-hover:scale-110 tear-arrow-hint">
        <svg viewBox="0 0 1024 1024" className="w-7 h-7 drop-shadow-md" fill="var(--accent)">
          <path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" />
          <path d="M732.959548 501.152426c-0.032684-0.127295-0.192662-0.25631-0.25631-0.383604-1.536138-3.615858-3.648542-7.071738-6.591802-10.047682-0.032684-0.032684-0.063647-0.032684-0.096331-0.063647-0.032684-0.032684-0.032684-0.063647-0.063647-0.096331l-158.911974-159.359226c-12.480043-12.480043-32.704421-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l103.328907 103.616181L320 480.00258c-17.664722 0-31.99914 14.336138-31.99914 32.00086s14.336138 32.00086 31.99914 32.00086l306.752748 0-106.112189 104.959656c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l160.25545-158.495686C735.328262 526.592447 737.72794 512.767209 732.959548 501.152426z" />
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   同济项目自由画布 — 封面卡片可自由拖拽
   ============================================================ */

const TONGJI_CARD_WIDTH_PCT = 28; // 封面卡片宽度占画布百分比（普通卡片）
/** 主推卡片（艺起搭）宽度倍率：PC 端首位卡片放大 1.5× */
const TONGJI_EMPHASIZE_MULTIPLIER = 1.5;
const TONGJI_CARD_WIDTH_EMPHASIZE_PCT =
  TONGJI_CARD_WIDTH_PCT * TONGJI_EMPHASIZE_MULTIPLIER; // 42

function getTongjiDefaultPositions(count: number): TicketPosition[] {
  // 2 个项目：左右分布，略微错开
  if (count === 2) {
    return [
      { id: 0, x: 15, y: 10, rotation: -3 },
      { id: 1, x: 55, y: 15, rotation: 4 },
    ];
  }
  // 3 个项目：主推卡（艺起搭）大幅居左，两张副卡右侧上下错落
  if (count === 3) {
    return [
      { id: 0, x: 4, y: 8, rotation: -3 },   // 艺起搭 · 大卡 · 左侧 42% 宽
      { id: 1, x: 62, y: 4, rotation: 3 },   // 修图助手 · 小卡 · 右上
      { id: 2, x: 65, y: 46, rotation: -2 }, // IdeaSalon · 小卡 · 右下
    ];
  }
  // 通用布局（确定性 rotation，避免 SSR 不一致）
  const positions: TicketPosition[] = [];
  const cols = Math.min(count, 3);
  const spacing = (100 - TONGJI_CARD_WIDTH_PCT) / Math.max(cols, 1);
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({
      id: i,
      x: spacing * 0.3 + col * spacing,
      y: 8 + row * 40,
      rotation: (i % 2 === 0 ? -1 : 1) * (2 + (i % 3)),
    });
  }
  return positions;
}

function TongjiFreeCanvas({
  projects,
  onSelectProject,
}: {
  projects: IDProject[];
  onSelectProject: (project: IDProject) => void;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<TicketPosition[]>(() =>
    getTongjiDefaultPositions(projects.length)
  );
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [activeZId, setActiveZId] = useState<number | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressActive = useRef(false);
  const hasMoved = useRef(false);
  const dragStartMouse = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  /** 长按开始 → 激活拖拽 */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, idx: number) => {
      const startX = e.clientX;
      const startY = e.clientY;
      hasMoved.current = false;

      longPressTimer.current = setTimeout(() => {
        isLongPressActive.current = true;
        setDraggingId(idx);
        setActiveZId(idx);
        dragStartMouse.current = { x: startX, y: startY };
        const pos = positions.find((p) => p.id === idx);
        if (pos) {
          dragStartPos.current = { x: pos.x, y: pos.y };
        }
      }, 400);
    },
    [positions]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (
        !isLongPressActive.current ||
        draggingId === null ||
        !canvasRef.current
      )
        return;

      hasMoved.current = true;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const dx = e.clientX - dragStartMouse.current.x;
      const dy = e.clientY - dragStartMouse.current.y;

      const dxPct = (dx / rect.width) * 100;
      const dyPct = (dy / rect.height) * 100;

      setPositions((prev) =>
        prev.map((p) => {
          if (p.id !== draggingId) return p;
          // 主推卡（id=0 艺起搭）宽度更大，右边界要相应收窄
          const draggedWidthPct =
            p.id === 0
              ? TONGJI_CARD_WIDTH_EMPHASIZE_PCT
              : TONGJI_CARD_WIDTH_PCT;
          return {
            ...p,
            x: Math.max(
              0,
              Math.min(100 - draggedWidthPct, dragStartPos.current.x + dxPct)
            ),
            y: Math.max(0, Math.min(75, dragStartPos.current.y + dyPct)),
          };
        })
      );

      e.preventDefault();
    },
    [draggingId]
  );

  const handlePointerUp = useCallback(
    (idx: number) => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      if (isLongPressActive.current) {
        isLongPressActive.current = false;
        setDraggingId(null);
        // 如果拖拽过就不触发点击
        return;
      }
      // 短按 → 点击打开项目
      const project = projects[idx];
      if (project && !hasMoved.current) {
        // 优先级 1：有独立落地页 → 路由跳转
        if (project.detailHref) {
          router.push(project.detailHref);
          return;
        }
        // 优先级 2：有外链 → 新标签打开
        if (project.videoUrl) {
          window.open(project.videoUrl, "_blank", "noopener,noreferrer");
        } else {
          // 优先级 3：内联详情
          onSelectProject(project);
        }
      }
    },
    [projects, onSelectProject, router]
  );

  // 全局 pointer up 兜底
  useEffect(() => {
    const handleGlobalUp = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      if (isLongPressActive.current) {
        isLongPressActive.current = false;
        setDraggingId(null);
      }
    };
    window.addEventListener("pointerup", handleGlobalUp);
    window.addEventListener("pointercancel", handleGlobalUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalUp);
      window.removeEventListener("pointercancel", handleGlobalUp);
    };
  }, []);

  // ============ 移动端垂直列表模式 ============
  if (isMobile) {
    return (
      <div className="w-full space-y-4 pb-6">
        {projects.map((project) => (
          <div key={project.id} className="w-full">
            <TongjiProjectCard
              project={project}
              onClick={() => {
                if (project.detailHref) {
                  router.push(project.detailHref);
                } else if (project.videoUrl) {
                  window.open(project.videoUrl, "_blank", "noopener,noreferrer");
                } else {
                  onSelectProject(project);
                }
              }}
            />
          </div>
        ))}
        <p className="text-[11px] text-ink-muted/40 tracking-wider text-center pt-2">
          点击卡片查看项目详情
        </p>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full select-none"
      style={{
        /* 主推卡放大 1.5× 后纵向占位更大，画布高度适度加高 */
        height: "clamp(480px, 72vh, 780px)",
        cursor: draggingId !== null ? "grabbing" : "default",
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={() => {
        if (isLongPressActive.current) {
          isLongPressActive.current = false;
          setDraggingId(null);
        }
      }}
      onPointerCancel={() => {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
        isLongPressActive.current = false;
        setDraggingId(null);
      }}
    >
      {/* 画布底部网格装饰 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {positions.map((pos, idx) => {
        const project = projects[idx];
        if (!project) return null;

        const isDragging = draggingId === pos.id;
        const isTopZ = activeZId === pos.id;
        // 首位卡片（艺起搭）主推：PC 端封面放大 1.5×
        const isEmphasize = idx === 0;
        const widthPct = isEmphasize
          ? TONGJI_CARD_WIDTH_EMPHASIZE_PCT
          : TONGJI_CARD_WIDTH_PCT;

        return (
          <div
            key={pos.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${widthPct}%`,
              transform: `rotate(${pos.rotation}deg) ${isDragging ? "scale(1.05)" : ""}`,
              transition: isDragging
                ? "transform 0.1s ease, box-shadow 0.2s ease"
                : "left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease",
              zIndex: isDragging ? 100 : isTopZ ? 50 : 1,
              filter: isDragging
                ? "drop-shadow(0 12px 24px rgba(0,0,0,0.25))"
                : "drop-shadow(0 4px 12px rgba(0,0,0,0.12))",
            }}
            onPointerDown={(e) => handlePointerDown(e, idx)}
            onPointerUp={() => handlePointerUp(idx)}
          >
            <TongjiProjectCard
              project={project}
              onClick={() => {
                // 优先级 1：独立落地页 → 路由跳转
                if (project.detailHref) {
                  router.push(project.detailHref);
                  return;
                }
                // 优先级 2：外链 → 新标签打开
                if (project.videoUrl) {
                  window.open(project.videoUrl, "_blank", "noopener,noreferrer");
                } else {
                  onSelectProject(project);
                }
              }}
            />
          </div>
        );
      })}

      {/* 提示文字 */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-[11px] text-ink-muted/40 tracking-wider">
          长按封面可自由拖拽摆放 · 点击封面查看项目详情 · 首推「艺起搭」放大展示
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   同济项目模块详情 — 四大模块按钮 + 小图片自由拖拽画布
   ============================================================ */

const TONGJI_IMG_WIDTH_PCT = 22; // 模块内图片宽度占画布百分比（约为原来的 1/4）

/** 使用 seeded random 让同一模块每次打开布局一致 */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getModuleImagePositions(count: number, seed = 42): TicketPosition[] {
  const positions: TicketPosition[] = [];
  const rand = seededRandom(seed);

  // 将画布划分为若干区域，每个图片随机落在一个区域内，避免重叠
  const maxX = 100 - TONGJI_IMG_WIDTH_PCT;
  const maxY = 72; // 留底部空间给提示文字

  for (let i = 0; i < count; i++) {
    // 在画布上随机散落
    let x: number, y: number;
    let attempts = 0;
    do {
      x = rand() * maxX;
      y = rand() * maxY;
      attempts++;
      // 检查与已有位置是否过于重叠
    } while (
      attempts < 30 &&
      positions.some(
        (p) =>
          Math.abs(p.x - x) < TONGJI_IMG_WIDTH_PCT * 0.6 &&
          Math.abs(p.y - y) < 18
      )
    );

    positions.push({
      id: i,
      x,
      y,
      rotation: (rand() - 0.5) * 12, // -6 ~ +6 度随机旋转
    });
  }
  return positions;
}

function TongjiModuleDetail({
  project,
  onBack,
}: {
  project: IDProject;
  onBack: () => void;
}) {
  const isMobile = useIsMobile();
  const modules = tongjiModulesMap[project.id] || [];
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const activeModule = modules[activeModuleIdx];
  const images = activeModule?.images || [];

  // 每次切换模块时重新计算位置（用 seed 保证同一模块布局一致）
  const [positions, setPositions] = useState<TicketPosition[]>(() =>
    getModuleImagePositions(images.length, activeModuleIdx * 100 + project.id)
  );
  useEffect(() => {
    setPositions(getModuleImagePositions(images.length, activeModuleIdx * 100 + project.id));
  }, [activeModuleIdx, images.length, project.id]);

  // 拖拽状态
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [activeZId, setActiveZId] = useState<number | null>(null);
  const dragStartMouse = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });

  // 灯箱
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /** pointerDown → 立即开始拖拽 */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, idx: number) => {
      e.preventDefault();
      setDraggingId(idx);
      setActiveZId(idx);
      dragStartMouse.current = { x: e.clientX, y: e.clientY };
      const pos = positions.find((p) => p.id === idx);
      if (pos) {
        dragStartPos.current = { x: pos.x, y: pos.y };
      }
    },
    [positions]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (draggingId === null || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const dx = e.clientX - dragStartMouse.current.x;
      const dy = e.clientY - dragStartMouse.current.y;
      const dxPct = (dx / rect.width) * 100;
      const dyPct = (dy / rect.height) * 100;

      setPositions((prev) =>
        prev.map((p) =>
          p.id === draggingId
            ? {
                ...p,
                x: Math.max(
                  0,
                  Math.min(100 - TONGJI_IMG_WIDTH_PCT, dragStartPos.current.x + dxPct)
                ),
                y: Math.max(0, Math.min(80, dragStartPos.current.y + dyPct)),
              }
            : p
        )
      );
      e.preventDefault();
    },
    [draggingId]
  );

  const handlePointerUp = useCallback(
    (idx: number, didMove: boolean) => {
      setDraggingId(null);
      // 如果没有移动过，视为点击 → 打开灯箱
      if (!didMove) {
        setLightboxIndex(idx);
      }
    },
    []
  );

  // 全局 pointer up 兜底
  useEffect(() => {
    const handleGlobalUp = () => {
      setDraggingId(null);
    };
    window.addEventListener("pointerup", handleGlobalUp);
    window.addEventListener("pointercancel", handleGlobalUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalUp);
      window.removeEventListener("pointercancel", handleGlobalUp);
    };
  }, []);

  return (
    <div className="w-full" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* 返回按钮 + 项目标题 */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="group flex-shrink-0 transition-all duration-300 hover:opacity-70 active:scale-[0.95]"
        >
          <svg viewBox="0 0 1024 1024" className="w-8 h-8 transition-transform group-hover:-translate-x-0.5 rotate-180" fill="var(--accent)">
            <path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" />
            <path d="M732.959548 501.152426c-0.032684-0.127295-0.192662-0.25631-0.25631-0.383604-1.536138-3.615858-3.648542-7.071738-6.591802-10.047682-0.032684-0.032684-0.063647-0.032684-0.096331-0.063647-0.032684-0.032684-0.032684-0.063647-0.063647-0.096331l-158.911974-159.359226c-12.480043-12.480043-32.704421-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l103.328907 103.616181L320 480.00258c-17.664722 0-31.99914 14.336138-31.99914 32.00086s14.336138 32.00086 31.99914 32.00086l306.752748 0-106.112189 104.959656c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l160.25545-158.495686C735.328262 526.592447 737.72794 512.767209 732.959548 501.152426z" />
          </svg>
        </button>
        <div>
          <h3 className="text-lg font-black text-ink leading-tight tracking-wide">{project.name}</h3>
          <p className="text-xs text-ink-muted mt-0.5">{project.subtitleEn}</p>
        </div>
      </div>

      {/* 四大模块 Tab - 移动端支持横向滚动 */}
      <div className="flex items-end gap-5 md:gap-6 mb-5 overflow-x-auto no-scrollbar -mx-1 px-1">
        {modules.map((mod, idx) => {
          const isActive = idx === activeModuleIdx;
          return (
            <button
              key={mod.key}
              onClick={() => setActiveModuleIdx(idx)}
              className="relative pb-2 transition-all duration-300 focus:outline-none group tracking-wide flex-shrink-0"
              style={{
                fontSize: isActive ? (isMobile ? "14px" : "16px") : (isMobile ? "12px" : "14px"),
                fontWeight: isActive ? 800 : 500,
                color: isActive ? "var(--ink)" : "rgba(52,52,52,0.55)",
              }}
            >
              <span className="relative z-10 transition-all duration-300">
                {isActive ? mod.labelEn.toUpperCase() : mod.labelEn}
              </span>

              {isActive && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none"
                  style={{
                    width: "110%",
                    height: "3px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent)",
                    opacity: 0.6,
                    animation: "fadeIn 0.3s ease-out",
                  }}
                />
              )}

              {!isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 group-hover:w-[80%] h-[2px] rounded-full bg-ink/15 transition-all duration-300 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* 图片展示区域 - 移动端垂直列表，桌面端自由拖拽画布 */}
      {isMobile ? (
        <div className="w-full space-y-3">
          {images.map((imgItem, idx) => (
            <div
              key={`${activeModuleIdx}-${idx}`}
              className="w-full rounded-lg overflow-hidden shadow-md cursor-zoom-in"
              onClick={() => setLightboxIndex(idx)}
            >
              <img
                src={imgItem.image}
                alt={imgItem.text || `${project.name} - ${idx + 1}`}
                className="w-full h-auto block"
                draggable={false}
              />
            </div>
          ))}
          <p className="text-[10px] text-ink-muted/40 tracking-wider text-center pt-2">
            点击图片查看大图
          </p>
        </div>
      ) : (
        <div
          ref={canvasRef}
          className="relative w-full select-none rounded-lg"
          style={{
            height: "clamp(380px, 58vh, 640px)",
            cursor: draggingId !== null ? "grabbing" : "default",
            background: "rgba(0,0,0,0.02)",
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setDraggingId(null)}
          onPointerCancel={() => setDraggingId(null)}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {positions.map((pos) => {
            const imgItem = images[pos.id];
            if (!imgItem) return null;

            const isDragging = draggingId === pos.id;
            const isTopZ = activeZId === pos.id;

            return (
              <DraggableImageCard
                key={`${activeModuleIdx}-${pos.id}`}
                pos={pos}
                imgItem={imgItem}
                isDragging={isDragging}
                isTopZ={isTopZ}
                widthPct={TONGJI_IMG_WIDTH_PCT}
                onPointerDown={(e) => handlePointerDown(e, pos.id)}
                onPointerUp={(didMove) => handlePointerUp(pos.id, didMove)}
              />
            );
          })}

          <div className="absolute bottom-2.5 left-0 right-0 text-center pointer-events-none">
            <span className="text-[10px] text-ink-muted/35 tracking-wider">
              拖拽移动图片位置 · 点击图片查看大图
            </span>
          </div>
        </div>
      )}

      {/* 图片灯箱 */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

/* ============================================================
   可拖拽图片卡片（模块详情内使用）
   ============================================================ */

function DraggableImageCard({
  pos,
  imgItem,
  isDragging,
  isTopZ,
  widthPct,
  onPointerDown,
  onPointerUp,
}: {
  pos: TicketPosition;
  imgItem: { image: string; text: string };
  isDragging: boolean;
  isTopZ: boolean;
  widthPct: number;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (didMove: boolean) => void;
}) {
  const hasMoved = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleDown = useCallback(
    (e: React.PointerEvent) => {
      hasMoved.current = false;
      startPos.current = { x: e.clientX, y: e.clientY };
      onPointerDown(e);
    },
    [onPointerDown]
  );

  const handleMove = useCallback(() => {
    hasMoved.current = true;
  }, []);

  const handleUp = useCallback(() => {
    onPointerUp(hasMoved.current);
  }, [onPointerUp]);

  return (
    <div
      className="absolute rounded-lg overflow-hidden"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: `${widthPct}%`,
        transform: `rotate(${pos.rotation}deg) ${isDragging ? "scale(1.08)" : ""}`,
        transition: isDragging
          ? "transform 0.1s ease"
          : "left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease",
        zIndex: isDragging ? 100 : isTopZ ? 50 : 1,
        filter: isDragging
          ? "drop-shadow(0 10px 20px rgba(0,0,0,0.25))"
          : "drop-shadow(0 3px 8px rgba(0,0,0,0.1))",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
    >
      <img
        src={imgItem.image}
        alt={imgItem.text || ""}
        className="w-full h-auto block rounded-lg"
        draggable={false}
      />
    </div>
  );
}

/* ============================================================
   图片灯箱 — 点击放大查看大图
   ============================================================ */

function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: { image: string; text: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [index, setIndex] = useState(currentIndex);
  const total = images.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    >
      {/* 半透明遮罩 */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      {/* 图片计数 */}
      {total > 1 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white/50 text-sm tracking-wider">
          {index + 1} / {total}
        </div>
      )}

      {/* 左箭头 */}
      {index > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* 右箭头 */}
      {index < total - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* 大图 */}
      <div
        className="relative z-[1] max-w-[92vw] max-h-[90vh] flex items-center justify-center"
        style={{ animation: "lightboxZoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        <img
          src={images[index].image}
          alt={images[index].text || `Image ${index + 1}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ============================================================
   项目详情页（内嵌版，非蒙层）
   ============================================================ */

function InlineProjectDetail({
  project,
  onBack,
}: {
  project: IDProject;
  onBack: () => void;
}) {
  const isSingleWithVideo = project.galleryItems.length <= 1 && !!project.videoUrl;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div
      className="w-full"
      style={{ animation: "fadeIn 0.4s ease-out" }}
    >
      {/* 返回按钮 + 项目标题 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="group flex-shrink-0 transition-all duration-300 hover:opacity-70 active:scale-[0.95]"
        >
          <svg viewBox="0 0 1024 1024" className="w-8 h-8 transition-transform group-hover:-translate-x-0.5 rotate-180" fill="var(--accent)">
            <path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" />
            <path d="M732.959548 501.152426c-0.032684-0.127295-0.192662-0.25631-0.25631-0.383604-1.536138-3.615858-3.648542-7.071738-6.591802-10.047682-0.032684-0.032684-0.063647-0.032684-0.096331-0.063647-0.032684-0.032684-0.032684-0.063647-0.063647-0.096331l-158.911974-159.359226c-12.480043-12.480043-32.704421-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l103.328907 103.616181L320 480.00258c-17.664722 0-31.99914 14.336138-31.99914 32.00086s14.336138 32.00086 31.99914 32.00086l306.752748 0-106.112189 104.959656c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l160.25545-158.495686C735.328262 526.592447 737.72794 512.767209 732.959548 501.152426z" />
          </svg>
        </button>
        <div>
          <h3 className="text-lg font-black text-ink leading-tight tracking-wide">{project.name}</h3>
          <p className="text-xs text-ink-muted mt-0.5">{project.nameCn}</p>
        </div>
      </div>

      {isSingleWithVideo ? (
        <div className="flex flex-col items-center gap-6">
          {project.galleryItems[0] && (
            <img
              src={project.galleryItems[0].image}
              alt={project.name}
              className="max-h-[50vh] w-auto rounded-lg shadow-xl object-contain cursor-zoom-in hover:shadow-2xl transition-shadow duration-300"
              draggable={false}
              onClick={() => setLightboxIndex(0)}
            />
          )}
          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink/8 hover:bg-ink/15 text-ink/70 hover:text-ink transition-colors text-sm tracking-wide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            点击查看视频
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {project.galleryItems.map((item, i) => (
            <div
              key={i}
              className="w-full cursor-zoom-in"
              style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.06}s both` }}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={item.image}
                alt={item.text || `${project.name} - ${i + 1}`}
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}

      {/* 图片灯箱 */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={project.galleryItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

/* ============================================================
   打开的书本内容（翻页模式，内嵌版）
   ============================================================ */
function InlineBookContent({
  book,
  onBack,
}: {
  book: BookData;
  onBack: () => void;
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
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (totalPages === 0) return null;
  const page = book.pages[currentPage];

  return (
    <div className="w-full" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* 返回按钮 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="group flex-shrink-0 transition-all duration-300 hover:opacity-70 active:scale-[0.95]"
        >
          <svg viewBox="0 0 1024 1024" className="w-8 h-8 transition-transform group-hover:-translate-x-0.5 rotate-180" fill="var(--accent)">
            <path d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128c-211.744443 0-384 172.255557-384 384s172.255557 384 384 384 384-172.255557 384-384S723.744443 128 512 128z" />
            <path d="M732.959548 501.152426c-0.032684-0.127295-0.192662-0.25631-0.25631-0.383604-1.536138-3.615858-3.648542-7.071738-6.591802-10.047682-0.032684-0.032684-0.063647-0.032684-0.096331-0.063647-0.032684-0.032684-0.032684-0.063647-0.063647-0.096331l-158.911974-159.359226c-12.480043-12.480043-32.704421-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l103.328907 103.616181L320 480.00258c-17.664722 0-31.99914 14.336138-31.99914 32.00086s14.336138 32.00086 31.99914 32.00086l306.752748 0-106.112189 104.959656c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.239161 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l160.25545-158.495686C735.328262 526.592447 737.72794 512.767209 732.959548 501.152426z" />
          </svg>
        </button>
        <div>
          <h3 className="text-lg font-black text-ink leading-tight tracking-wide">{book.name}</h3>
          <p className="text-xs text-ink-muted mt-0.5">{book.subtitle}</p>
        </div>
      </div>

      {/* 书本内容 - 桌面端左右两页；移动端上下堆叠 */}
      <div
        className="flex flex-col md:flex-row rounded-lg shadow-2xl overflow-hidden md:aspect-[16/10]"
      >
        {/* 左页/顶部 - 图片 */}
        <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative" style={{ backgroundColor: book.coverColor }}>
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

        {/* 右页/下方 - 文字 */}
        <div className="w-full md:w-1/2 bg-[#FEFCF8] relative p-5 md:p-8 flex flex-col">
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

          <div className="flex items-center justify-between mb-4 md:mb-6">
            <span className="text-[10px] text-ink-muted uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
              {book.name}
            </span>
            <span className="text-[10px] text-ink-muted">
              {currentPage + 1} / {totalPages}
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-ink mb-3 md:mb-4 leading-tight">{page.title}</h3>
            <div className="w-10 h-[2px] bg-accent/30 mb-5 rounded-full" />
            <p className="text-ink-light leading-relaxed whitespace-pre-line text-sm">{page.desc}</p>
          </div>

          <div className="flex items-center justify-between mt-5 md:mt-6 relative z-10">
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
  );
}

/* ============================================================
   展开后的书本内容区域
   ============================================================ */

type ContentPhase = "tickets" | "detail";

function ExpandedBookContent({
  book,
  onClose,
}: {
  book: BookData;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<ContentPhase>("tickets");
  const [selectedProject, setSelectedProject] = useState<IDProject | null>(null);

  const handleTearComplete = useCallback((id: number) => {
    const project = (book.projects || []).find((p) => p.id === id);
    if (project) {
      setTimeout(() => {
        setSelectedProject(project);
        setPhase("detail");
      }, 300);
    }
  }, [book.projects]);

  const handleBackToTickets = useCallback(() => {
    setSelectedProject(null);
    setPhase("tickets");
  }, []);

  // 同济课程作业画廊模式
  if (book.displayMode === "tongji-gallery") {
    if (phase === "detail" && selectedProject) {
      return (
        <TongjiModuleDetail
          project={selectedProject}
          onBack={handleBackToTickets}
        />
      );
    }
    return (
      <TongjiFreeCanvas
        projects={book.projects || []}
        onSelectProject={(project) => {
          setSelectedProject(project);
          setPhase("detail");
        }}
      />
    );
  }

  // 工业设计画廊模式
  if (book.displayMode === "id-gallery") {
    if (phase === "detail" && selectedProject) {
      return (
        <InlineProjectDetail
          project={selectedProject}
          onBack={handleBackToTickets}
        />
      );
    }
    return (
      <FreePositionCanvas
        projects={book.projects || []}
        onTearComplete={handleTearComplete}
      />
    );
  }

  // 翻页书本模式（默认）
  return <InlineBookContent book={book} onBack={onClose} />;
}

/* ============================================================
   Works Section 主组件
   ============================================================ */
export default function WorksSection() {
  // 默认打开 In Tongji Works（index 0），不再有「合起来」状态
  const [openBookIndex, setOpenBookIndex] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBookClick = useCallback((index: number) => {
    // 点其他书本切换；点当前书本不做任何操作（不再支持合起）
    if (index !== openBookIndex) {
      setOpenBookIndex(index);
    }
  }, [openBookIndex]);

  const handleClose = useCallback(() => {
    // 保留 API 以兼容旧逻辑，但默认不再收起
    setOpenBookIndex(0);
  }, []);

  // 切换书本时滚动到内容区域（跳过首次挂载，避免加载就把页面强行滚到 Works）
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [openBookIndex]);

  // 从项目落地页返回时，自动滚动到 Works 板块
  // 触发条件：sessionStorage.returnTo === "works" 或 URL hash === "#works"
  useEffect(() => {
    if (typeof window === "undefined") return;
    let shouldScroll = false;
    try {
      if (sessionStorage.getItem("returnTo") === "works") {
        shouldScroll = true;
        sessionStorage.removeItem("returnTo");
      }
    } catch {
      // ignore
    }
    if (!shouldScroll && window.location.hash === "#works") {
      shouldScroll = true;
    }
    if (shouldScroll) {
      // 稍微延迟等 layout 稳定
      setTimeout(() => {
        const el = document.getElementById("works");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, []);

  // 现在默认就是展开态，openBookIndex 一定是有效索引
  const openedBook = books[openBookIndex];
  const isExpanded = true;

  return (
    <section id="works" className="pt-16 md:pt-24 px-3 md:px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="relative inline-flex items-center">
              <svg className="hidden md:block absolute -left-9 -top-3 w-5 h-5 pointer-events-none" viewBox="0 0 24 24" fill="none">
                <path d="M12 4 C12 4, 13 9, 12 12 C12 12, 17 11, 20 12 C20 12, 17 13, 12 12 C12 12, 13 17, 12 20 C12 20, 11 17, 12 12 C12 12, 7 13, 4 12 C4 12, 7 11, 12 12 C12 12, 11 9, 12 4Z" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.45" strokeLinecap="round" />
              </svg>
              <svg className="hidden md:block absolute -right-10 -top-2 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 C12 2, 13 8, 12 12 C12 12, 18 11, 22 12 C22 12, 18 13, 12 12 C12 12, 13 18, 12 22 C12 22, 11 18, 12 12 C12 12, 6 13, 2 12 C2 12, 6 11, 12 12 C12 12, 11 8, 12 2Z" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="hidden md:block absolute -left-5 bottom-0 w-3 h-3 pointer-events-none" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="2" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.25" />
                <path d="M6 1 L6 3 M6 9 L6 11 M1 6 L3 6 M9 6 L11 6" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
              </svg>
              <h2 className="text-2xl md:text-4xl font-handwriting font-bold text-ink">Works</h2>
              {/* 小黑猫 - 跳舞猫在标题右侧（移动端缩小并靠近） */}
              <img
                src={cdnUrl("/cat-dance.png")}
                alt="小黑猫"
                className="absolute -right-16 -top-6 w-12 md:-right-28 md:-top-10 md:w-20 h-auto pointer-events-none select-none"
                draggable={false}
              />
            </div>
            <div className="w-12 h-[2px] bg-accent/30 mt-3 rounded-full" />
            <p className="text-xs md:text-sm text-ink-muted mt-3 px-4 text-center">
              点击左侧另一本书切换查看
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* 笔记本线圈装饰 + 暖色背景区域 */}
      <div className="relative">
        <div
          className="w-full h-[36px] md:h-[50px] bg-repeat-x bg-center bg-contain relative z-10"
          style={{
            backgroundImage: `url(${cdnUrl("/notebook-rings.png")})`,
            backgroundSize: "auto 100%",
          }}
        />
        <div
          className="px-3 md:px-6 transition-all duration-700 ease-out"
          style={{
            backgroundColor: "rgb(242, 227, 207)",
            paddingBottom: isExpanded ? "2rem" : "4rem",
            minHeight: isExpanded ? "80vh" : "auto",
          }}
        >
          <div className="max-w-7xl mx-auto pt-6 md:pt-10 pb-4">
            {/* 默认展开：桌面端 左侧书本 + 右侧内容；移动端 顶部横向书本 tab + 下方内容 */}
            {openedBook && (
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                {/* 书本栏 - 移动端顶部横向，桌面端左侧纵向 */}
                <div className="flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-4 flex-shrink-0 pt-2 w-full md:w-auto justify-center overflow-x-auto">
                  {books.map((book, index) => {
                    const variant = index === openBookIndex ? "selected" : "unselected";
                    return (
                      <BookCover
                        key={book.name}
                        book={book}
                        onClick={() => handleBookClick(index)}
                        variant={variant}
                        isActive={index === openBookIndex}
                      />
                    );
                  })}
                </div>

                {/* 分隔线 - 仅桌面 */}
                <div
                  className="w-[1px] self-stretch bg-ink/10 flex-shrink-0 hidden md:block"
                  style={{ animation: "fadeIn 0.5s ease-out 0.2s both" }}
                />

                {/* 内容区域 */}
                <div
                  ref={contentRef}
                  className="flex-1 min-w-0 w-full overflow-hidden"
                  style={{ animation: "fadeIn 0.5s ease-out 0.15s both" }}
                >
                  <ExpandedBookContent
                    key={openBookIndex}
                    book={openedBook}
                    onClose={handleClose}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
