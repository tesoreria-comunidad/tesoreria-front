import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const FolderSchema = BaseSchema.extend({
  foto: z.string().optional(),
  historia_clinica: z.string().optional(),
  id_user: z.string(),
});
export type TApiFolder = z.infer<typeof FolderSchema>;
