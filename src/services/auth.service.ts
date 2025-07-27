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

  static async me() {
    const res = await axiosInstance.post(`${BASE_URL}/auth/me`);
    return res.data;
  }
}
