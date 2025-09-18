import { axiosInstance, BASE_URL } from "@/config/axios.config";

import type {
  TCreateCuotaPorHermano,
  TCuotaPorHemanos,
} from "@/models/cuotaPorHermanos.schema";

const baseUrl = `${BASE_URL}/cuota-por-hermanos`;
export class CuotaPorHermanoServices {
  static async getAll(): Promise<TCuotaPorHemanos[]> {
    const res = await axiosInstance.get(`${baseUrl}`);
    return res.data;
  }
  static async create(body: TCreateCuotaPorHermano): Promise<TCuotaPorHemanos> {
    const res = await axiosInstance.post(`${baseUrl}`, body);
    return res.data;
  }
  static async getById(id: string): Promise<TCuotaPorHemanos> {
    const res = await axiosInstance.get(`${baseUrl}/${id}`);
    return res.data;
  }
  static async edit(id: string, body: Partial<TCuotaPorHemanos>) {
    const res = await axiosInstance.patch(`${baseUrl}/${id}`, body);
    return res.data;
  }
  static async delete() {}
}
