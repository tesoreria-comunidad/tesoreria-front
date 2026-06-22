import { setAuthInterceptor } from "@/config/axios.config";
import {
  PaymentReceiptService,
  type TPaymentReceipt,
} from "@/services/payment-receipt.service";
import { useQuery } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchPaymentReceiptByTransaction = async (
  transactionId: string
): Promise<TPaymentReceipt | null> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return PaymentReceiptService.getByTransactionId(transactionId);
};

/* ============================
 * Queries
 * ============================ */

export function usePaymentReceiptByTransaction(transactionId: string) {
  return useQuery({
    queryKey: ["payment-receipt", transactionId],
    queryFn: () => fetchPaymentReceiptByTransaction(transactionId),
    enabled: !!transactionId,
  });
}
