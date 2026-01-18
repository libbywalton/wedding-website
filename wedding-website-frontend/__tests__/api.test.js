import { weddingApi } from "../src/app/utils/api";

describe("ApiClient", () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ success: true, data: { id: 1 } }),
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("submits RSVP via POST /api/rsvps", async () => {
    const payload = { name: "Alice", attending: "yes" };
    const res = await weddingApi.submitRsvp(payload);
    expect(res.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe("/api/rsvps");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(options.body)).toEqual(payload);
  });

  it("fetches RSVPs via GET /api/rsvps", async () => {
    const res = await weddingApi.getRsvps();
    expect(res.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe("/api/rsvps");
    expect(options.method).toBe("GET");
  });
});
