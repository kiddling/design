import { KnowledgeCard } from "./types/content";
import { CardRelationship } from "./legacy-types";

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: "kandinsky-point-line-plane",
    title: "康定斯基：点线面",
    category: "theory",
    difficulty: "base",
    summary:
      "康定斯基将视觉元素归纳为点、线、面三种基本形态，为现代抽象艺术和设计构成理论奠定基础。",
    coreIdea:
      "点、线、面是一切视觉形式的基础。点是最基本的形式元素，线是点的运动轨迹，面是线的扩展。这三者构成了视觉语言的基本词汇，可以创造出无限的视觉表达。康定斯基认为，每种形式都有其内在的精神性和表现力。",
    examples: [
      "点的表现：星空、点阵图案、像素艺术",
      "线的表现：音乐的可视化、书法、建筑轮廓",
      "面的表现：色块构成、平面分割、蒙德里安的作品",
    ],
    applicationTips: [
      "观察日常生活中的点线面：从建筑、自然、产品中识别基本形式",
      "练习形式转换：将复杂的视觉对象分解为点线面的组合",
      "控制密度和节奏：通过点线面的疏密变化创造视觉张力",
      "结合情感表达：不同的点线面组合传达不同的情绪和氛围",
    ],
    recommendedReadings: [
      {
        title: "《点线面》",
        author: "瓦西里·康定斯基",
      },
      {
        title: "《论艺术的精神》",
        author: "瓦西里·康定斯基",
      },
      {
        title: "Kandinsky - The Elements of Art",
        url: "https://www.theartstory.org/artist/kandinsky-wassily/",
      },
    ],
    relatedCases: ["bauhaus-principles", "workflow-lens-form"],
    tags: ["构成理论", "抽象艺术", "视觉语言", "基础元素"],
    description: "",
  },
  {
    id: "bauhaus-principles",
    title: "包豪斯设计原则",
    category: "theory",
    difficulty: "base",
    summary:
      "包豪斯倡导「形式追随功能」，强调艺术与技术的结合，追求简洁、实用、现代的设计美学。",
    coreIdea:
      "包豪斯的核心理念是将艺术、工艺和技术统一。设计应该服务于大众，追求功能性与美学的完美结合。包豪斯摒弃繁复的装饰，主张使用工业材料和标准化生产，创造简洁而富有表现力的形式。",
    examples: [
      "几何形态的家具设计（如巴塞罗那椅）",
      "功能主义建筑（如德绍包豪斯校舍）",
      "简洁的字体设计（如通用字体）",
      "模块化设计系统",
    ],
    applicationTips: [
      "减法思维：去除不必要的装饰，保留功能核心",
      "几何形态：使用圆、方、三角等基本几何图形构建设计",
      "色彩克制：使用有限的色彩方案，强调色彩的功能性",
      "材料诚实：展现材料的本质属性，不做虚假的装饰",
      "系统化设计：建立设计规则，追求一致性和可复制性",
    ],
    recommendedReadings: [
      {
        title: "《包豪斯》",
        author: "弗兰克·惠特福德",
      },
      {
        title: "Bauhaus 1919-1933",
        author: "Hans Maria Wingler",
      },
      {
        title: "The Bauhaus and Design Theory",
        url: "https://www.bauhaus100.com/",
      },
    ],
    relatedCases: ["kandinsky-point-line-plane", "workflow-lens-function"],
    tags: ["设计运动", "现代主义", "功能主义", "几何美学"],
    description: "",
  },
  {
    id: "workflow-lens-form",
    title: "工作流透镜：形态",
    category: "lens",
    difficulty: "base",
    summary:
      "从形态角度审视设计，关注点线面的组合、比例、节奏和平衡，创造视觉美感。",
    coreIdea:
      "形态透镜帮助我们从纯视觉的角度分析和创造设计。通过关注形状、轮廓、构图、比例等形式要素，我们可以创造出具有视觉吸引力和美学价值的作品。这个透镜强调「看」的能力——培养对形式的敏感性和判断力。",
    examples: [
      "Logo设计中的形态简化与符号化",
      "海报构图中的视觉平衡",
      "建筑立面的韵律与比例",
      "界面设计中的空间布局",
    ],
    applicationTips: [
      "观察训练：每天练习从形态角度解构看到的设计",
      "草图练习：用快速草图探索不同的形态可能性",
      "黑白思维：暂时抛开色彩，专注于形态本身",
      "比例研究：学习黄金比例、三分法等构图原则",
      "形态变化：尝试同一设计的多种形态演绎",
    ],
    recommendedReadings: [
      {
        title: "《形态构成》",
        author: "朝仓直巳",
      },
      {
        title: "The Elements of Typographic Style",
        author: "Robert Bringhurst",
      },
    ],
    relatedCases: [
      "kandinsky-point-line-plane",
      "workflow-lens-space",
      "workflow-lens-function",
    ],
    tags: ["设计思维", "视觉分析", "构成要素", "形式美"],
    description: "",
  },
  {
    id: "workflow-lens-function",
    title: "工作流透镜：功能",
    category: "lens",
    difficulty: "base",
    summary:
      "从功能角度审视设计，确保设计满足用户需求，解决实际问题，实现设计目标。",
    coreIdea:
      "功能透镜强调设计的目的性和实用性。每个设计元素都应该有其存在的理由——要么服务于功能需求，要么服务于交流目标。这个透镜帮助我们避免过度装饰，确保形式真正服务于内容和目的。",
    examples: [
      "交通标识系统的清晰性和识别性",
      "产品设计中的人机工程学考量",
      "网页设计中的信息架构和导航",
      "包装设计的保护和展示功能",
    ],
    applicationTips: [
      "目标导向：明确每个设计决策服务的目标",
      "用户研究：了解实际使用场景和用户需求",
      "功能优先：先确保功能实现，再考虑美学提升",
      "测试验证：通过原型测试验证功能的有效性",
      "迭代优化：基于反馈不断改进功能体验",
    ],
    recommendedReadings: [
      {
        title: "《设计心理学》",
        author: "唐纳德·诺曼",
      },
      {
        title: "《Don't Make Me Think》",
        author: "Steve Krug",
      },
    ],
    relatedCases: [
      "bauhaus-principles",
      "workflow-lens-user",
      "workflow-lens-context",
    ],
    tags: ["用户体验", "可用性", "设计目标", "功能主义"],
    description: "",
  },
  {
    id: "workflow-lens-space",
    title: "工作流透镜：空间",
    category: "lens",
    difficulty: "advance",
    summary:
      "从空间角度审视设计，关注层次、深度、留白和视觉动线，创造空间感和呼吸感。",
    coreIdea:
      "空间透镜帮助我们理解和创造视觉空间。无论是二维还是三维设计，空间的组织都至关重要。通过控制元素的大小、位置、重叠、透视等，我们可以创造层次感和引导视觉流动。留白不是空的空间，而是积极的设计元素。",
    examples: [
      "杂志排版中的信息层次和呼吸空间",
      "建筑空间的流线和体验序列",
      "界面设计中的视觉层级",
      "摄影构图中的前景、中景、背景",
    ],
    applicationTips: [
      "留白意识：学会欣赏和运用负空间",
      "层次建立：使用大小、颜色、位置创造清晰的层次",
      "网格系统：使用网格规范空间组织",
      "视觉动线：设计元素的空间排列引导视线流动",
      "深度暗示：运用透视、阴影、模糊等技法创造深度",
    ],
    recommendedReadings: [
      {
        title: "《建筑的永恒之道》",
        author: "克里斯托弗·亚历山大",
      },
      {
        title: "《白》",
        author: "原研哉",
      },
    ],
    relatedCases: [
      "kandinsky-point-line-plane",
      "workflow-lens-form",
      "gehl-life-between-buildings",
    ],
    tags: ["空间设计", "层次感", "留白", "视觉动线"],
    description: "",
  },
  {
    id: "workflow-lens-user",
    title: "工作流透镜：用户",
    category: "lens",
    difficulty: "advance",
    summary:
      "从用户角度审视设计，关注用户的需求、行为、情感和体验，创造以人为本的设计。",
    coreIdea:
      "用户透镜要求我们站在使用者的角度思考。不同的用户有不同的背景、能力、期望和限制。好的设计应该是包容的、易用的、令人愉悦的。这个透镜强调同理心——理解用户的真实需求和痛点。",
    examples: [
      "无障碍设计考虑不同能力的用户",
      "移动应用的单手操作友好性",
      "老年人产品的简化交互",
      "儿童玩具的安全性和趣味性",
    ],
    applicationTips: [
      "用户画像：创建详细的用户画像和使用场景",
      "同理心地图：理解用户的想法、感受和行为",
      "可用性测试：观察真实用户使用产品",
      "反馈收集：建立收集和分析用户反馈的机制",
      "边缘案例：考虑极端情况和特殊需求",
    ],
    recommendedReadings: [
      {
        title: "《用户体验要素》",
        author: "Jesse James Garrett",
      },
      {
        title: "《Designing for Emotion》",
        author: "Aarron Walter",
      },
    ],
    relatedCases: [
      "workflow-lens-function",
      "workflow-lens-context",
      "gehl-life-between-buildings",
    ],
    tags: ["用户研究", "同理心", "可用性", "体验设计"],
    description: "",
  },
  {
    id: "workflow-lens-context",
    title: "工作流透镜：语境",
    category: "lens",
    difficulty: "advance",
    summary:
      "从语境角度审视设计，考虑文化、环境、历史和社会因素，创造有意义的设计。",
    coreIdea:
      "语境透镜提醒我们设计不是孤立存在的。每个设计都存在于特定的文化、社会、历史和物理环境中。理解语境可以帮助我们创造更有意义、更相关、更能引起共鸣的设计。忽视语境可能导致误解甚至冒犯。",
    examples: [
      "品牌设计中的文化适应性（本地化）",
      "建筑设计与周边环境的和谐",
      "历史场所的现代化改造",
      "社会议题的视觉传达",
    ],
    applicationTips: [
      "文化研究：了解目标文化的符号、色彩、习俗",
      "环境调研：考察设计将存在的物理和社会环境",
      "历史意识：理解设计类型的历史演变和传统",
      "趋势洞察：关注当代文化和社会趋势",
      "跨文化对话：在保持文化特色和追求普遍性间平衡",
    ],
    recommendedReadings: [
      {
        title: "《文化与设计》",
        author: "Kathryn Best",
      },
      {
        title: "《Design as Communication》",
        author: "Malcolm Barnard",
      },
    ],
    relatedCases: ["workflow-lens-user", "gehl-life-between-buildings"],
    tags: ["文化研究", "环境设计", "社会责任", "本地化"],
    description: "",
  },
  {
    id: "gehl-life-between-buildings",
    title: "扬·盖尔：建筑之间的生活",
    category: "framework",
    difficulty: "advance",
    summary:
      "扬·盖尔关注人在公共空间中的活动和体验，强调以人为本的城市和建筑设计。",
    coreIdea:
      "扬·盖尔提出，好的城市设计应该支持和促进人的活动。他将公共空间中的活动分为必要性活动、自发性活动和社会性活动。设计应该首先满足步行、停留、交流等基本人类需求，创造有活力、有人情味的城市空间。",
    examples: [
      "哥本哈根步行街的活力营造",
      "公共广场的座椅和停留空间设计",
      "街道尺度对步行体验的影响",
      "社区中心的公共活动空间",
    ],
    applicationTips: [
      "人本视角：从步行者和使用者的角度设计空间",
      "活动支持：设计空间以支持多样化的人类活动",
      "尺度控制：保持适宜人的空间尺度",
      "感官体验：关注视觉、听觉、触觉等多维度体验",
      "观察方法：通过系统观察了解空间的实际使用情况",
    ],
    recommendedReadings: [
      {
        title: "《交往与空间》",
        author: "扬·盖尔",
      },
      {
        title: "《人性化的城市》",
        author: "扬·盖尔",
      },
      {
        title: "How to Study Public Life",
        author: "Jan Gehl & Birgitte Svarre",
      },
    ],
    relatedCases: [
      "workflow-lens-user",
      "workflow-lens-context",
      "workflow-lens-space",
    ],
    tags: ["城市设计", "公共空间", "人本主义", "行为研究"],
    description: "",
  },
  {
    id: "gestalt-principles",
    title: "格式塔原理",
    category: "theory",
    difficulty: "base",
    summary:
      "格式塔心理学揭示了人类视觉感知的基本原理，包括接近、相似、连续、闭合等法则。",
    coreIdea:
      "格式塔原理描述了人脑如何组织视觉信息。我们倾向于将视觉元素组织成完整的、有意义的模式，而不是感知独立的部分。理解这些原理可以帮助设计师创造清晰、有秩序、易于理解的视觉作品。",
    examples: [
      "接近原理：将相近的元素归为一组",
      "相似原理：相似的元素被视为相关",
      "连续原理：眼睛沿着连续的路径移动",
      "闭合原理：完成不完整的形状",
      "图底关系：区分前景和背景",
    ],
    applicationTips: [
      "分组策略：使用接近和相似原理组织信息",
      "视觉连续性：创建引导视线的视觉路径",
      "简化形态：利用闭合原理减少视觉元素",
      "对比强化：明确图底关系增强视觉层次",
      "统一性：运用格式塔原理创造整体感",
    ],
    recommendedReadings: [
      {
        title: "《视觉思维》",
        author: "鲁道夫·阿恩海姆",
      },
      {
        title: "Laws of Seeing",
        author: "Wolfgang Metzger",
      },
    ],
    relatedCases: ["kandinsky-point-line-plane", "workflow-lens-form"],
    tags: ["视觉心理学", "认知科学", "感知原理", "构成法则"],
    description: "",
  },
];

export const cardRelationships: CardRelationship[] = [
  {
    source: "kandinsky-point-line-plane",
    target: "workflow-lens-form",
    type: "related",
  },
  {
    source: "kandinsky-point-line-plane",
    target: "bauhaus-principles",
    type: "related",
  },
  {
    source: "bauhaus-principles",
    target: "workflow-lens-function",
    type: "related",
  },
  {
    source: "workflow-lens-form",
    target: "workflow-lens-space",
    type: "prerequisite",
  },
  {
    source: "workflow-lens-function",
    target: "workflow-lens-user",
    type: "related",
  },
  {
    source: "workflow-lens-user",
    target: "workflow-lens-context",
    type: "related",
  },
  {
    source: "workflow-lens-space",
    target: "gehl-life-between-buildings",
    type: "related",
  },
  {
    source: "workflow-lens-user",
    target: "gehl-life-between-buildings",
    type: "related",
  },
  {
    source: "gestalt-principles",
    target: "kandinsky-point-line-plane",
    type: "related",
  },
  {
    source: "gestalt-principles",
    target: "workflow-lens-form",
    type: "prerequisite",
  },
];