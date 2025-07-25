import type { TApiFamily } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
export class FamilyServices {
  static async getAll(): Promise<TApiFamily[]> {
    const res = await axiosInstance.get(`${BASE_URL}/family`);
    return res.data;
  }
  static async create() {}
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
