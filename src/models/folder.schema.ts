import z from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const FolderSchema = BaseSchema.extend({
  foto: z.string().optional(),
  historia_clinica: z.string().optional(),
  id_user: z.string(),
});
export type TFolder = z.infer<typeof FolderSchema>;
