import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { UserSchema } from "./users.schema";
import { BalanceSchema } from "./balance.schema";
import { TransactionSchema } from "@/adapters/api_models/transaction.schema";

export const FamilySchema = BaseSchema.extend({
  name: z.string(),
  phone: z.string(),
  manage_by: z.string(),
  users: z.array(UserSchema),
  id_balance: z.string(),
  balance: BalanceSchema,
  transactions: z.array(TransactionSchema),
});

export const CreateFamilySchema = FamilySchema.omit({
  id_balance: true,
  createdAt: true,
  id: true,
  updatedAt: true,
  balance: true,
  transactions: true,
  users: true,
});

export type TFamily = z.infer<typeof FamilySchema>;
export type TCreateFamily = z.infer<typeof CreateFamilySchema>;
