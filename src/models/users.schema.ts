import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { RoleSchema } from "@/constants/role.constants";

export const UserSchema = BaseSchema.extend({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: RoleSchema,
  id_folder: z.string(),
  id_rama: z.string().optional(),
  id_family: z.string(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  id_family: true,
  id_folder: true,
  createdAt: true,
  updatedAt: true,
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
