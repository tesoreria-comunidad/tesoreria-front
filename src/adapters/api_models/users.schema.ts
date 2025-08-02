import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { RoleSchema } from "@/constants/role.constants";
import { GenderSchema } from "@/constants/gender.constants";

export const UserSchema = BaseSchema.extend({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: RoleSchema,
  name: z.string(),
  last_name: z.string(),
  address: z.string(),
  phone: z.string(),
  gender: GenderSchema,
  dni: z.string(),
  birthdate: z.string(),
  citizenship: z.string(),
  id_family: z.string(),
  id_folder: z.string(),
  id_rama: z.string(),
  is_granted: z.boolean(),
  is_active: z.boolean(),
});
export type TApiUser = z.infer<typeof UserSchema>;
