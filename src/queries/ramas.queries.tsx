import { ramaAdapter } from "@/adapters";
import type { TCreateRama } from "@/models";
import { RamaServices } from "@/services/rama.service";
import { addRama, setRamas } from "@/store/features/ramas/rama-slice";
import { useAppDispatch } from "@/store/hooks";

export function useRamasQueries() {
  const dispatch = useAppDispatch();
  const fetchRamas = async () => {
    try {
      const apiRamasResponse = await RamaServices.getAllRamas();
      const adaptedRamas = apiRamasResponse.map((rama) => ramaAdapter(rama));
      dispatch(setRamas(adaptedRamas));
    } catch (error) {
      console.log("error fetchin ramas", error);
      throw error;
    }
  };
  const createRama = async (body: TCreateRama) => {
    try {
      const apiRamasResponse = await RamaServices.createRama(body);
      const newRama = ramaAdapter(apiRamasResponse);
      dispatch(addRama(newRama));
    } catch (error) {
      console.log("error fetchin ramas", error);
      throw error;
    }
  };

  return { fetchRamas, createRama };
}
