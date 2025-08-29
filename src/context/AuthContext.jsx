import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (accessToken, userData) => {
    localStorage.setItem("token", accessToken);
    setUser(userData);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosInstance
        .get("user/me", { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
