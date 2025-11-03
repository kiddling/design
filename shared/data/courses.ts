import type { CourseOverview } from "../types/course";

export const courses: CourseOverview[] = [
  {
    id: "guan-yuan-su-jie-gou",
    title: "观·元素解构",
    subtitle: "Observing & Deconstructing Elements",
    description:
      "通过观察和解构日常事物中的设计元素，学习识别和运用点、线、面等基础构成元素。培养设计观察力，建立设计思维的基础框架。",
    duration: "2周",
    objectives: [
      "学会观察和识别日常物品中的设计元素（点、线、面）",
      "掌握使用相机记录和捕捉设计元素的技巧",
      "理解康定斯基和包豪斯的基础设计理论",
      "通过元素解构建立设计思维的基本框架",
      "培养从日常生活中发现设计灵感的能力",
    ],
    metadata: {
      level: "beginner",
      tags: ["设计基础", "视觉元素", "观察训练", "点线面"],
      prerequisites: [],
      relatedCourses: ["chu-cai-zhi-fa-xian", "gou-dong-tai-ping-heng"],
    },
    sections: [
      {
        id: "goals",
        type: "goals",
        title: "课程目标",
        order: 1,
        content: {
          blocks: [
            {
              type: "text",
              content:
                "本节课程将带领你踏上设计观察的第一步，通过系统的学习和实践，培养敏锐的设计洞察力。",
              format: "paragraph",
            },
            {
              type: "card-grid",
              cards: [
                {
                  id: "goal-1",
                  title: "观察能力",
                  description: "学会从日常生活中发现和识别设计元素",
                  tags: ["核心技能"],
                },
                {
                  id: "goal-2",
                  title: "理论基础",
                  description: "理解康定斯基和包豪斯的基础设计理论",
                  tags: ["理论知识"],
                },
                {
                  id: "goal-3",
                  title: "实践技能",
                  description: "掌握拍摄和记录设计元素的方法",
                  tags: ["实践能力"],
                },
                {
                  id: "goal-4",
                  title: "设计思维",
                  description: "建立系统的设计分析和思考框架",
                  tags: ["思维方式"],
                },
              ],
              columns: 2,
            },
          ],
        },
      },
      {
        id: "theory",
        type: "theory",
        title: "理论聚焦",
        order: 2,
        content: {
          blocks: [
            {
              type: "text",
              content: "设计构成的理论基础",
              format: "heading",
            },
            {
              type: "tabs",
              tabs: [
                {
                  id: "kandinsky",
                  label: "康定斯基理论",
                  content: [
                    {
                      type: "text",
                      content:
                        "瓦西里·康定斯基（Wassily Kandinsky）是抽象艺术的先驱，他在《点线面》一书中系统阐述了视觉元素的基本原理。",
                      format: "paragraph",
                    },
                    {
                      type: "callout",
                      variant: "info",
                      title: "核心观点",
                      content:
                        "康定斯基认为，点、线、面是所有视觉艺术的基本元素。点是最基本的形式元素，线是点的运动轨迹，面是线的延伸。",
                    },
                    {
                      type: "list",
                      items: [
                        "点：最小的视觉单位，具有位置但没有方向",
                        "线：具有长度和方向，连接两点或点的运动轨迹",
                        "面：由线围合而成，具有面积和形状",
                      ],
                    },
                    {
                      type: "quote",
                      content:
                        "每一个现象都可以用两种方式来体验，这两种方式不是任意的，而是与现象相关联——从外部体验或从内部体验。",
                      author: "瓦西里·康定斯基",
                      source: "《点线面》",
                    },
                  ],
                },
                {
                  id: "bauhaus",
                  label: "包豪斯设计理念",
                  content: [
                    {
                      type: "text",
                      content:
                        "包豪斯（Bauhaus）学校创立于1919年，倡导「形式追随功能」的设计理念，强调将艺术与工艺、理论与实践相结合。",
                      format: "paragraph",
                    },
                    {
                      type: "callout",
                      variant: "tip",
                      title: "包豪斯三原则",
                      content:
                        "1. 艺术与技术的统一 2. 设计为大众服务 3. 功能决定形式",
                    },
                    {
                      type: "text",
                      content:
                        "约翰内斯·伊顿（Johannes Itten）在包豪斯开设的基础课程中，特别强调对基本元素的研究和实验。学生们通过对点、线、面、色彩、质感等基本元素的系统学习，建立起对设计的感性认识和理性分析能力。",
                      format: "paragraph",
                    },
                    {
                      type: "list",
                      items: [
                        "基础课程：通过实践掌握基本元素和原理",
                        "材料研究：探索不同材料的特性和表现力",
                        "形式实验：鼓励创新和个性化表达",
                        "功能设计：强调设计的实用性和社会价值",
                      ],
                    },
                  ],
                },
                {
                  id: "modern",
                  label: "当代应用",
                  content: [
                    {
                      type: "text",
                      content:
                        "点线面理论在当代设计中依然具有重要的指导意义，从平面设计到UI/UX设计，从建筑到产品设计，这些基本元素的运用无处不在。",
                      format: "paragraph",
                    },
                    {
                      type: "card-grid",
                      cards: [
                        {
                          id: "app-1",
                          title: "平面设计",
                          description:
                            "海报、版式设计中的构图和视觉层次",
                          tags: ["应用领域"],
                        },
                        {
                          id: "app-2",
                          title: "UI/UX设计",
                          description: "界面元素、布局系统、视觉引导",
                          tags: ["应用领域"],
                        },
                        {
                          id: "app-3",
                          title: "品牌设计",
                          description: "Logo设计、VI系统、视觉识别",
                          tags: ["应用领域"],
                        },
                        {
                          id: "app-4",
                          title: "空间设计",
                          description: "建筑、室内设计中的形态语言",
                          tags: ["应用领域"],
                        },
                      ],
                      columns: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "workflow",
        type: "workflow",
        title: "学习工作流",
        order: 3,
        content: {
          blocks: [
            {
              type: "text",
              content: "系统化的学习流程",
              format: "heading",
            },
            {
              type: "text",
              content:
                "通过以下工作流程，你将逐步建立起对设计元素的认知和应用能力。每个阶段都有明确的目标和产出。",
              format: "paragraph",
            },
            {
              type: "timeline",
              steps: [
                {
                  id: "step-1",
                  label: "[共情] 拍摄观察",
                  description:
                    "带着设计的眼光观察周围环境，拍摄30-50张照片，捕捉日常生活中的点、线、面元素。注意光线、角度和构图。",
                  icon: "Camera",
                },
                {
                  id: "step-2",
                  label: "[定义] 元素解构",
                  description:
                    "从拍摄的照片中选择6-9张代表性作品，使用Canva等工具进行标注，明确指出照片中的点、线、面元素及其关系。",
                  icon: "Layers",
                },
                {
                  id: "step-3",
                  label: "[构思] 定义问题",
                  description:
                    "思考并记录：这些元素如何影响整体的视觉效果？哪些元素起到了引导作用？如何运用这些元素进行设计创作？",
                  icon: "Lightbulb",
                },
                {
                  id: "step-4",
                  label: "[原型] 整理排版",
                  description:
                    "将标注好的图片和思考笔记整理成一页PDF，注意版式设计，让内容清晰易读，展现你的设计意识。",
                  icon: "FileText",
                },
                {
                  id: "step-5",
                  label: "[测试] 分享反馈",
                  description:
                    "提交作业后，参与同学互评，观察他人的作品，学习不同的观察角度和表达方式。根据反馈优化自己的作品。",
                  icon: "MessageSquare",
                },
              ],
            },
            {
              type: "callout",
              variant: "warning",
              title: "常见陷阱",
              content:
                "注意避免：① 拍摄角度单一，缺乏多样性 ② 标注不清晰或过于随意 ③ 只关注形式，忽略功能和意义 ④ 排版杂乱，缺乏设计感",
            },
          ],
        },
      },
      {
        id: "reading",
        type: "reading",
        title: "拓展阅读",
        order: 4,
        content: {
          blocks: [
            {
              type: "text",
              content: "延伸学习资源",
              format: "heading",
            },
            {
              type: "tabs",
              tabs: [
                {
                  id: "classics",
                  label: "经典著作",
                  content: [
                    {
                      type: "list",
                      items: [
                        "《点线面》- 瓦西里·康定斯基：抽象艺术理论的奠基之作",
                        "《包豪斯理念》- 弗兰克·惠特福德：全面了解包豪斯的设计思想",
                        "《视觉思维》- 鲁道夫·阿恩海姆：从心理学角度理解视觉艺术",
                        "《平面设计中的网格系统》- 约瑟夫·米勒-布罗克曼：系统学习设计构成",
                      ],
                    },
                  ],
                },
                {
                  id: "contemporary",
                  label: "当代资源",
                  content: [
                    {
                      type: "list",
                      items: [
                        "《写给大家看的设计书》- Robin Williams：设计基础入门",
                        "《点石成金》- Steve Krug：用户体验设计经典",
                        "Design Systems - 各大公司的设计系统文档",
                        "Dribbble & Behance - 设计作品欣赏平台",
                        "Medium Design Articles - 设计思考和方法论文章",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "assignments",
        type: "assignments",
        title: "作业要求",
        order: 5,
        content: {
          blocks: [
            {
              type: "text",
              content: "课程作业",
              format: "heading",
            },
            {
              type: "callout",
              variant: "success",
              title: "作业目标",
              content:
                "通过实践训练，将理论知识转化为观察和分析的能力，形成自己的设计视角。",
            },
            {
              type: "text",
              content: "具体要求：",
              format: "subheading",
            },
            {
              type: "list",
              items: [
                "拍摄30-50张照片，记录日常生活中的点、线、面元素",
                "选择6-9张最具代表性的照片进行深入分析",
                "使用设计工具（Canva/Figma/PS等）进行元素标注",
                "撰写200-300字的设计观察笔记",
                "整理成一页A4大小的PDF文档提交",
              ],
            },
            {
              type: "text",
              content: "评分标准：",
              format: "subheading",
            },
            {
              type: "card-grid",
              cards: [
                {
                  id: "criteria-1",
                  title: "观察深度 (30%)",
                  description: "能否发现独特且有意义的设计元素",
                },
                {
                  id: "criteria-2",
                  title: "分析准确性 (30%)",
                  description: "对点、线、面元素的识别和标注是否准确",
                },
                {
                  id: "criteria-3",
                  title: "视觉表达 (20%)",
                  description: "标注清晰度和排版设计质量",
                },
                {
                  id: "criteria-4",
                  title: "思考深度 (20%)",
                  description: "观察笔记是否有独到见解和深入思考",
                },
              ],
              columns: 2,
            },
          ],
        },
      },
      {
        id: "resources",
        type: "resources",
        title: "学习资源",
        order: 6,
        content: {
          blocks: [
            {
              type: "text",
              content: "推荐工具与资源",
              format: "heading",
            },
            {
              type: "card-grid",
              cards: [
                {
                  id: "tool-1",
                  title: "Canva",
                  description: "在线设计工具，适合快速标注和排版",
                  link: "https://www.canva.com",
                  tags: ["设计工具"],
                },
                {
                  id: "tool-2",
                  title: "Figma",
                  description: "专业UI设计工具，强大的协作功能",
                  link: "https://www.figma.com",
                  tags: ["设计工具"],
                },
                {
                  id: "resource-1",
                  title: "康定斯基在线展览",
                  description: "探索康定斯基的艺术作品和理论",
                  tags: ["艺术资源"],
                },
                {
                  id: "resource-2",
                  title: "包豪斯档案馆",
                  description: "包豪斯历史文献和作品集",
                  tags: ["设计历史"],
                },
                {
                  id: "resource-3",
                  title: "Unsplash",
                  description: "高质量免费图片，学习构图和元素运用",
                  link: "https://unsplash.com",
                  tags: ["图片资源"],
                },
                {
                  id: "resource-4",
                  title: "Pinterest",
                  description: "设计灵感收集和整理平台",
                  link: "https://www.pinterest.com",
                  tags: ["灵感来源"],
                },
              ],
              columns: 3,
            },
          ],
        },
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
