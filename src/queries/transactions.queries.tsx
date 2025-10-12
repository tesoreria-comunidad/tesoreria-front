import type { TMonthlyStat } from "@/adapters/api_models/transaction.schema";
import { transactionAdapter } from "@/adapters/transaction.adapter";
import { setAuthInterceptor } from "@/config/axios.config";
import type {
  TCreateTransaction,
  TTransaction,
} from "@/models/transaction.schema";
import { TransactionService } from "@/services/transaction.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers (API + adapter)
 * ============================ */

export const fetchTransactions = async (): Promise<TTransaction[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await TransactionService.getAll();
  return apiRes.map((apiData) => transactionAdapter(apiData));
};
export const fetchTransactionsCategories = async (): Promise<string[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await TransactionService.getCategories();
};

export const fetchTransactionsStats = async (): Promise<TMonthlyStat[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await TransactionService.getStatsMonthly();
  return apiRes;
};

export const fetchFamilyTransactions = async (
  familyId: string
): Promise<TTransaction[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiRes = await TransactionService.getFamilyTransactions(familyId);
  return apiRes.map((apiData) => transactionAdapter(apiData));
};

export const createTransaction = async (
  body: TCreateTransaction
): Promise<TTransaction> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const newTransaction = await TransactionService.create(body);
  return transactionAdapter(newTransaction);
};

export const createTransactionCuotaFamily = async (
  body: TCreateTransaction
): Promise<TTransaction> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const newTransaction = await TransactionService.familyCuota(body);
  return transactionAdapter(newTransaction);
};

export const editTransction = async (
  id: string,
  body: Partial<TTransaction>
) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const editedTransaction = await TransactionService.edit(id, body);
  return transactionAdapter(editedTransaction);
};
/* ============================
 * Queries
 * ============================ */

export function useTransactionsQuery() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
}

export function useTransactionsStatsQuery() {
  return useQuery({
    queryKey: ["transactions_stats"],
    queryFn: fetchTransactionsStats,
  });
}
export function useTransactionsCategoriesQuery() {
  return useQuery({
    queryKey: ["transactions_categories"],
    queryFn: fetchTransactionsCategories,
  });
}

export function useTransactionsByFamilyIdQuery(familyId: string) {
  return useQuery({
    queryKey: ["transactions", familyId],
    queryFn: () => fetchFamilyTransactions(familyId),
    enabled: !!familyId, // evita ejecutar si familyId es null/undefined
  });
}

/* ============================
 * Mutations
 * ============================ */

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions_stats"] });
    },
  });
}

export function useCreateTransactionCuotaFamilyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransactionCuotaFamily,
    onSuccess: (_, variables) => {
      if ((variables as any).familyId) {
        queryClient.invalidateQueries({
          queryKey: ["transactions", (variables as any).familyId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["transactions_stats"] });
    },
  });
}

export function useEditTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TTransaction> }) =>
      editTransction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions_stats"] });
    },
  });
}
