import type {
  AssignmentFormSchema,
  CourseDetail,
  CourseOutlineItem,
  KnowledgeCard,
  PromptTemplate,
} from "./legacy-types";

export const courses: CourseOutlineItem[] = [
  {
    id: "1",
    title: "观·元素解构",
    description: "点线面基础理论",
    week: 1,
  },
  {
    id: "2",
    title: "触·材质发现",
    description: "材质摄影与分类",
    week: 2,
  },
  {
    id: "3",
    title: "构·动态平衡",
    description: "视觉平衡与布局策略",
    week: 3,
  },
];

export const courseDetails: Record<string, CourseDetail> = {
  "1": {
    id: "1",
    title: "观·元素解构",
    description: "点线面基础理论",
    week: 1,
    objectives: ["Recognize and categorize visual elements", "Apply composition heuristics"],
    resources: ["Point-Line-Plane article", "Canva tutorial"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  "2": {
    id: "2",
    title: "触·材质发现",
    description: "材质摄影与分类",
    week: 2,
    objectives: ["Capture textures with consistent lighting", "Build a tactile taxonomy"],
    resources: ["Texture photography checklist", "Material moodboards"],
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
  },
  "3": {
    id: "3",
    title: "构·动态平衡",
    description: "视觉平衡与布局策略",
    week: 3,
    objectives: ["Contrast symmetry and asymmetry", "Prototype balanced layouts"],
    resources: ["Balance principle guide", "Figma starter file"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
};

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: "k1",
    title: "点线面",
    summary: "构成设计的基石元素",
    category: "Theory",
  },
  {
    id: "k2",
    title: "视觉层级",
    summary: "引导视线的层次策略",
    category: "Composition",
  },
  {
    id: "k3",
    title: "色彩心理",
    summary: "色彩与情绪之间的关联",
    category: "Colour",
  },
];

export const caseStudies = [
  {
    id: "c1",
    title: "抽象构成展",
    discipline: "Branding",
    difficulty: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: "c2",
    title: "数字画册体验",
    discipline: "Product",
    difficulty: "advanced",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    id: "c3",
    title: "互动展览导视",
    discipline: "Exhibition",
    difficulty: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "p1",
    prompt: "Poster design exploring point-line-plane relationships with stark contrast",
  },
  {
    id: "p2",
    prompt: "Collage of tactile materials photographed under soft daylight",
  },
];

export const assignmentDefaults: AssignmentFormSchema = {
  name: "",
  email: "",
  projectUrl: "",
  notes: "",
};
