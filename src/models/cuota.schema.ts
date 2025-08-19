import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
export const CuotaSchema = BaseSchema.extend({
  value: z.number(),
  is_active: z.boolean(),
});

export const CreateCuotaSchema = CuotaSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  is_active: true,
});

export type TCuota = z.infer<typeof CuotaSchema>;
export type TCreateCuota = z.infer<typeof CreateCuotaSchema>;
