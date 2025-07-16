import z from "zod";

export const PAYMENT_TYPE_OPTIONS = ["cuota", "cfa"] as const;

export const PaymentTypechema = z.enum(PAYMENT_TYPE_OPTIONS);
export type TPaymentType = z.infer<typeof PaymentTypechema>;
