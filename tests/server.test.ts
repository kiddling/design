import request from "supertest";
import app from "../server/index";

describe("Server routes", () => {
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
