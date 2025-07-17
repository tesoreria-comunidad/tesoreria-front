import { type TPayment } from "@/models";
import type { TApiPayment } from "./api_models";

export function paymetnAdapter(apiPayment: TApiPayment): TPayment {
  const { amount, createdAt, id, id_family, payment_method, type, updatedAt } =
    apiPayment;
  return { amount, createdAt, id, id_family, payment_method, type, updatedAt };
}
