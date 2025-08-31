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

export const CreateUserSchema = UserSchema.omit({
  id: true,
  id_folder: true,
  id_rama: true,
  createdAt: true,
  updatedAt: true,
  is_granted: true,
  is_active: true,
})
  .extend({
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  password: true,
}).partial();

export type TUser = z.infer<typeof UserSchema>;
export type TCreateUser = z.infer<typeof CreateUserSchema>;
export type TUpdateUser = z.infer<typeof UpdateUserSchema>;
export const BulkCreateUserSchema = UserSchema.omit({
  id: true,
  id_folder: true,
  id_rama: true,
  id_family: true,
  is_granted: true,
  is_active: true,
  createdAt: true,
  updatedAt: true,
  username: true,
  password: true,
  role: true,
});

export type TBulkCreateUser = z.infer<typeof BulkCreateUserSchema>;
