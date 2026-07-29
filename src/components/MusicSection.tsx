"use client";

import VinylPlayer from "./VinylPlayer";
import ScrollReveal from "./ScrollReveal";

export default function MusicSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink">
              Vibes
            </h2>
            <div className="flex-1 h-px bg-ink/10" />
            <span className="text-ink-muted text-sm typewriter">♪</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            {/* 左侧文案 */}
            <div className="space-y-4">
              <p className="text-ink-light leading-relaxed text-lg font-serif">
                「音乐是写代码和做产品时的燃料」
              </p>
              <p className="text-ink-muted leading-relaxed text-sm">
                工作的时候听电子和 Lo-fi，摸鱼的时候听日系和华语流行。
                这是我最近在循环的几首歌，戴上耳机一起听吧。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Lo-fi", "电子", "日系", "华语流行", "游戏 OST"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-paper-dark text-ink-muted text-xs rounded-full border border-ink/5"
                    >
                      🎵 {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* 右侧唱片机 */}
            <VinylPlayer />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
