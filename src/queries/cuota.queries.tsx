import { cuotaAdapter } from "@/adapters";
import type { TCreateCuota } from "@/models";
import { CuotaServices } from "@/services/cuota.service";
import { addCuota, setCuotas } from "@/store/features/cuota/cuotaSlice";
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
  const createCuota = async (body: TCreateCuota) => {
    try {
      const apiCuotaRes = await CuotaServices.create(body);

      dispatch(addCuota(apiCuotaRes));
    } catch (error) {
      console.log("error fetchin families", error);
      throw error;
    }
  };

  return { fetchCuotas, createCuota };
}
