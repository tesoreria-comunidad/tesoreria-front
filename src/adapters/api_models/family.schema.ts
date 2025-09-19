import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { UserSchema } from "./users.schema";
import { BalanceSchema } from "./balance.schema";
import { TransactionSchema } from "./transaction.schema";

export const FamilySchema = BaseSchema.extend({
  name: z.string(),
  phone: z.string(),
  manage_by: z.string(),
  users: z.array(UserSchema),
  id_balance: z.string().optional(),
  balance: BalanceSchema,
  transactions: z.array(TransactionSchema),
});

export type TApiFamily = z.infer<typeof FamilySchema>;
