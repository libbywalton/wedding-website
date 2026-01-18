const API_BASE_URL = "/api";

const ApiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  async get(endpoint) {
    return ApiClient.request(endpoint, { method: "GET" });
  },

  async post(endpoint, data) {
    return ApiClient.request(endpoint, {
      method: "POST",
      body: data,
    });
  },

  async put(endpoint, data) {
    return ApiClient.request(endpoint, {
      method: "PUT",
      body: data,
    });
  },

  async delete(endpoint) {
    return ApiClient.request(endpoint, { method: "DELETE" });
  },
};

export const weddingApi = {
  // RSVP functions
  submitRsvp: (rsvpData) => ApiClient.post("/rsvps", rsvpData),
  getRsvps: () => ApiClient.get("/rsvps"),
};

export default ApiClient;
