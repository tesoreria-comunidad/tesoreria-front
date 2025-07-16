import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const BalanceSchema = BaseSchema.extend({
  cuota_balance: z.number(),
  cfa_balance: z.number(),
  is_custom_cuota: z.boolean(),
  is_custom_cfa: z.boolean(),
  id_family: z.string(),
  custom_balance: z.number().optional(),
});

export type TBalance = z.infer<typeof BalanceSchema>;
