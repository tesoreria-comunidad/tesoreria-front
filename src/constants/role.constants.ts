import z from "zod";

export const ROLE_VALUES = ["dirigente", "beneficiario", "master"] as const;

export const RoleSchema = z.enum(ROLE_VALUES);
export type TRole = z.infer<typeof RoleSchema>;
