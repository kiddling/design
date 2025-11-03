import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { createServer } from "../index";
import type { Express } from "express";

let app: Express;

beforeAll(() => {
  app = createServer();
});

describe("Health Check", () => {
  it("should return healthy status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "ok");
    expect(response.body).toHaveProperty("timestamp");
  });
});

describe("Courses API", () => {
  it("should get all courses", async () => {
    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should get a specific course", async () => {
    const response = await request(app).get("/api/courses/course-01");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id", "course-01");
    expect(response.body.data).toHaveProperty("title");
  });

  it("should return 404 for non-existent course", async () => {
    const response = await request(app).get("/api/courses/non-existent");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty("error");
  });
});

describe("Knowledge Cards API", () => {
  it("should get all knowledge cards", async () => {
    const response = await request(app).get("/api/knowledge");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("items");
    expect(Array.isArray(response.body.data.items)).toBe(true);
  });

  it("should filter knowledge cards by difficulty", async () => {
    const response = await request(app).get("/api/knowledge?difficulty=base");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(
      response.body.data.items.every((item: any) => item.difficulty === "base")
    ).toBe(true);
  });

  it("should paginate knowledge cards", async () => {
    const response = await request(app).get("/api/knowledge?page=1&pageSize=2");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.pageSize).toBe(2);
    expect(response.body.data.page).toBe(1);
  });

  it("should get a specific knowledge card", async () => {
    const response = await request(app).get("/api/knowledge/knowledge-01");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id", "knowledge-01");
  });
});

describe("Cases API", () => {
  it("should get all cases", async () => {
    const response = await request(app).get("/api/cases");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("items");
  });

  it("should filter cases by category", async () => {
    const response = await request(app).get("/api/cases?category=平面设计");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(
      response.body.data.items.every(
        (item: any) => item.category === "平面设计"
      )
    ).toBe(true);
  });
});

describe("Prompts API", () => {
  it("should get all prompts", async () => {
    const response = await request(app).get("/api/prompts");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("items");
  });

  it("should get recommendations by course section", async () => {
    const response = await request(app).get(
      "/api/prompts/recommendations?courseSection=course-01-theory"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("prompts");
    expect(Array.isArray(response.body.data.prompts)).toBe(true);
    expect(response.body.data).toHaveProperty("reason");
  });

  it("should limit recommendations", async () => {
    const response = await request(app).get(
      "/api/prompts/recommendations?limit=2"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.prompts.length).toBeLessThanOrEqual(2);
  });
});

describe("Workflows API", () => {
  it("should get all workflows", async () => {
    const response = await request(app).get("/api/workflows");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("items");
  });

  it("should get a specific workflow", async () => {
    const response = await request(app).get("/api/workflows/workflow-01");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("steps");
    expect(Array.isArray(response.body.data.steps)).toBe(true);
  });
});

describe("Resources API", () => {
  it("should get all resources", async () => {
    const response = await request(app).get("/api/resources");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("items");
  });

  it("should filter resources by type", async () => {
    const response = await request(app).get("/api/resources?type=tool");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(
      response.body.data.items.every((item: any) => item.type === "tool")
    ).toBe(true);
  });
});

describe("Assignments API", () => {
  it("should get all assignments", async () => {
    const response = await request(app).get("/api/assignments");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get a specific assignment", async () => {
    const response = await request(app).get("/api/assignments/assignment-01");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("requirements");
    expect(Array.isArray(response.body.data.requirements)).toBe(true);
  });

  it("should submit an assignment", async () => {
    const submissionData = {
      userId: "test-user",
      status: "draft",
      fields: JSON.stringify([
        { requirementId: "req-01", value: "Test submission" },
      ]),
    };

    const response = await request(app)
      .post("/api/assignments/assignment-01/submit")
      .send(submissionData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.assignmentId).toBe("assignment-01");
  });
});

describe("User Progress API", () => {
  const testUserId = "test-user-progress";

  it("should get user progress (empty initially)", async () => {
    const response = await request(app).get(
      `/api/users/${testUserId}/progress`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should create user progress", async () => {
    const progressData = {
      courseId: "course-01",
      completedSections: ["section-01"],
      currentSection: "section-02",
      progressPercentage: 25,
    };

    const response = await request(app)
      .post(`/api/users/${testUserId}/progress`)
      .send(progressData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("userId", testUserId);
    expect(response.body.data).toHaveProperty("courseId", "course-01");
    expect(response.body.data.progressPercentage).toBe(25);
  });

  it("should update existing progress", async () => {
    const updateData = {
      courseId: "course-01",
      progressPercentage: 50,
    };

    const response = await request(app)
      .post(`/api/users/${testUserId}/progress`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.progressPercentage).toBe(50);
  });
});

describe("User Favorites API", () => {
  const testUserId = "test-user-favorites";

  it("should get user favorites (empty initially)", async () => {
    const response = await request(app).get(
      `/api/users/${testUserId}/favorites`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should add a favorite", async () => {
    const favoriteData = {
      itemId: "course-01",
      itemType: "course",
    };

    const response = await request(app)
      .post(`/api/users/${testUserId}/favorites`)
      .send(favoriteData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.itemId).toBe("course-01");
  });

  it("should validate favorite data", async () => {
    const invalidData = {
      itemId: "course-01",
      // missing itemType
    };

    const response = await request(app)
      .post(`/api/users/${testUserId}/favorites`)
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe("User History API", () => {
  const testUserId = "test-user-history";

  it("should get user history", async () => {
    const response = await request(app).get(`/api/users/${testUserId}/history`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should add a history item", async () => {
    const historyData = {
      itemId: "course-01",
      itemType: "course",
      action: "view",
    };

    const response = await request(app)
      .post(`/api/users/${testUserId}/history`)
      .send(historyData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("timestamp");
  });

  it("should limit history results", async () => {
    const response = await request(app).get(
      `/api/users/${testUserId}/history?limit=5`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeLessThanOrEqual(5);
  });
});

describe("Error Handling", () => {
  it("should return 404 for unknown API endpoint", async () => {
    const response = await request(app).get("/api/unknown-endpoint");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty("error");
  });

  it("should handle validation errors", async () => {
    const invalidProgress = {
      courseId: "course-01",
      progressPercentage: 150, // Invalid: over 100
    };

    const response = await request(app)
      .post("/api/users/test-user/progress")
      .send(invalidProgress);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
