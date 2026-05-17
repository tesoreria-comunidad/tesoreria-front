import z from "zod";

export const BalanceHistoryTypeValues = [
  "CUOTA_PAYMENT",
  "MONTHLY_ADJUSTMENT",
  "MANUAL_ADJUSTMENT",
] as const;

export const BalanceHistoryTypeSchema = z.enum(BalanceHistoryTypeValues);

export type TBalanceHistoryType = z.infer<typeof BalanceHistoryTypeSchema>;

export const ApiBalanceHistorySchema = z.object({
  id: z.string(),
  id_balance: z.string(),
  createdAt: z.string(),
  previous_balance: z.number(),
  change_amount: z.number(),
  new_value: z.number(),
  type: BalanceHistoryTypeSchema,
  description: z.string().nullable(),
});

export type TApiBalanceHistory = z.infer<typeof ApiBalanceHistorySchema>;

export const BalanceHistoryParamsSchema = z.object({
  type: BalanceHistoryTypeSchema.optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
});

export type TBalanceHistoryParams = z.infer<typeof BalanceHistoryParamsSchema>;
