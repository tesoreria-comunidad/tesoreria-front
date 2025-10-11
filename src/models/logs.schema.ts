// src/action-logs/dtos.ts
import { z } from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const ActionType = {
  BALANCE_UPDATE: "BALANCE_UPDATE",
  TRANSACTION_CREATE: "TRANSACTION_CREATE",
  TRANSACTION_UPDATE: "TRANSACTION_UPDATE",
  TRANSACTION_DELETE: "TRANSACTION_DELETE",
} as const;
export type ActionType = keyof typeof ActionType;

export const ActionStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;
export type ActionStatus = keyof typeof ActionStatus;

export const ActionTargetTable = {
  FAMILY: "FAMILY",
  TRANSACTIONS: "TRANSACTIONS",
  RAMA: "RAMA",
  USER: "USER",
  CUOTA: "CUOTA",
  CPH: "CPH",
  BALANCE: "BALANCE",
} as const;
export type ActionTargetTable = keyof typeof ActionTargetTable;
export const ActionLogSchema = BaseSchema.extend({
  action_type: z.enum(ActionType),
  id_user: z.string(),
  target_table: z.enum(ActionTargetTable).optional(),
  status: z.enum(ActionStatus).optional(),
  target_id: z.string().optional(),
  id_family: z.string().optional(),
  id_transaction: z.string().optional(),
  message: z.string().optional(),
  requestId: z.string().optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  metadata: z.any().optional(),
});
export type TLog = z.infer<typeof ActionLogSchema>;
