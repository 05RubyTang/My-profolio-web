"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Copy, Check } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Connect", href: "#connect", hasPopup: true },
];

/* ---- 自定义 SVG icon 组件（复古红色） ---- */
const WechatIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size} fill="currentColor">
    <path d="M958.828 614.546c0-120.659-111.006-218.796-250.973-223.622-16.090-141.573-152.836-252.582-318.542-252.582-176.967 0-320.15 123.879-320.15 278.321 0 91.7 51.483 172.142 130.311 223.622 9.653 4.827-28.959 85.266-19.305 90.094 16.090 9.653 80.441-59.525 98.137-53.090 35.394 11.263 72.396 17.696 112.617 17.696 19.305 0 38.61-1.609 57.917-4.827 37.003 85.266 133.531 146.399 246.146 146.399 30.567 0 61.134-4.827 88.485-12.87 8.043-3.219 70.787 51.483 78.831 48.265 14.478-4.827-25.741-69.178-12.87-77.222 65.962-40.22 109.398-106.181 109.398-180.186zM598.457 558.236c-14.478 0-27.348-12.87-27.348-27.348s11.263-27.348 27.348-27.348c14.478 0 27.348 12.87 27.348 27.348 0 14.478-11.263 27.348-27.348 27.348zM432.75 614.546c0 6.434 0 14.478 1.609 22.523-14.478 1.609-28.959 3.219-43.437 3.219-37.003 0-72.396-6.434-104.571-17.696-3.219-1.609-14.478-4.827-20.914 0-14.478 9.653-32.174 32.174-32.174 32.174s6.434-16.090 9.653-38.61c1.609-9.653-14.478-17.696-17.696-19.305-59.525-40.22-98.137-109.398-98.137-178.578 0-123.879 117.441-223.622 263.841-223.622 136.749 0 247.756 86.874 262.234 199.489-125.486 17.696-220.405 109.398-220.405 220.405zM765.771 558.236c-14.478 0-27.348-12.87-27.348-27.348s11.263-27.348 27.348-27.348c14.478 0 27.348 12.87 27.348 27.348 0 14.478-11.263 27.348-27.348 27.348z" />
    <path d="M501.93 360.356c22.523 0 41.828-19.305 41.828-41.828s-19.305-41.828-41.828-41.828c-22.523 0-41.828 19.305-41.828 41.828 0 24.132 19.305 41.828 41.828 41.828zM279.915 360.356c22.523 0 41.828-19.305 41.828-41.828s-19.305-41.828-41.828-41.828c-22.523 0-41.828 19.305-41.828 41.828 0 24.132 17.696 41.828 41.828 41.828z" />
  </svg>
);

const XhsIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 1700 1024" width={size * 1.66} height={size} fill="currentColor">
    <path d="M1556.584 666.846c-29.077 60.292-60.079 76.862-124.326 66.706-41.264-6.52-63.82-30.68-69.914-78.893 24.908 0 49.496-0.64 73.976 0.214 16.463 0.642 23.946-4.917 23.304-22.235-0.962-25.015 0.214-50.244-0.641-75.259-0.748-20.952-12.187-34.635-33.567-35.063-42.974-0.962-85.948-0.32-133.092-0.32v212.84h-95.676V523.384h-96.532v-98.349h93.86v-83.49h-62.324v-96.104c20.525-0.962 40.195-2.03 63.285-3.1V208.99h96.425c-3.741 26.832 6.735 35.491 34.636 35.919 74.083 1.176 113.101 42.867 114.491 117.27 0.428 20.418 0.107 40.836 0.107 63.286 59.865-2.78 96.745 21.914 115.988 72.692v168.69z m-264.58-329.896c0 29.397-1.176 51.312 0.748 72.906 0.534 5.559 10.797 14.432 16.57 14.432 11.652 0.107 33.032-3.742 33.46-7.911 2.458-22.342 3.42-46.395-3.207-67.348-2.245-7.269-27.474-7.376-47.571-12.08zM357.368 208.882c-0.214 146.348-0.107 292.802-0.856 439.15-0.32 62.644-39.553 96.104-98.67 86.269-38.697-6.414-59.65-32.605-61.147-78.786h64.248V208.989c32.177-0.107 64.354-0.107 96.425-0.107z m409.751 0c-23.625 47.143-50.03 93.11-66.813 137.902 39.34-2.245 74.617-4.276 116.736-6.734-22.235 44.898-42.012 84.665-61.789 124.54-2.672 5.344-5.238 10.903-7.91 16.248-20.74 41.585-20.632 41.692 25.335 42.975 4.81 0.106 9.514 0.748 18.28 1.496-12.935 25.336-24.266 48.426-36.453 71.09-2.031 3.74-7.483 8.017-11.331 8.017-33.995-0.107-68.31 1.069-102.091-2.673-24.48-2.779-33.78-21.273-24.267-44.577 11.653-28.757 25.443-56.658 38.271-84.88 4.383-9.728 8.766-19.456 15.287-33.887-18.922 0-32.605 0.427-46.288-0.107-40.623-1.39-54.092-19.456-37.416-56.337 26.405-58.368 55.91-115.453 84.025-173.073h96.424zM62.107 576.408c6.093-33.78 13.79-67.455 17.852-101.45 5.132-42.76 7.163-85.84 10.69-130.74H192.1c-17.211 115.988 3.42 238.818-72.586 345.505C99.202 654.018 80.6 621.199 62 588.381c0.107-3.849 0.107-7.91 0.107-11.973z m1494.477-271.101c-21.701 37.736-56.016 38.698-92.79 32.925-11.011-47.891-3.1-79.32 22.449-90.972 23.839-10.904 45.647-2.245 70.34 28.008v30.039z" />
    <path d="M998.667 639.48c26.405 0 51.206 0.534 76.007-0.214 15.607-0.428 20.418 5.986 21.38 21.273 4.81 76.114 5.238 76.114-71.73 76.114H752.366c16.89-33.354 30.574-62.644 46.716-90.439 2.993-5.238 16.035-6.2 24.48-6.414 23.946-0.855 47.999-0.32 74.296-0.32V341.332h-61.468v-94.607h223.103v93.11H998.56c0.107 100.595 0.107 198.195 0.107 299.645zM425.891 343.364h95.035c4.597 58.688 2.566 117.805 15.287 173.607 14.966 65.316-8.873 115.88-39.767 167.407-46.181-40.409-71.303-161.42-70.555-341.014z m171.149 294.94h153.937c-17.21 33.673-30.787 61.147-45.646 87.98-2.78 4.917-10.904 9.62-16.677 9.727-44.898 0.748-89.797 0.428-141.323 0.428 19.563-38.805 35.598-70.341 49.709-98.135z" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 1024 1024" width={size} height={size} fill="currentColor">
    <path d="M950.857143 512q0 143.428571-83.714286 258t-216.285714 158.571429q-15.428571 2.857143-22.571429-4t-7.142857-17.142857l0-120.571429q0-55.428571-29.714286-81.142857 32.571429-3.428571 58.571429-10.285714t53.714286-22.285714 46.285714-38 30.285714-60 11.714286-86q0-69.142857-45.142857-117.714286 21.142857-52-4.571429-116.571429-16-5.142857-46.285714 6.285714t-52.571429 25.142857l-21.714286 13.714286q-53.142857-14.857143-109.714286-14.857143t-109.714286 14.857143q-9.142857-6.285714-24.285714-15.428571t-47.714286-22-49.142857-7.714286q-25.142857 64.571429-4 116.571429-45.142857 48.571429-45.142857 117.714286 0 48.571429 11.714286 85.714286t30 60 46 38.285714 53.714286 22.285714 58.571429 10.285714q-22.857143 20.571429-28 58.857143-12 5.714286-25.714286 8.571429t-32.571429 2.857143-37.428571-12.285714-31.714286-35.714286q-10.857143-18.285714-27.714286-29.714286t-28.285714-13.714286l-11.428571-1.714286q-12 0-16.571429 2.571429t-2.857143 6.571429 5.142857 8 7.428571 6.857143l4 2.857143q12.571429 5.714286 24.857143 21.714286t18 29.142857l5.714286 13.142857q7.428571 21.714286 25.142857 35.142857t38.285714 17.142857 39.714286 4 31.714286-2l13.142857-2.285714q0 21.714286 2.857143 50.857143t2.857143 30.857143q0 10.285714-7.428571 17.142857t-22.857143 4q-132.571429-44-216.285714-158.571429t-83.714286-258q0-119.428571 58.857143-220.285714t159.714286-159.714286 220.285714-58.857143 220.285714 58.857143 159.714286 159.714286 58.857143 220.285714z" />
  </svg>
);

const contactItems = [
  {
    icon: <WechatIcon size={16} />,
    label: "微信",
    value: "rabbit_happy2233",
  },
  {
    icon: <XhsIcon size={16} />,
    label: "小红书",
    value: "Bing的学习日常",
  },
  {
    icon: <GithubIcon size={16} />,
    label: "GitHub",
    value: "05RubyTang",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showConnect, setShowConnect] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const connectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contactTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["about", "works"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectEnter = () => {
    if (connectTimerRef.current) {
      clearTimeout(connectTimerRef.current);
      connectTimerRef.current = null;
    }
    setShowConnect(true);
  };

  const handleConnectLeave = () => {
    connectTimerRef.current = setTimeout(() => {
      setShowConnect(false);
      setHoveredContact(null);
    }, 250);
  };

  const handleContactEnter = (index: number) => {
    if (contactTimerRef.current) {
      clearTimeout(contactTimerRef.current);
      contactTimerRef.current = null;
    }
    if (connectTimerRef.current) {
      clearTimeout(connectTimerRef.current);
      connectTimerRef.current = null;
    }
    setHoveredContact(index);
  };

  const handleContactLeave = () => {
    contactTimerRef.current = setTimeout(() => {
      setHoveredContact(null);
    }, 200);
  };

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 md:left-[60px] md:right-[60px] z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md shadow-sm border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-4 md:py-5 flex items-center justify-center relative">
        {/* 居中导航 */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            const isConnect = item.hasPopup;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={isConnect ? handleConnectEnter : undefined}
                onMouseLeave={isConnect ? handleConnectLeave : undefined}
              >
                <a
                  href={isConnect ? undefined : item.href}
                  className={`nav-tab font-handwriting text-xl relative transition-colors duration-200 cursor-default ${
                    isActive ? "text-ink" : "text-ink-light hover:text-ink"
                  }`}
                  onClick={isConnect ? (e) => e.preventDefault() : undefined}
                >
                  {item.label}

                  {/* 手绘画圈 SVG - active 态 */}
                  <svg
                    className={`absolute -inset-x-3 -inset-y-1.5 w-[calc(100%+24px)] h-[calc(100%+12px)] pointer-events-none transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    viewBox="0 0 120 50"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 18 8 C 8 10, 3 18, 4 26 C 5 36, 16 44, 40 45 C 58 46, 85 45, 100 42 C 112 39, 118 32, 117 24 C 116 14, 106 7, 85 5 C 68 3, 38 4, 22 7"
                      stroke="var(--ink)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.6"
                      fill="none"
                    />
                    <path
                      d="M 22 10 C 12 13, 6 20, 6 27 C 7 35, 18 42, 42 43 C 62 44, 82 43, 98 40 C 110 37, 115 30, 114 23 C 113 15, 104 9, 82 7 C 65 5, 40 6, 25 9"
                      stroke="var(--ink)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity="0.25"
                      fill="none"
                    />
                  </svg>

                  {/* 手绘画圈 SVG - hover 态 */}
                  {!isActive && (
                    <svg
                      className="nav-circle-hover absolute -inset-x-3 -inset-y-1.5 w-[calc(100%+24px)] h-[calc(100%+12px)] pointer-events-none opacity-0 transition-opacity duration-200"
                      viewBox="0 0 120 50"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 18 8 C 8 10, 3 18, 4 26 C 5 36, 16 44, 40 45 C 58 46, 85 45, 100 42 C 112 39, 118 32, 117 24 C 116 14, 106 7, 85 5 C 68 3, 38 4, 22 7"
                        stroke="var(--ink)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.35"
                        fill="none"
                      />
                    </svg>
                  )}

                  {/* 手绘小星星装饰 */}
                  <svg
                    className="nav-stars absolute pointer-events-none opacity-0 transition-opacity duration-200"
                    style={{ top: "-14px", right: "-18px", width: "20px", height: "20px" }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2 C12 2, 13 8, 12 12 C12 12, 18 11, 22 12 C22 12, 18 13, 12 12 C12 12, 13 18, 12 22 C12 22, 11 18, 12 12 C12 12, 6 13, 2 12 C2 12, 6 11, 12 12 C12 12, 11 8, 12 2Z"
                      stroke="var(--ink)"
                      strokeWidth="1.2"
                      fill="none"
                      opacity="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    className="nav-stars absolute pointer-events-none opacity-0 transition-opacity duration-200"
                    style={{ bottom: "-10px", left: "-16px", width: "14px", height: "14px" }}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 4 C12 4, 13 9, 12 12 C12 12, 17 11, 20 12 C20 12, 17 13, 12 12 C12 12, 13 17, 12 20 C12 20, 11 17, 12 12 C12 12, 7 13, 4 12 C4 12, 7 11, 12 12 C12 12, 11 9, 12 4Z"
                      stroke="var(--ink)"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.35"
                      strokeLinecap="round"
                    />
                  </svg>
                  <svg
                    className="nav-stars absolute pointer-events-none opacity-0 transition-opacity duration-200"
                    style={{ top: "-8px", left: "-14px", width: "10px", height: "10px" }}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle cx="6" cy="6" r="2" stroke="var(--ink)" strokeWidth="1.2" fill="none" opacity="0.4" />
                    <path d="M6 1 L6 3 M6 9 L6 11 M1 6 L3 6 M9 6 L11 6" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                  </svg>
                </a>

                {/* Connect: hover 后在文字下方展示三个 icon */}
                {isConnect && showConnect && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 flex items-center gap-3 animate-fade-in-down" style={{ animationDuration: "0.15s" }}>
                    {contactItems.map((contact, index) => (
                      <div
                        key={contact.label}
                        className="relative"
                        onMouseEnter={() => handleContactEnter(index)}
                        onMouseLeave={handleContactLeave}
                      >
                        {/* icon 按钮 */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            hoveredContact === index
                              ? "bg-accent/15 text-accent scale-110"
                              : "bg-ink/5 text-accent/70 hover:bg-accent/10 hover:text-accent"
                          }`}
                        >
                          {contact.icon}
                        </div>

                        {/* hover icon 后展示的信息气泡 */}
                        {hoveredContact === index && (
                          <div
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap animate-fade-in-down"
                            style={{ animationDuration: "0.12s" }}
                            onMouseEnter={() => handleContactEnter(index)}
                            onMouseLeave={handleContactLeave}
                          >
                            {/* 小三角 */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-ink/[0.03] border-l border-t border-ink/8" />

                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-ink/8 shadow-md bg-ink/[0.03] backdrop-blur-sm">
                              <div className="min-w-0">
                                <span className="text-[10px] text-ink-muted block leading-none">
                                  {contact.label}
                                </span>
                                <span className="text-sm text-ink font-medium block mt-0.5">
                                  {contact.value}
                                </span>
                              </div>
                              <button
                                onClick={() => handleCopy(contact.value, index)}
                                className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center hover:bg-ink/5 transition-colors"
                              >
                                {copiedIndex === index ? (
                                  <Check size={12} className="text-stamp-green" />
                                ) : (
                                  <Copy size={12} className="text-ink-muted" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 移动端左上角签名 */}
        <a
          href="#about"
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute left-5 font-handwriting text-xl text-ink"
        >
          Ruby
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden absolute right-5 w-11 h-11 flex items-center justify-center text-ink -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "关闭菜单" : "打开菜单"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Full-Screen Dropdown */}
      {isOpen && (
        <>
          {/* 遮罩背景 */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[-1]"
            style={{ animation: "fadeIn 0.2s ease-out" }}
            onClick={() => setIsOpen(false)}
          />
          {/* 下拉菜单面板 */}
          <div
            className="md:hidden bg-paper-light border-t border-ink/8 shadow-xl"
            style={{ animation: "fadeInDown 0.25s ease-out" }}
          >
            <div className="px-6 py-6 space-y-1">
              {/* 导航项 */}
              {navItems
                .filter((n) => !n.hasPopup)
                .map((item) => {
                  const sectionId = item.href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`block font-handwriting text-2xl py-3 border-b border-ink/5 transition-colors ${
                        isActive ? "text-accent" : "text-ink"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                })}

              {/* Connect 标题 + 联系方式列表 */}
              <div className="pt-5">
                <h4 className="font-handwriting text-2xl text-ink mb-3">
                  Connect
                </h4>
                <div className="space-y-2">
                  {contactItems.map((contact, index) => (
                    <div
                      key={contact.label}
                      className="flex items-center gap-3 py-3 px-3 rounded-lg bg-ink/[0.03] active:bg-ink/[0.08] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                        {contact.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] text-ink-muted block leading-none">
                          {contact.label}
                        </span>
                        <span className="text-sm text-ink font-medium block mt-1 truncate">
                          {contact.value}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(contact.value, index)}
                        className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center active:bg-ink/10 transition-colors"
                        aria-label={`复制${contact.label}`}
                      >
                        {copiedIndex === index ? (
                          <Check size={18} className="text-stamp-green" />
                        ) : (
                          <Copy size={18} className="text-ink-muted" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
