import { z } from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const RamaSchema = BaseSchema.extend({
  name: z.string(),
  users: z.array(z.string()),
});
export type TRama = z.infer<typeof RamaSchema>;
