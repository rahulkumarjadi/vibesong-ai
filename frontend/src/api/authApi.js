import api from "./axios";

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  loginWithGoogle: (idToken) => api.post("/auth/google", { id_token: idToken }),
  refresh: (refreshToken) => api.post("/auth/refresh", { refresh_token: refreshToken }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, newPassword) =>
    api.post("/auth/reset-password", { token, new_password: newPassword }),
  me: () => api.get("/auth/me"),
};
