import type { TApiFolder } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
export class FolderServices {
  static async getAll(): Promise<TApiFolder[]> {
    const res = await axiosInstance.get(`${BASE_URL}/folder`);
    return res.data;
  }
  static async create() {}
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
