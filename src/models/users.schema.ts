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
