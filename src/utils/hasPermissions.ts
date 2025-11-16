import type { TUser } from "@/models";

export const hasPermission = (userLogged: TUser, ramaId: string): boolean => {
  return (
    userLogged.role &&
    (userLogged.role === "MASTER" ||
      (userLogged.role === "DIRIGENTE" && userLogged.id_rama === ramaId))
  );
};
