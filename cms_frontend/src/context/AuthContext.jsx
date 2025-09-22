import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getProfile, loginRequest, logoutRequest, refreshTokenRequest, signupRequest } from "../services/auth.js";

const AuthContext = createContext(null);

const storageKey = "geeta_cms_auth";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to parse auth storage", error);
    }
    return { access: null, refresh: null, user: null };
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authState.access) {
      localStorage.setItem(storageKey, JSON.stringify(authState));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [authState]);

  useEffect(() => {
    if (!authState.access || authState.user) {
      return;
    }
    setLoading(true);
    getProfile(authState.access)
      .then((profile) => setAuthState((prev) => ({ ...prev, user: profile })))
      .catch(() => setAuthState({ access: null, refresh: null, user: null }))
      .finally(() => setLoading(false));
  }, [authState.access, authState.user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const data = await loginRequest(credentials);
      setAuthState({ access: data.access, refresh: data.refresh, user: data.user });
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (payload) => {
    setLoading(true);
    try {
      const data = await signupRequest(payload);
      setAuthState({ access: data.access, refresh: data.refresh, user: data.user });
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (authState.refresh) {
        await logoutRequest(authState.refresh);
      }
    } catch (error) {
      console.error("Failed to log out", error);
    } finally {
      setAuthState({ access: null, refresh: null, user: null });
    }
  }, [authState.refresh]);

  const value = useMemo(
    () => ({
      ...authState,
      isAuthenticated: Boolean(authState.access),
      isAdmin: authState.user?.is_staff || false,
      loading,
      login,
      signup,
      logout,
      setAuthState,
      refreshToken: refreshTokenRequest,
    }),
    [authState, loading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
