import type { TApiTransaction } from "@/adapters/api_models/transaction.schema";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
import type { TCreateTransaction } from "@/models/transaction.schema";

export class TransactionService {
  static async getAll(): Promise<TApiTransaction[]> {
    const res = await axiosInstance.get(`${BASE_URL}/transactions`);
    return res.data;
  }

  static async create(body: TCreateTransaction): Promise<TApiTransaction> {
    const res = await axiosInstance.post(`${BASE_URL}/transactions`, body);
    return res.data;
  }
}
