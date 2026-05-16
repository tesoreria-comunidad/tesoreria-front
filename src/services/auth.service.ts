import type { TApiUser } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { ILoginResponse } from "@/interface/login-response.interface";
import type { TCreateUser } from "@/models";

export class AuthServices {
  static async login(body: {
    username: string;
    password: string;
  }): Promise<ILoginResponse> {
    const res = await axiosInstance.post(`${BASE_URL}/auth/login`, body);
    return res.data;
  }

  static async register(body: Omit<TCreateUser, "confirmPassword">) {
    const res = await axiosInstance.post(`${BASE_URL}/auth/register`, body);
    return res.data;
  }

  static async me(): Promise<TApiUser> {
    const res = await axiosInstance.post(`${BASE_URL}/auth/me`);
    return res.data;
  }

  static async forgotPassword(body: { email: string }): Promise<void> {
    await axiosInstance.post(`${BASE_URL}/auth/forgot-password`, body);
  }

  static async resetPassword(body: {
    token: string;
    newPassword: string;
  }): Promise<void> {
    await axiosInstance.post(`${BASE_URL}/auth/reset-password`, body);
  }

  static async validateResetToken(token: string): Promise<{ valid: boolean }> {
    const res = await axiosInstance.get(
      `${BASE_URL}/auth/reset-password/validate?token=${encodeURIComponent(token)}`
    );
    return res.data;
  }
}
