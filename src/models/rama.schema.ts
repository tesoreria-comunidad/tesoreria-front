import { z } from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { UserSchema } from "./users.schema";

export const RamaSchema = BaseSchema.extend({
  name: z.string(),
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
