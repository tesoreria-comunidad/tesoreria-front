import type {
  TApiTransaction,
  TMonthlyStat,
} from "@/adapters/api_models/transaction.schema";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type {
  TCreateTransaction,
  TTransaction,
} from "@/models/transaction.schema";

export class TransactionService {
  static async getAll(): Promise<TApiTransaction[]> {
    const res = await axiosInstance.get(`${BASE_URL}/transactions`);
    return res.data;
  }
  static async getById(id: string): Promise<TApiTransaction> {
    const res = await axiosInstance.get(`${BASE_URL}/transactions/${id}`);
    return res.data;
  }
  static async getCategories(): Promise<string[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/transactions/categroy-list`
    );
    return res.data;
  }
  static async getFamilyTransactions(
    familyId: string
  ): Promise<TApiTransaction[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/transactions/by-family/${familyId}`
    );
    return res.data;
  }
  static async getStatsMonthly(): Promise<TMonthlyStat[]> {
    const res = await axiosInstance.get(
      `${BASE_URL}/transactions/stats/monthly`
    );
    return res.data;
  }

  static async create(body: TCreateTransaction): Promise<TApiTransaction> {
    const res = await axiosInstance.post(`${BASE_URL}/transactions`, body);
    return res.data;
  }

  static async edit(
    id: string,
    body: Partial<TTransaction>
  ): Promise<TApiTransaction> {
    const res = await axiosInstance.patch(
      `${BASE_URL}/transactions/${id}`,
      body
    );
    return res.data;
  }
  static async familyCuota(body: TCreateTransaction): Promise<TApiTransaction> {
    const res = await axiosInstance.post(
      `${BASE_URL}/transactions/family-cuota`,
      body
    );
    return res.data;
  }
}
