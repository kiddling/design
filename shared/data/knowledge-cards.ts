import type { KnowledgeCardDetail } from "../types/index.js";

export const knowledgeCards: KnowledgeCardDetail[] = [
  {
    id: "kc-001",
    title: "点的视觉特性",
    summary:
      "点是最基本的视觉元素，具有位置、大小、形态等特性，能够产生视觉张力和引导视线。",
    compositionType: "planar",
    difficulty: "base",
    tags: ["点", "基础元素", "视觉张力"],
    content:
      "点是几何学中最基本的单位，在设计中是最小的视觉单元。点具有位置、大小、形态、色彩等属性。单个点能产生视觉焦点，多个点可以形成方向、节奏和韵律。康定斯基认为，点是内在张力的集中表现，即使是静止的点也具有内在的动态感。",
    theory: {
      principles: [
        "点具有视觉张力，能吸引注意力",
        "点的大小影响其视觉重量",
        "多个点可以形成线、面和方向感",
        "点的排列产生节奏和韵律",
        "点的位置关系产生空间感",
      ],
      examples: [
        {
          url: "/images/examples/point-basic.jpg",
          alt: "点的基本形态示例",
          caption: "不同大小和位置的点产生不同的视觉效果",
        },
        {
          url: "/images/examples/point-composition.jpg",
          alt: "点构成作品",
          caption: "通过点的排列创造视觉节奏",
        },
      ],
      references: ["康定斯基《点线面》", "《平面构成基础》第一章"],
    },
    applications: [
      "标识设计中的图形符号",
      "界面设计中的图标",
      "装饰图案设计",
      "信息可视化中的数据点",
    ],
    caseStudies: ["cs-001", "cs-002"],
    prompts: ["prompt-001"],
    relatedCards: ["kc-002", "kc-003"],
    exercises: [
      {
        title: "点的排列练习",
        description:
          "使用不同大小的圆点，创作3组构成，分别表现聚集、发散、流动的感觉",
        difficulty: "base",
      },
      {
        title: "点线转化",
        description: "通过改变点的间距和排列，探索点如何过渡为线",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-002",
    title: "线的动感与方向",
    summary:
      "线是点的运动轨迹，具有长度、方向、形态等特性，能产生强烈的动感和引导性。",
    compositionType: "planar",
    difficulty: "base",
    tags: ["线", "方向", "动感", "基础元素"],
    content:
      "线是点的移动轨迹，具有位置、方向、长度、宽度、形态等属性。直线表现稳定、理性，曲线表现流动、感性。水平线给人平静安宁感，垂直线表现庄重力量，斜线富有动感和不稳定性。线的粗细、虚实、疏密变化能创造丰富的视觉效果。",
    theory: {
      principles: [
        "直线表现理性、秩序、稳定",
        "曲线表现感性、流动、优雅",
        "水平线表现平静、广阔",
        "垂直线表现力量、庄重",
        "斜线表现动感、不稳定",
        "线的粗细影响视觉重量",
        "线的疏密产生节奏感",
      ],
      examples: [
        {
          url: "/images/examples/line-types.jpg",
          alt: "不同类型的线",
          caption: "直线、曲线、折线的对比",
        },
        {
          url: "/images/examples/line-direction.jpg",
          alt: "线的方向性",
          caption: "水平、垂直、斜线的情感表达",
        },
      ],
      references: ["康定斯基《点线面》第二章", "《构成设计》线的章节"],
    },
    applications: ["字体设计", "建筑立面设计", "服装纹样", "导视系统"],
    caseStudies: ["cs-001", "cs-003"],
    prompts: ["prompt-002"],
    relatedCards: ["kc-001", "kc-003"],
    exercises: [
      {
        title: "线的情感表达",
        description:
          "用不同类型的线创作4组构成，分别表现平静、激动、优雅、紧张的情绪",
        difficulty: "base",
      },
      {
        title: "线的韵律",
        description: "探索线的疏密、粗细、虚实变化，创造音乐般的视觉节奏",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-003",
    title: "面的形态与空间",
    summary: "面是线的延展，具有形状、大小、位置等特性，是构成空间的基本单元。",
    compositionType: "planar",
    difficulty: "base",
    tags: ["面", "形态", "空间", "基础元素"],
    content:
      "面是线的移动轨迹或线的围合形成的视觉元素，具有位置、形状、大小、色彩、肌理等属性。几何形的面表现理性规整，有机形的面表现自然随意。面的大小关系产生空间前后感，面的重叠产生层次感。面的分割和组合是平面构成的核心内容。",
    theory: {
      principles: [
        "几何形面表现理性、秩序",
        "有机形面表现自然、生动",
        "面的大小对比产生空间感",
        "面的重叠产生层次关系",
        "面的正负空间关系",
        "面的分割和组合创造变化",
      ],
      examples: [
        {
          url: "/images/examples/plane-shapes.jpg",
          alt: "不同形态的面",
          caption: "几何形和有机形面的对比",
        },
        {
          url: "/images/examples/plane-composition.jpg",
          alt: "面的构成",
          caption: "面的分割与组合",
        },
      ],
      references: ["康定斯基《点线面》第三章", "《平面构成》面的构成"],
    },
    applications: ["海报设计", "版式设计", "建筑平面", "产品造型"],
    caseStudies: ["cs-002", "cs-004"],
    prompts: ["prompt-003"],
    relatedCards: ["kc-001", "kc-002", "kc-005"],
    exercises: [
      {
        title: "面的分割",
        description: "将正方形用不同方式分割，探索面的切分和重组",
        difficulty: "base",
      },
      {
        title: "正负形转换",
        description: "创作正负形互换的图形，探索图底关系",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-004",
    title: "材质的视觉语言",
    summary:
      "材质的视觉和触觉特性能传达不同的情感和信息，是设计表现的重要手段。",
    compositionType: "planar",
    difficulty: "base",
    tags: ["材质", "肌理", "触觉", "视觉语言"],
    content:
      "材质是物体表面的视觉和触觉特征，包括光滑/粗糙、软/硬、冷/暖等属性。不同材质能唤起不同的心理感受和联想。在设计中，材质的选择和组合能强化设计意图，传达特定的情感和信息。",
    theory: {
      principles: [
        "光滑材质表现现代、精致",
        "粗糙材质表现自然、手工感",
        "软性材质表现舒适、亲切",
        "硬质材质表现坚固、理性",
        "材质对比产生视觉冲击",
        "材质统一产生和谐感",
      ],
      examples: [
        {
          url: "/images/examples/material-contrast.jpg",
          alt: "材质对比",
          caption: "光滑与粗糙的对比",
        },
        {
          url: "/images/examples/material-emotion.jpg",
          alt: "材质情感",
          caption: "不同材质的情感联想",
        },
      ],
      references: ["《材料设计》", "《触觉设计》"],
    },
    applications: [
      "产品设计表面处理",
      "室内设计材料选择",
      "包装设计",
      "品牌视觉系统",
    ],
    caseStudies: ["cs-003", "cs-005"],
    prompts: ["prompt-004", "prompt-005"],
    relatedCards: ["kc-009"],
    exercises: [
      {
        title: "材质采集",
        description: "拍摄至少20种不同材质，并按特征分类整理",
        difficulty: "base",
      },
      {
        title: "材质混搭",
        description: "选择3-4种对比材质，创作和谐的组合",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-005",
    title: "对称平衡",
    summary:
      "对称是最基本的平衡形式，通过轴线两侧的对称排列创造稳定和谐的视觉效果。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["对称", "平衡", "稳定", "构成原理"],
    content:
      "对称平衡是指元素在中心轴线两侧呈镜像排列的平衡形式。包括左右对称、上下对称、旋转对称等类型。对称构成给人庄重、稳定、规整的感觉，常用于表现权威性和经典美。",
    theory: {
      principles: [
        "左右对称最常见，表现稳定庄重",
        "上下对称表现安定感",
        "旋转对称表现动态平衡",
        "对称产生秩序和规律感",
        "完全对称可能显得单调",
        "适当打破对称增加趣味性",
      ],
      examples: [
        {
          url: "/images/examples/symmetry-types.jpg",
          alt: "对称类型",
          caption: "左右、上下、旋转对称",
        },
        {
          url: "/images/examples/symmetry-design.jpg",
          alt: "对称设计",
          caption: "建筑和标志中的对称应用",
        },
      ],
      references: ["《平面构成》平衡章节", "《对称美学》"],
    },
    applications: ["标志设计", "建筑立面", "传统图案", "界面布局"],
    caseStudies: ["cs-004", "cs-006"],
    prompts: ["prompt-006"],
    relatedCards: ["kc-006", "kc-003"],
    exercises: [
      {
        title: "对称构成",
        description: "创作3组不同类型的对称构成（左右、旋转、近似对称）",
        difficulty: "base",
      },
      {
        title: "打破对称",
        description: "在对称构成的基础上，适度打破对称，增加趣味性",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-006",
    title: "非对称平衡",
    summary:
      "非对称平衡通过不同元素的视觉重量分配达到动态平衡，更具现代感和活力。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["非对称", "平衡", "动态", "构成原理"],
    content:
      "非对称平衡是指通过调整元素的大小、色彩、位置等因素，在不对称的情况下达到视觉平衡。这种平衡更灵活、更富变化，体现现代设计的动态美感。关键在于理解视觉重量和平衡点。",
    theory: {
      principles: [
        "大小不同的元素可以通过位置平衡",
        "色彩饱和度影响视觉重量",
        "深色比浅色视觉重量大",
        "复杂图形比简单图形重",
        "多个小元素可以平衡一个大元素",
        "空白也有视觉重量",
      ],
      examples: [
        {
          url: "/images/examples/asymmetric-balance.jpg",
          alt: "非对称平衡",
          caption: "通过大小和位置实现平衡",
        },
        {
          url: "/images/examples/dynamic-balance.jpg",
          alt: "动态平衡",
          caption: "色彩和形态的平衡关系",
        },
      ],
      references: ["《平面构成》非对称平衡", "现代主义设计案例"],
    },
    applications: ["海报设计", "网页布局", "杂志版式", "产品布局"],
    caseStudies: ["cs-005", "cs-007"],
    prompts: ["prompt-007"],
    relatedCards: ["kc-005", "kc-013"],
    exercises: [
      {
        title: "视觉重量实验",
        description: "用不同大小、颜色的元素，探索平衡点的位置",
        difficulty: "advance",
      },
      {
        title: "动态构成",
        description: "创作具有动感但保持平衡的构成作品",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-007",
    title: "线性透视",
    summary: "通过消失点和透视线，在平面上创造三维空间的幻觉。",
    compositionType: "spatial",
    difficulty: "advance",
    tags: ["透视", "空间", "深度", "三维"],
    content:
      "线性透视是基于人眼观察规律的空间表现技法。一点透视用于正面观察，两点透视用于斜角观察，三点透视用于仰视或俯视。掌握透视原理能创造真实可信的空间感。",
    theory: {
      principles: [
        "平行线在远处汇聚于消失点",
        "近大远小是基本规律",
        "视平线决定观察角度",
        "一点透视适合正面场景",
        "两点透视适合转角场景",
        "三点透视适合仰俯视场景",
      ],
      examples: [
        {
          url: "/images/examples/perspective-types.jpg",
          alt: "透视类型",
          caption: "一点、两点、三点透视对比",
        },
        {
          url: "/images/examples/perspective-space.jpg",
          alt: "透视空间",
          caption: "透视在设计中的应用",
        },
      ],
      references: ["《透视学基础》", "《空间构成》透视章节"],
    },
    applications: ["建筑效果图", "室内空间设计", "场景插画", "游戏场景设计"],
    caseStudies: ["cs-006", "cs-008"],
    prompts: ["prompt-008"],
    relatedCards: ["kc-008", "kc-004"],
    exercises: [
      {
        title: "透视练习",
        description: "分别创作一点、两点透视的简单空间",
        difficulty: "advance",
      },
      {
        title: "空间叙事",
        description: "运用透视创作具有纵深感的场景插画",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-008",
    title: "重叠与层次",
    summary: "通过元素的重叠关系表现空间的前后层次，创造深度感。",
    compositionType: "spatial",
    difficulty: "advance",
    tags: ["重叠", "层次", "空间", "深度"],
    content:
      "重叠是最简单直接的空间表现手法。被遮挡的物体在后，遮挡别人的物体在前。通过多层次的重叠可以创造丰富的空间深度。结合大小对比、清晰度变化效果更佳。",
    theory: {
      principles: [
        "重叠产生明确的前后关系",
        "多层重叠增加空间深度",
        "透明重叠创造特殊效果",
        "重叠边缘处理影响空间感",
        "结合明暗强化空间感",
        "规律重叠产生节奏感",
      ],
      examples: [
        {
          url: "/images/examples/overlap-depth.jpg",
          alt: "重叠深度",
          caption: "通过重叠创造空间层次",
        },
        {
          url: "/images/examples/layering.jpg",
          alt: "层次构成",
          caption: "多层次重叠的应用",
        },
      ],
      references: ["《空间构成》重叠章节", "拼贴艺术案例"],
    },
    applications: ["海报设计", "品牌视觉", "插画创作", "界面设计"],
    caseStudies: ["cs-007", "cs-009"],
    prompts: ["prompt-009"],
    relatedCards: ["kc-007", "kc-009"],
    exercises: [
      {
        title: "层次练习",
        description: "用3-5个几何形创造清晰的前后层次",
        difficulty: "base",
      },
      {
        title: "透明重叠",
        description: "探索半透明重叠产生的色彩和空间效果",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-009",
    title: "明暗五调子",
    summary: "高光、亮部、明暗交界线、暗部、反光构成物体的明暗关系。",
    compositionType: "spatial",
    difficulty: "advance",
    tags: ["明暗", "光影", "立体感", "调子"],
    content:
      "明暗五调子是表现物体立体感的基础理论。包括高光（最亮处）、亮部（受光面）、明暗交界线（转折处）、暗部（背光面）、反光（环境光反射）。理解这五个调子能准确表现光影关系。",
    theory: {
      principles: [
        "高光表现光源直射点",
        "明暗交界线是明暗对比最强处",
        "暗部不是纯黑，有反光",
        "调子过渡要柔和自然",
        "光源方向决定明暗分布",
        "对比越强越有立体感",
      ],
      examples: [
        {
          url: "/images/examples/five-tones.jpg",
          alt: "明暗五调子",
          caption: "球体的明暗五调子分析",
        },
        {
          url: "/images/examples/light-volume.jpg",
          alt: "光影立体感",
          caption: "光影表现立体形态",
        },
      ],
      references: ["《素描基础》明暗章节", "《光影表现技法》"],
    },
    applications: ["产品渲染", "角色设计", "场景光影", "摄影打光"],
    caseStudies: ["cs-008", "cs-010"],
    prompts: ["prompt-010"],
    relatedCards: ["kc-010", "kc-004"],
    exercises: [
      {
        title: "调子练习",
        description: "用灰阶表现球体、立方体的明暗五调子",
        difficulty: "advance",
      },
      {
        title: "光源实验",
        description: "同一物体在不同光源下的明暗变化",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-010",
    title: "对比与调和",
    summary: "明暗对比强弱决定视觉冲击力，适度调和产生和谐舒适的效果。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["对比", "调和", "明暗", "视觉效果"],
    content:
      "对比是设计中创造视觉焦点的重要手段，包括明暗对比、色彩对比、大小对比等。强对比产生强烈视觉冲击，弱对比则柔和舒适。调和是指缓和对比，使画面和谐统一。掌握对比与调和的平衡是设计的关键。",
    theory: {
      principles: [
        "黑白对比最强烈",
        "高明度对比吸引注意力",
        "对比产生视觉焦点",
        "过度对比产生视觉疲劳",
        "调和通过中间调过渡",
        "70-30比例产生平衡",
      ],
      examples: [
        {
          url: "/images/examples/contrast-levels.jpg",
          alt: "对比层级",
          caption: "不同强度的对比效果",
        },
        {
          url: "/images/examples/harmony.jpg",
          alt: "调和处理",
          caption: "通过中间调调和对比",
        },
      ],
      references: ["《视觉设计原理》对比章节", "伊顿色彩理论"],
    },
    applications: ["海报设计", "网页布局", "品牌视觉", "摄影后期"],
    caseStudies: ["cs-009", "cs-011"],
    prompts: ["prompt-011"],
    relatedCards: ["kc-009", "kc-011"],
    exercises: [
      {
        title: "对比级别",
        description: "创作强、中、弱三种对比强度的构成",
        difficulty: "advance",
      },
      {
        title: "焦点控制",
        description: "运用对比引导视线流动，创造视觉层次",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-011",
    title: "色彩三要素",
    summary: "色相、明度、饱和度是色彩的三个基本属性，掌握它们是配色的基础。",
    compositionType: "color",
    difficulty: "base",
    tags: ["色彩", "色相", "明度", "饱和度"],
    content:
      "色彩三要素是描述颜色的基本维度。色相指色彩的相貌（红、黄、蓝等），明度指色彩的明暗程度，饱和度指色彩的纯度和鲜艳程度。理解三要素能系统地分析和调配色彩。",
    theory: {
      principles: [
        "色相决定色彩的基本性质",
        "明度影响色彩的轻重感",
        "饱和度影响色彩的强烈程度",
        "改变任一要素都改变色彩感受",
        "高明度色彩显轻盈",
        "低饱和度色彩更柔和",
      ],
      examples: [
        {
          url: "/images/examples/color-attributes.jpg",
          alt: "色彩三要素",
          caption: "色相、明度、饱和度示意",
        },
        {
          url: "/images/examples/color-variations.jpg",
          alt: "色彩变化",
          caption: "改变三要素产生的色彩变化",
        },
      ],
      references: ["《色彩构成》基础理论", "伊顿色彩理论"],
    },
    applications: ["品牌配色", "界面主题", "海报设计", "产品配色"],
    caseStudies: ["cs-010", "cs-012"],
    prompts: ["prompt-012"],
    relatedCards: ["kc-012", "kc-013"],
    exercises: [
      {
        title: "三要素练习",
        description: "选择一个基础色，通过改变明度和饱和度创造12个变体",
        difficulty: "base",
      },
      {
        title: "情绪配色",
        description: "用三要素变化表现不同情绪（平静、激动、忧郁等）",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-012",
    title: "配色原理",
    summary: "对比色、邻近色、互补色等配色方法能创造不同的视觉效果和情感氛围。",
    compositionType: "color",
    difficulty: "advance",
    tags: ["配色", "色彩搭配", "色彩理论"],
    content:
      "配色是色彩设计的核心技能。对比色配色鲜明强烈，邻近色配色和谐统一，互补色配色充满活力。掌握色轮和配色原理能系统地创建有效的配色方案。不同配色方法适用于不同的设计目标和情感表达。",
    theory: {
      principles: [
        "邻近色配色和谐统一",
        "对比色配色醒目有力",
        "互补色配色最强烈",
        "三角配色平衡稳定",
        "单色配色优雅精致",
        "60-30-10比例法则",
      ],
      examples: [
        {
          url: "/images/examples/color-schemes.jpg",
          alt: "配色方案",
          caption: "常见配色类型对比",
        },
        {
          url: "/images/examples/color-harmony.jpg",
          alt: "色彩和谐",
          caption: "和谐配色的应用案例",
        },
      ],
      references: ["《色彩设计原理》", "色轮配色理论"],
    },
    applications: ["品牌识别系统", "网页配色", "海报设计", "产品色彩计划"],
    caseStudies: ["cs-011", "cs-013"],
    prompts: ["prompt-013"],
    relatedCards: ["kc-011", "kc-014"],
    exercises: [
      {
        title: "配色方案",
        description: "为同一主题创作5种不同配色方案（邻近、对比、互补等）",
        difficulty: "advance",
      },
      {
        title: "配色情境",
        description: "为不同场景（儿童、科技、奢华等）设计适合的配色",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-013",
    title: "重复与渐变",
    summary: "通过元素的重复排列或渐进变化创造视觉节奏和韵律感。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["重复", "渐变", "节奏", "韵律"],
    content:
      "重复是将相同或相似的元素规律排列，创造秩序感和节奏感。渐变是元素在大小、色彩、位置等方面的连续变化，产生流动和过渡的效果。两者都能创造强烈的视觉节奏，是构成设计的重要手法。",
    theory: {
      principles: [
        "重复产生统一感和节奏感",
        "渐变产生流动感和方向性",
        "大小渐变产生空间感",
        "色彩渐变产生过渡效果",
        "密度渐变产生虚实变化",
        "节奏变化避免单调",
      ],
      examples: [
        {
          url: "/images/examples/repetition.jpg",
          alt: "重复构成",
          caption: "规律重复的节奏感",
        },
        {
          url: "/images/examples/gradation.jpg",
          alt: "渐变构成",
          caption: "渐变创造的流动效果",
        },
      ],
      references: ["《平面构成》韵律章节", "《图案设计》重复原理"],
    },
    applications: ["图案设计", "装饰艺术", "网页背景", "纺织品图案"],
    caseStudies: ["cs-012", "cs-014"],
    prompts: ["prompt-014"],
    relatedCards: ["kc-006", "kc-014"],
    exercises: [
      {
        title: "重复节奏",
        description: "用一个基本单元创作不同节奏的重复图案",
        difficulty: "advance",
      },
      {
        title: "多重渐变",
        description: "同时运用大小、色彩、位置的渐变创作复杂构成",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-014",
    title: "肌理与质感",
    summary: "表面的纹理和质感能增强视觉丰富度，传达材料特性和情感氛围。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["肌理", "质感", "纹理", "材质"],
    content:
      "肌理是物体表面的纹理特征，包括视觉肌理和触觉肌理。视觉肌理通过图案和明暗表现，触觉肌理有实际的凹凸质感。肌理能丰富画面，强化表现力，传达材质特性和情感基调。",
    theory: {
      principles: [
        "自然肌理表现有机感",
        "人工肌理表现理性秩序",
        "粗糙肌理表现质朴原始",
        "细腻肌理表现精致优雅",
        "对比肌理产生视觉冲突",
        "统一肌理产生和谐感",
      ],
      examples: [
        {
          url: "/images/examples/texture-types.jpg",
          alt: "肌理类型",
          caption: "不同类型的肌理效果",
        },
        {
          url: "/images/examples/texture-emotion.jpg",
          alt: "肌理情感",
          caption: "肌理的情感表达",
        },
      ],
      references: ["《材料与肌理》", "《质感表现技法》"],
    },
    applications: ["包装设计", "品牌视觉", "插画创作", "界面设计"],
    caseStudies: ["cs-013", "cs-015"],
    prompts: ["prompt-015"],
    relatedCards: ["kc-004", "kc-013"],
    exercises: [
      {
        title: "肌理采集",
        description: "拍摄和收集20种不同肌理，分类整理",
        difficulty: "base",
      },
      {
        title: "肌理创作",
        description: "用AI工具生成各种材质肌理效果",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-015",
    title: "跨学科设计思维",
    summary: "打破学科界限，整合不同领域的知识和方法进行创新设计。",
    compositionType: "planar",
    difficulty: "stretch",
    tags: ["跨学科", "设计思维", "创新", "整合"],
    content:
      "跨学科设计思维强调突破单一学科的局限，借鉴和整合不同领域的理论、方法和资源。平面构成原理可以应用于工业设计、建筑设计、服装设计等多个领域。培养跨界视野能产生更具创新性的设计解决方案。",
    theory: {
      principles: [
        "不同学科有共通的设计原理",
        "跨界借鉴产生创新灵感",
        "整合思维突破常规",
        "多元视角丰富设计深度",
        "协作产生更大价值",
      ],
      examples: [
        {
          url: "/images/examples/cross-discipline.jpg",
          alt: "跨学科案例",
          caption: "构成原理在不同领域的应用",
        },
      ],
      references: ["《设计思维》", "《跨界创新》"],
    },
    applications: [
      "产品与平面结合",
      "建筑与视觉融合",
      "服装图案设计",
      "空间视觉设计",
    ],
    caseStudies: ["cs-014", "cs-016"],
    prompts: ["prompt-016"],
    relatedCards: ["kc-016", "kc-017"],
    exercises: [
      {
        title: "跨界分析",
        description: "分析3个跨学科设计案例，总结构成原理的应用",
        difficulty: "stretch",
      },
      {
        title: "跨界创作",
        description: "将平面构成应用到非平面领域（产品、空间等）",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-016",
    title: "系列设计方法",
    summary: "通过主题的多样化演绎，创作具有统一性和变化性的系列作品。",
    compositionType: "planar",
    difficulty: "stretch",
    tags: ["系列设计", "主题演化", "统一性", "变化性"],
    content:
      "系列设计是围绕一个核心主题，创作多个既统一又各具特色的作品。关键在于建立统一的设计语言（色彩、形式、风格），同时通过变化保持新鲜感。系列设计能展示设计思维的深度和广度。",
    theory: {
      principles: [
        "确立明确的主题和概念",
        "提取核心设计元素",
        "建立统一的视觉语言",
        "通过参数变化产生多样性",
        "保持整体协调性",
        "每件作品都能独立成立",
      ],
      examples: [
        {
          url: "/images/examples/series-design.jpg",
          alt: "系列设计",
          caption: "统一主题下的多样演绎",
        },
      ],
      references: ["《系列化设计》", "品牌视觉系统案例"],
    },
    applications: ["品牌视觉系统", "产品家族设计", "海报系列", "插画系列"],
    caseStudies: ["cs-015", "cs-016"],
    prompts: ["prompt-017"],
    relatedCards: ["kc-015", "kc-017"],
    exercises: [
      {
        title: "系列规划",
        description: "确定主题，规划至少8个变体的设计方案",
        difficulty: "stretch",
      },
      {
        title: "系列创作",
        description: "完成完整的系列作品（8-12件）",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-017",
    title: "设计批评方法",
    summary: "学会系统地分析和评价设计作品，培养批判性思维和鉴赏能力。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["设计批评", "分析方法", "批判性思维"],
    content:
      "设计批评是对设计作品进行系统分析和评价的过程。包括形式分析（构成、色彩、材质等）、功能分析（是否达成目标）、文化分析（社会文化意义）等层面。批评不是挑错，而是深入理解设计的多个维度。",
    theory: {
      principles: [
        "描述：客观描述看到的内容",
        "分析：分析设计手法和原理",
        "解释：解读设计意图和意义",
        "评价：基于标准进行判断",
        "多角度思考",
        "建设性反馈",
      ],
      examples: [
        {
          url: "/images/examples/design-critique.jpg",
          alt: "设计批评",
          caption: "系统的设计分析框架",
        },
      ],
      references: ["《设计批评导论》", "《如何看懂设计》"],
    },
    applications: ["作品评审", "自我反思", "同伴互评", "设计讨论"],
    caseStudies: ["cs-017", "cs-018"],
    prompts: ["prompt-018"],
    relatedCards: ["kc-018", "kc-016"],
    exercises: [
      {
        title: "批评练习",
        description: "选择3件设计作品，用批评框架进行系统分析",
        difficulty: "advance",
      },
      {
        title: "自我批评",
        description: "批判性地分析自己的设计过程和作品",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-018",
    title: "作品集设计原则",
    summary:
      "作品集是设计师的名片，需要精心策划和设计，展示专业能力和个人特色。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["作品集", "展示设计", "个人品牌"],
    content:
      "优秀的作品集不仅展示作品，更讲述设计思维和成长历程。需要精心选择作品、设计版式、撰写文案。数字作品集强调用户体验，实体作品集注重材质和装订。作品集反映设计师的审美品味和专业素养。",
    theory: {
      principles: [
        "质量优先于数量",
        "讲述完整的设计故事",
        "突出核心优势和特色",
        "版式简洁专业",
        "文案清晰有力",
        "适配目标受众",
      ],
      examples: [
        {
          url: "/images/examples/portfolio-layout.jpg",
          alt: "作品集版式",
          caption: "优秀作品集的版式设计",
        },
      ],
      references: ["《设计师作品集指南》", "优秀作品集案例"],
    },
    applications: ["求职申请", "升学作品集", "个人品牌建设", "项目展示"],
    caseStudies: ["cs-018", "cs-019"],
    prompts: ["prompt-019"],
    relatedCards: ["kc-017", "kc-019"],
    exercises: [
      {
        title: "作品筛选",
        description: "从所有作品中筛选出最能代表自己的10-15件",
        difficulty: "advance",
      },
      {
        title: "作品集制作",
        description: "完成一本完整的作品集（数字或实体）",
        difficulty: "stretch",
      },
    ],
  },
  {
    id: "kc-019",
    title: "持续学习策略",
    summary: "设计是不断演进的领域，建立持续学习的习惯和方法至关重要。",
    compositionType: "planar",
    difficulty: "base",
    tags: ["持续学习", "成长策略", "学习方法"],
    content:
      "设计领域变化快速，持续学习是保持竞争力的关键。需要建立个人学习系统：设定目标、选择资源、实践练习、反思总结、分享交流。关注行业动态、学习新工具、拓展知识面、培养审美品味。",
    theory: {
      principles: [
        "设定清晰的学习目标",
        "多渠道获取信息和知识",
        "理论与实践结合",
        "建立个人知识库",
        "定期反思和总结",
        "与社群互动交流",
      ],
      examples: [
        {
          url: "/images/examples/learning-system.jpg",
          alt: "学习系统",
          caption: "个人学习系统的构建",
        },
      ],
      references: ["《刻意练习》", "《设计师的自我修养》"],
    },
    applications: ["职业发展规划", "技能提升", "知识管理", "个人成长"],
    caseStudies: ["cs-019", "cs-020"],
    relatedCards: ["kc-020", "kc-001"],
    exercises: [
      {
        title: "学习计划",
        description: "制定未来6个月的设计学习计划",
        difficulty: "base",
      },
      {
        title: "知识库搭建",
        description: "建立个人设计资源和灵感库",
        difficulty: "advance",
      },
    ],
  },
  {
    id: "kc-020",
    title: "设计趋势洞察",
    summary: "了解当代设计趋势和未来方向，培养前瞻性视野。",
    compositionType: "planar",
    difficulty: "advance",
    tags: ["设计趋势", "未来设计", "行业洞察"],
    content:
      "设计趋势反映时代精神和技术发展。当前趋势包括：极简主义、新拟物风格、3D图形、AI辅助设计、可持续设计等。理解趋势有助于把握方向，但不应盲目跟随，要结合自身特色和项目需求。",
    theory: {
      principles: [
        "趋势源于技术和文化变迁",
        "经典原则超越流行趋势",
        "批判性看待趋势",
        "结合项目实际应用",
        "形成个人风格",
      ],
      examples: [
        {
          url: "/images/examples/design-trends.jpg",
          alt: "设计趋势",
          caption: "当代设计趋势概览",
        },
      ],
      references: ["设计趋势报告", "行业领先案例"],
    },
    applications: ["品牌设计", "产品设计", "数字设计", "空间设计"],
    caseStudies: ["cs-020"],
    relatedCards: ["kc-019", "kc-015"],
    exercises: [
      {
        title: "趋势分析",
        description: "分析3个当前设计趋势的特点和应用",
        difficulty: "advance",
      },
      {
        title: "趋势应用",
        description: "结合趋势创作一组设计作品",
        difficulty: "stretch",
      },
    ],
  },
];
