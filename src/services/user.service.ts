import type { TApiUser } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
export class UserServices {
  static async getAll(): Promise<TApiUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);
    return res.data;
  }
  static async create() {}
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
