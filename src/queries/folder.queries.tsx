import { folderAdapter } from "@/adapters";
import { FolderServices } from "@/services/folder.service";
import { setFolders } from "@/store/features/folder/folderSlice";
import { useAppDispatch } from "@/store/hooks";
export function useFolderQueries() {
  const dispatch = useAppDispatch();

  const fetchFolders = async () => {
    try {
      const apiFolderResponse = await FolderServices.getAll();
      const adaptedFolders = apiFolderResponse.map((apiFolder) =>
        folderAdapter(apiFolder)
      );
      dispatch(setFolders(adaptedFolders));
    } catch (error) {
      console.log("Error fetching folders", error);
      throw error;
    }
  };

  return { fetchFolders };
}
