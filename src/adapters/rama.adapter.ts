import { type TRama } from "@/models";
import type { TApiRama } from "./api_models";

export function ramaAdapter(apiRama: TApiRama): TRama {
  const { createdAt, id, name, updatedAt, users } = apiRama;
  return { createdAt, id, name, updatedAt, users };
}
