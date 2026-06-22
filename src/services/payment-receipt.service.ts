import { axiosInstance, BASE_URL } from "@/config/axios.config";

export interface TPaymentReceipt {
  id: string;
  id_transaction: string;
  id_family: string;
  receipt_number: string;
  pdf_url: string | null;
  sent_to_email: string | null;
  sent_at: string | null;
  createdAt: string;
}

export class PaymentReceiptService {
  static async getByTransactionId(
    transactionId: string
  ): Promise<TPaymentReceipt | null> {
    const res = await axiosInstance.get(
      `${BASE_URL}/payment-receipts/by-transaction/${transactionId}`
    );
    return res.data ?? null;
  }
}
