// src/utils/auth.js

// Save token + minimal user info in localStorage
export const saveAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
  localStorage.setItem("approved", user.approved ? "true" : "false");
};

// Getters
export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const isApproved = () => localStorage.getItem("approved") === "true";

// Clear auth data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("approved");
};
