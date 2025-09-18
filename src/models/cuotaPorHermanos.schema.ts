import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
export const CuotaPorHermanosSchema = BaseSchema.extend({
  cantidad: z.number(),
  valor: z.number(),
});

export const CreateCuotaPorHermanoSchema = CuotaPorHermanosSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type TCuotaPorHemanos = z.infer<typeof CuotaPorHermanosSchema>;
export type TCreateCuotaPorHermano = z.infer<
  typeof CreateCuotaPorHermanoSchema
>;
