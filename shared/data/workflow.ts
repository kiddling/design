import type {
  WorkflowStep,
  JanGehlStage,
  ToolRecommendation,
  DownloadableTemplate,
} from "../types/workflow.js";

export const workflowSteps: WorkflowStep[] = [
  {
    id: "observe",
    title: "观察 · 城市空间观察",
    description: "运用简·盖尔方法进行系统性观察",
    order: 1,
    guidance:
      "在这个阶段，你将学习如何像城市设计师一样观察空间。简·盖尔的方法论强调从人的角度出发，关注空间中的活动、行为和互动。",
    checklist: [
      { id: "obs-1", text: "选择观察地点（校园、街道、广场等）", completed: false },
      { id: "obs-2", text: "完成基础观察记录（人流、活动类型）", completed: false },
      { id: "obs-3", text: "记录空间元素（座椅、植物、标识等）", completed: false },
      { id: "obs-4", text: "拍摄至少10张观察照片", completed: false },
      { id: "obs-5", text: "整理观察笔记", completed: false },
    ],
    media: [
      {
        type: "image",
        src: "/assets/workflow/placeholder.svg",
        alt: "简·盖尔观察方法示意图",
        caption: "简·盖尔三阶段观察法",
      },
    ],
  },
  {
    id: "analyze",
    title: "分析 · 包豪斯解构",
    description: "使用包豪斯方法进行视觉分解",
    order: 2,
    guidance:
      "包豪斯的设计哲学强调「形式追随功能」。在这个阶段，你将学习如何将观察到的复杂空间分解为基本的设计元素：点、线、面、色彩和空间关系。",
    checklist: [
      { id: "ana-1", text: "选择3-5张关键照片进行分析", completed: false },
      { id: "ana-2", text: "标注点、线、面元素", completed: false },
      { id: "ana-3", text: "分析色彩构成", completed: false },
      { id: "ana-4", text: "识别空间层次关系", completed: false },
      { id: "ana-5", text: "完成力场分析图", completed: false },
    ],
    media: [
      {
        type: "image",
        src: "/assets/workflow/placeholder.svg",
        alt: "包豪斯解构方法",
        caption: "将复杂图像分解为基本元素",
      },
    ],
  },
  {
    id: "compose",
    title: "重构 · 数字化构成",
    description: "使用数字工具进行重新构成",
    order: 3,
    guidance:
      "现在是时候将你的分析转化为新的设计作品了。使用推荐的数字工具，根据包豪斯的构成原则，创作你的平面构成作品。",
    checklist: [
      { id: "com-1", text: "选择合适的数字工具（Canva/Figma/Pixlr）", completed: false },
      { id: "com-2", text: "创建基础构成框架", completed: false },
      { id: "com-3", text: "应用点线面元素", completed: false },
      { id: "com-4", text: "调整色彩和对比", completed: false },
      { id: "com-5", text: "导出最终作品", completed: false },
    ],
    media: [
      {
        type: "image",
        src: "/assets/workflow/placeholder.svg",
        alt: "数字构成示例",
        caption: "从观察到创作的完整流程",
      },
    ],
  },
];

export const janGehlStages: JanGehlStage[] = [
  {
    id: "counting",
    title: "阶段一：计数 Counting",
    description: "量化观察 - 统计人流和活动",
    content:
      "这是最基础的观察阶段。你需要记录在特定时间段内，有多少人经过或停留，他们在做什么活动。这些量化数据是后续分析的基础。",
    examples: [
      {
        type: "image",
        src: "/assets/workflow/placeholder.svg",
        alt: "人流计数示例",
        caption: "使用计数表记录不同时段的人流",
      },
    ],
    tips: [
      "选择2-3个时间段观察（早晨、中午、傍晚）",
      "分类记录：行走、坐下、站立、其他活动",
      "使用简单的标记系统（例如：正字记数法）",
      "注意天气和时间对人流的影响",
    ],
  },
  {
    id: "mapping",
    title: "阶段二：绘图 Mapping",
    description: "空间定位 - 标记活动发生的位置",
    content:
      "在平面图或简图上标注观察到的活动发生的具体位置。这帮助我们理解空间的使用模式和「热点」区域。",
    examples: [
      {
        type: "image",
        src: "/assets/workflow/placeholder.svg",
        alt: "空间标记示例",
        caption: "在平面图上标记不同活动的分布",
      },
    ],
    tips: [
      "准备观察地点的平面图或绘制简单示意图",
      "使用不同颜色或符号标记不同活动类型",
      "标注重要的空间元素（座椅、树木、建筑入口）",
      "拍照记录，便于后期对照",
    ],
  },
  {
    id: "tracking",
    title: "阶段三：追踪 Tracking",
    description: "行为追踪 - 记录人的移动路径",
    content:
      "选择几个观察对象，追踪记录他们在空间中的移动路径、停留点和行为变化。这能揭示空间的吸引力和可达性。",
    examples: [
      {
        type: "image",
        src: "/assets/workflow/placeholder.svg",
        alt: "行为追踪示例",
        caption: "追踪个体在空间中的移动轨迹",
      },
    ],
    tips: [
      "每次追踪3-5个不同的对象",
      "在图上绘制移动路径线",
      "标注停留点和停留时间",
      "观察他们的互动行为（单独、结伴、交谈）",
      "尊重隐私，保持适当距离",
    ],
  },
];

export const toolRecommendations: ToolRecommendation[] = [
  {
    id: "canva",
    name: "Canva",
    category: "平面设计",
    url: "https://www.canva.com",
    icon: "Palette",
    description: "免费易用的在线设计工具，适合初学者快速上手",
    summary:
      "Canva 提供丰富的模板和素材库，界面直观，无需安装。特别适合制作平面构成作品、添加图片标注和文字说明。",
    quickTips: [
      "使用「创建设计」选择自定义尺寸（推荐 1080x1080px）",
      "利用网格和对齐工具保证构成精准",
      "尝试「元素」中的基本形状（圆形、方形、线条）",
      "使用图层功能管理复杂构成",
      "导出为 PNG 或 PDF 高清格式",
    ],
    used: false,
  },
  {
    id: "figma",
    name: "Figma",
    category: "专业设计",
    url: "https://www.figma.com",
    icon: "Figma",
    description: "专业级设计工具，支持团队协作和高级功能",
    summary:
      "Figma 是设计行业标准工具，具有强大的矢量编辑能力和组件系统。适合需要精确控制和重复使用元素的复杂构成作品。",
    quickTips: [
      "学习使用 Frame（画框）作为画布",
      "掌握布尔运算创建复杂形状",
      "使用 Components（组件）重复使用设计元素",
      "利用 Auto Layout 实现响应式设计",
      "尝试插件扩展功能（如网格生成器）",
    ],
    used: false,
  },
  {
    id: "pixlr",
    name: "Pixlr",
    category: "图像编辑",
    url: "https://pixlr.com",
    icon: "Image",
    description: "在线图片编辑工具，类似 Photoshop 的功能",
    summary:
      "Pixlr 提供强大的照片编辑功能，包括图层、滤镜、调色等。适合处理观察照片、添加标注和进行图像合成。",
    quickTips: [
      "使用 Pixlr X（简化版）或 Pixlr E（高级版）",
      "掌握图层蒙版进行无损编辑",
      "使用标注工具添加文字和箭头",
      "尝试调整曲线和色阶增强对比",
      "保存为 PSD 格式保留图层信息",
    ],
    used: false,
  },
  {
    id: "photopea",
    name: "Photopea",
    category: "图像编辑",
    url: "https://www.photopea.com",
    icon: "Layers",
    description: "免费在线 Photoshop 替代品，支持 PSD 格式",
    summary:
      "Photopea 完全免费，无需注册，界面和功能几乎完全模仿 Photoshop，支持打开和保存 PSD、XCF、Sketch 等格式。",
    quickTips: [
      "界面布局和快捷键与 Photoshop 一致",
      "支持打开真实的 PSD 文件",
      "使用形状工具绘制几何图形",
      "掌握选区和变换工具",
      "定期保存到本地避免丢失",
    ],
    used: false,
  },
];

export const downloadableTemplates: DownloadableTemplate[] = [
  {
    id: "observation-sheet",
    name: "观察记录表",
    description: "简·盖尔观察法专用记录表格，包含计数、绘图和追踪三个阶段",
    category: "观察工具",
    format: "PDF",
    fileSize: "1.2 MB",
    thumbnailUrl: "/assets/workflow/placeholder.svg",
    downloadUrl: "/assets/workflow/templates/observation-sheet.pdf",
    downloadCount: 0,
  },
  {
    id: "annotation-guide",
    name: "图像标注模板",
    description: "用于标注点、线、面元素的图像模板，包含图例说明",
    category: "分析工具",
    format: "PNG",
    fileSize: "2.5 MB",
    thumbnailUrl: "/assets/workflow/placeholder.svg",
    downloadUrl: "/assets/workflow/templates/annotation-guide.png",
    downloadCount: 0,
  },
  {
    id: "composition-grid",
    name: "构成网格系统",
    description: "基于包豪斯原理的网格系统模板，可导入各种设计软件",
    category: "设计模板",
    format: "PDF + AI",
    fileSize: "3.8 MB",
    thumbnailUrl: "/assets/workflow/placeholder.svg",
    downloadUrl: "/assets/workflow/templates/composition-grid.zip",
    downloadCount: 0,
  },
  {
    id: "color-analysis",
    name: "色彩分析卡",
    description: "帮助分析和记录空间中的色彩构成",
    category: "分析工具",
    format: "PDF",
    fileSize: "1.8 MB",
    thumbnailUrl: "/assets/workflow/placeholder.svg",
    downloadUrl: "/assets/workflow/templates/color-analysis.pdf",
    downloadCount: 0,
  },
  {
    id: "force-field-template",
    name: "力场分析图模板",
    description: "包豪斯力场分析专用模板，标注视觉吸引力和空间关系",
    category: "分析工具",
    format: "PDF + PSD",
    fileSize: "4.2 MB",
    thumbnailUrl: "/assets/workflow/placeholder.svg",
    downloadUrl: "/assets/workflow/templates/force-field.zip",
    downloadCount: 0,
  },
  {
    id: "project-checklist",
    name: "项目完成清单",
    description: "从观察到提交的完整工作流程清单",
    category: "项目管理",
    format: "PDF",
    fileSize: "0.8 MB",
    thumbnailUrl: "/assets/workflow/placeholder.svg",
    downloadUrl: "/assets/workflow/templates/project-checklist.pdf",
    downloadCount: 0,
  },
];

export function getWorkflowStepById(id: string): WorkflowStep | undefined {
  return workflowSteps.find((step) => step.id === id);
}

export function getJanGehlStageById(id: string): JanGehlStage | undefined {
  return janGehlStages.find((stage) => stage.id === id);
}

export function getToolById(id: string): ToolRecommendation | undefined {
  return toolRecommendations.find((tool) => tool.id === id);
}

export function getTemplateById(id: string): DownloadableTemplate | undefined {
  return downloadableTemplates.find((template) => template.id === id);
}
