import { type TCuota } from "@/models";
import type { TApiCuota } from "./api_models";

export function cuotaAdapter(apiCuota: TApiCuota): TCuota {
  return { ...apiCuota };
}
