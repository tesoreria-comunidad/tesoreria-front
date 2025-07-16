import { type TCuota } from "@/models";
import type { TApiCuota } from "./api_models";

export function cuotaAdapter(apiCuota: TApiCuota): TCuota {
  const { cfa_amount, createdAt, cuota_amount, id, updatedAt } = apiCuota;
  return {
    cfa_amount,
    createdAt,
    cuota_amount,
    id,
    updatedAt,
  };
}
