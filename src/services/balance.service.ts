import type { TApiBalance } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";

export class BalanceServices {
  static async getAll(): Promise<TApiBalance[]> {
    const res = await axiosInstance.get(`${BASE_URL}/balance`);
    return res.data;
  }
  static async create() {}
  static async getById(id: string): Promise<TApiBalance> {
    const res = await axiosInstance.get(`${BASE_URL}/balance/${id}`);
    return res.data;
  }
  static async edit() {}
  static async delete() {}
}
