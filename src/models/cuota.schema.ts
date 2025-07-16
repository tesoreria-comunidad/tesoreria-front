import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const CuotaSchema = BaseSchema.extend({
  cuota_amount: z.number(),
  cfa_amount: z.number(),
});

export type TCuota = z.infer<typeof CuotaSchema>;
