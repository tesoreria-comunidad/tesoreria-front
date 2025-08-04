import type { TApiTransaction } from "./api_models/transaction.schema";
import type { TTransaction } from "@/models/transaction.schema";

export function transactionAdapter(
  apiTransaction: TApiTransaction
): TTransaction {
  return {
    ...apiTransaction,
  };
}
