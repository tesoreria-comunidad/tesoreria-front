import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { ILoginRes } from "@/interface/login-response.interface";

export class AuthServices {
  static async login(body: {
    username: string;
    password: string;
  }): Promise<ILoginRes> {
    const res = await axiosInstance.post(`${BASE_URL}/auth/login`, body);
    return res.data;
  }

  static async me() {
    const res = await axiosInstance.post(`${BASE_URL}/auth/me`);
    return res.data;
  }
}
