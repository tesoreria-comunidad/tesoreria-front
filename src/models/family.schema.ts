import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const FamilySchema = BaseSchema.extend({
  name: z.string(),
  phone: z.string(),
  users: z.array(z.string()), // Array of person IDs
  id_balance: z.string().optional(), // Optional balance ID
});

export const CreateFamilySchema = FamilySchema.omit({
  id_balance: true,
  createdAt: true,
  id: true,
  updatedAt: true,
});

export type TFamily = z.infer<typeof FamilySchema>;
export type TCreateFamily = z.infer<typeof CreateFamilySchema>;
