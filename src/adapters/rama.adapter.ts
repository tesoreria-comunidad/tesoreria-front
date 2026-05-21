import { type TRama } from "@/models";
import type { TApiRama } from "./api_models";

export function ramaAdapter(apiRama: TApiRama): TRama {
  const { createdAt, id, name, updatedAt, grupo, orden, edad_min, edad_max, users } = apiRama;
  return { createdAt, id, name, updatedAt, grupo, orden, edad_min, edad_max, users };
}
