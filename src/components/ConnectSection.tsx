"use client";

import { Mail, MessageCircle, BookOpen, Code2, ArrowUpRight, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contactLinks = [
  {
    icon: <MessageCircle size={20} />,
    label: "微信",
    value: "添加微信聊聊",
    hint: "扫码或搜索 ID",
    color: "bg-stamp-green/10 text-stamp-green hover:bg-stamp-green/20",
  },
  {
    icon: <BookOpen size={20} />,
    label: "小红书",
    value: "来小红书找我",
    hint: "看看我的日常",
    color: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    icon: <Mail size={20} />,
    label: "邮箱",
    value: "发邮件给我",
    hint: "正式沟通首选",
    color: "bg-stamp-blue/10 text-stamp-blue hover:bg-stamp-blue/20",
  },
  {
    icon: <Code2 size={20} />,
    label: "GitHub",
    value: "看看我的代码",
    hint: "虽然不多",
    color: "bg-ink/5 text-ink hover:bg-ink/10",
  },
];

export default function ConnectSection() {
  return (
    <section id="connect" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section 标题 */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink">
              Connect
            </h2>
            <div className="flex-1 h-px bg-ink/10" />
            <span className="text-ink-muted text-sm typewriter">03</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 左侧 - 文案 */}
          <ScrollReveal delay={100}>
            <div className="paper-card rounded-lg p-8 relative h-full">
              <div className="absolute -top-1 left-12 w-20 h-6 bg-tape-yellow/50 rotate-1" />

              <div className="pt-4 space-y-6">
                <h3 className="text-2xl font-serif font-bold text-ink leading-snug">
                  想聊聊 AI 产品、
                  <br />
                  用户体验、
                  <br />
                  或者帮你算一卦？
                </h3>

                <p className="text-ink-muted leading-relaxed">
                  无论是工作机会、项目合作，还是单纯想交个朋友，
                  都欢迎来找我聊聊。我对有趣的人和有趣的事永远保持好奇。
                </p>

                <div className="bg-tape-yellow/20 border-l-2 border-tape-yellow px-4 py-3 rounded-r-lg">
                  <p className="text-sm text-ink-light">
                    🔮 附赠服务：免费塔罗牌占卜一次（准确率不保证）
                  </p>
                </div>

                {/* 我在找什么 */}
                <div className="pt-4">
                  <p className="text-xs text-ink-muted uppercase tracking-wider mb-3">
                    What I&apos;m looking for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "有影响力的工作",
                      "有意义的产品",
                      "有趣的团队",
                      "AI × 用户体验",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-paper-dark text-ink-light text-xs rounded-full border border-ink/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 右侧 - 联系方式卡片 */}
          <ScrollReveal delay={200}>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className={`paper-card rounded-lg p-5 flex items-center gap-4 group transition-all ${link.color}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-paper-light flex items-center justify-center shadow-sm">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{link.value}</p>
                    <p className="text-xs opacity-60">{link.hint}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <ScrollReveal delay={300}>
          <footer className="mt-24 pt-8 border-t border-ink/10 text-center">
            <p className="text-sm text-ink-muted flex items-center justify-center gap-1">
              Made with <Heart size={14} className="text-accent" /> by Ruby Tang
            </p>
            <p className="text-xs text-ink-muted/50 mt-2 typewriter">
              © 2026 · Built with Next.js + Tailwind CSS
            </p>
          </footer>
        </ScrollReveal>
      </div>
    </section>
  );
}
