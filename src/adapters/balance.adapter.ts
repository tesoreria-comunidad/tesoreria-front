import { type TBalance } from "@/models";
import type { TApiBalance } from "./api_models";

export function balanceAdapter(apiBalance: TApiBalance): TBalance {
  const {
    cfa_balance,
    createdAt,
    cuota_balance,
    id,
    id_family,
    is_custom_cfa,
    is_custom_cuota,
    updatedAt,
    custom_balance,
  } = apiBalance;

  return {
    cfa_balance,
    createdAt,
    cuota_balance,
    id,
    id_family,
    is_custom_cfa,
    is_custom_cuota,
    updatedAt,
    custom_balance,
  };
}
