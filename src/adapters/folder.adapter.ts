import { type TFolder } from "@/models";
import type { TApiFolder } from "./api_models";

export function folderAdapter(apiFolder: TApiFolder): TFolder {
  const { createdAt, id, id_user, updatedAt, foto, historia_clinica } =
    apiFolder;
  return { createdAt, id, id_user, updatedAt, foto, historia_clinica };
}
