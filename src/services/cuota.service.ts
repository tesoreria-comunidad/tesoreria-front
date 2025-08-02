import type { TApiCuota } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateCuota } from "@/models";
export class CuotaServices {
  static async getAll(): Promise<TApiCuota[]> {
    const res = await axiosInstance.get(`${BASE_URL}/cuota`);
    return res.data;
  }
  static async create(body: TCreateCuota): Promise<TApiCuota> {
    const res = await axiosInstance.post(`${BASE_URL}/cuota`, body);
    return res.data;
  }
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
