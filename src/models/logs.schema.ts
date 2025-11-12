// src/action-logs/dtos.ts
import { z } from "zod";
import { BaseSchema } from "./baseEntity.schema";

export const ActionType = {
  BALANCE_CREATE: "BALANCE_CREATE",
  BALANCE_UPDATE: "BALANCE_UPDATE",
  BALANCE_UPDATE_ALL: "BALANCE_UPDATE_ALL",
  TRANSACTION_CREATE: "TRANSACTION_CREATE",
  TRANSACTION_UPDATE: "TRANSACTION_UPDATE",
  TRANSACTION_DELETE: "TRANSACTION_DELETE",
  USER_CREATE: "USER_CREATE",
  USER_UPDATE: "USER_UPDATE",
  USER_DELETE: "USER_DELETE",
  PERSON_CREATE: "PERSON_CREATE",
  PERSON_UPDATE: "PERSON_UPDATE",
  PERSON_DELETE: "PERSON_DELETE",
  PAYMENT_CREATE: "PAYMENT_CREATE",
  PAYMENT_UPDATE: "PAYMENT_UPDATE",
  PAYMENT_DELETE: "PAYMENT_DELETE",
  FAMILY_CREATE: "FAMILY_CREATE",
  FAMILY_UPDATE: "FAMILY_UPDATE",
  FAMILY_DELETE: "FAMILY_DELETE",
  CUOTA_CREATE: "CUOTA_CREATE",
  CUOTA_UPDATE: "CUOTA_UPDATE",
  CUOTA_DELETE: "CUOTA_DELETE",
  CPH_CREATE: "CPH_CREATE",
  CPH_UPDATE: "CPH_UPDATE",
  CPH_DELETE: "CPH_DELETE",
  RAMA_CREATE: "RAMA_CREATE",
  RAMA_UPDATE: "RAMA_UPDATE",
  RAMA_DELETE: "RAMA_DELETE",
  FILE_UPLOAD: "FILE_UPLOAD",
  FILE_DELETE: "FILE_DELETE",
  FOLDER_CREATE: "FOLDER_CREATE",
  FOLDER_UPDATE: "FOLDER_UPDATE",
  FOLDER_DELETE: "FOLDER_DELETE",
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
