import type { PromptTemplate, AdaptationGuide } from "./types";

export const promptTemplates: PromptTemplate[] = [
  {
    id: "pt-001",
    title: "点线面基础分析",
    tier: "beginner",
    role: "你是一位专业的平面构成教师，擅长帮助学生理解和识别设计中的基础元素。",
    task: "请分析这张图片中的点、线、面元素，并说明它们如何影响整体构成。",
    methodology:
      "1. 识别图像中的点元素（视觉焦点、小型对象）\n2. 分析线元素（边界、运动轨迹、视觉引导）\n3. 解读面元素（色块、形状、负空间）\n4. 总结元素之间的关系和层次",
    expectedOutput:
      "详细的构成分析报告，包含具体的元素位置标注、视觉流动路径图示，以及设计改进建议。",
    tags: ["点线面", "基础构成", "视觉分析"],
    category: "概念分析",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "pt-002",
    title: "材质纹理描述生成",
    tier: "beginner",
    role: "你是一位专注于材质与纹理研究的设计专家。",
    task: "根据给定的材质图片，生成详细的材质描述，包括触觉感受、视觉特征和适用场景。",
    methodology:
      "1. 观察材质的表面特征（粗糙度、光泽度、纹理密度）\n2. 描述触觉联想（软硬、冷暖、质感）\n3. 分析光影反应（反射、透射、漫射）\n4. 建议设计应用场景",
    expectedOutput:
      "完整的材质分析文档，包含触觉词汇、视觉关键词、配色建议和设计应用案例。",
    tags: ["材质", "纹理", "触觉感知"],
    category: "材质分析",
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "pt-003",
    title: "平衡构成设计方案",
    tier: "intermediate",
    role: "你是一位资深的平面构成设计师，精通对称与非对称平衡原理。",
    task: "为给定主题创建三种不同的平衡构成方案：对称平衡、非对称平衡和放射平衡。",
    methodology:
      "1. 分析主题的核心概念和情感基调\n2. 设计对称平衡方案（镜像、轴对称）\n3. 设计非对称平衡方案（视觉重量分配）\n4. 设计放射平衡方案（中心扩散）\n5. 为每个方案提供元素布局和比例建议",
    expectedOutput:
      "三套完整的构成方案草图，包含元素位置、尺寸比例、视觉重心标注和实施步骤说明。",
    tags: ["平衡", "构成", "对称", "非对称"],
    category: "构成设计",
    createdAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "pt-004",
    title: "空间深度创造指导",
    tier: "intermediate",
    role: "你是一位擅长空间表现的视觉设计专家。",
    task: "指导学生运用透视、重叠、大小对比等技法，在二维平面上创造三维空间幻觉。",
    methodology:
      "1. 讲解线性透视原理（一点透视、两点透视）\n2. 示范大气透视效果（色彩饱和度渐变）\n3. 应用重叠原理（前后关系）\n4. 运用大小对比（近大远小）\n5. 结合明暗层次（光影深度）",
    expectedOutput:
      "分步骤的空间构建教程，包含透视网格参考、元素排列顺序、色彩深度变化示意图。",
    tags: ["空间", "透视", "深度", "层次"],
    category: "空间表现",
    createdAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "pt-005",
    title: "光影氛围营造",
    tier: "intermediate",
    role: "你是一位精通光影艺术的设计导师。",
    task: "分析特定情感氛围需求，设计合适的光影方案，包括光源类型、方向、强度和色温。",
    methodology:
      "1. 确定目标情感（温馨、神秘、戏剧化等）\n2. 选择光源类型（主光、辅光、轮廓光）\n3. 设计光照角度和强度\n4. 应用明暗五调子（高光、亮面、明暗交界线、暗面、反光）\n5. 调整色温营造氛围",
    expectedOutput:
      "光影设计方案书，包含光源布局图、明暗分布示意、参考案例和技术参数。",
    tags: ["光影", "明暗", "氛围", "情感"],
    category: "光影设计",
    createdAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "pt-006",
    title: "色彩情感配色方案",
    tier: "advanced",
    role: "你是一位色彩心理学专家和专业配色师。",
    task: "根据设计主题和目标情感，创建科学的配色方案，包括主色、辅助色和点缀色的选择与搭配。",
    methodology:
      "1. 分析主题的情感诉求和文化内涵\n2. 确定主色调（单色、类比、互补、三角）\n3. 选择辅助色（调和、对比、层次）\n4. 设计点缀色（强调、活力、平衡）\n5. 考虑色彩比例（60-30-10法则）\n6. 验证色彩可访问性（对比度、色盲友好）",
    expectedOutput:
      "完整配色方案，包含色彩编码（HEX/RGB）、比例分配、情感关联说明、应用示例和无障碍检测报告。",
    tags: ["色彩", "配色", "情感", "心理学"],
    category: "色彩设计",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "pt-007",
    title: "综合构成批评与改进",
    tier: "advanced",
    role: "你是一位资深的设计评论家和教育家，具备深厚的理论功底和丰富的实践经验。",
    task: "对学生的综合构成作品进行深度批评，从多个维度分析其优缺点，并提供具体的改进建议。",
    methodology:
      "1. 评估形式美法则应用（统一、对比、平衡、节奏、比例）\n2. 分析视觉层次和引导性\n3. 检验色彩和谐度和情感表达\n4. 考察空间深度和材质表现\n5. 评价创意性和完成度\n6. 提供针对性改进方案（重构建议、细节优化）",
    expectedOutput:
      "专业的作品批评报告，包含优点总结、问题诊断、评分矩阵、改进前后对比示意图和学习资源推荐。",
    tags: ["综合构成", "批评", "评价", "改进"],
    category: "作品评价",
    createdAt: "2024-01-21T10:00:00Z",
  },
  {
    id: "pt-008",
    title: "AI艺术生成提示词工程",
    tier: "advanced",
    role: "你是一位AI艺术创作专家，精通Midjourney、Stable Diffusion等生成式AI工具。",
    task: "将设计概念转化为高质量的AI生成提示词，优化参数设置以获得期望的视觉效果。",
    methodology:
      "1. 提取核心设计概念和关键词\n2. 构建结构化提示词（主体、风格、细节、技术参数）\n3. 添加质量增强词（高清、专业、艺术风格）\n4. 设置负面提示词（排除不需要的元素）\n5. 调整生成参数（宽高比、种子值、CFG强度）\n6. 迭代优化（基于输出调整提示词）",
    expectedOutput:
      "完整的AI生成提示词包，包含正面提示、负面提示、参数配置、风格参考图、预期效果说明和迭代优化建议。",
    tags: ["AI", "提示词", "Midjourney", "生成艺术"],
    category: "AI应用",
    createdAt: "2024-01-22T10:00:00Z",
  },
];

export const adaptationGuides: AdaptationGuide[] = [
  {
    tool: "Midjourney",
    description: "适用于生成高质量、富有艺术感的概念图和氛围图",
    adaptationTips: [
      "在提示词前加上 '/imagine prompt:' 命令",
      "使用 '--ar 16:9' 等参数控制宽高比",
      "添加 '--v 6' 指定版本号",
      "使用 '--stylize 100' 控制风格化程度",
      "通过 '--chaos 50' 增加创意变化",
      "使用 '::权重' 语法强调特定元素",
    ],
    exampleOutput:
      "/imagine prompt: minimalist composition with geometric shapes, bauhaus style, primary colors, clean lines, high contrast --ar 16:9 --v 6 --stylize 100",
  },
  {
    tool: "Stable Diffusion",
    description: "开源灵活，适合精确控制和批量生成",
    adaptationTips: [
      "使用详细的正面提示词描述期望效果",
      "在negative prompt中排除不需要的元素",
      "建议CFG Scale设置为7-12之间",
      "Steps设置在20-50之间平衡质量和速度",
      "使用LoRA模型增强特定风格",
      "结合ControlNet进行精确构图控制",
    ],
    exampleOutput:
      "Positive: abstract composition, point line surface elements, minimalist design, professional photography, 4k, high quality\nNegative: text, watermark, low quality, blurry, distorted\nSettings: CFG 9, Steps 30, Size 768x768",
  },
  {
    tool: "文心一格 (Wenxin Yige)",
    description: "百度AI艺术生成工具，对中文理解更好",
    adaptationTips: [
      "直接使用中文描述，语言更自然流畅",
      "明确指定艺术风格（如'包豪斯风格'、'极简主义'）",
      "描述具体元素和颜色（如'红色圆形'、'蓝色线条'）",
      "添加质量词（如'高清'、'精美'、'专业'）",
      "可以参考具体艺术家或作品风格",
      "使用'画面'、'构图'等专业术语",
    ],
    exampleOutput:
      "极简主义平面构成，点线面元素组合，红色圆形、蓝色直线、灰色矩形，包豪斯风格，对称平衡构图，高清，专业设计作品",
  },
  {
    tool: "通义万相 (Tongyi Wanxiang)",
    description: "阿里巴巴AI创作工具，擅长多风格生成",
    adaptationTips: [
      "支持中文描述，可以很详细地说明需求",
      "明确画面主体和背景关系",
      "指定具体的设计风格（现代、复古、未来感等）",
      "描述色彩方案和明暗关系",
      "可以要求特定的构图方式",
      "添加技术参数如'高分辨率'、'细节丰富'",
    ],
    exampleOutput:
      "创作一幅平面构成作品，主体是由多个几何形状组成的抽象图案，包含圆形、三角形和矩形，使用对比色配色，采用非对称平衡构图，明暗对比强烈，高分辨率，艺术摄影质感",
  },
];

export const courseRecommendations: Record<string, string[]> = {
  pa01: ["pt-001", "pt-002"],
  pa02: ["pt-002", "pt-003"],
  pa03: ["pt-003", "pt-004"],
  pa04: ["pt-004", "pt-005"],
  pa05: ["pt-005", "pt-006"],
  pa06: ["pt-006", "pt-007", "pt-008"],
};
