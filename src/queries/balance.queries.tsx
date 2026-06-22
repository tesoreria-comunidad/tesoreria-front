import { balanceAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TBalance, TBalanceHistory } from "@/models";
import type { TBalanceHistoryParams } from "@/adapters/api_models/balance-history.schema";
import { BalanceServices } from "@/services/balance.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ============================
 * Fetchers
 * ============================ */

export const fetchBalances = async () => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiBalancesResponse = await BalanceServices.getAll();
  return apiBalancesResponse.map((apiBalance) => balanceAdapter(apiBalance));
};
export const fetchBalanceById = async (id: string) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiBalance = await BalanceServices.getById(id);
  return balanceAdapter(apiBalance);
};
export const updateBalance = async (id: string, body: Partial<TBalance>) => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  const apiBalance = await BalanceServices.edit(id, body);
  return balanceAdapter(apiBalance);
};

/* ============================
 * Queries
 * ============================ */
export function useBalancesQuery() {
  return useQuery({
    queryKey: ["balances"],
    queryFn: fetchBalances,
  });
}

export function useBalanceByIdQuery(
  balanceId: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["balances", balanceId],
    queryFn: () => fetchBalanceById(balanceId),
    enabled: !!balanceId && enabled, // evita ejecutar si no hay id o si ya se dispone del balance embebido
  });
}

/* ============================
 * Balance History
 * ============================ */

export const fetchBalanceHistory = async (
  balanceId: string,
  params?: TBalanceHistoryParams,
): Promise<TBalanceHistory[]> => {
  await setAuthInterceptor(localStorage.getItem("accessToken"));
  return await BalanceServices.getHistory(balanceId, params);
};

export function useBalanceHistoryQuery(
  balanceId: string,
  params?: TBalanceHistoryParams,
) {
  return useQuery({
    queryKey: ["balance_history", balanceId, params],
    queryFn: () => fetchBalanceHistory(balanceId, params),
    enabled: !!balanceId,
  });
}

/* ============================
 * Mutations
 * ============================ */

export function useUpdateBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<TBalance> }) =>
      updateBalance(id, body),
    onSuccess: (updatedBalance) => {
      queryClient.invalidateQueries({ queryKey: ["balances"] });
      queryClient.invalidateQueries({ queryKey: ["balance_history"] });
      queryClient.invalidateQueries({
        queryKey: ["balance_history", updatedBalance.id],
      });
    },
  });
}
