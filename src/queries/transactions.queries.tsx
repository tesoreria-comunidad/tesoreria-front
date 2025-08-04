import { transactionAdapter } from "@/adapters/transaction.adapter";
import type { TCreateTransaction } from "@/models/transaction.schema";
import { TransactionService } from "@/services/transaction.service";
import {
  addTransaction,
  setTransactions,
} from "@/store/features/transactions/transactionsSlice";
import { useAppDispatch } from "@/store/hooks";
export function useTransactionsQueries() {
  const dispatch = useAppDispatch();

  const fetchTransactions = async () => {
    try {
      const apiRes = await TransactionService.getAll();
      const adatpedTransactions = apiRes.map((apiData) =>
        transactionAdapter(apiData)
      );
      dispatch(setTransactions(adatpedTransactions));
    } catch (error) {
      console.log("Error fetching transactions", error);
      throw error;
    }
  };

  const createTransaction = async (body: TCreateTransaction) => {
    try {
      const newTransaction = await TransactionService.create(body);
      const adaptedNewTransaction = transactionAdapter(newTransaction);
      dispatch(addTransaction(adaptedNewTransaction));
    } catch (error) {
      console.log("Error creating new transaction", error);
      throw error;
    }
  };
  return { fetchTransactions, createTransaction };
}
