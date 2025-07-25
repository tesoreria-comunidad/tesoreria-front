import type { TApiCuota } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
export class CuotaServices {
  static async getAll(): Promise<TApiCuota[]> {
    const res = await axiosInstance.get(`${BASE_URL}/cuota`);
    return res.data;
  }
  static async create() {}
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
