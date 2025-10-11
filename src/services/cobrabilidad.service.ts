import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCobrabilidad } from "@/types/cobrabilidad";

export class CobrabilidadServices {
  static async get(month: string, year: string): Promise<TCobrabilidad[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/stats/cobrabilidad?month=${month}&year=${year}`
    );
    return res.data;
  }
}
