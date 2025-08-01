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
    address,
    dni,
    gender,
    id_family,
    last_name,
    name,
    phone,
    birthdate,
    citizenship,
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
    address,
    dni,
    gender,
    id_family,
    last_name,
    name,
    phone,
    birthdate,
    citizenship,
  };
}
