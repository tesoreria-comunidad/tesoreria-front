import { type TFamily } from "@/models";
import type { TApiFamily } from "./api_models";

export function familyAdapter(apiFamily: TApiFamily): TFamily {
  const { createdAt, id, name, persons, phone, updatedAt, id_balance } =
    apiFamily;
  return { createdAt, id, name, persons, phone, updatedAt, id_balance };
}
