import z from "zod";
import {
  BalanceHistoryTypeSchema,
} from "@/adapters/api_models/balance-history.schema";

export const BalanceHistorySchema = z.object({
  id: z.string(),
  id_balance: z.string(),
  createdAt: z.string(),
  previous_balance: z.number(),
  change_amount: z.number(),
  new_value: z.number(),
  type: BalanceHistoryTypeSchema,
  description: z.string().nullable(),
});

export type TBalanceHistory = z.infer<typeof BalanceHistorySchema>;
