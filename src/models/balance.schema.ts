import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const BalanceSchema = BaseSchema.extend({
  value: z.number(),
  custom_cuota: z.number(),
  cfa_balance_value: z.number(),
  custom_cfa_value: z.number(),
  is_custom_cuota: z.boolean(),
  is_custom_cfa: z.boolean(),
});

export type TBalance = z.infer<typeof BalanceSchema>;
