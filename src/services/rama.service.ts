import type { TApiRama } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateRama } from "@/models";

export class RamaService {
  static async getAllRamas(): Promise<TApiRama[]> {
    const res = await axiosInstance.get(`${BASE_URL}/rama`);
    return res.data;
  }

  static async createRama(body: TCreateRama): Promise<TApiRama> {
    const res = await axiosInstance.post(`${BASE_URL}/rama`, body);
    return res.data;
  }
}
