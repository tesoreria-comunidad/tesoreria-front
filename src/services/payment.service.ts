import type { TApiPayment } from "@/adapters/api_models";
import { axiosInstance, BASE_URL } from "@/config/axios.config";
export class PaymentServices {
  static async getAll(): Promise<TApiPayment[]> {
    const res = await axiosInstance.get(`${BASE_URL}/payments`);
    return res.data;
  }
  static async create() {}
  static async getById() {}
  static async edit() {}
  static async delete() {}
}
