import type { TApiFamily } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TFamily } from "@/models";
export class FamilyServices {
  static async getAll(): Promise<TApiFamily[]> {
    const res = await axiosInstance.get(`${BASE_URL}/family`);
    return res.data;
  }
  static async create(
    body: Omit<TFamily, "id" | "createdAt" | "updatedAt" | "id_balance">
  ): Promise<TApiFamily> {
    const res = await axiosInstance.post(`${BASE_URL}/family`, body);
    return res.data;
  }
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
