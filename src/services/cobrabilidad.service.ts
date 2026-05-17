import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCobrabilidad, TCobrabilidadResumen } from "@/types/cobrabilidad";

export class CobrabilidadServices {
  static async get(month: string, year: string): Promise<TCobrabilidad[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/stats/cobrabilidad?month=${month}&year=${year}`
    );
    return res.data;
  }

  static async getResumen(
    month: number,
    year: number
  ): Promise<TCobrabilidadResumen> {
    const res = await axiosInstance.get(
      `${BASE_URL}/stats/cobrabilidad/resumen?month=${month}&year=${year}`
    );
    return res.data;
  }
}
