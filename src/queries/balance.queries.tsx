import { balanceAdapter } from "@/adapters";
import { BalanceServices } from "@/services/balance.service";
import { setBalances } from "@/store/features/balance/balanceSlice";
import { useAppDispatch } from "@/store/hooks";
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
