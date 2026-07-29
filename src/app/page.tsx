import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import VinylPlayer from "@/components/VinylPlayer";
import { Heart } from "lucide-react";
import { cdnUrl } from "@/lib/cdn";

function SideDeco({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} w-[60px] h-screen z-[100] overflow-hidden pointer-events-none`}
    >
      <div className="side-deco-track flex flex-col">
        {/* 重复两份图片实现无缝循环 */}
        {[0, 1].map((i) => (
          <img
            key={i}
            src={cdnUrl("/side-deco.png")}
            alt=""
            className="w-[60px] h-auto block"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 左右两侧固定装饰背景 */}
      <SideDeco side="left" />
      <SideDeco side="right" />

      <main className="relative z-10 px-[60px]">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <WorksSection />

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-ink/10 text-center">
          <p className="text-sm text-ink-muted flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-accent" /> by Ruby Tang
          </p>
          <p className="text-xs text-ink-muted/50 mt-2 typewriter">
            © 2026 · Built with Next.js + Tailwind CSS
          </p>
        </footer>

        <VinylPlayer />
      </main>
    </>
  );
}
