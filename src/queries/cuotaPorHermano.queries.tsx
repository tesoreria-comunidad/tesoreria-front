import type {
  TCreateCuotaPorHermano,
  TCuotaPorHemanos,
} from "@/models/cuotaPorHermanos.schema";
import { CuotaPorHermanoServices } from "@/services/cuotaPorHermano.service";
import {
  addCuotaPorHermano,
  setCuotaPorHemanoss,
  updateCuotaPorHermano,
} from "@/store/features/cuotaPorHemano/cuotaPorHermanoSlice";

import { useAppDispatch } from "@/store/hooks";
export function useCuotaPorHermanosQueries() {
  const dispatch = useAppDispatch();

  const fetchCPH = async () => {
    try {
      const res = await CuotaPorHermanoServices.getAll();

      dispatch(setCuotaPorHemanoss(res));
    } catch (error) {
      console.log("error fetchin CPH", error);
      throw error;
    }
  };

  const createCPH = async (
    body: TCreateCuotaPorHermano
  ): Promise<TCuotaPorHemanos> => {
    try {
      const res = await CuotaPorHermanoServices.create(body);
      dispatch(addCuotaPorHermano(res));

      return res;
    } catch (error) {
      console.log("Error creating CPH", error);
      throw error;
    }
  };
  const editCPH = async (id: string, body: Partial<TCuotaPorHemanos>) => {
    try {
      await CuotaPorHermanoServices.edit(id, body);
      dispatch(updateCuotaPorHermano({ id, changes: body }));
    } catch (error) {
      console.log("Error updating CPH", error);
      throw error;
    }
  };
  return { fetchCPH, createCPH, editCPH };
}
