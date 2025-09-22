import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }
  const raw = window.localStorage.getItem("geeta_cms_auth");
  if (raw) {
    try {
      const { access } = JSON.parse(raw);
      if (access) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${access}`;
      }
    } catch (error) {
      console.warn("Unable to parse auth token", error);
    }
  }
  return config;
});

export default client;
