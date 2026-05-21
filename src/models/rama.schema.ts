import { z } from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { UserSchema } from "./users.schema";

export const GrupoScoutSchema = z.enum(["SCOUTS", "GUIAS"]);
export type TGrupoScout = z.infer<typeof GrupoScoutSchema>;

export const RamaSchema = BaseSchema.extend({
  name: z.string(),
  grupo: GrupoScoutSchema,
  orden: z.number().int().min(1).max(4),
  edad_min: z.number().int().optional(),
  edad_max: z.number().int().optional(),
  users: z.array(UserSchema),
});

export const CreateRamaSchema = RamaSchema.omit({
  users: true,
  createdAt: true,
  id: true,
  updatedAt: true,
});
export type TRama = z.infer<typeof RamaSchema>;
export type TCreateRama = z.infer<typeof CreateRamaSchema>;
