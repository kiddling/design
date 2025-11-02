import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server/index";

describe("Server routes", () => {
  describe("Courses", () => {
    it("returns course outline", async () => {
      const response = await request(app).get("/api/courses");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("returns course detail", async () => {
      const response = await request(app).get("/api/courses/1");
      expect(response.status).toBe(200);
      expect(response.body.id).toBe("1");
    });

    it("handles missing course", async () => {
      const response = await request(app).get("/api/courses/unknown");
      expect(response.status).toBe(404);
    });
  });

  describe("Knowledge cards", () => {
    it("returns knowledge cards", async () => {
      const response = await request(app).get("/api/knowledge");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("Case studies", () => {
    it("returns all cases", async () => {
      const response = await request(app).get("/api/cases");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("filters by discipline", async () => {
      const response = await request(app).get("/api/cases?discipline=Branding");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("filters by search", async () => {
      const response = await request(app).get("/api/cases?search=抽象");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("Prompts", () => {
    it("returns prompt templates", async () => {
      const response = await request(app).get("/api/prompts");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("Assignments", () => {
    it("accepts valid submission", async () => {
      const response = await request(app)
        .post("/api/assignments")
        .send({
          name: "Alice",
          email: "alice@example.com",
          projectUrl: "https://example.com",
          notes: "Test notes",
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBeTruthy();
    });

    it("rejects invalid email", async () => {
      const response = await request(app)
        .post("/api/assignments")
        .send({
          name: "Alice",
          email: "invalid",
          projectUrl: "https://example.com",
        });

      expect(response.status).toBe(400);
    });

    it("rejects invalid URL", async () => {
      const response = await request(app)
        .post("/api/assignments")
        .send({
          name: "Alice",
          email: "alice@example.com",
          projectUrl: "not-a-url",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("Analytics", () => {
    it("accepts web vitals", async () => {
      const response = await request(app)
        .post("/api/analytics/vitals")
        .send({ name: "LCP", value: 1500 });

      expect(response.status).toBe(200);
    });

    it("accepts page views", async () => {
      const response = await request(app)
        .post("/api/analytics/pageview")
        .send({ path: "/courses", timestamp: Date.now() });

      expect(response.status).toBe(200);
    });
  });
});
