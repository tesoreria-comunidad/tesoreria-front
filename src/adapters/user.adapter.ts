import { type TUser } from "@/models";
import type { TApiUser } from "./api_models";

export function userAdapter(apiUser: TApiUser): TUser {
  const {
    createdAt,
    id,
    id_folder,
    id_rama,
    password,
    role,
    updatedAt,
    username,
    email,
    person,
    id_person,
  } = apiUser;

  return {
    createdAt,
    id,
    id_folder,
    id_rama,
    password,
    email,
    role,
    updatedAt,
    username,
    person,
    id_person,
  };
}
