import { type TUser } from "@/models";
import type { TApiUser } from "./api_models";

export function userAdapter(apiUser: TApiUser): TUser {
  const {
    createdAt,
    id,
    id_family,
    id_folder,
    id_rama,
    password,
    role,
    updatedAt,
    username,
  } = apiUser;

  return {
    createdAt,
    id,
    id_family,
    id_folder,
    id_rama,
    password,
    role,
    updatedAt,
    username,
  };
}
