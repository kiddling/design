import { Case } from "./types";

export const mockCases: Case[] = [
  {
    id: "case-001",
    title: "智慧城市交互界面设计 / Smart City Interface Design",
    discipline: "digital-media",
    tags: ["UI/UX", "交互设计", "数据可视化", "点线面"],
    difficulty: "advance",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    keyInsight: "通过点线面的组合构建清晰的信息层级，让复杂的城市数据一目了然",
    problem:
      "智慧城市系统涉及海量数据，如何设计一个既美观又实用的数据可视化界面，让用户快速理解城市运行状态？",
    deconstruction: `
## 设计分析

### 点的应用
- 地图上的POI标记使用圆点表示不同类型的设施
- 数据仪表盘中的关键指标用醒目的圆形图标突出
- 状态指示器采用色点系统（红/黄/绿）表示运行状态

### 线的应用
- 交通流线用动态线条展示车流方向和密度
- 连接线表示不同系统模块之间的关系
- 时间轴用线性方式展示数据变化趋势

### 面的应用
- 区域划分用不同颜色的面块表示功能分区
- 卡片式设计将信息组织成独立的视觉单元
- 背景渐变营造层次感和空间深度
`,
    solution:
      "采用模块化的卡片布局，结合动态的点线元素，创建层次分明的界面。使用色彩编码系统帮助用户快速识别信息类别，通过动画效果引导用户关注重点数据。",
    references: [
      {
        title: "Smart City Dashboard Design Best Practices",
        url: "https://example.com/smart-city-design",
        type: "article",
      },
      {
        title: "Data Visualization: A Practical Introduction",
        url: "https://example.com/data-viz-book",
        type: "book",
      },
    ],
    relatedKnowledge: ["点线面基础", "色彩构成", "信息设计"],
  },
  {
    id: "case-002",
    title: "极简主义住宅设计 / Minimalist Residential Design",
    discipline: "architecture",
    tags: ["极简主义", "空间构成", "光影", "材质"],
    difficulty: "advance",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
    keyInsight: "减法设计：通过精简元素和纯净的几何形态创造宁静的居住空间",
    problem:
      "在有限的空间中，如何通过设计构成原理营造开阔、宁静且功能完善的居住环境？",
    deconstruction: `
## 设计分析

### 空间构成
- 开放式布局打破传统隔断，用家具和地面材质变化划分功能区
- 大面积留白营造呼吸感
- 垂直空间利用隐藏式收纳保持视觉简洁

### 光影运用
- 大面积窗户引入自然光，光影变化丰富空间层次
- 间接照明柔化空间边界
- 白色墙面反射光线增强明亮感

### 材质对比
- 粗糙的混凝土与光滑的木地板形成触觉对比
- 温暖的木质与冷峻的金属平衡视觉温度
- 透明玻璃与实体墙面的虚实关系
`,
    solution:
      "采用简洁的几何形态，通过材质的精心搭配和光影的巧妙运用，在视觉上扩大空间感。功能分区不依赖硬隔断，而是通过地面高差、天花造型和家具布局实现。",
    references: [
      {
        title: "The Kinfolk Home: Interiors for Slow Living",
        url: "https://example.com/kinfolk-home",
        type: "book",
      },
      {
        title: "Minimalist Architecture Case Studies",
        url: "https://example.com/minimalist-arch",
        type: "website",
      },
    ],
    relatedKnowledge: ["空间构成", "光影表现", "材质感知"],
  },
  {
    id: "case-003",
    title: "品牌识别系统设计 / Brand Identity System",
    discipline: "graphic-design",
    tags: ["平面构成", "品牌设计", "视觉识别", "几何形态"],
    difficulty: "base",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&h=600&fit=crop",
    keyInsight: "几何基础构成：从基本形态出发，建立系统化的视觉语言",
    problem: "如何为初创科技公司设计一套既现代又富有识别度的品牌视觉识别系统？",
    deconstruction: `
## 设计分析

### 基础形态
- Logo由三个基本几何形组成：圆形、三角形、方形
- 代表创新（圆）、稳定（方）、进取（三角）的品牌价值

### 平面构成
- 采用网格系统确保各元素比例和谐
- 重复、渐变、发射等构成手法应用于辅助图形
- 模块化设计便于在不同媒介中应用

### 色彩系统
- 主色：科技蓝表达专业可靠
- 辅助色：活力橙注入创新能量
- 中性色：灰度系统保持整体平衡
`,
    solution:
      "建立一套基于几何形态的模块化设计系统，通过标准化的比例关系和网格系统，确保品牌在不同应用场景中的一致性。辅助图形采用构成原理中的重复和渐变手法，丰富视觉表现。",
    references: [
      {
        title: "Designing Brand Identity",
        url: "https://example.com/brand-identity-book",
        type: "book",
      },
      {
        title: "Geometric Logo Design Trends",
        url: "https://example.com/logo-trends",
        type: "article",
      },
    ],
    relatedKnowledge: ["平面构成", "色彩构成", "点线面基础"],
  },
  {
    id: "case-004",
    title: "儿童玩具模块化设计 / Modular Toy Design",
    discipline: "product-design",
    tags: ["产品设计", "模块化", "色彩心理", "形态构成"],
    difficulty: "base",
    imageUrl:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=600&fit=crop",
    keyInsight: "模块化思维：通过有限的基础单元创造无限的组合可能",
    problem: "如何设计一套既能启发儿童创造力，又安全耐用的模块化玩具系统？",
    deconstruction: `
## 设计分析

### 形态设计
- 基础模块采用圆角几何形，安全无尖锐边角
- 圆形、方形、三角形三种基础单元
- 连接结构设计考虑儿童手部力量和灵活性

### 色彩策略
- 采用明快的原色系统（红黄蓝）刺激视觉发育
- 每种形状对应特定颜色帮助认知
- 色彩对比强烈增强吸引力

### 构成原理
- 对称与非对称组合训练平衡感
- 重复排列培养秩序观念
- 自由堆叠激发空间想象力
`,
    solution:
      "设计三种基础几何模块，采用卡扣式连接方式，便于儿童操作。通过色彩编码和形状区分，帮助儿童建立分类和配对的认知。材质选用安全环保的ABS塑料，圆角处理确保使用安全。",
    references: [
      {
        title: "Play Design: Toys That Teach",
        url: "https://example.com/play-design",
        type: "book",
      },
      {
        title: "Modular Design Principles",
        url: "https://example.com/modular-design",
        type: "article",
      },
    ],
    relatedKnowledge: ["形态构成", "色彩心理学", "模块化设计"],
  },
  {
    id: "case-005",
    title: "城市公共空间改造 / Urban Public Space Renovation",
    discipline: "urban-planning",
    tags: ["城市设计", "公共空间", "动态平衡", "可持续"],
    difficulty: "stretch",
    imageUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    keyInsight: "动态平衡：在不同使用场景和人群需求之间找到设计平衡点",
    problem:
      "如何改造老旧社区的公共空间，使其既满足不同年龄层居民的需求，又保持环境的美观和秩序？",
    deconstruction: `
## 设计分析

### 空间布局
- 动态与静态区域的平衡：活动广场与休憩角落
- 开放空间与围合空间的对比
- 硬质铺装与软质绿化的比例关系

### 动线设计
- 主要人行道采用流畅的曲线引导
- 次要步道形成网络提供多样选择
- 无障碍通道贯穿全区

### 功能分区
- 儿童游乐区：色彩鲜艳，设施丰富
- 老年活动区：座椅充足，遮阳良好
- 健身运动区：器材齐全，场地开阔
- 休闲绿地：植被茂密，环境幽静
`,
    solution:
      "采用分区而不隔离的设计策略，通过地面铺装、植被高度和色彩变化划分功能区域。设计模块化的景观设施便于后期调整，植入智能照明和互动装置提升使用体验。整体布局遵循对称与非对称结合的平衡原则。",
    references: [
      {
        title: "Public Space Design Manual",
        url: "https://example.com/public-space-manual",
        type: "book",
      },
      {
        title: "Community-Centered Urban Design",
        url: "https://example.com/community-design",
        type: "article",
      },
      {
        title: "Inclusive Public Space Case Studies",
        url: "https://www.youtube.com/watch?v=example",
        type: "video",
      },
    ],
    relatedKnowledge: ["动态平衡", "空间构成", "可持续设计", "人因工程"],
  },
];

export const allTags = Array.from(
  new Set(mockCases.flatMap(c => c.tags))
).sort();

export const disciplineLabels: Record<string, string> = {
  architecture: "建筑设计",
  "graphic-design": "平面设计",
  "product-design": "产品设计",
  "urban-planning": "城市规划",
  "digital-media": "数字媒体",
};

export const difficultyLabels: Record<string, string> = {
  base: "基础",
  advance: "进阶",
  stretch: "挑战",
};
