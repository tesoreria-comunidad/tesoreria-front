import { balanceAdapter } from "@/adapters";
import type { TBalance } from "@/models";
import { BalanceServices } from "@/services/balance.service";
import { setBalances } from "@/store/features/balance/balanceSlice";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export function useBalanceQueries() {
  const dispatch = useAppDispatch();

  const fetchBalances = async () => {
    try {
      const apiBalancesResponse = await BalanceServices.getAll();
      const adapatedBalances = apiBalancesResponse.map((apiBalance) =>
        balanceAdapter(apiBalance)
      );
      dispatch(setBalances(adapatedBalances));
    } catch (error) {
      console.log("error fetchin balances", error);
      throw error;
    }
  };

  return { fetchBalances };
}

/* ============================
 * Fetchers
 * ============================ */

export const fetchBalances = async () => {
  const apiBalancesResponse = await BalanceServices.getAll();
  return apiBalancesResponse.map((apiBalance) => balanceAdapter(apiBalance));
};
export const fetchBalanceById = async (id: string) => {
  const apiBalance = await BalanceServices.getById(id);
  return balanceAdapter(apiBalance);
};
export const updateBalance = async (id: string, body: Partial<TBalance>) => {
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
