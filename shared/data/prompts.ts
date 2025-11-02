import type { PromptTemplate } from "../types/index.js";

export const promptTemplates: PromptTemplate[] = [
  {
    id: "prompt-001",
    title: "点构成基础",
    description: "生成基于点元素的平面构成，适合初学者",
    aiTool: "midjourney",
    difficulty: "base",
    template:
      "minimalist composition with geometric dots, various sizes, {arrangement} arrangement, black and white, bauhaus style, clean background --ar 1:1 --v 6",
    parameters: {
      arrangement: "scattered | grid | circular | flowing",
    },
    examples: [
      "minimalist composition with geometric dots, various sizes, scattered arrangement, black and white, bauhaus style, clean background --ar 1:1 --v 6",
      "minimalist composition with geometric dots, various sizes, circular arrangement, black and white, bauhaus style, clean background --ar 1:1 --v 6",
    ],
    tags: ["点", "基础", "平面构成", "几何"],
    relatedSections: ["lesson-001"],
    tips: [
      "可以调整点的排列方式：scattered（散落）、grid（网格）、circular（环形）",
      "添加 --chaos 参数增加随机性",
      "使用 --s 参数控制风格化程度",
    ],
  },
  {
    id: "prompt-002",
    title: "线条构成基础",
    description: "生成线条元素的动态构成",
    aiTool: "midjourney",
    difficulty: "base",
    template:
      "{line_type} lines composition, dynamic flow, geometric abstract, {direction} direction, monochromatic, modern minimalist style --ar 16:9 --v 6",
    parameters: {
      line_type: "straight | curved | diagonal | intersecting",
      direction: "horizontal | vertical | diagonal | radial",
    },
    examples: [
      "curved lines composition, dynamic flow, geometric abstract, radial direction, monochromatic, modern minimalist style --ar 16:9 --v 6",
      "intersecting lines composition, dynamic flow, geometric abstract, diagonal direction, monochromatic, modern minimalist style --ar 16:9 --v 6",
    ],
    tags: ["线", "基础", "平面构成", "动态"],
    relatedSections: ["lesson-001"],
    tips: [
      "尝试不同的线条类型组合",
      "可以添加 smooth | sharp 描述线条质感",
      "增加 flowing | rigid 描述动感",
    ],
  },
  {
    id: "prompt-003",
    title: "面构成基础",
    description: "生成几何面的分割与重组",
    aiTool: "midjourney",
    difficulty: "base",
    template:
      "geometric shapes composition, {shape_types}, overlapping layers, {color_scheme}, constructivism style, balanced composition --ar 1:1 --v 6",
    parameters: {
      shape_types:
        "circles and squares | triangles and rectangles | organic shapes | mixed geometric",
      color_scheme:
        "monochrome | primary colors | analogous colors | complementary colors",
    },
    examples: [
      "geometric shapes composition, circles and squares, overlapping layers, primary colors, constructivism style, balanced composition --ar 1:1 --v 6",
      "geometric shapes composition, organic shapes, overlapping layers, analogous colors, constructivism style, balanced composition --ar 1:1 --v 6",
    ],
    tags: ["面", "基础", "平面构成", "几何"],
    relatedSections: ["lesson-001"],
    tips: [
      "overlapping（重叠）产生层次感",
      "可以加入 transparent（透明）效果",
      "尝试不同的色彩方案",
    ],
  },
  {
    id: "prompt-004",
    title: "材质表现基础",
    description: "生成不同材质的视觉效果",
    aiTool: "stable_diffusion",
    difficulty: "base",
    template:
      "close-up texture study, {material_type} surface, high detail, macro photography, natural lighting, 8k, photorealistic",
    parameters: {
      material_type:
        "rough concrete | smooth metal | soft fabric | weathered wood | glossy ceramic | matte stone",
    },
    examples: [
      "close-up texture study, rough concrete surface, high detail, macro photography, natural lighting, 8k, photorealistic",
      "close-up texture study, soft fabric surface, high detail, macro photography, natural lighting, 8k, photorealistic",
    ],
    tags: ["材质", "肌理", "基础", "摄影"],
    relatedSections: ["lesson-002"],
    tips: [
      "使用 macro photography 获得细节丰富的质感",
      "添加 weathered | pristine 描述新旧程度",
      "可以指定光照条件影响材质表现",
    ],
  },
  {
    id: "prompt-005",
    title: "材质对比",
    description: "生成对比材质的组合效果",
    aiTool: "midjourney",
    difficulty: "base",
    template:
      "material contrast composition, {material_1} meets {material_2}, closeup detail, studio lighting, modern aesthetic, clean composition --ar 4:3 --v 6",
    parameters: {
      material_1: "rough | smooth | hard | soft | matte | glossy",
      material_2: "rough | smooth | hard | soft | matte | glossy",
    },
    examples: [
      "material contrast composition, rough stone meets smooth glass, closeup detail, studio lighting, modern aesthetic, clean composition --ar 4:3 --v 6",
      "material contrast composition, soft fabric meets hard metal, closeup detail, studio lighting, modern aesthetic, clean composition --ar 4:3 --v 6",
    ],
    tags: ["材质", "对比", "基础", "视觉"],
    relatedSections: ["lesson-002"],
    tips: [
      "对比材质产生视觉张力",
      "可以加入颜色对比增强效果",
      "尝试 transition（过渡）效果",
    ],
  },
  {
    id: "prompt-006",
    title: "对称平衡构成",
    description: "生成对称平衡的构图",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "{symmetry_type} symmetrical composition, geometric elements, perfect balance, {color_palette}, minimalist design, centered composition, architectural precision --ar 2:3 --v 6",
    parameters: {
      symmetry_type: "bilateral | radial | rotational",
      color_palette: "monochromatic | duotone | vibrant colors | muted tones",
    },
    examples: [
      "bilateral symmetrical composition, geometric elements, perfect balance, duotone, minimalist design, centered composition, architectural precision --ar 2:3 --v 6",
      "radial symmetrical composition, geometric elements, perfect balance, vibrant colors, minimalist design, centered composition, architectural precision --ar 2:3 --v 6",
    ],
    tags: ["对称", "平衡", "进阶", "构图"],
    relatedSections: ["lesson-003"],
    tips: [
      "bilateral（左右对称）最常见",
      "radial（放射对称）产生中心焦点",
      "可以加入 mandala（曼陀罗）元素",
    ],
  },
  {
    id: "prompt-007",
    title: "非对称平衡构成",
    description: "生成动态的非对称平衡",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "asymmetrical balanced composition, {element_contrast}, dynamic tension, visual weight distribution, {style}, modern design, sophisticated layout --ar 16:9 --v 6",
    parameters: {
      element_contrast:
        "large vs small elements | dense vs sparse | dark vs light | complex vs simple",
      style:
        "swiss design | japanese minimalism | constructivism | contemporary",
    },
    examples: [
      "asymmetrical balanced composition, large vs small elements, dynamic tension, visual weight distribution, swiss design, modern design, sophisticated layout --ar 16:9 --v 6",
      "asymmetrical balanced composition, dense vs sparse, dynamic tension, visual weight distribution, japanese minimalism, modern design, sophisticated layout --ar 16:9 --v 6",
    ],
    tags: ["非对称", "平衡", "进阶", "动态"],
    relatedSections: ["lesson-003"],
    tips: [
      "通过大小、色彩、位置实现平衡",
      "添加 tension（张力）增强动感",
      "留白也有视觉重量",
    ],
  },
  {
    id: "prompt-008",
    title: "透视空间",
    description: "生成具有透视感的空间构成",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "{perspective_type} perspective, geometric space, architectural elements, depth and dimension, {atmosphere}, clean lines, isometric precision --ar 3:2 --v 6",
    parameters: {
      perspective_type: "one-point | two-point | three-point | isometric",
      atmosphere:
        "bright minimalist | moody dramatic | ethereal foggy | stark contrast",
    },
    examples: [
      "one-point perspective, geometric space, architectural elements, depth and dimension, bright minimalist, clean lines, isometric precision --ar 3:2 --v 6",
      "two-point perspective, geometric space, architectural elements, depth and dimension, moody dramatic, clean lines, isometric precision --ar 3:2 --v 6",
    ],
    tags: ["透视", "空间", "进阶", "三维"],
    relatedSections: ["lesson-004"],
    tips: [
      "one-point适合正面场景",
      "two-point适合建筑转角",
      "isometric（等轴测）适合平面化三维",
    ],
  },
  {
    id: "prompt-009",
    title: "层次深度",
    description: "通过重叠和层次创造深度",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "layered composition, {layer_count} depth levels, overlapping elements, atmospheric perspective, {visual_style}, spatial hierarchy, foreground to background --ar 16:9 --v 6",
    parameters: {
      layer_count: "three | five | multiple",
      visual_style:
        "paper cutout | glass layers | mountain silhouettes | urban landscape | abstract shapes",
    },
    examples: [
      "layered composition, five depth levels, overlapping elements, atmospheric perspective, mountain silhouettes, spatial hierarchy, foreground to background --ar 16:9 --v 6",
      "layered composition, multiple depth levels, overlapping elements, atmospheric perspective, glass layers, spatial hierarchy, foreground to background --ar 16:9 --v 6",
    ],
    tags: ["层次", "深度", "进阶", "空间"],
    relatedSections: ["lesson-004"],
    tips: [
      "前景清晰，背景模糊增强深度",
      "明度渐变模拟大气透视",
      "重叠产生明确前后关系",
    ],
  },
  {
    id: "prompt-010",
    title: "明暗五调子",
    description: "生成丰富明暗关系的作品",
    aiTool: "stable_diffusion",
    difficulty: "advance",
    template:
      "chiaroscuro lighting study, geometric form, five tones from highlight to shadow, dramatic lighting, {light_direction}, tonal gradation, volumetric, detailed rendering",
    parameters: {
      light_direction: "from top-left | from side | from above | from below",
    },
    examples: [
      "chiaroscuro lighting study, geometric form, five tones from highlight to shadow, dramatic lighting, from side, tonal gradation, volumetric, detailed rendering",
      "chiaroscuro lighting study, geometric form, five tones from highlight to shadow, dramatic lighting, from above, tonal gradation, volumetric, detailed rendering",
    ],
    tags: ["明暗", "光影", "进阶", "调子"],
    relatedSections: ["lesson-005"],
    tips: [
      "chiaroscuro（明暗对照法）产生戏剧效果",
      "指定光源方向控制明暗分布",
      "添加 soft | hard 控制光线硬度",
    ],
  },
  {
    id: "prompt-011",
    title: "高对比光影",
    description: "强烈明暗对比的视觉冲击",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "high contrast composition, {subject}, dramatic black and white, deep shadows, bright highlights, {mood}, cinematic lighting, strong visual impact --ar 2:3 --v 6",
    parameters: {
      subject:
        "geometric shapes | architectural forms | abstract elements | organic forms",
      mood: "mysterious | powerful | elegant | tension",
    },
    examples: [
      "high contrast composition, geometric shapes, dramatic black and white, deep shadows, bright highlights, mysterious, cinematic lighting, strong visual impact --ar 2:3 --v 6",
      "high contrast composition, architectural forms, dramatic black and white, deep shadows, bright highlights, powerful, cinematic lighting, strong visual impact --ar 2:3 --v 6",
    ],
    tags: ["对比", "光影", "进阶", "黑白"],
    relatedSections: ["lesson-005"],
    tips: [
      "黑白高对比最强烈",
      "可以加入 film noir 电影感",
      "控制高光和阴影的比例",
    ],
  },
  {
    id: "prompt-012",
    title: "色彩情感表达",
    description: "用色彩传达特定情绪",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "abstract color composition expressing {emotion}, {color_scheme}, fluid forms, emotional atmosphere, color psychology, expressive brushstrokes, contemporary art --ar 1:1 --v 6",
    parameters: {
      emotion: "joy | melancholy | serenity | energy | mystery | nostalgia",
      color_scheme:
        "warm palette | cool palette | vibrant saturated | muted desaturated | monochromatic | complementary contrast",
    },
    examples: [
      "abstract color composition expressing joy, vibrant saturated, fluid forms, emotional atmosphere, color psychology, expressive brushstrokes, contemporary art --ar 1:1 --v 6",
      "abstract color composition expressing melancholy, muted desaturated, fluid forms, emotional atmosphere, color psychology, expressive brushstrokes, contemporary art --ar 1:1 --v 6",
    ],
    tags: ["色彩", "情感", "进阶", "抽象"],
    relatedSections: ["lesson-006"],
    tips: ["暖色传达活力和热情", "冷色传达平静和理性", "饱和度影响情绪强度"],
  },
  {
    id: "prompt-013",
    title: "配色方案",
    description: "生成和谐的配色方案",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "{color_harmony} color harmony composition, geometric blocks, {primary_color} as dominant color, color theory application, balanced palette, modern design aesthetic --ar 4:3 --v 6",
    parameters: {
      color_harmony:
        "analogous | complementary | triadic | tetradic | monochromatic",
      primary_color: "blue | red | yellow | green | purple | orange",
    },
    examples: [
      "complementary color harmony composition, geometric blocks, blue as dominant color, color theory application, balanced palette, modern design aesthetic --ar 4:3 --v 6",
      "triadic color harmony composition, geometric blocks, red as dominant color, color theory application, balanced palette, modern design aesthetic --ar 4:3 --v 6",
    ],
    tags: ["配色", "色彩理论", "进阶", "和谐"],
    relatedSections: ["lesson-006"],
    tips: [
      "analogous（邻近色）和谐统一",
      "complementary（互补色）强烈对比",
      "triadic（三角配色）平衡活泼",
    ],
  },
  {
    id: "prompt-014",
    title: "重复节奏",
    description: "通过重复元素创造视觉韵律",
    aiTool: "midjourney",
    difficulty: "stretch",
    template:
      "rhythmic repetition pattern, {repeat_element}, {variation_type} variation, visual rhythm, {pattern_style}, seamless tile, decorative art --ar 1:1 --v 6",
    parameters: {
      repeat_element:
        "geometric modules | organic motifs | linear elements | abstract forms",
      variation_type: "size | color | rotation | spacing | opacity",
      pattern_style:
        "art deco | art nouveau | memphis | islamic geometric | modernist",
    },
    examples: [
      "rhythmic repetition pattern, geometric modules, size variation, visual rhythm, art deco, seamless tile, decorative art --ar 1:1 --v 6",
      "rhythmic repetition pattern, organic motifs, color variation, visual rhythm, art nouveau, seamless tile, decorative art --ar 1:1 --v 6",
    ],
    tags: ["重复", "节奏", "拓展", "图案"],
    relatedSections: ["lesson-007"],
    tips: ["规律重复产生秩序感", "加入渐变增加动感", "seamless tile可用于平铺"],
  },
  {
    id: "prompt-015",
    title: "肌理质感",
    description: "生成丰富的视觉肌理",
    aiTool: "stable_diffusion",
    difficulty: "stretch",
    template:
      "abstract textural composition, {texture_type} texture, tactile quality, rich surface detail, {technique}, material exploration, macro detail, 8k ultra detailed",
    parameters: {
      texture_type:
        "rough organic | smooth synthetic | layered complex | eroded weathered | woven fabric | fractured broken",
      technique:
        "mixed media | digital painting | collage | generative | photographic",
    },
    examples: [
      "abstract textural composition, rough organic texture, tactile quality, rich surface detail, mixed media, material exploration, macro detail, 8k ultra detailed",
      "abstract textural composition, layered complex texture, tactile quality, rich surface detail, collage, material exploration, macro detail, 8k ultra detailed",
    ],
    tags: ["肌理", "质感", "拓展", "材质"],
    relatedSections: ["lesson-007"],
    tips: [
      "macro detail增加肌理细节",
      "mixed media产生丰富层次",
      "可以指定真实材料名称",
    ],
  },
  {
    id: "prompt-016",
    title: "跨学科融合",
    description: "将构成原理应用到不同领域",
    aiTool: "midjourney",
    difficulty: "stretch",
    template:
      "cross-disciplinary design concept, {discipline_1} meets {discipline_2}, composition principles applied, innovative fusion, {aesthetic}, conceptual design, avant-garde --ar 16:9 --v 6",
    parameters: {
      discipline_1:
        "graphic design | architecture | fashion | product | interior",
      discipline_2:
        "graphic design | architecture | fashion | product | interior",
      aesthetic:
        "minimalist | maximalist | organic | geometric | futuristic | traditional",
    },
    examples: [
      "cross-disciplinary design concept, architecture meets fashion, composition principles applied, innovative fusion, geometric, conceptual design, avant-garde --ar 16:9 --v 6",
      "cross-disciplinary design concept, product meets graphic design, composition principles applied, innovative fusion, minimalist, conceptual design, avant-garde --ar 16:9 --v 6",
    ],
    tags: ["跨学科", "融合", "拓展", "创新"],
    relatedSections: ["lesson-008"],
    tips: [
      "寻找不同学科的共通原理",
      "结合各学科的特色语言",
      "avant-garde增加实验性",
    ],
  },
  {
    id: "prompt-017",
    title: "系列演化",
    description: "生成主题系列的变体",
    aiTool: "midjourney",
    difficulty: "stretch",
    template:
      "design series exploring {theme}, variation {number} of {total}, consistent visual language, {core_element} as unifying element, {variation_aspect} exploration, cohesive family --ar 1:1 --v 6",
    parameters: {
      theme:
        "geometric abstraction | natural forms | urban landscape | emotional states | cultural symbols",
      number: "1 | 2 | 3 | 4 | 5",
      total: "8 | 10 | 12",
      core_element:
        "color palette | geometric shape | compositional structure | material texture",
      variation_aspect: "complexity | scale | mood | density | orientation",
    },
    examples: [
      "design series exploring geometric abstraction, variation 1 of 8, consistent visual language, color palette as unifying element, complexity exploration, cohesive family --ar 1:1 --v 6",
      "design series exploring emotional states, variation 3 of 10, consistent visual language, compositional structure as unifying element, mood exploration, cohesive family --ar 1:1 --v 6",
    ],
    tags: ["系列", "演化", "拓展", "主题"],
    relatedSections: ["lesson-009"],
    tips: ["确定统一的核心元素", "通过参数变化产生多样性", "保持整体协调性"],
  },
  {
    id: "prompt-018",
    title: "设计分析可视化",
    description: "将设计批评转化为可视化分析",
    aiTool: "chinese_ai",
    difficulty: "advance",
    template:
      "设计分析图解，{设计对象}，标注{分析角度}，信息图风格，清晰的视觉层级，{配色}，专业排版 --ar 16:9",
    parameters: {
      设计对象: "海报构成 | 产品形态 | 空间布局 | 字体设计",
      分析角度: "构图原理 | 色彩关系 | 视觉流线 | 比例关系 | 材质对比",
      配色: "学术蓝灰 | 现代黑白红 | 柔和彩色",
    },
    examples: [
      "设计分析图解，海报构成，标注构图原理，信息图风格，清晰的视觉层级，学术蓝灰，专业排版 --ar 16:9",
      "设计分析图解，产品形态，标注比例关系，信息图风格，清晰的视觉层级，现代黑白红，专业排版 --ar 16:9",
    ],
    tags: ["分析", "可视化", "进阶", "批评"],
    relatedSections: ["lesson-010"],
    tips: ["使用标注线引导视线", "色彩区分不同分析层面", "文字简洁专业"],
  },
  {
    id: "prompt-019",
    title: "作品集版式",
    description: "生成专业的作品集页面",
    aiTool: "midjourney",
    difficulty: "advance",
    template:
      "portfolio layout design, {layout_style}, project showcase, {image_arrangement}, typography hierarchy, {color_scheme}, professional presentation, clean margins, modern aesthetic --ar 16:9 --v 6",
    parameters: {
      layout_style:
        "grid system | asymmetrical | magazine editorial | minimal single column | masonry",
      image_arrangement:
        "large hero image | multiple thumbnails | process showcase | before-after comparison",
      color_scheme:
        "monochrome elegant | colorful vibrant | brand colors | neutral professional",
    },
    examples: [
      "portfolio layout design, grid system, project showcase, large hero image, typography hierarchy, monochrome elegant, professional presentation, clean margins, modern aesthetic --ar 16:9 --v 6",
      "portfolio layout design, asymmetrical, project showcase, process showcase, typography hierarchy, neutral professional, professional presentation, clean margins, modern aesthetic --ar 16:9 --v 6",
    ],
    tags: ["作品集", "版式", "进阶", "展示"],
    relatedSections: ["lesson-011"],
    tips: ["留出充足的呼吸空间", "建立清晰的视觉层级", "保持整体风格统一"],
  },
];
