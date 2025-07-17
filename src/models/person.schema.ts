import z from "zod";
import { BaseSchema } from "./baseEntity.schema";
import { GenderSchema } from "@/constants/gender.constants";

export const PersonsSchema = BaseSchema.extend({
  name: z.string(),
  last_name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  gender: GenderSchema,
  dni: z.string(),
  id_user: z.string().optional(),
  id_family: z.string(),
});

export type TPerson = z.infer<typeof PersonsSchema>;
