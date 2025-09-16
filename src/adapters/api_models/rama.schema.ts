import { z } from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { UserSchema } from "../api_models";

export const RamaSchema = BaseSchema.extend({
  name: z.string(),
  users: z.array(UserSchema),
});
export type TApiRama = z.infer<typeof RamaSchema>;
