import type { Assignment, Submission, UserProgress } from "@shared/types";
import { readJSONFile, resolveStoragePath, writeJSONFile } from "../utils/storage.js";

export function getAssignments(): Assignment[] {
  const filePath = resolveStoragePath("assignments.json");
  return readJSONFile<Assignment[]>(filePath, getDefaultAssignments());
}

export function getAssignmentById(id: string): Assignment | undefined {
  const assignments = getAssignments();
  return assignments.find((a) => a.id === id);
}

export function getSubmissions(assignmentId: string, userId: string): Submission[] {
  const filePath = resolveStoragePath("submissions", `${userId}_${assignmentId}.json`);
  const submissions = readJSONFile<Submission[]>(filePath, []);
  return submissions.sort(
    (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
  );
}

export function saveSubmission(submission: Submission): void {
  const filePath = resolveStoragePath("submissions", `${submission.userId}_${submission.assignmentId}.json`);
  const submissions = readJSONFile<Submission[]>(filePath, []);

  submissions.push(submission);
  const ordered = submissions.sort(
    (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
  );

  writeJSONFile(filePath, ordered);
}

export function getUserProgress(userId: string, assignmentId: string): UserProgress | null {
  const filePath = resolveStoragePath("progress", `${userId}_${assignmentId}.json`);
  try {
    const data = readJSONFile<UserProgress | null>(filePath, null);
    return data;
  } catch {
    return null;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  const filePath = resolveStoragePath("progress", `${progress.userId}_${progress.assignmentId}.json`);
  writeJSONFile(filePath, progress);
}

function getDefaultAssignments(): Assignment[] {
  return [
    {
      id: "pa-01",
      code: "PA-01",
      title: "观·元素解构",
      description: "通过观察日常物品，识别并解构设计中的点、线、面元素，培养设计观察力和分析能力。",
      courseId: "course-01",
      difficulty: "base",
      type: "observation",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      requirements: [
        {
          id: "req-01",
          label: "拍摄3张高质量照片",
          description: "选择3个日常物品或场景，拍摄包含清晰点、线、面元素的照片。要求光线充足、构图合理、焦点清晰。",
          type: "photo",
          required: true,
        },
        {
          id: "req-02",
          label: "绘制解构分析图",
          description: "使用Canva或其他工具，在照片上标注识别出的点、线、面元素，并用不同颜色区分。",
          type: "diagram",
          required: true,
        },
        {
          id: "req-03",
          label: "撰写问题陈述",
          description: "基于观察结果，撰写一个设计问题陈述（Problem Statement），说明你发现的设计现象或问题。",
          type: "text",
          required: true,
        },
        {
          id: "req-04",
          label: "提出HMW问题",
          description: "根据问题陈述，提出一个\"我们如何...\"（How Might We）的开放性问题，启发解决方案思考。",
          type: "text",
          required: true,
        },
      ],
      rubric: {
        criteria: [
          {
            id: "criterion-01",
            name: "观察深度",
            points: 30,
            description: "评估学生对点、线、面元素的识别准确性和观察细致程度",
          },
          {
            id: "criterion-02",
            name: "解构清晰度",
            points: 30,
            description: "评估解构图的标注清晰度、逻辑性和视觉表现力",
          },
          {
            id: "criterion-03",
            name: "问题定义",
            points: 30,
            description: "评估问题陈述的准确性、相关性和HMW问题的开放性",
          },
          {
            id: "criterion-04",
            name: "创新思维",
            points: 10,
            description: "评估作业中体现的创新性和独特视角",
          },
        ],
        totalPoints: 100,
      },
      maxScore: 100,
      status: "published",
    },
  ];
}
