import z from "zod";

export const FAMILY_ROLE_VALUES = ["ADMIN", "MEMBER"] as const;

export const FamilyRoleSchema = z.enum(FAMILY_ROLE_VALUES);
export type TFamilyRole = z.infer<typeof FamilyRoleSchema>;
