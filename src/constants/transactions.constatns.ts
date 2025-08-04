import z from "zod";

export const PAYMENT_METHODS_OPTIONS = ["TRANSFERENCIA", "EFECTIVO"] as const;
export const DIRECTIONS_OPTIONS = ["INCOME", "EXPENSE"] as const;
export const TRASNACTIONS_CATEGORIES_OPTIONS = [
  "CUOTA",
  "CFA",
  "DONACION",
  "MANTENIMIENTO",
] as const;

export const PaymentMethodSchema = z.enum(PAYMENT_METHODS_OPTIONS);
export const DirectionSchema = z.enum(DIRECTIONS_OPTIONS);
export const TranscationsCategorySchema = z.enum(
  TRASNACTIONS_CATEGORIES_OPTIONS
);
export type TPaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type TDirectionOfTransaction = z.infer<typeof DirectionSchema>;
export type TTRansactionCategory = z.infer<typeof TranscationsCategorySchema>;
