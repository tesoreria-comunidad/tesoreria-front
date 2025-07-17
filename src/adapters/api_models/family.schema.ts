import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const FamilySchema = BaseSchema.extend({
  name: z.string(),
  phone: z.string(),
  persons: z.array(z.string()), // Array of person IDs
  id_balance: z.string().optional(), // Optional balance ID
});

export type TApiFamily = z.infer<typeof FamilySchema>;
