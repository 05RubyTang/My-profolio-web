"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function WorkLayout({
  children,
  navTheme = "light",
  navTitle,
  navSubtitle,
}: {
  children: ReactNode;
  navTheme?: "light" | "dark";
  navTitle?: string;
  navSubtitle?: string;
}) {
  const isDark = navTheme === "dark";
  const textColor = isDark ? "text-white" : "text-ink";
  const textMuted = isDark ? "text-white/70" : "text-ink-muted";
  const hoverBg = isDark ? "hover:bg-white/10" : "hover:bg-ink/5";
  const borderColor = isDark ? "border-white/10" : "border-ink/8";
  const bgColor = isDark ? "bg-black/20" : "bg-white/60";

  return (
    <div className="relative min-h-screen">
      <div
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${borderColor} ${bgColor}`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-3 md:py-4 flex items-center justify-between">
          <Link
            href="/#works"
            onClick={() => {
              try {
                sessionStorage.setItem("returnTo", "works");
              } catch {
                // ignore
              }
            }}
            className={`flex items-center gap-2 ${textColor} ${hoverBg} px-3 py-1.5 rounded-full transition-colors text-sm md:text-base font-medium`}
          >
            <ArrowLeft size={18} strokeWidth={2.2} />
            <span>Back to Works</span>
          </Link>

          {navTitle && (
            <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              <span className={`text-base font-semibold tracking-wide ${textColor}`}>
                {navTitle}
              </span>
              {navSubtitle && (
                <>
                  <span className={`text-xs ${textMuted}`}>·</span>
                  <span className={`text-xs ${textMuted}`}>{navSubtitle}</span>
                </>
              )}
            </div>
          )}

          <div className="w-[100px] md:w-[140px]" />
        </div>
      </div>

      {children}
    </div>
  );
}
