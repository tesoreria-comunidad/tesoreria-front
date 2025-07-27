import { cuotaAdapter } from "@/adapters";
import { CuotaServices } from "@/services/cuota.service";
import { setCuotas } from "@/store/features/cuota/cuotaSlice";
import { useAppDispatch } from "@/store/hooks";
export function useCuotaQueries() {
  const dispatch = useAppDispatch();

  const fetchCuotas = async () => {
    try {
      const apiCuotasResponse = await CuotaServices.getAll();
      const adaptedCuotas = apiCuotasResponse.map((apiCuota) =>
        cuotaAdapter(apiCuota)
      );
      dispatch(setCuotas(adaptedCuotas));
    } catch (error) {
      console.log("error fetchin families", error);
      throw error;
    }
  };

  return { fetchCuotas };
}
