export const saveAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
};

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
