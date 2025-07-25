import type { TApiUser } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateUser } from "@/models";
export class UserServices {
  static async getAll(): Promise<TApiUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);
    return res.data;
  }
  static async create(body: TCreateUser): Promise<TApiUser> {
    const res = await axiosInstance.post(`${BASE_URL}/user`, body);
    return res.data;
  }
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
