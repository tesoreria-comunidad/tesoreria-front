import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { RoleSchema } from "@/constants/role.constants";
import { GenderSchema } from "@/constants/gender.constants";
import { FamilyRoleSchema } from "@/constants/familiy-role.constants";

export const UserSchema = BaseSchema.extend({
  name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().optional(),
  role: RoleSchema,
  family_role: FamilyRoleSchema,
  birthdate: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  gender: GenderSchema.default("HOMBRE"),
  dni: z.string().optional(),
  citizenship: z.string().optional(),
  is_granted: z.boolean().optional(),
  is_active: z.boolean().optional(),
  id_folder: z.string().nullable(),
  id_family: z.string().nullable().optional(),
  id_rama: z.string().nullable().optional(),
});
export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    last_name: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
    username: z
      .string()
      .min(4, { message: "El usuario debe tener al menos 4 caracteres" }),
    password: z.string().min(1, { message: "La contraseña debe completarse" }),
    confirmPassword: z.string().optional(),
    email: z.string().optional(),
    role: RoleSchema,
    family_role: FamilyRoleSchema,
    birthdate: z.string().optional(),
    address: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return val.length >= 5;
        },
        {
          message: "La dirección debe tener al menos 5 caracteres",
          path: ["address"],
        }
      ),
    phone: z.string().optional(),
    gender: GenderSchema,
    dni: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return val.length === 8;
        },
        {
          message: "El DNI debe tener al menos 8 caracteres",
          path: ["dni"],
        }
      ),
    citizenship: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return val.length >= 3;
        },
        {
          message: "La nacionalidad debe tener al menos 3 caracteres",
          path: ["citizenship"],
        }
      ),
    is_granted: z.boolean().optional(),
    is_active: z.boolean().optional(),
    id_family: z.string().nullable().optional(),
    id_rama: z.string().nullable().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type TUser = z.infer<typeof UserSchema>;
export type TCreateUser = z.infer<typeof CreateUserSchema>;
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
  family_role: true,
}).extend({
  family_id: z.string().optional(),
});

export type TBulkCreateUser = z.infer<typeof BulkCreateUserSchema>;
export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true,
  confirmPassword: true,
  role: true,
});

export type TUpdateUser = z.infer<typeof UpdateUserSchema>;