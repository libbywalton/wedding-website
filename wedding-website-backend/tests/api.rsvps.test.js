const request = require("supertest");

// Mock the DB pool used in routes/api.js
jest.mock("../config/database", () => {
  return {
    query: jest.fn(async (sql, params) => {
      if (/INSERT INTO guests/i.test(sql)) {
        return {
          rows: [
            {
              id: 1,
              name: params[0],
              rsvp_status: params[1],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
        };
      }
      if (/SELECT \* FROM guests/i.test(sql)) {
        return {
          rows: [
            {
              id: 1,
              name: "Test User",
              rsvp_status: "attending",
              email: null,
              phone: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ],
        };
      }
      return { rows: [] };
    }),
  };
});

const app = require("../app");

describe("API /api/rsvps", () => {
  it("creates RSVP with valid payload", async () => {
    const res = await request(app)
      .post("/api/rsvps")
      .send({ name: "Alice", attending: "yes" })
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      name: "Alice",
      rsvp_status: "attending",
    });
  });

  it("returns 400 for invalid payload (missing name)", async () => {
    const res = await request(app)
      .post("/api/rsvps")
      .send({ attending: "no" })
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it("lists RSVPs", async () => {
    const res = await request(app).get("/api/rsvps");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("name");
  });
});
