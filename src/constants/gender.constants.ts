import z from "zod";

export const GENDER_OPTIONS = ["HOMBRE", "MUJER", "otro"] as const;

export const GenderSchema = z.enum(GENDER_OPTIONS);
export type TGender = z.infer<typeof GenderSchema>;
