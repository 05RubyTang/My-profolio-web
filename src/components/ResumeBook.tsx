"use client";

import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import { X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import dynamic from "next/dynamic";

/* ============================================================
   动态导入 react-pageflip（仅客户端渲染，避免 SSR 问题）
   ============================================================ */
const HTMLFlipBook = dynamic(() => import("react-pageflip").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-lg">
      <span className="text-ink-muted text-sm">加载中...</span>
    </div>
  ),
});

/* ============================================================
   简历数据
   ============================================================ */

interface ResumeProject {
  name: string;
  details: string[];
}

interface ResumeEntry {
  company: string;
  department: string;
  location: string;
  role: string;
  period: string;
  responsibility: string;
  projects: ResumeProject[];
  image?: string;
}

const resumeData: ResumeEntry[] = [
  {
    company: "小红书",
    department: "Dots（点点）",
    location: "",
    role: "AI产品经理实习生",
    period: "2026年03月 - 2026年06月",
    responsibility: "",
    image: undefined,
    projects: [
      {
        name: "购物Agent专项",
        details: [
          "参与点点在消费决策场景从0到1的产品方案设计，针对AI购物用户购物意图模糊多样、AI存在推品幻觉等问题，确定「Clarify → 偏好对齐 → 决策信息」三段式决策流程、定义AI推品策略，并通过vibe coding+真实query预热的小红书电商商品数据搭建12个Shopping Agent demo支持用户访谈进行需求验证，推动一期购物Agent快速迭代上线。",
        ],
      },
      {
        name: "点点长Loading",
        details: [
          "为解决模型侧引入自适应思考（adaptive thinking）后，由于多轮搜索导致输出时间延长至3-5s问题，通过引入小模型将大模型 CoT 思考过程按 chunk 切块、制定CoT内容展示策略、长Loading输出样式保证用户内容消费体验。同时针对小模型捏造CoT信息和泄露内部工具等问题，定义模型输出理想态与评测标准、提出小模型优化建议，保障模型输出质量。项目共经9个版本PE迭代，严重编造（fath=0）从52.3%降至5.3%",
        ],
      },
      {
        name: "主框架-灵动岛",
        details: [
          "点点端内部分业务（如定时任务、色彩测试）入口太深、缺乏Agent主动触达用户的能力。通过建设通用的灵动岛框架，以任务类型（单次/定时/监控）x 信息纬度 定义组件规范，围绕DAU做端外容器指标规划，并以色彩测试报告、DR两个业务case为案例上线灵动岛能力",
        ],
      },
    ],
  },
  {
    company: "淘天集团",
    department: "淘宝秒杀业务（杭州）",
    location: "杭州",
    role: "AI产品经理实习生（用户增长/渠道侧/c端）",
    period: "2026年01月 - 2026年03月",
    responsibility:
      "通过多渠道形式的增长玩法设计，强化秒杀频道「低价好货」的认知，达成「心智DAU」的北极星指标提升，同时负责AI提效工具的搭建",
    image: undefined,
    projects: [
      {
        name: "改了么-竞品监测Agent",
        details: [
          "针对产品团队竞品分析依赖人工巡检、竞品功能迭代变动难以及时捕捉的问题，从0到1设计面向PM的竞品Agent，构建自动页面巡检→智能分析→报告生成与推送的AI提效工具，支持「竞对变动周期性推送、同时段跨频道对比、指定时段频道变动」三类竞品分析场景。通过引入Few-shot CoT提示工程规范LLM分析逻辑、构建电商视觉知识库，搭建多LLM协作的workflow。以拼多多百补频道为case推动MVP版本上线",
        ],
      },
      {
        name: "秒杀社群玩法体系重构",
        details: [
          "针对企业微信社群用户DAU转化率低（<2%）、微社群与淘内积分割裂等核心痛点，设计功能：1）端内外积分体系合并，端内积分频道增加心智频道打卡/下单等玩法；2）通过在商品分享页嵌入砸金蛋、积分任务，筛选互动意向高的用户进入淘客社群，提升流量质量",
        ],
      },
      {
        name: "淘内转心智专项",
        details: [
          "1）针对淘内日均订单1.1单的用户在非心智渠道（闪购/直播/主搜）交易后流失的问题，以购后回访频道为触点，设计秒杀权益投放POP；2）针对手淘秒杀Icon入口30w uv曝光但转化不足的问题，以动态导购Icon为触点设计商品推荐及利益点透传策略，预计心智DAU+3.1w",
        ],
      },
    ],
  },
  {
    company: "字节跳动",
    department: "抖音电商（上海）",
    location: "上海",
    role: "商家端产品经理实习生（基建方向/b端）",
    period: "2025年08月 - 2026年01月",
    responsibility:
      "聚焦抖店商家入驻与资质管理模块，针对中小微商家诉求，通过产品化手段，降低因规则模糊、流程受阻产生的CPO（千活商家进线量），实现商家入驻的减负提效；针对特殊白名单商家搭建产品化入驻功能，提高商家入驻效率与成功率、提高平台商家增量、夯实电商基建。",
    image: undefined,
    projects: [
      {
        name: "商家入驻产品优化",
        details: [
          "入驻链路存在专业店准入品牌力门槛规则模糊、特殊商家无产品化入驻能力、规则在多处表达不一致等问题，导致CPO偏高（占基建大盘29%），通过入驻链路体验走查与交互重构，入驻CPO降低0.2x；针对事业单位、民办非企业等无工商信息、依赖白名单手动入驻的特殊主体，联动审核侧与算法建设特殊商家识别与产品化入驻能力，提升入驻信息自动回填准确率从93%→97%，入驻商家月增量3000+。",
        ],
      },
      {
        name: "商家闭店与重新开店全链路优化",
        details: [
          "通过聚类分析定位到占入驻大盘进线20%的「重新入驻」工单下的Top2高频问题场景（解绑账号、清退状态模糊），在个人/个体户/企业商家因经营不善闭店、违规清退等闭店场景下，针对商家不知道重新开店规则与时效、忘记解绑账号、不理解清退规则导致的进线，对闭店全链路展开交互重构；洞察个体户/企业商家在闭店行为背后隐藏的个转企升级与多店铺经营诉求，设计闭店前拦截策略与相同主体店铺落地页。上线后重新入驻三级标签下CPO降低40%。",
        ],
      },
      {
        name: "定准定邀管理平台建设专项",
        details: [
          "参与定准定邀类目准出/准入建设，把类目定准定邀的管理模式从针对「单个店铺」的处理方式，升级为「运营规则」，实现「类目定准/定邀规则」的线上配置管理，解决高风险类目（如燃油、滋补保健）因规则分散、人工配置错误导致17万+商家获取不当经营权限问题，上线后实现内外部规则一致率从77.8%提升至98.5%，相关场景CPO下降51%，释放治理团队35%人力。",
        ],
      },
    ],
  },
  {
    company: "字节跳动",
    department: "抖音电商（上海）",
    location: "上海",
    role: "商家端产品经理实习生（基建方向/b端）",
    period: "2025年08月 - 2026年01月",
    responsibility: "",
    image: undefined,
    projects: [
      {
        name: "类目资质配置组件",
        details: [
          "建立行业资质需求评估与响应机制，对行业负责人提出的资质项进行必要性验证与标准化处理；针对大量资质在抖店端缺乏上传指导问题，增设统一的资质上传引导配置功能，协同研发实现从后台配置到商家入驻端的精准透传；",
        ],
      },
      {
        name: "统一治理策略",
        details: [
          "将散落在5+系统的规则配置、资质审核、风险管理能力集中到统一平台管理，通过\"叶子类目+相似类目\"联动，确保规则一致性；设计不当经营存量商家类目准出规则，建立主体变更强制重审机制，协同研发清洗存量经营权限不当商家；",
        ],
      },
    ],
  },
  {
    company: "字节跳动",
    department: "抖音生活服务",
    location: "上海",
    role: "商业体验产品设计实习生（UED/UX/UI/b端）",
    period: "2024年08月 - 2025年02月",
    responsibility:
      "聚焦抖音来客（本地商家一站式经营平台）的商家服务与体验优化，以用户体验为核心优化商家服务体验流程，助力商家经营体验提效",
    image: undefined,
    projects: [
      {
        name: "商家服务-智能客服设计",
        details: [
          "针对智能解决率低于大盘整体水平（0.35x < 0.42x）的核销履约模块，完成智能客服接入核销履约模块的服务流程一期重构，解决商家进线咨询的退款难、无法与消费者建联、不知道核销失败原因等问题，单期CPO降低0.3x；参与AI智能客服交互范式设计",
        ],
      },
      {
        name: "费力度质量分析",
        details: [
          "完成两次费力度问卷方案的全量问卷改造升级，涉及41个模块、82份feelgood满意度问卷；在4场商家体验月会中完成费力度数据分析及下钻归因的输出，并针对4个涉及改版的重点模块持续观测，评估改版效果",
        ],
      },
      {
        name: "用户调研",
        details: [
          "累计参与7场实地商家线下走访，涉及商家SMB*3、CKA*3、NKA*1，产出专题调研报告7份；参与4场商家体验月会内容输出，针对主题商家共输出27个关键问题和其对应解法结论，并形成跨部门的有效讨论",
        ],
      },
      {
        name: "日常工作 - 需求分析&设计稿输出",
        details: [
          "对接商家端与消费者端的PM与FE，针对含NKA商家权益透传、餐饮履约异常换店等场景在内的共5个b端（来客端）需求、2个c端（抖音端）需求的NPS提升进行问题分析与竞品调研，并使用figma完成PC端与APP端的交互与视觉设计输出，协助还原设计质量和视觉验收，日常参与需求评审与设计评审会议",
        ],
      },
    ],
  },
  {
    company: "小红书",
    department: "产品设计部",
    location: "上海",
    role: "用户研究实习生（社区发布方向）",
    period: "2025年02月 - 2025年07月",
    responsibility:
      "针对小红书社区发布侧相关业务的需求设计调研方案，通过多种调研手段摸清体验侧业务现状、洞察用户痛点与需求，支撑产品开发决策",
    image: undefined,
    projects: [
      {
        name: "调研设计与执行",
        details: [
          "对接策略、运营、产品等业务方，针对包括长文功能建设、网文垂类、校园发布、本地地图、鸿蒙端、Redland在内的发布类相关业务场景的用户体验、性能现状与未来产品期待设计调研方案；设计定量问卷并利用Excel进行数据清洗与分析、参与1v1深访62场、多人主题座谈会2场、用户共创1场，输出深度访谈记录文档62份、专题用户研究报告3份，帮助业务方看清业务现状、判断产品功能的体验优先级",
        ],
      },
    ],
  },
];

/* ============================================================
   判断字节电商的续页（第二页）
   ============================================================ */
const isBytedanceEcomContinuation = (index: number) => index === 3;

/* ============================================================
   单页组件 —— 必须用 forwardRef 包裹，PageFlip 需要 ref
   ============================================================ */
const ResumePage = forwardRef<
  HTMLDivElement,
  { entry: ResumeEntry; pageIndex: number; totalPages: number }
>(function ResumePage({ entry, pageIndex, totalPages }, ref) {
  const isContinuation = isBytedanceEcomContinuation(pageIndex);
  const pageNum = String(pageIndex + 1).padStart(2, "0");
  const displayNum = isContinuation ? "03-2" : pageNum;

  return (
    <div ref={ref} className="resume-page-container">
      <div className="flex w-full h-full">
        {/* ====== 左侧窄栏 - 主题红色系 ====== */}
        <div
          className="w-[72px] relative flex flex-col items-center flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {/* 纸张纹理叠加 */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* 渐变叠加 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)",
            }}
          />
          {/* 右侧中缝线 */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[2px] z-10"
            style={{ background: "rgba(0,0,0,0.15)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-5 z-10"
            style={{ background: "linear-gradient(to left, rgba(0,0,0,0.08), transparent)" }}
          />

          {/* 竖排内容 */}
          <div className="relative z-[5] flex flex-col items-center h-full py-6">
            <span className="text-[10px] text-white/60 tracking-widest uppercase mb-3">
              No.
            </span>
            <span className="text-2xl font-black text-white leading-none mb-6">
              {displayNum}
            </span>

            <div
              className="flex-1 flex items-center justify-center"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <span className="text-base font-bold text-white tracking-[0.15em] leading-relaxed">
                {entry.company}
              </span>
            </div>

            <div
              className="mt-4"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              <span className="text-[10px] text-white/50 tracking-wider">
                {entry.department}
              </span>
            </div>

            {/* 页码指示器（纯展示，不可点击，因为 PageFlip 管理翻页） */}
            <div className="flex flex-col items-center gap-1.5 mt-5">
              {resumeData.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all ${
                    i === pageIndex ? "bg-white h-4" : "bg-white/25 h-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ====== 右侧宽栏 - 白色纸张 + 纹理装饰 ====== */}
        <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
          {/* 纸张纹理 */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* 笔记本横线 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, var(--ink) 31px, var(--ink) 32px)`,
              backgroundPosition: "0 8px",
            }}
          />

          {/* 右上角圆点装饰 */}
          <div className="absolute top-6 right-6 pointer-events-none opacity-[0.04]">
            <svg width="80" height="80" viewBox="0 0 80 80">
              {[0, 1, 2, 3, 4].map((row) =>
                [0, 1, 2, 3, 4].map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={8 + col * 16}
                    cy={8 + row * 16}
                    r="1.5"
                    fill="var(--ink)"
                  />
                ))
              )}
            </svg>
          </div>

          {/* 左下角十字装饰 */}
          <div className="absolute bottom-8 left-10 pointer-events-none opacity-[0.035]">
            <svg width="60" height="60" viewBox="0 0 60 60">
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => (
                  <g key={`${row}-${col}`}>
                    <line
                      x1={8 + col * 20}
                      y1={5 + row * 20}
                      x2={8 + col * 20}
                      y2={11 + row * 20}
                      stroke="var(--ink)"
                      strokeWidth="1"
                    />
                    <line
                      x1={5 + col * 20}
                      y1={8 + row * 20}
                      x2={11 + col * 20}
                      y2={8 + row * 20}
                      stroke="var(--ink)"
                      strokeWidth="1"
                    />
                  </g>
                ))
              )}
            </svg>
          </div>

          {/* 左侧中缝阴影 */}
          <div
            className="absolute left-0 top-0 bottom-0 w-5"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.05), transparent)" }}
          />

          <div className="relative z-10 p-8 md:p-10 flex flex-col h-full overflow-y-auto resume-book-scroll">
            {/* 标题区 */}
            <div className="mb-8 flex-shrink-0">
              {isContinuation ? (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-ink-muted text-sm font-handwriting">03-2 —</span>
                    <span className="text-2xl md:text-3xl font-bold text-ink leading-tight font-handwriting">
                      {entry.company}.
                    </span>
                  </div>
                  <div className="inline-block mt-1">
                    <span
                      className="text-lg md:text-xl font-bold text-ink leading-tight font-handwriting px-2 py-0.5 relative"
                      style={{ backgroundColor: "rgba(134, 31, 21, 0.12)" }}
                    >
                      {entry.role}
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-accent ml-2 relative -top-1" />
                  </div>
                  <p className="text-[11px] text-ink-muted mt-2 tracking-wide italic">
                    — 续上页 —
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-ink-muted text-sm font-handwriting">{pageNum} —</span>
                    <span className="text-2xl md:text-3xl font-bold text-ink leading-tight font-handwriting">
                      {entry.company}.
                    </span>
                  </div>
                  <div className="inline-block mt-1">
                    <span
                      className="text-xl md:text-2xl font-bold text-ink leading-tight font-handwriting px-2 py-0.5 relative"
                      style={{ backgroundColor: "rgba(134, 31, 21, 0.15)" }}
                    >
                      {entry.role}
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-accent ml-2 relative -top-1" />
                  </div>
                  <p className="text-xs text-ink-muted mt-3 tracking-wide">
                    {entry.period}
                    {entry.location && <span className="ml-2">· {entry.location}</span>}
                  </p>
                </>
              )}
            </div>

            {/* 职责概述 */}
            {entry.responsibility && (
              <div className="mb-8 flex-shrink-0 max-w-[85%]">
                <p className="text-sm text-ink-light leading-[1.8]">{entry.responsibility}</p>
              </div>
            )}

            {/* 项目列表 */}
            <div className="space-y-6 flex-1">
              {entry.projects.map((project, pi) => (
                <div key={pi} className="max-w-[90%]">
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <span className="text-accent font-black text-xs">●</span>
                    <h4 className="text-[15px] font-bold text-ink">{project.name}</h4>
                  </div>
                  <div className="pl-5 space-y-2">
                    {project.details.map((detail, di) => (
                      <p
                        key={di}
                        className="text-[13px] text-ink-light leading-[1.85] tracking-wide"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  {pi < entry.projects.length - 1 && (
                    <div className="mt-5 flex items-center gap-2 pl-5">
                      <div className="w-1 h-1 rounded-full bg-ink/10" />
                      <div className="flex-1 border-t border-dashed border-ink/8" />
                      <div className="w-1 h-1 rounded-full bg-ink/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 底部页码 */}
            <div className="flex items-center justify-center mt-8 pt-5 border-t border-ink/5 flex-shrink-0">
              <span className="text-[10px] text-ink-muted tracking-widest">
                {pageIndex + 1} / {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ============================================================
   简历大书组件 —— 使用 react-pageflip 实现真实 3D 翻页
   ============================================================ */
export default function ResumeBook({ onClose }: { onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const totalPages = resumeData.length;

  const goNext = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  const goPrev = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  /* 键盘事件 */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  /* 锁定 body 滚动 */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease-out" }}
      />

      {/* 整体布局：左按钮 + 书本 + 右按钮 */}
      <div
        className="relative z-10 flex items-center gap-4 md:gap-6"
        style={{ animation: "bookOpen 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
      >
        {/* 左侧翻页按钮 */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            currentPage === 0
              ? "bg-white/10 text-white/20 cursor-not-allowed"
              : "bg-white/20 text-white/80 hover:bg-white/30 hover:text-white hover:scale-110 active:scale-95"
          }`}
          aria-label="上一页"
        >
          <ChevronLeft size={22} />
        </button>

        {/* 书本主体 */}
        <div className="relative">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-ink hover:bg-white transition-colors z-20"
          >
            <X size={18} />
          </button>

          {/* 书本标题 */}
          <div className="absolute -top-12 left-0 flex items-center gap-2 text-white/90">
            <FileText size={16} />
            <span className="text-sm font-medium">Ruby 的实习经历</span>
            <span className="text-xs text-white/50 ml-2">← → 翻页 · ESC 关闭</span>
          </div>

          {/* PageFlip 翻页书 */}
          {/* @ts-expect-error - react-pageflip types are incomplete */}
          <HTMLFlipBook
            ref={flipBookRef}
            width={530}
            height={620}
            size="stretch"
            minWidth={400}
            maxWidth={1060}
            minHeight={480}
            maxHeight={720}
            showCover={false}
            mobileScrollSupport={true}
            usePortrait={true}
            startPage={0}
            drawShadow={true}
            maxShadowOpacity={0.3}
            flippingTime={800}
            useMouseEvents={true}
            swipeDistance={30}
            clickEventForward={true}
            startZIndex={0}
            autoSize={true}
            disableFlipByClick={false}
            onFlip={onFlip}
            className="resume-flipbook"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderRadius: "8px",
            }}
          >
            {resumeData.map((entry, i) => (
              <ResumePage key={i} entry={entry} pageIndex={i} totalPages={totalPages} />
            ))}
          </HTMLFlipBook>
        </div>

        {/* 右侧翻页按钮 */}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            currentPage === totalPages - 1
              ? "bg-white/10 text-white/20 cursor-not-allowed"
              : "bg-white/20 text-white/80 hover:bg-white/30 hover:text-white hover:scale-110 active:scale-95"
          }`}
          aria-label="下一页"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
