import type { Prompt } from "@shared/types";

export const prompts: Prompt[] = [
  {
    id: "prompt-01",
    title: "点线面构成生成",
    description: "生成以点线面为基本元素的抽象构成作品",
    category: "平面构成",
    tags: ["点线面", "抽象", "构成", "Midjourney"],
    difficulty: "base",
    template:
      "Abstract composition with {element_type}, {style} style, {color_scheme} color palette, {mood} mood, minimalist, bauhaus influence, geometric, --ar {aspect_ratio} --style raw",
    variables: [
      {
        name: "element_type",
        description: "元素类型（点/线/面）",
        placeholder: "dots and lines / geometric shapes / linear elements",
        required: true,
      },
      {
        name: "style",
        description: "艺术风格",
        placeholder: "bauhaus / swiss / constructivist",
        required: true,
      },
      {
        name: "color_scheme",
        description: "色彩方案",
        placeholder: "monochrome / primary colors / earth tones",
        required: true,
      },
      {
        name: "mood",
        description: "情绪氛围",
        placeholder: "calm / dynamic / balanced",
        required: false,
      },
      {
        name: "aspect_ratio",
        description: "画面比例",
        placeholder: "16:9 / 1:1 / 2:3",
        required: false,
      },
    ],
    examples: [
      {
        title: "包豪斯风格点构成",
        input: {
          element_type: "scattered dots in various sizes",
          style: "bauhaus",
          color_scheme: "primary colors (red, blue, yellow)",
          mood: "balanced and harmonious",
          aspect_ratio: "1:1",
        },
        output:
          "Abstract composition with scattered dots in various sizes, bauhaus style, primary colors (red, blue, yellow) color palette, balanced and harmonious mood, minimalist, bauhaus influence, geometric, --ar 1:1 --style raw",
      },
    ],
    tips: [
      "使用 --style raw 获得更纯粹的构成效果",
      "可以添加 --chaos 参数增加随机性",
      "尝试不同的比例来适应不同的应用场景",
    ],
    relatedCourses: ["course-01"],
    relatedKnowledge: ["knowledge-01"],
    courseSection: "course-01-theory",
  },
  {
    id: "prompt-02",
    title: "瑞士风格海报生成",
    description: "生成瑞士国际主义风格的海报设计",
    category: "海报设计",
    tags: ["瑞士风格", "海报", "网格", "排版"],
    difficulty: "base",
    template:
      "Swiss international style poster, {subject}, grid-based layout, {typography} typography, {color_scheme}, clean and minimal, high contrast, modernist, --ar {aspect_ratio}",
    variables: [
      {
        name: "subject",
        description: "海报主题",
        placeholder: "music concert / art exhibition / design conference",
        required: true,
      },
      {
        name: "typography",
        description: "字体风格",
        placeholder: "helvetica / akzidenz-grotesk / univers",
        required: true,
      },
      {
        name: "color_scheme",
        description: "色彩方案",
        placeholder: "black and white / red and black / blue and yellow",
        required: true,
      },
      {
        name: "aspect_ratio",
        description: "海报比例",
        placeholder: "2:3 / 3:4",
        required: false,
      },
    ],
    examples: [
      {
        title: "音乐会海报",
        input: {
          subject: "classical music concert",
          typography: "helvetica bold",
          color_scheme: "black text on white background with red accent",
          aspect_ratio: "2:3",
        },
        output:
          "Swiss international style poster, classical music concert, grid-based layout, helvetica bold typography, black text on white background with red accent, clean and minimal, high contrast, modernist, --ar 2:3",
      },
    ],
    tips: [
      "强调网格系统和严格的对齐",
      "使用无衬线字体",
      "保持高对比度和清晰的视觉层次",
    ],
    relatedCourses: ["course-01"],
    relatedKnowledge: ["knowledge-02"],
    courseSection: "course-01-cases",
  },
  {
    id: "prompt-03",
    title: "材质拼贴效果",
    description: "生成具有真实材质感的拼贴艺术作品",
    category: "材质拼贴",
    tags: ["材质", "拼贴", "质感", "肌理"],
    difficulty: "base",
    template:
      "Collage art with {materials}, {texture_description}, {composition}, mixed media, tactile, {color_palette}, photorealistic textures, --ar {aspect_ratio} --style raw",
    variables: [
      {
        name: "materials",
        description: "材质类型",
        placeholder: "paper / fabric / wood / metal",
        required: true,
      },
      {
        name: "texture_description",
        description: "质感描述",
        placeholder: "rough / smooth / weathered / torn",
        required: true,
      },
      {
        name: "composition",
        description: "构图方式",
        placeholder: "abstract / geometric / organic",
        required: true,
      },
      {
        name: "color_palette",
        description: "色彩",
        placeholder: "natural tones / vibrant colors / monochrome",
        required: false,
      },
      {
        name: "aspect_ratio",
        description: "比例",
        placeholder: "1:1 / 4:5",
        required: false,
      },
    ],
    examples: [
      {
        title: "纸张拼贴",
        input: {
          materials: "torn paper pieces in different colors",
          texture_description: "rough edges and visible paper grain",
          composition: "abstract geometric arrangement",
          color_palette: "earth tones",
          aspect_ratio: "1:1",
        },
        output:
          "Collage art with torn paper pieces in different colors, rough edges and visible paper grain, abstract geometric arrangement, mixed media, tactile, earth tones, photorealistic textures, --ar 1:1 --style raw",
      },
    ],
    tips: [
      "强调材质的真实感和触感",
      "可以结合多种材质增加层次",
      "注意光影对材质表现的影响",
    ],
    relatedCourses: ["course-02"],
    relatedKnowledge: ["knowledge-03"],
    courseSection: "course-02-tutorial",
  },
  {
    id: "prompt-04",
    title: "对称构图生成",
    description: "创建完美对称的构图作品",
    category: "构图设计",
    tags: ["对称", "构图", "平衡", "几何"],
    difficulty: "advance",
    template:
      "Perfectly symmetrical composition, {subject}, {symmetry_type} symmetry, {style}, balanced, harmonious, {detail_level}, centered, --ar {aspect_ratio}",
    variables: [
      {
        name: "subject",
        description: "主题内容",
        placeholder: "architectural / natural / abstract",
        required: true,
      },
      {
        name: "symmetry_type",
        description: "对称类型",
        placeholder: "bilateral / radial / rotational",
        required: true,
      },
      {
        name: "style",
        description: "风格",
        placeholder: "minimalist / ornate / geometric",
        required: true,
      },
      {
        name: "detail_level",
        description: "细节程度",
        placeholder: "highly detailed / clean and simple",
        required: false,
      },
      {
        name: "aspect_ratio",
        description: "比例",
        placeholder: "1:1 / 16:9",
        required: false,
      },
    ],
    examples: [
      {
        title: "建筑对称",
        input: {
          subject: "modern architecture facade",
          symmetry_type: "bilateral",
          style: "minimalist and clean",
          detail_level: "highly detailed",
          aspect_ratio: "1:1",
        },
        output:
          "Perfectly symmetrical composition, modern architecture facade, bilateral symmetry, minimalist and clean, balanced, harmonious, highly detailed, centered, --ar 1:1",
      },
    ],
    tips: [
      "1:1 比例最适合对称构图",
      "注意中心轴的精确对齐",
      "可以用于建筑、产品、自然等多种主题",
    ],
    relatedCourses: ["course-03"],
    relatedKnowledge: ["knowledge-04"],
    courseSection: "course-03-theory",
  },
  {
    id: "prompt-05",
    title: "动态节奏设计",
    description: "创建具有动态感和节奏感的视觉作品",
    category: "动态设计",
    tags: ["动态", "节奏", "运动", "视觉流"],
    difficulty: "advance",
    template:
      "Dynamic composition with {elements}, {movement_type} movement, {rhythm_pattern}, energetic, flowing, {color_scheme}, {style}, sense of motion, --ar {aspect_ratio}",
    variables: [
      {
        name: "elements",
        description: "构成元素",
        placeholder: "curved lines / scattered shapes / overlapping forms",
        required: true,
      },
      {
        name: "movement_type",
        description: "运动类型",
        placeholder: "spiral / wave-like / explosive / flowing",
        required: true,
      },
      {
        name: "rhythm_pattern",
        description: "节奏模式",
        placeholder: "regular repetition / accelerating / random",
        required: true,
      },
      {
        name: "color_scheme",
        description: "色彩方案",
        placeholder: "gradient / complementary / monochrome",
        required: false,
      },
      {
        name: "style",
        description: "视觉风格",
        placeholder: "abstract / futuristic / organic",
        required: false,
      },
      {
        name: "aspect_ratio",
        description: "比例",
        placeholder: "16:9 / 2:3",
        required: false,
      },
    ],
    examples: [
      {
        title: "螺旋动态",
        input: {
          elements: "curved lines and circular shapes",
          movement_type: "spiral",
          rhythm_pattern: "accelerating from center outward",
          color_scheme: "gradient from blue to purple",
          style: "abstract and modern",
          aspect_ratio: "16:9",
        },
        output:
          "Dynamic composition with curved lines and circular shapes, spiral movement, accelerating from center outward, energetic, flowing, gradient from blue to purple, abstract and modern, sense of motion, --ar 16:9",
      },
    ],
    tips: [
      "使用对角线和曲线增强动态感",
      "渐变色彩可以强化方向性",
      "元素的重复和变化创造节奏",
    ],
    relatedCourses: ["course-03"],
    relatedKnowledge: ["knowledge-05"],
    courseSection: "course-03-examples",
  },
];
