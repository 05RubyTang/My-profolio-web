"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
} from "lucide-react";

// 歌单数据
const playlist = [
  {
    id: 1,
    title: "六月的雨",
    artist: "火鸡",
    src: "https://music.163.com/song/media/outer/url?id=1959359750.mp3",
    cover:
      "https://p2.music.126.net/rKK9SSz-Rafs6ZbEabgFNw==/109951167596673807.jpg?param=130y130",
  },
  {
    id: 2,
    title: "How are U",
    artist: "NaCho",
    src: "https://music.163.com/song/media/outer/url?id=1314885103.mp3",
    cover:
      "https://p1.music.126.net/XyO2oKPYshQtDofsYMYLiA==/109951163583136003.jpg?param=130y130",
  },
  {
    id: 3,
    title: "致你",
    artist: "yihuik苡慧",
    src: "https://music.163.com/song/media/outer/url?id=1867217766.mp3",
    cover:
      "https://p2.music.126.net/VDmN2dNpIFu4gTv4bZe6KQ==/109951166254691365.jpg?param=130y130",
  },
];

export default function VinylPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 拖拽相关状态
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const hasDraggedRef = useRef(false);

  const currentSong = playlist[currentIndex];

  // 播放/暂停
  const togglePlay = useCallback(() => {
    if (hasDraggedRef.current) return; // 拖拽结束时不触发播放
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // 下一首
  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  }, []);

  // 上一首
  const prevTrack = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + playlist.length) % playlist.length
    );
    setIsPlaying(true);
  }, []);

  // ===== 拖拽逻辑 =====
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // 如果点击的是控制按钮，不启动拖拽
      if ((e.target as HTMLElement).closest("[data-control]")) return;

      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      // 超过 4px 才算拖拽（区分点击和拖拽）
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasDraggedRef.current = true;
      }

      // 计算新位置（注意：right/bottom 定位，所以方向取反）
      const newX = dragStartRef.current.posX - dx;
      const newY = dragStartRef.current.posY - dy;

      // 边界限制
      const size = 112; // 唱片尺寸
      const maxX = window.innerWidth - size - 8;
      const maxY = window.innerHeight - size - 8;

      setPosition({
        x: Math.max(-16, Math.min(newX, maxX)),
        y: Math.max(-16, Math.min(newY, maxY)),
      });
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    // 延迟重置拖拽标记，让 click 事件能读到
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  }, []);

  // 切歌时自动播放
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setIsLoaded(false);
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentIndex, isPlaying]);

  // 时间更新
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(
        audio.duration ? (audio.currentTime / audio.duration) * 100 : 0
      );
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const onEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [nextTrack]);

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-[999] select-none touch-none"
      style={{
        right: `${24 + position.x}px`,
        bottom: `${24 + position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* ===== 唱片主体 ===== */}
      <div
        className="relative w-28 h-28 rounded-full"
        style={{
          boxShadow:
            "0 6px 24px rgba(44, 36, 24, 0.25), 0 2px 8px rgba(44, 36, 24, 0.12), 3px 3px 0 rgba(44, 36, 24, 0.06)",
          border: "2.5px solid rgba(44, 36, 24, 0.18)",
        }}
      >
        {/* 唱片本体 - 旋转 */}
        {/* 封面半径:黑胶带宽度 = 2:1，封面占总半径 2/3 ≈ 66.7% */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            isPlaying ? "animate-spin-vinyl" : ""
          }`}
          style={{
            background: `
              radial-gradient(circle at center,
                var(--accent) 0%, var(--accent) 66%,
                transparent 66%, transparent 67%,
                #1a1a1a 67%, #1a1a1a 68%,
                #222 68%, #111 73%,
                #222 78%, #111 83%,
                #222 88%, #111 93%,
                #1a1a1a 98%, #0d0d0d 100%
              )
            `,
          }}
        >
          {/* 黑胶反光效果 - 不随唱片旋转 */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none z-[1]"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  transparent 0%,
                  transparent 30%,
                  rgba(255,255,255,0.12) 38%,
                  rgba(255,255,255,0.06) 42%,
                  transparent 50%,
                  transparent 60%,
                  rgba(255,255,255,0.08) 65%,
                  rgba(255,255,255,0.03) 70%,
                  transparent 80%,
                  transparent 100%
                )
              `,
              mixBlendMode: "screen",
            }}
          />
          {/* 中心封面 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[66%] h-[66%] rounded-full bg-accent flex items-center justify-center shadow-inner overflow-hidden z-[2]">
            {currentSong.cover ? (
              <img
                src={currentSong.cover}
                alt=""
                className="w-full h-full rounded-full object-cover"
                draggable={false}
              />
            ) : (
              <Music size={20} className="text-paper-light" />
            )}
            <div className="absolute w-1.5 h-1.5 rounded-full bg-ink/50" />
          </div>
        </div>

        {/* 唱针 */}
        <div
          className={`absolute -top-2 -right-1.5 origin-top-left transition-transform duration-500 z-10 ${
            isPlaying ? "rotate-[28deg]" : "rotate-[5deg]"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-ink-muted border-[1.5px] border-ink/30 shadow-sm" />
          <div className="w-[1.5px] h-12 bg-gradient-to-b from-ink-muted to-ink-light ml-[5px] -mt-0.5 rounded-b-full" />
          <div className="w-2 h-2.5 bg-ink ml-[3px] -mt-0.5 rounded-b-full" />
        </div>

        {/* ===== Hover 遮罩 + 控制按钮 ===== */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
            isHovered && !isDragging
              ? "bg-ink/60 backdrop-blur-[2px]"
              : "bg-transparent"
          }`}
        >
          {/* 歌曲信息 */}
          <div
            className={`text-center transition-all duration-300 mb-1 ${
              isHovered && !isDragging
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1"
            }`}
          >
            <p className="text-paper-light text-[10px] font-bold truncate max-w-[80px] drop-shadow-md leading-tight">
              {currentSong.title}
            </p>
            <p className="text-paper-light/70 text-[8px] truncate max-w-[80px] drop-shadow-sm">
              {currentSong.artist}
            </p>
          </div>

          {/* 控制按钮行 - 纯白色 icon，无底色 */}
          <div
            className={`flex items-center gap-3 transition-all duration-300 ${
              isHovered && !isDragging
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <button
              data-control
              onClick={(e) => {
                e.stopPropagation();
                prevTrack();
              }}
              className="p-1 flex items-center justify-center transition-opacity hover:opacity-70 active:scale-90"
              aria-label="上一首"
            >
              <SkipBack size={16} className="text-white drop-shadow-md" fill="white" />
            </button>

            <button
              data-control
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1 flex items-center justify-center transition-opacity hover:opacity-70 active:scale-90"
              aria-label={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? (
                <Pause size={22} className="text-white drop-shadow-md" fill="white" />
              ) : (
                <Play size={22} className="text-white drop-shadow-md ml-0.5" fill="white" />
              )}
            </button>

            <button
              data-control
              onClick={(e) => {
                e.stopPropagation();
                nextTrack();
              }}
              className="p-1 flex items-center justify-center transition-opacity hover:opacity-70 active:scale-90"
              aria-label="下一首"
            >
              <SkipForward size={16} className="text-white drop-shadow-md" fill="white" />
            </button>
          </div>

          {/* 进度环（环绕唱片边缘） */}
        </div>

        {/* 进度环 - 唱片外圈 */}
        <svg
          className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none"
          viewBox="0 0 120 120"
        >
          {/* 背景轨道 */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="rgba(44, 36, 24, 0.08)"
            strokeWidth="3"
          />
          {/* 进度弧 */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
            className="transition-all duration-300"
            style={{ opacity: progress > 0 ? 0.8 : 0 }}
          />
        </svg>
      </div>

      {/* 播放状态 - 音波指示器（不 hover 时显示） */}
      {isPlaying && !isHovered && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-[2px]">
          <div className="w-[3px] h-2 bg-accent rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-[3px] h-3 bg-accent rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-[3px] h-2 bg-accent rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      )}

      {/* 歌单指示器圆点（唱片下方） */}
      <div
        className={`flex justify-center gap-1 mt-2 transition-all duration-300 ${
          isHovered && !isDragging ? "opacity-100" : "opacity-0"
        }`}
      >
        {playlist.map((song, i) => (
          <button
            key={i}
            data-control
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
              setIsPlaying(true);
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIndex
                ? "bg-accent w-3.5"
                : "bg-ink/20 hover:bg-ink/40 w-1.5"
            }`}
            aria-label={`切换到 ${song.title}`}
          />
        ))}
      </div>

      {/* 隐藏的 audio 元素 */}
      <audio ref={audioRef} preload="metadata">
        <source src={currentSong.src} type="audio/mpeg" />
      </audio>
    </div>
  );
}
