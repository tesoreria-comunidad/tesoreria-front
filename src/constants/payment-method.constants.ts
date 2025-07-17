import z from "zod";

export const PAYMENT_METHODS_OPTIONS = ["transferencia", "efectivo"] as const;

export const PaymentMethodSchema = z.enum(PAYMENT_METHODS_OPTIONS);
export type TPaymentMethod = z.infer<typeof PaymentMethodSchema>;
