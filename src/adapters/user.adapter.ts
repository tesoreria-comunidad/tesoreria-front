import { type TUser } from "@/models";
import type { TApiUser } from "./api_models";

export function userAdapter(apiUser: TApiUser): TUser {
  return {
    ...apiUser,
  };
}
