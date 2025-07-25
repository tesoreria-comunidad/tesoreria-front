import { familyAdapter } from "@/adapters";
import { FamilyServices } from "@/services/family.service";
import { setFamilies } from "@/store/features/family/familySlice";
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
  return { fetchFamilies };
}
