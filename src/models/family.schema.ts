import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { UserSchema } from "./users.schema";
import { BalanceSchema } from "./balance.schema";
import { PaymentSchema } from "./payment.schema";

export const FamilySchema = BaseSchema.extend({
  name: z.string(),
  phone: z.string(),
  users: z.array(UserSchema),
  id_balance: z.string().optional(),
  balance: BalanceSchema,
  payments: z.array(PaymentSchema),
});

export type TFamily = z.infer<typeof FamilySchema>;
