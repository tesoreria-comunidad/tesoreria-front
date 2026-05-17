import type { TApiBalance } from "@/adapters/api_models";
import type {
  TApiBalanceHistory,
  TBalanceHistoryParams,
} from "@/adapters/api_models/balance-history.schema";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TBalance } from "@/models";

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
  static async getByFamilyId(id: string): Promise<TApiBalance> {
    const res = await axiosInstance.get(`${BASE_URL}/balance/${id}`);
    return res.data;
  }
  static async updateFamilyBalance(id: string) {
    const res = await axiosInstance.post(
      `${BASE_URL}/balance/update-family/${id}`
    );
    return res.data;
  }
  static async edit(id: string, body: Partial<TBalance>) {
    const res = await axiosInstance.patch(`${BASE_URL}/balance/${id}`, body);
    return res.data;
  }
  static async getHistory(
    balanceId: string,
    params?: TBalanceHistoryParams
  ): Promise<TApiBalanceHistory[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/balance/${balanceId}/history`,
      { params }
    );
    return res.data;
  }
  static async delete() {}
  static async updateAllBalances() {
    const res = await axiosInstance.post(`${BASE_URL}/balance/update-all`);
    return res.data;
  }
  static async resetAll() {
    const res = await axiosInstance.post(`${BASE_URL}/balance/reset-all`);
    return res.data;
  }
}
