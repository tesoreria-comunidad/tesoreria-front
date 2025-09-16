import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const CuotaSchema = BaseSchema.extend({
  value: z.number(),
  is_active: z.boolean(),
});

export type TApiCuota = z.infer<typeof CuotaSchema>;
