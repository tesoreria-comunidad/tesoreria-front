import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { THealthAlert } from "@/models";

export class HealthCheckService {
  static async get(): Promise<THealthAlert[]> {
    const res = await axiosInstance.get(`${BASE_URL}/monitoring/health-check`);
    return res.data;
  }
}
