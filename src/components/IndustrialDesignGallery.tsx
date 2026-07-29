"use client";

/**
 * IndustrialDesignGallery — 工业设计作品集展示组件
 *
 * 交互流程：
 * 1. 全屏弹窗展示 5 个项目卡片，每个卡片右侧磁吸一张票根
 * 2. 用户拖拽票根将其从项目卡片旁撕开
 * 3. 撕开后进入该项目的 CircularGallery 详情页
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { X, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("./CircularGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-white/60 text-sm">加载中...</span>
    </div>
  ),
});

/* ============================================================
   项目数据
   ============================================================ */

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
  /** CircularGallery 详情页的图片列表（待填充） */
  galleryItems: { image: string; text: string }[];
}

const projects: IDProject[] = [
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
    projectImage: "/picture/id-project/project1.png",
    ticketImage: "/picture/id-project/piaogen1.png",
    galleryItems: [
      { image: "/picture/id-project/project1.png", text: "FitBox AI - 概览" },
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
    projectImage: "/picture/id-project/project2.png",
    ticketImage: "/picture/id-project/piaogen2.png",
    galleryItems: [
      { image: "/picture/id-project/project2.png", text: "心守成长金 - 概览" },
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
    projectImage: "/picture/id-project/project3.png",
    ticketImage: "/picture/id-project/piaogen3.png",
    galleryItems: [
      { image: "/picture/id-project/project3.png", text: "AKSO - 概览" },
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
    projectImage: "/picture/id-project/project4.png",
    ticketImage: "/picture/id-project/piaogen4.png",
    galleryItems: [
      { image: "/picture/id-project/project4.png", text: "DENTGUARD - 概览" },
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
    projectImage: "/picture/id-project/project5.png",
    ticketImage: "/picture/id-project/piaogen5.png",
    galleryItems: [
      { image: "/picture/id-project/project5.png", text: "OTHERS - 概览" },
    ],
  },
];

/* ============================================================
   票根撕开卡片组件
   ============================================================ */

function ProjectCard({
  project,
  onTearComplete,
}: {
  project: IDProject;
  onTearComplete: (id: number) => void;
}) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tearState, setTearState] = useState<"attached" | "tearing" | "torn">("attached");
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const TEAR_THRESHOLD = 80; // 拖拽超过 80px 触发撕开

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
    // 只允许向右拖拽（撕开方向）
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
      // 撕开！
      setTearState("tearing");
      // 动画完成后标记为已撕开
      setTimeout(() => {
        setTearState("torn");
        onTearComplete(project.id);
      }, 600);
    } else {
      // 回弹
      setDragOffset(0);
    }
  }, [dragOffset, onTearComplete, project.id]);

  // 计算票根的变换
  const getTicketTransform = () => {
    if (tearState === "tearing") {
      return "translateX(200px) rotate(8deg)";
    }
    if (tearState === "torn") {
      return "translateX(300px) rotate(12deg) scale(0.9)";
    }
    if (dragOffset > 0) {
      const rotate = (dragOffset / TEAR_THRESHOLD) * 5;
      return `translateX(${dragOffset}px) rotate(${rotate}deg)`;
    }
    return "translateX(0)";
  };

  const getTicketOpacity = () => {
    if (tearState === "tearing") return 0;
    if (tearState === "torn") return 0;
    return 1;
  };

  // 磁吸连接处的"撕裂"视觉效果
  const tearProgress = Math.min(dragOffset / TEAR_THRESHOLD, 1);

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 group"
      style={{ width: "220px" }}
    >
      {/* 项目封面 */}
      <div
        className="relative rounded-l-lg overflow-hidden shadow-xl"
        style={{ aspectRatio: "3 / 5" }}
      >
        <img
          src={project.projectImage}
          alt={project.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* 票根 —— 磁吸在右侧 */}
      <div
        ref={ticketRef}
        className="absolute top-0 right-0 h-full select-none"
        style={{
          width: "90px",
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
          filter: isDragging.current && dragOffset > 20 ? `drop-shadow(-4px 2px 8px rgba(0,0,0,0.2))` : "none",
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

        {/* 拖拽提示 */}
        {tearState === "attached" && dragOffset === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="text-[10px] text-white font-medium whitespace-nowrap">拖拽撕开</span>
            </div>
          </div>
        )}
      </div>

      {/* 撕裂处的锯齿效果 */}
      {tearState === "attached" && tearProgress > 0 && (
        <div
          className="absolute top-0 h-full pointer-events-none z-[5]"
          style={{
            right: "90px",
            width: "4px",
            opacity: tearProgress,
            background: `repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 3px,
              rgba(255,255,255,0.6) 3px,
              rgba(255,255,255,0.6) 5px,
              transparent 5px,
              transparent 8px
            )`,
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   项目入口页 —— 5 个项目卡片横向排列
   ============================================================ */

function ProjectsOverview({
  onSelectProject,
  onClose,
}: {
  onSelectProject: (project: IDProject) => void;
  onClose: () => void;
}) {
  const [tornIds, setTornIds] = useState<Set<number>>(new Set());

  const handleTearComplete = useCallback(
    (id: number) => {
      setTornIds((prev) => new Set(prev).add(id));
      // 撕开后延迟一下再进入详情
      const project = projects.find((p) => p.id === id);
      if (project) {
        setTimeout(() => onSelectProject(project), 300);
      }
    },
    [onSelectProject]
  );

  /* 键盘 ESC 关闭 */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /* 禁止背景滚动 */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col">
      {/* 深色背景 */}
      <div
        className="absolute inset-0 bg-[#1a1a1a]"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* 顶部栏 */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ animation: "fadeInDown 0.4s ease-out" }}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-handwriting font-bold text-white">
            My Industrial Design
          </h3>
          <span className="text-xs text-white/40">·</span>
          <span className="text-sm text-white/50">设计保研作品集</span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* 操作提示 */}
      <div
        className="relative z-10 text-center mb-4"
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        <span className="text-xs text-white/30 tracking-wider">
          拖拽票根撕开，进入项目详情 · ESC 关闭
        </span>
      </div>

      {/* 项目卡片区域 */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center px-8"
        style={{ animation: "fadeIn 0.5s ease-out 0.1s both" }}
      >
        <div className="flex items-center gap-6 overflow-x-auto pb-4 px-4 max-w-full id-projects-scroll">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTearComplete={handleTearComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   项目详情页 —— CircularGallery
   ============================================================ */

function ProjectDetail({
  project,
  onBack,
  onClose,
}: {
  project: IDProject;
  onBack: () => void;
  onClose: () => void;
}) {
  /* 键盘 ESC 返回 */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onBack]);

  /* 禁止背景滚动 */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col">
      {/* 深色背景 */}
      <div
        className="absolute inset-0 bg-[#1a1a1a]"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* 顶部栏 */}
      <div
        className="relative z-10 flex items-center justify-between px-8 py-5"
        style={{ animation: "fadeInDown 0.4s ease-out" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors mr-2"
          >
            <ArrowLeft size={16} />
          </button>
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <span className="text-xs text-white/40">·</span>
          <span className="text-sm text-white/50">{project.nameCn}</span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* 操作提示 */}
      <div
        className="relative z-10 text-center mb-2"
        style={{ animation: "fadeIn 0.6s ease-out" }}
      >
        <span className="text-xs text-white/30 tracking-wider">
          拖拽 / 滚轮浏览 · ESC 返回
        </span>
      </div>

      {/* 画廊区域 */}
      <div
        className="relative z-10 flex-1"
        style={{ animation: "fadeIn 0.5s ease-out 0.1s both" }}
      >
        <CircularGallery
          items={project.galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          font="bold 24px Figtree"
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </div>
  );
}

/* ============================================================
   主组件 —— 管理三层状态
   ============================================================ */

export default function IndustrialDesignGallery({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selectedProject, setSelectedProject] = useState<IDProject | null>(null);

  const handleSelectProject = useCallback((project: IDProject) => {
    setSelectedProject(project);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProject(null);
  }, []);

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={handleBack}
        onClose={onClose}
      />
    );
  }

  return (
    <ProjectsOverview
      onSelectProject={handleSelectProject}
      onClose={onClose}
    />
  );
}
