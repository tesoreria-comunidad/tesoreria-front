import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { RoleSchema } from "@/constants/role.constants";
import { PersonsSchema } from "./person.schema";

export const UserSchema = BaseSchema.extend({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: RoleSchema,
  id_folder: z.string(),
  id_rama: z.string(),
  id_person: z.string(),
  person: PersonsSchema,
});
export type TApiUser = z.infer<typeof UserSchema>;
