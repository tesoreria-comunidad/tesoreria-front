import type { TApiFamily } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateFamily, TFamily } from "@/models";
export class FamilyServices {
  static async getAll(): Promise<TApiFamily[]> {
    const res = await axiosInstance.get(`${BASE_URL}/family`);
    return res.data;
  }
  static async create(body: TCreateFamily): Promise<TApiFamily> {
    const res = await axiosInstance.post(`${BASE_URL}/family`, body);
    return res.data;
  }
  static async getById(id: string) {
    const res = await axiosInstance.get(`${BASE_URL}/family/${id}`);
    return res.data;
  }
  static async edit(id: string, body: Partial<TFamily>) {
    const res = await axiosInstance.patch(`${BASE_URL}/family/${id}`, body);
    return res.data;
  }
  static async delete() {}
}
