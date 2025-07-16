import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { PaymentMethodSchema } from "@/constants/payment-method.constants";
import { PaymentTypechema } from "@/constants/payment-type.constants";

export const PaymentSchema = BaseSchema.extend({
  payment_method: PaymentMethodSchema,
  amount: z.number(),
  type: PaymentTypechema,
  id_family: z.string(),
});

export type TPayment = z.infer<typeof PaymentSchema>;
