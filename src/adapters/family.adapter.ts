import { type TFamily } from "@/models";
import type { TApiFamily } from "./api_models";

export function familyAdapter(apiFamily: TApiFamily): TFamily {
  return { ...apiFamily };
}
