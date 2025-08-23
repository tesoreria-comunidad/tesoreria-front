import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { RoleSchema } from "@/constants/role.constants";
import { GenderSchema } from "@/constants/gender.constants";
import { FamilyRoleSchema } from "@/constants/familiy-role.constants";

export const UserSchema = BaseSchema.extend({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: RoleSchema,
  family_role: FamilyRoleSchema,
  name: z.string(),
  last_name: z.string(),
  address: z.string(),
  phone: z.string(),
  gender: GenderSchema,
  dni: z.string(),
  birthdate: z.string(),
  citizenship: z.string(),
  is_granted: z.boolean(),
  is_active: z.boolean(),
  id_family: z.string().nullable(),
  id_folder: z.string().nullable(),
  id_rama: z.string().nullable(),
});
export type TApiUser = z.infer<typeof UserSchema>;
