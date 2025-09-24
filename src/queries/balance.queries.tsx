import { balanceAdapter } from "@/adapters";
import { setAuthInterceptor } from "@/config/axios.config";
import type { TBalance } from "@/models";
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

export function useBalanceByIdQuery(balanceId: string) {
  return useQuery({
    queryKey: ["balances", balanceId],
    queryFn: () => fetchBalanceById(balanceId),
    enabled: !!balanceId, // evita ejecutar si balanceId es null/undefined
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balances"] });
    },
  });
}
