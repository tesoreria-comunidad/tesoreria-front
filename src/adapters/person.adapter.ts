import { type TPerson } from "@/models";
import type { TApiPerson } from "./api_models";

export function personAdapter(apiPerson: TApiPerson): TPerson {
  const {
    address,
    createdAt,
    dni,
    email,
    gender,
    id,
    id_family,
    last_name,
    name,
    phone,
    updatedAt,
  } = apiPerson;
  return {
    address,
    createdAt,
    dni,
    email,
    gender,
    id,
    id_family,
    last_name,
    name,
    phone,
    updatedAt,
  };
}
