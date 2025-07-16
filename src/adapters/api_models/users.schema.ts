import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { RoleSchema } from "@/constants/role.constants";

export const UserSchema = BaseSchema.extend({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  role: RoleSchema,
  id_folder: z.string(),
  id_rama: z.string(),
  id_family: z.string(),
});
export type TApiUser = z.infer<typeof UserSchema>;
