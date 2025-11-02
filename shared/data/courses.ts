import type { Course } from "@shared/types";

export const courses: Course[] = [
  {
    id: "course-01",
    title: "观·元素解构",
    subtitle: "点线面基础认知",
    description: "通过观察和记录，学习设计的基本元素：点、线、面",
    loop: 1,
    session: 1,
    duration: "2周",
    objectives: [
      "理解点线面的基本概念",
      "学会观察和分析设计元素",
      "掌握基础的设计语言",
    ],
    metadata: {
      tags: ["基础", "观察", "点线面"],
      difficulty: "base",
      relatedKnowledge: ["knowledge-01", "knowledge-02"],
      relatedCases: ["case-01", "case-02"],
    },
  },
  {
    id: "course-02",
    title: "触·材质发现",
    subtitle: "材质与质感探索",
    description: "通过触觉体验，探索不同材质的视觉和触觉特性",
    loop: 1,
    session: 2,
    duration: "2周",
    objectives: [
      "认识不同材质的特性",
      "学会记录和分类材质",
      "理解材质在设计中的应用",
    ],
    metadata: {
      tags: ["基础", "材质", "观察"],
      difficulty: "base",
      prerequisites: ["course-01"],
      relatedKnowledge: ["knowledge-03"],
      relatedCases: ["case-03"],
    },
  },
  {
    id: "course-03",
    title: "构·动态平衡",
    subtitle: "构成与平衡原理",
    description: "学习构图的基本原理，探索对称与非对称的平衡",
    loop: 2,
    session: 3,
    duration: "2周",
    objectives: [
      "理解构图的基本原理",
      "掌握对称与非对称平衡",
      "学会运用构成原理进行设计",
    ],
    metadata: {
      tags: ["构成", "平衡", "设计原理"],
      difficulty: "advance",
      prerequisites: ["course-01", "course-02"],
      relatedKnowledge: ["knowledge-04", "knowledge-05"],
      relatedCases: ["case-04", "case-05"],
    },
  },
];
