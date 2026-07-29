"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { cdnUrl } from "@/lib/cdn";

const timeline = [
  {
    period: "2021 - 2025",
    title: "合肥工业大学",
    subtitle: "工业设计/Industrail Design",
    logo: cdnUrl("/logos/hfut.png"),
    type: "edu" as const,
  },
  {
    period: "2024.08 - 2025.02",
    title: "抖音生活服务",
    subtitle: "用户体验设计/UED",
    logo: cdnUrl("/logos/bytedance.svg"),
    type: "work" as const,
  },
  {
    period: "2025.02 - 2025.08",
    title: "小红书社区",
    subtitle: "用户研究/UR",
    logo: cdnUrl("/logos/xiaohongshu.svg"),
    type: "work" as const,
  },
  {
    period: "2025.08 - 2026.01",
    title: "抖音电商",
    subtitle: "b端产品/PM",
    logo: cdnUrl("/logos/bytedance.svg"),
    type: "work" as const,
  },
  {
    period: "2026.01 - 2026.03",
    title: "淘天",
    subtitle: "c端用户增长/AI PM",
    logo: cdnUrl("/logos/alibaba.svg"),
    type: "work" as const,
  },
  {
    period: "2026.03 - 至今",
    title: "小红书问一问点点",
    subtitle: "c端用户增长/AI PM",
    logo: cdnUrl("/logos/xiaohongshu.svg"),
    type: "work" as const,
    current: true,
  },
  {
    period: "2025 - 2028",
    title: "同济大学",
    subtitle: "人机交互/HCI",
    logo: cdnUrl("/logos/tongji.png"),
    type: "edu" as const,
  },
];

// ===== 照片墙数据 =====
interface PhotoItem {
  src: string;
  caption: string;
  rotate: number;
  company: string;
}

const photoWallLines: PhotoItem[][] = [
  // ---- 第一条线 ----
  [
    { src: cdnUrl("/picture/pin-wall/合工大-毕业1.png"), caption: "合工大毕业啦 🎓", rotate: -3, company: "合工大" },
    { src: cdnUrl("/picture/pin-wall/合工大-毕业2.png"), caption: "四年青春留念", rotate: 2, company: "合工大" },
    { src: cdnUrl("/picture/pin-wall/本地生活-工卡/first实习.png"), caption: "人生第一份实习工卡!", rotate: -1, company: "抖音" },
    { src: cdnUrl("/picture/pin-wall/用研-大合照.png"), caption: "用研团队大合照", rotate: 4, company: "小红书" },
    { src: cdnUrl("/picture/pin-wall/用研-拍立得.png"), caption: "用研日常拍立得", rotate: -2, company: "小红书" },
    { src: cdnUrl("/picture/pin-wall/用研-last day.png"), caption: "小红书用研 Last Day", rotate: 3, company: "小红书" },
    { src: cdnUrl("/picture/pin-wall/新疆-旅游.png"), caption: "新疆之旅 🏔️", rotate: -4, company: "旅行" },
  ],
  // ---- 第二条线 ----
  [
    { src: cdnUrl("/picture/pin-wall/抖音电商-last day.png"), caption: "抖音电商 Last Day", rotate: 2, company: "抖音" },
    { src: cdnUrl("/picture/pin-wall/淘天-樱花day.png"), caption: "淘天樱花日 🌸", rotate: -3, company: "淘天" },
    { src: cdnUrl("/picture/pin-wall/淘天-淘小宝卡片.png"), caption: "淘小宝 AI 卡片", rotate: 1, company: "淘天" },
    { src: cdnUrl("/picture/pin-wall/淘天-留言版.png"), caption: "淘天小伙伴留言板", rotate: -2, company: "淘天" },
    { src: cdnUrl("/picture/pin-wall/苏州-街拍.png"), caption: "苏州街头漫步 📷", rotate: 4, company: "旅行" },
    { src: cdnUrl("/picture/pin-wall/同济-tt设计学院.png"), caption: "同济设计创意学院", rotate: -1, company: "同济" },
  ],
];

// ===== 图钉 SVG 组件（星星、心形、圆形） =====

// 星星图钉
function StarPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 63 63" fill="none" className="pin">
      <path d="M16.759 50.0247C16.6729 50.0247 16.5929 50.0186 16.5068 50.0063C15.7008 49.8648 15.1594 49.1019 15.3009 48.3021L15.5778 46.6901C15.7131 45.8842 16.4822 45.3489 17.282 45.4843C18.0879 45.6258 18.6293 46.3887 18.4878 47.1885L18.211 48.8004C18.0879 49.5202 17.4665 50.0247 16.759 50.0247Z" fill="#8A1D13"/>
      <path d="M54.4482 26.7442L39.3873 24.554C38.9074 24.4863 38.489 24.1787 38.2737 23.748L33.6718 14.4211L29.3897 23.0959L24.7939 23.7604C24.5786 24.191 24.1664 24.4863 23.6865 24.554L11.9232 26.2644L24.4002 38.4275L22.2284 51.126L30.8478 46.5917C31.2785 46.3641 31.7953 46.3641 32.226 46.5917L36.0835 48.622L37.4493 47.9021L45.4289 52.098L43.1279 38.6798C43.0479 38.1999 43.2079 37.7077 43.5524 37.3693L54.4482 26.7442Z" fill="#FFA591"/>
      <path d="M47.6253 57.8566C47.3915 57.8566 47.1515 57.8013 46.9362 57.6844L31.5 49.5756L16.0638 57.6905C15.5654 57.9551 14.9625 57.9059 14.5072 57.5798C14.0519 57.2476 13.8243 56.6877 13.9166 56.134L14.6241 51.9996C14.7595 51.1937 15.5347 50.6522 16.3283 50.7938C17.1343 50.9353 17.6757 51.6981 17.5342 52.498L17.3311 53.6792L30.8048 46.5979C31.2354 46.3702 31.7522 46.3702 32.1829 46.5979L45.6565 53.6792L43.0848 38.6798C43.0049 38.1999 43.1648 37.7077 43.5094 37.3693L54.4113 26.7442L39.3504 24.554C38.8705 24.4863 38.4521 24.1787 38.2368 23.748L31.5 10.096L24.7693 23.748C24.554 24.1849 24.1356 24.4863 23.6557 24.554L8.59481 26.7442L19.4968 37.3693C19.8474 37.7077 20.0074 38.1999 19.9213 38.6798L19.1768 43.0049C19.0353 43.8108 18.2786 44.3522 17.4726 44.2107C16.6667 44.0754 16.1253 43.3064 16.2668 42.5065L16.8759 38.9505L4.38661 26.7812C3.98056 26.3874 3.83905 25.8029 4.01132 25.2677C4.18358 24.7324 4.64501 24.3448 5.20487 24.2648L22.4622 21.7547L30.1772 6.10312C30.4295 5.59863 30.9401 5.27871 31.5 5.27871C32.0599 5.27871 32.5766 5.59863 32.8227 6.10312L40.5439 21.7424L57.8013 24.2525C58.355 24.3325 58.8225 24.7201 58.9948 25.2554C59.1671 25.7906 59.0256 26.3812 58.6195 26.7688L46.1364 38.9443L49.0834 56.134C49.1757 56.6877 48.948 57.2476 48.4928 57.5798C48.2405 57.7644 47.9329 57.8566 47.6253 57.8566Z" fill="#8A1D13"/>
    </svg>
  );
}

// 心形图钉
function HeartPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 68 68" fill="none" className="pin">
      <path d="M33.9601 59.1879C33.5417 59.1879 33.13 59.0285 32.8113 58.7098L25.5 51.4184C24.8625 50.7809 24.8625 49.7516 25.5 49.1207C26.1375 48.4832 27.1667 48.4832 27.7976 49.1207L33.9601 55.2699L54.2074 35.016C56.8238 32.3996 58.2382 28.8934 58.1652 25.1812C58.0988 21.8742 56.8238 18.7 54.5793 16.2695C49.3597 10.625 40.5078 10.4855 35.1023 15.8578C34.4648 16.4887 33.4421 16.4887 32.8113 15.8578C27.5386 10.6117 18.9656 10.625 13.7062 15.8844C11.1496 18.441 9.74175 21.8477 9.74175 25.4668C9.74839 29.0859 11.2292 32.5457 13.7859 35.1023L17.7304 39.0469C18.3746 39.691 18.3878 40.7602 17.7304 41.3977C17.0929 42.0086 16.0835 42.0019 15.4527 41.3777L11.3953 37.3203C8.22769 34.1527 6.4812 29.9359 6.4812 25.4535C6.4812 20.9711 8.22769 16.7543 11.3953 13.5867C17.5511 7.43086 27.3593 7.07226 33.9468 12.5176C40.5343 7.07226 50.3425 7.4375 56.4984 13.5867C59.666 16.7543 61.4125 20.9711 61.4125 25.4535C61.4125 29.9359 59.666 34.1527 56.4984 37.3203L35.1089 58.7164C34.7902 59.0352 34.3785 59.1879 33.9601 59.1879Z" fill="#8A1D13"/>
      <path d="M22.8504 48.0848C22.4321 48.0848 22.0204 47.9254 21.7016 47.6066L19.7958 45.7008C19.1583 45.0633 19.1583 44.034 19.7958 43.4031C20.4333 42.7656 21.4625 42.7656 22.0934 43.4031L23.9993 45.309C24.6368 45.9465 24.6368 46.9758 23.9993 47.6066C23.6805 47.9254 23.2622 48.0848 22.8504 48.0848Z" fill="#8A1D13"/>
      <path d="M54.2672 35.016C56.8836 32.3996 58.2981 28.8934 58.225 25.1812C58.1586 21.8742 56.8836 18.7 54.6391 16.2695C49.4196 10.625 40.5676 10.4855 35.1621 15.8578C34.5246 16.4887 33.502 16.4887 32.8711 15.8578C30.009 13.009 26.1774 11.7141 22.4321 11.9598C21.2168 12.8164 20.1012 13.7527 19.1184 14.7289C13.2016 20.6457 13.2016 30.2414 19.1184 36.1582L36.1184 53.1582L54.2672 35.016Z" fill="#FFA591"/>
    </svg>
  );
}

// 圆形图钉
function CirclePin() {
  return (
    <svg width="18" height="18" viewBox="0 0 42 42" fill="none" className="pin">
      <circle cx="25" cy="20" r="16" fill="#FFA591"/>
      <path d="M21 0C32.598 0 42 9.40202 42 21C42 32.598 32.598 42 21 42C18.8528 42 16.7812 41.6767 14.8304 41.0774C13.8683 40.7819 13.3693 39.7537 13.6405 38.7844C13.9628 37.632 15.2283 37.0386 16.38 37.3635C17.8489 37.7779 19.3985 38 21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 24.4354 5.01971 27.6321 6.77214 30.3055C7.31029 31.1265 7.30613 32.2148 6.66749 32.9602C5.85816 33.9049 4.39116 33.9118 3.68613 32.8869C1.36109 29.507 0 25.4125 0 21C0 9.40202 9.40202 0 21 0ZM7.37446 34.4804C8.13401 33.5933 9.48725 33.5611 10.3998 34.2898C10.6895 34.5211 10.9868 34.7431 11.2914 34.9553C12.0647 35.4942 12.4708 36.4475 12.2167 37.355C11.8688 38.5973 10.4677 39.2154 9.39296 38.5018C8.74811 38.0737 8.12827 37.6109 7.53616 37.116C6.74042 36.451 6.69997 35.2682 7.37446 34.4804Z" fill="#8A1D13"/>
    </svg>
  );
}

// 图钉组件数组，循环交替
const pinComponents = [StarPin, HeartPin, CirclePin];

// 单张拍立得照片
function PolaroidCard({ photo, index }: { photo: PhotoItem; index: number }) {
  const [imgError, setImgError] = useState(false);
  const PinComponent = pinComponents[index % pinComponents.length];

  return (
    <div
      className="flex-shrink-0 relative"
    >
      {/* 图钉 - 钉在绳子线上 */}
      <PinComponent />

      {/* 拍立得卡片 */}
      <div
        className="polaroid"
        style={{ transform: `rotate(${photo.rotate}deg)` }}
      >
        {/* 照片区域 - 宽度限制，高度自适应 */}
        <div className="rounded-sm relative" style={{ width: "134px" }}>
          {imgError ? (
            <div className="w-full h-[100px] bg-paper-dark flex flex-col items-center justify-center gap-1.5">
              <svg
                width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="var(--ink-muted)" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" opacity="0.3"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-[9px] text-ink-muted/40 font-mono">{photo.company}</span>
            </div>
          ) : (
            <Image
              src={photo.src}
              alt={photo.caption}
              width={134}
              height={0}
              className="w-[134px] h-auto rounded-sm"
              style={{ display: "block" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* 描述文字 */}
        <p className="text-[10px] text-ink-muted text-center mt-1.5 font-mono leading-tight truncate px-1">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

// 单条晾衣绳组件 - 带鼠标悬停滑动
function ClotheslineRow({ photos }: { photos: PhotoItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const scrollSpeedRef = useRef(0);

  // 持续滚动动画
  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (el && scrollSpeedRef.current !== 0) {
      el.scrollLeft += scrollSpeedRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft <= 0) el.scrollLeft = 0;
      if (el.scrollLeft >= maxScroll) el.scrollLeft = maxScroll;
    }
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const startScroll = useCallback((speed: number) => {
    scrollSpeedRef.current = speed;
  }, []);

  const stopScroll = useCallback(() => {
    scrollSpeedRef.current = 0;
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [animate]);

  return (
    <div className="clothesline mb-8 relative">
      {/* 手绘风格绳子线条 */}
      <img
        src={cdnUrl("/hand-drawn-rope.svg")}
        alt=""
        className="clothesline-rope-svg"
        draggable={false}
      />

      {/* 照片滚动区域 */}
      <div ref={scrollRef} className="photo-wall-scroll">
        <div className="flex gap-5 px-8 pt-2 pb-4 min-w-max">
          {photos.map((photo, idx) => (
            <PolaroidCard key={idx} photo={photo} index={idx} />
          ))}
        </div>
      </div>

      {/* 左侧悬停滑动区域 */}
      <div
        className="photo-wall-hover-zone photo-wall-hover-zone--left"
        onMouseEnter={() => startScroll(-3)}
        onMouseLeave={stopScroll}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>

      {/* 右侧悬停滑动区域 */}
      <div
        className="photo-wall-hover-zone photo-wall-hover-zone--right"
        onMouseEnter={() => startScroll(3)}
        onMouseLeave={stopScroll}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section 标题 - 居中 + 手绘小星星 */}
        <ScrollReveal>
          <div className="flex flex-col items-center mb-14">
            <div className="relative inline-flex items-center">
              {/* 小黑猫 - 滑板猫在标题左上方 */}
              <img
                src={cdnUrl("/cat-skateboard.png")}
                alt="小黑猫"
                className="absolute -left-28 -top-16 w-24 h-auto pointer-events-none select-none"
                draggable={false}
              />
              {/* 左侧小星星 */}
              <svg className="absolute -left-10 -top-2 w-6 h-6 pointer-events-none" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 C12 2, 13 8, 12 12 C12 12, 18 11, 22 12 C22 12, 18 13, 12 12 C12 12, 13 18, 12 22 C12 22, 11 18, 12 12 C12 12, 6 13, 2 12 C2 12, 6 11, 12 12 C12 12, 11 8, 12 2Z" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* 右上小星星 */}
              <svg className="absolute -right-8 -top-4 w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none">
                <path d="M12 4 C12 4, 13 9, 12 12 C12 12, 17 11, 20 12 C20 12, 17 13, 12 12 C12 12, 13 17, 12 20 C12 20, 11 17, 12 12 C12 12, 7 13, 4 12 C4 12, 7 11, 12 12 C12 12, 11 9, 12 4Z" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
              </svg>
              {/* 右下小圆点星 */}
              <svg className="absolute -right-6 bottom-0 w-3 h-3 pointer-events-none" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="2" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.25" />
                <path d="M6 1 L6 3 M6 9 L6 11 M1 6 L3 6 M9 6 L11 6" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
              </svg>

              <h2 className="text-3xl md:text-4xl font-handwriting font-bold text-ink">
                Experience
              </h2>
            </div>
            <div className="w-12 h-[2px] bg-accent/30 mt-3 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 横排时间轴 */}
        <ScrollReveal delay={100}>
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
              <div className="relative min-w-max">
                <div className="absolute top-[28px] left-4 right-4 h-[2px] bg-ink/10" />
                <div className="flex gap-0">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative group"
                      style={{ width: "140px" }}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 overflow-hidden ${
                          item.current
                            ? "ring-2 ring-accent ring-offset-2 ring-offset-paper shadow-lg"
                            : "group-hover:ring-2 group-hover:ring-ink/20 group-hover:ring-offset-2 group-hover:ring-offset-paper"
                        } bg-white shadow-sm`}
                      >
                        <Image
                          src={item.logo}
                          alt={item.title}
                          width={56}
                          height={56}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full mt-[-1px] mb-2 relative z-10 ${
                          item.current ? "bg-accent" : "bg-ink/20 group-hover:bg-accent/50"
                        } transition-colors`}
                      />
                      <div className="text-center mt-1 px-1">
                        <span
                          className={`text-[10px] font-mono tracking-wider block mb-0.5 ${
                            item.current ? "text-accent font-semibold" : "text-ink-muted"
                          }`}
                        >
                          {item.period}
                        </span>
                        <h4
                          className={`text-sm font-medium leading-tight ${
                            item.current ? "text-accent" : "text-ink"
                          }`}
                        >
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="text-[11px] text-ink-muted leading-tight mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                        {item.current && (
                          <span className="tag-active mt-1.5 !text-[10px] !px-2 !py-0.5">
                            current
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===== 照片墙 - 晾衣绳 + 图钉 + 拍立得 ===== */}
        <ScrollReveal delay={200}>
          <div className="mt-16">
            {photoWallLines.map((photos, lineIdx) => (
              <ClotheslineRow key={lineIdx} photos={photos} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
