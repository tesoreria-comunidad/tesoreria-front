import z from "zod";

export const ROLE_VALUES = ["DIRIGENTE", "BENEFICIARIO", "MASTER"] as const;

export const RoleSchema = z.enum(ROLE_VALUES);
export type TRole = z.infer<typeof RoleSchema>;
