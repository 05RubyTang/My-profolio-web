"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, FileText, ArrowLeft } from "lucide-react";
import VariableProximity from "./VariableProximity";

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
}

const resumeData: ResumeEntry[] = [
  {
    company: "小红书",
    department: "Dots（点点）",
    location: "",
    role: "AI产品经理实习生",
    period: "2026年03月 - 2026年06月",
    responsibility: "",
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
   邮票数据
   ============================================================ */

interface StampData {
  id: number;
  company: string;
  companyEn: string;
  department: string;
  departmentEn: string;
  role: string;
  roleEn: string;
  period: string;
  color: string;
  bgImage: string;
  /** 详情页背景图 */
  detailBg: string;
  /** 对应 resumeData 的索引（字节电商合并后映射多页） */
  resumeIndices: number[];
  description: string;
}

const stamps: StampData[] = [
  {
    id: 0,
    company: "小红书",
    companyEn: "Xiaohongshu (REDnote)",
    department: "Dots（点点）",
    departmentEn: "Dots AI Agent",
    role: "AI产品经理",
    roleEn: "AI Product Manager Intern",
    period: "2026.03 - 2026.06",
    color: "#c04a3f",
    bgImage: "/picture/id-project/myresume/rednote-card.png",
    detailBg: "/picture/id-project/myresume/rednote-bg.png",
    resumeIndices: [0],
    description: `负责点点独立端的端内外主框架产品设计与用户增长、评测体系搭建与AI能力持续提升，实现从"模型能跑"到"用户好用"的体验闭环`,
  },
  {
    id: 1,
    company: "淘天集团",
    companyEn: "Taotian Group (Alibaba)",
    department: "淘宝秒杀",
    departmentEn: "Taobao Flash Sale",
    role: "AI产品经理",
    roleEn: "AI Product Manager Intern",
    period: "2026.01 - 2026.03",
    color: "#f57c00",
    bgImage: "/picture/id-project/myresume/taobao-card.png",
    detailBg: "/picture/id-project/myresume/taobao-bg.png",
    resumeIndices: [1],
    description:
      "通过多渠道形式的增长玩法设计，强化秒杀频道「低价好货」的认知，达成「心智DAU」的北极星指标提升，同时负责AI提效工具的搭建",
  },
  {
    id: 2,
    company: "字节跳动",
    companyEn: "ByteDance",
    department: "抖音电商",
    departmentEn: "Douyin E-commerce",
    role: "商家端产品经理",
    roleEn: "Merchant Product Manager Intern",
    period: "2025.08 - 2026.01",
    color: "#5F83D8",
    bgImage: "/picture/id-project/myresume/bytedance-card.png",
    detailBg: "/picture/id-project/myresume/bytedance-bg.png",
    resumeIndices: [2],
    description:
      "聚焦抖店商家入驻与资质管理模块，通过产品化手段降低因规则模糊、流程受阻产生的CPO，实现商家入驻的减负提效；针对特殊白名单商家搭建产品化入驻功能，提高商家入驻效率与成功率",
  },
  {
    id: 3,
    company: "小红书",
    companyEn: "Xiaohongshu (REDnote)",
    department: "产品设计部",
    departmentEn: "Product Design Dept.",
    role: "用户研究",
    roleEn: "User Research Intern",
    period: "2025.02 - 2025.07",
    color: "#c04a3f",
    bgImage: "/picture/id-project/myresume/rednote-card.png",
    detailBg: "/picture/id-project/myresume/rednote-bg.png",
    resumeIndices: [4],
    description:
      "针对小红书社区发布侧相关业务设计调研方案，通过多种调研手段摸清体验侧业务现状、洞察用户痛点与需求，支撑产品开发决策",
  },
  {
    id: 4,
    company: "字节跳动",
    companyEn: "ByteDance",
    department: "抖音生活服务",
    departmentEn: "Douyin Local Services",
    role: "体验产品设计",
    roleEn: "UX Product Design Intern",
    period: "2024.08 - 2025.02",
    color: "#5F83D8",
    bgImage: "/picture/id-project/myresume/bytedance-card.png",
    detailBg: "/picture/id-project/myresume/bytedance-bg.png",
    resumeIndices: [3],
    description:
      "聚焦抖音来客（本地商家一站式经营平台）的商家服务与体验优化，以用户体验为核心优化商家服务体验流程，助力商家经营体验提效",
  },
];

/* ============================================================
   拱形弧度参数
   ============================================================ */
const arcTransforms: { ty: number; rot: number }[] = [
  { ty: 18, rot: -4 },
  { ty: 5, rot: -1.5 },
  { ty: 0, rot: 0 },
  { ty: 5, rot: 1.5 },
  { ty: 18, rot: 4 },
];

/* ============================================================
   邮票卡片组件（画廊模式 & 详情模式共用）
   ============================================================ */
function StampCard({
  stamp,
  index,
  onClick,
  size = "normal",
  disableArc = false,
  className = "",
  style: extraStyle,
}: {
  stamp: StampData;
  index: number;
  onClick?: () => void;
  size?: "normal" | "large" | "small";
  disableArc?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 });
    setIsHovered(false);
  }, []);

  const arc = disableArc ? { ty: 0, rot: 0 } : arcTransforms[index] || { ty: 0, rot: 0 };

 const sizeStyles: Record<string, React.CSSProperties> = {
   normal: { height: "320px", aspectRatio: "259 / 368" },
   large: { width: "100%", aspectRatio: "259 / 368" },
   small: { height: "100px", aspectRatio: "259 / 368" },
 };

 return (
   <button
     ref={cardRef}
     onClick={onClick}
     onMouseMove={handleMouseMove}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={handleMouseLeave}
     className={`stamp-card-v2 stamp-enter group focus:outline-none ${className}`}
     style={{
       ...sizeStyles[size],
        animationDelay: `${index * 0.08}s`,
        animationFillMode: "backwards",
        backgroundImage: `url(${stamp.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform:
          size === "normal"
            ? isHovered
              ? `translateY(${arc.ty - 22}px) rotate(${arc.rot * 0.3}deg) scale(1.05)`
              : `translateY(${arc.ty}px) rotate(${arc.rot}deg)`
            : undefined,
        boxShadow:
          size === "normal"
            ? isHovered
              ? "0 20px 40px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3)"
              : "0 4px 12px rgba(0,0,0,0.2)"
            : "0 4px 12px rgba(0,0,0,0.2)",
        ...extraStyle,
      }}
    >
      <div className="relative flex flex-col h-full">
        {/* 镭射全息光泽 */}
        <div
          className="stamp-hologram-v2"
          style={{
            background: `radial-gradient(
              ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              ${stamp.color}55 0%,
              ${stamp.color}30 15%,
              rgba(255, 255, 255, 0.25) 30%,
              ${stamp.color}20 50%,
              rgba(255, 255, 255, 0.15) 70%,
              ${stamp.color}15 85%,
              transparent 100%
            )`,
            opacity: mousePos.x !== 0.5 || mousePos.y !== 0.5 ? 1 : 0,
          }}
        />

        {/* 主内容区 —— 小尺寸时隐藏 */}
        {size !== "small" && (
          <div className="flex-1 flex flex-col items-center justify-center relative px-4 py-6">
            <div className="relative z-[2] flex flex-col items-center gap-1">
              <span
                className="text-[11px] tracking-[0.15em] opacity-70 text-center leading-snug"
                style={{ color: stamp.color }}
              >
                {stamp.department}
              </span>
              <span
                className="text-[7px] tracking-[0.1em] uppercase opacity-40 text-center leading-tight"
                style={{ color: stamp.color }}
              >
                {stamp.departmentEn}
              </span>
              <span
                className="text-2xl font-black leading-tight text-center mt-2"
                style={{ color: stamp.color }}
              >
                {stamp.company}
              </span>
              <span
                className="text-[8px] tracking-wider opacity-45 text-center leading-tight mt-0.5"
                style={{ color: stamp.color }}
              >
                {stamp.companyEn}
              </span>
              <div
                className="w-10 h-[1.5px] rounded-full my-2.5 opacity-25"
                style={{ backgroundColor: stamp.color }}
              />
              <span
                className="text-[12px] tracking-wider opacity-60 text-center leading-relaxed font-bold"
                style={{ color: stamp.color }}
              >
                {stamp.role}
              </span>
              <span
                className="text-[7px] tracking-wide opacity-35 text-center leading-tight"
                style={{ color: stamp.color }}
              >
                {stamp.roleEn}
              </span>
            </div>
          </div>
        )}

        {/* 底部信息区 —— 小尺寸时隐藏 */}
        {size !== "small" && (
          <div className="px-5 pb-4 flex items-end justify-between relative z-[2]">
            <span
              className="text-[9px] tracking-wider opacity-45"
              style={{ color: stamp.color }}
            >
              No.{String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="text-[8px] tracking-wider opacity-45"
              style={{ color: stamp.color }}
            >
              {stamp.period}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

/* ============================================================
   邮票画廊组件
   ============================================================ */
function StampGallery({
  onSelectStamp,
  onClose,
}: {
  onSelectStamp: (stampIndex: number) => void;
  onClose: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hoveredStamp = hoveredIndex !== null ? stamps[hoveredIndex] : null;

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col">
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
          <FileText size={18} className="text-white/70" />
          <h3 className="text-xl font-bold text-white">My Resume</h3>
          <span className="text-xs text-white/40">·</span>
          <span className="text-sm text-white/50">Ruby 的实习经历</span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* 邮票 + 职责说明 */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-8"
        style={{ animation: "fadeIn 0.5s ease-out 0.1s both" }}
      >
        <div className="h-[72px] flex items-end justify-center mb-40 max-w-[700px] w-full">
          {hoveredStamp ? (
            <div
              key={hoveredStamp.id}
              className="text-center"
              style={{ animation: "fadeIn 0.25s ease-out" }}
            >
              <p className="text-[13px] text-white/60 leading-relaxed tracking-wide">
                {hoveredStamp.description}
              </p>
            </div>
          ) : (
            <span className="text-xs text-white/30 tracking-wider">
              点击邮票查看详细经历 · ESC 关闭
            </span>
          )}
        </div>

        <div className="flex items-end justify-center gap-5">
          {stamps.map((stamp, index) => (
            <div
              key={stamp.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <StampCard
                stamp={stamp}
                index={index}
                onClick={() => onSelectStamp(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   详情视图 —— 选中邮票左上 + 其他邮票左下 + 右侧文字
   ============================================================ */
function ResumeDetailView({
  stampIndex,
  onBack,
  onClose,
  onSwitchStamp,
}: {
  stampIndex: number;
  onBack: () => void;
  onClose: () => void;
  onSwitchStamp: (index: number) => void;
}) {
  const selectedStamp = stamps[stampIndex];
  const otherStamps = stamps.filter((_, i) => i !== stampIndex);
  const contentRef = useRef<HTMLDivElement>(null);

  // 合并该邮票对应的所有 resumeData 条目的项目
  const allProjects: { entry: ResumeEntry; project: ResumeProject }[] = [];
  for (const ri of selectedStamp.resumeIndices) {
    const entry = resumeData[ri];
    if (entry) {
      for (const project of entry.projects) {
        allProjects.push({ entry, project });
      }
    }
  }

  const mainEntry = resumeData[selectedStamp.resumeIndices[0]];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onBack]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
  <div
    className="fixed inset-0 z-[1000] resume-detail-selection"
    style={{
      animation: "fadeIn 0.3s ease-out",
      "--selection-color": selectedStamp.color,
    } as React.CSSProperties}
  >
    {/* 背景图 */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${selectedStamp.detailBg})` }}
    />
    {/* 黑色半透明蒙层 */}
    <div className="absolute inset-0 bg-black/80" />

    {/* 内容区域 —— 带内边距 */}
    <div className="relative z-10 w-full h-full flex p-8 lg:p-12">

    {/* ====== 左侧 —— 邮票区域（百分比宽度，overflow-hidden 防止溢出） ====== */}
    <div
      className="relative z-10 w-[30%] min-w-[260px] max-w-[380px] flex-shrink-0 flex flex-col py-2 pl-16 pr-8 overflow-hidden"
      style={{ animation: "fadeIn 0.4s ease-out" }}
    >
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors mb-6 self-start"
        >
          <ArrowLeft size={16} />
          <span className="text-xs tracking-wider">返回</span>
        </button>

        {/* 选中的邮票 —— 大尺寸 */}
        <div
          className="mb-auto"
          style={{ animation: "fadeIn 0.5s ease-out 0.1s both" }}
        >
          <StampCard
            stamp={selectedStamp}
            index={stampIndex}
            size="large"
            disableArc
          />
        </div>

        {/* 其他邮票 —— 缩小排列在底部 */}
        <div
          className="flex items-center gap-2 mt-4"
          style={{ animation: "fadeIn 0.5s ease-out 0.2s both" }}
        >
          {otherStamps.map((stamp) => {
            const originalIndex = stamps.findIndex((s) => s.id === stamp.id);
            return (
              <StampCard
                key={stamp.id}
                stamp={stamp}
                index={originalIndex}
                size="small"
                disableArc
                onClick={() => onSwitchStamp(originalIndex)}
                className="cursor-pointer hover:!opacity-100 opacity-60 transition-opacity"
              />
            );
          })}
        </div>
      </div>

      {/* ====== 右侧 —— 文字内容（flex 纵向布局：固定标题 + 可滚动项目列表） ====== */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 min-w-0 flex flex-col overflow-hidden pr-16"
        style={{ animation: "fadeIn 0.5s ease-out 0.15s both" }}
      >
        {/* ---- 固定区域：关闭按钮 + 标题信息 + 职责描述 ---- */}
        <div className="flex-shrink-0">
          {/* 关闭按钮 */}
          <div className="flex justify-end pb-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="pl-8 pr-4">
            {/* 英文部门名 —— 更亮、更细、放大 */}
            <div className="flex items-baseline gap-3 mb-3">
              <span
                className="text-sm font-light tracking-[0.2em] uppercase"
                style={{ color: selectedStamp.color }}
              >
                {selectedStamp.departmentEn}
              </span>
            </div>

            <h2 className="text-4xl font-black text-white leading-tight mb-2">
              {mainEntry.company}
              <span className="text-white/30 mx-3">·</span>
              <span className="text-2xl font-bold text-white/70">{mainEntry.department}</span>
            </h2>

            {/* Role 标签 —— 主题色实色背景 + 白色文字 + 无圆角 */}
            <div className="flex items-center gap-4 mt-3">
              <span
                className="text-sm font-bold px-4 py-1.5 text-white"
                style={{ backgroundColor: selectedStamp.color }}
              >
                {mainEntry.role}
              </span>
              <span className="text-xs text-white/50 tracking-wider">
                {selectedStamp.period}
              </span>
              {mainEntry.location && (
                <span className="text-xs text-white/40 inline-flex items-center gap-1">
                  <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                    <path d="M511.983627 1022.005576c-177.413666 0-356.430852-48.131207-356.430852-155.653059 0-83.935668 122.605386-135.997394 236.549507-148.835793l6.237051-0.718361L240.863766 464.627063c-5.077645-9.096169-9.868765-18.74697-14.093996-28.512381l-4.1536-8.400321-0.652869-3.360538c-13.843286-35.848463-20.852934-73.371054-20.852934-111.49842 0-171.404812 139.484821-310.86098 310.917262-310.86098 171.427324 0 310.887586 139.456169 310.887586 310.86098 0 38.164205-7.024997 75.670423-20.906146 111.49842l-2.082428 5.38873 0.194428 0-1.603521 3.300162c-4.535293 10.694573-9.552563 20.965497-15.000646 30.699186L511.853667 914.597311l-64.345494-105.092523-2.430352 0.211824c-104.22783 8.933463-170.69873 37.702694-188.130751 53.720505l-3.148713 2.898003 3.148713 2.914376c22.738887 21.12411 110.175285 54.535057 248.78825 55.520501l12.375865 0.020466-0.016373-0.020466c138.357138-0.969071 225.969545-34.304294 248.898767-55.385425l3.229554-2.967588-3.284813-2.898003c-12.722766-11.271718-59.075467-33.511231-130.370233-46.566572l54.754045-87.675852c114.248044 25.745361 177.125093 74.360592 177.125093 137.074935 0 107.527992-179.017186 155.653059-356.453365 155.653059L511.983627 1022.004553zM511.977487 145.159054c-73.081459 0-132.527362 59.488883-132.527362 132.598994 0 73.05076 59.440787 132.48029 132.527362 132.48029 73.132624 0 132.62253-59.429531 132.62253-132.48029C644.600017 204.647937 585.110111 145.159054 511.977487 145.159054L511.977487 145.159054zM511.977487 145.159054" />
                  </svg>
                  {mainEntry.location}
                </span>
              )}
            </div>

            {/* 职责概述 —— 更白更亮 */}
            {mainEntry.responsibility && (
              <div className="mt-6">
                <VariableProximity
                  label={mainEntry.responsibility}
                  containerRef={contentRef}
                  fromFontWeight={300}
                  toFontWeight={700}
                  fromOpacity={0.7}
                  toOpacity={1}
                  fromColor="#d0d0d0"
                  toColor="#ffffff"
                  radius={120}
                  falloff="gaussian"
                  className="text-[15px] leading-[2] tracking-wide"
                />
              </div>
            )}

            {/* 分隔线 */}
            <div className="flex items-center gap-3 mt-8 mb-0">
              <div
                className="w-8 h-[2px] rounded-full"
                style={{ backgroundColor: selectedStamp.color, opacity: 0.4 }}
              />
              <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase">
                Projects
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
          </div>
        </div>

        {/* ---- 可滚动区域：项目列表（内容不超出容器） ---- */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden resume-book-scroll">
          <div className="pl-8 pr-4 pt-6 pb-16">
            <div className="space-y-10">
              {allProjects.map(({ project }, pi) => (
                <div key={pi} className="group">
                  {/* 项目名 */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: selectedStamp.color }}
                    />
                    <h3 className="text-lg font-bold text-white/90 leading-tight">
                      {project.name}
                    </h3>
                  </div>

                  {/* 项目详情 —— VariableProximity 效果 */}
                  <div className="pl-5 space-y-3">
                    {project.details.map((detail, di) => (
                      <div key={di}>
                        <VariableProximity
                          label={detail}
                          containerRef={contentRef}
                          fromFontWeight={300}
                          toFontWeight={600}
                          fromOpacity={0.5}
                          toOpacity={0.9}
                          fromColor="#a0a0a0"
                          toColor="#f0f0f0"
                          radius={100}
                          falloff="gaussian"
                          className="text-[14px] leading-[2] tracking-wide"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 项目间分隔 */}
                  {pi < allProjects.length - 1 && (
                    <div className="mt-8 flex items-center gap-2 pl-5">
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex-1 border-t border-dashed border-white/8" />
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

/* ============================================================
   主组件 —— 管理两层状态：邮票画廊 → 详情视图
   ============================================================ */
export default function ResumeBook({ onClose }: { onClose: () => void }) {
  const [selectedStampIndex, setSelectedStampIndex] = useState<number | null>(null);

  const handleSelectStamp = useCallback((index: number) => {
    setSelectedStampIndex(index);
  }, []);

  const handleBackToStamps = useCallback(() => {
    setSelectedStampIndex(null);
  }, []);

  if (selectedStampIndex !== null) {
    return (
      <ResumeDetailView
        stampIndex={selectedStampIndex}
        onBack={handleBackToStamps}
        onClose={onClose}
        onSwitchStamp={setSelectedStampIndex}
      />
    );
  }

  return <StampGallery onSelectStamp={handleSelectStamp} onClose={onClose} />;
}
