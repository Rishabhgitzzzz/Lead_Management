import type { User } from "../types";
import api from "./axios";

interface LoginResponse {
  token: string;
  user: User;
}

export async function loginApi(email: string, password: string) {
  const res = await api.post<{ success: boolean; data: LoginResponse }>(
    "/auth/signin",
    { email, password },
  );
  return res.data.data;
}

export async function registerApi(
  name: string,
  email: string,
  password: string,
  role = "sales",
) {
  const res = await api.post<{ success: boolean; data: User }>("/auth/signup", {
    name,
    email,
    password,
    role,
  });
  return res.data.data;
}
