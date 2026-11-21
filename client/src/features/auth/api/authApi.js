import axios from "axios";

const client = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

const payload = (response) => response.data.data;

export const authApi = {
  async login(credentials) {
    return payload(await client.post("/auth/login", credentials));
  },
  async register(details) {
    return payload(await client.post("/auth/register", details));
  },
  async refresh() {
    return payload(await client.post("/auth/refresh"));
  },
  async logout() {
    return payload(await client.post("/auth/logout"));
  },
  async me(accessToken) {
    return payload(await client.get("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    }));
  }
};

export function getAuthError(error) {
  return error.response?.data?.message ?? "Something went wrong. Please try again.";
}
