import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const TransactionDirection = z.enum(["INCOME", "EXPENSE"]);
export const PaymentMethod = z.enum(["EFECTIVO", "TRANSFERENCIA"]);
export const TransactionSchema = BaseSchema.extend({
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
  id_family: z.string().nullable(),
  payment_method: PaymentMethod,
  direction: TransactionDirection,
  category: z.string().min(1, "La categoría es requerida"), // dinámica
  payment_date: z.string(), // string ISO
  concept: z.string().optional(),
  description: z.string().optional(),
});

export type TApiTransaction = z.infer<typeof TransactionSchema>;

export const MonthlyStatSchema = z.object({
  month: z.string(), // Ej: "January"
  income: z.number(), // Total ingresos del mes
  expense: z.number(), // Total egresos del mes
});

export const MonthlyStatsResponseSchema = z.array(MonthlyStatSchema);

// TypeScript type
export type TMonthlyStat = z.infer<typeof MonthlyStatSchema>;
export type TMonthlyStatsResponse = z.infer<typeof MonthlyStatsResponseSchema>;
