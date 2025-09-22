import client from "../api/client.js";

export async function loginRequest(credentials) {
  const { data } = await client.post("auth/login/", credentials);
  return data;
}

export async function signupRequest(payload) {
  const { data } = await client.post("auth/signup/", payload);
  return data;
}

export async function getProfile(token) {
  const { data } = await client.get("auth/me/", {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
  return data;
}

export async function refreshTokenRequest(refreshToken) {
  const { data } = await client.post("token/refresh/", { refresh: refreshToken });
  return data;
}

export async function logoutRequest() {
  return Promise.resolve();
}
