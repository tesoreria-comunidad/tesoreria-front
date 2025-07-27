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
  id_rama: z.string().optional(),
  id_person: z.string(),
  person: PersonsSchema,
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  id_folder: true,
  id_rama: true,
  createdAt: true,
  updatedAt: true,
  email: true,
})
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
export type TUser = z.infer<typeof UserSchema>;
export type TCreateUser = z.infer<typeof CreateUserSchema>;
