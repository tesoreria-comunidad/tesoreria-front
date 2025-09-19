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

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TTransaction = z.infer<typeof TransactionSchema>;
export type TCreateTransaction = z.infer<typeof CreateTransactionSchema>;
