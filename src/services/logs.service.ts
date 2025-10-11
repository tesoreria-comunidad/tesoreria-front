import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TLog } from "@/models/logs.schema";
export class LogsService {
  static async getAll(): Promise<TLog[]> {
    const res = await axiosInstance.get(`${BASE_URL}/action-logs`);
    return res.data;
  }
}
