import { familyAdapter } from "@/adapters";
import type { TCreateFamily, TFamily } from "@/models";
import { FamilyServices } from "@/services/family.service";
import {
  addFamily,
  setFamilies,
  updateFamily,
} from "@/store/features/family/familySlice";
import { useAppDispatch } from "@/store/hooks";
export function useFamilyQueries() {
  const dispatch = useAppDispatch();

  const fetchFamilies = async () => {
    try {
      const apiFamiliesResponse = await FamilyServices.getAll();
      const adaptedFamilies = apiFamiliesResponse.map((apiFamily) =>
        familyAdapter(apiFamily)
      );
      dispatch(setFamilies(adaptedFamilies));
    } catch (error) {
      console.log("error fetchin families", error);
      throw error;
    }
  };

  const createFamily = async (body: TCreateFamily): Promise<TFamily> => {
    try {
      const apiFamily = await FamilyServices.create(body);
      const adaptedFamily = familyAdapter(apiFamily);
      dispatch(addFamily(adaptedFamily));

      return adaptedFamily;
    } catch (error) {
      console.log("Error creating family", error);
      throw error;
    }
  };
  const editFamily = async (id: string, body: Partial<TFamily>) => {
    try {
      await FamilyServices.edit(id, body);
      dispatch(updateFamily({ id, changes: body }));
    } catch (error) {
      console.log("Error updating family", error);
      throw error;
    }
  };
  return { fetchFamilies, createFamily, editFamily };
}
