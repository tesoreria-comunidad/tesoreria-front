import { type TBalance } from "@/models";
import type { TApiBalance } from "./api_models";

export function balanceAdapter(apiBalance: TApiBalance): TBalance {
  return { ...apiBalance };
}
