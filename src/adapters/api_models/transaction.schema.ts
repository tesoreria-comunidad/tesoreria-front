import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const TransactionDirection = z.enum(["INCOME", "EXPENSE"]);
export const PaymentMethod = z.enum(["EFECTIVO", "TRANSFERENCIA"]);
export const TransactionSchema = BaseSchema.extend({
  amount: z.number(),
  id_family: z.string().optional(),
  payment_method: PaymentMethod,
  direction: TransactionDirection,
  category: z.string(), // dinámica
  payment_date: z.string().datetime().optional(), // string ISO
  concept: z.string().optional(),
  description: z.string().optional(),
});

export type TApiTransaction = z.infer<typeof TransactionSchema>;
