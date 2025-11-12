import type { TRole } from "@/constants/role.constants";
import { useAppSelector } from "@/store/hooks";
import type { PropsWithChildren } from "react";

interface RoleWrapperInterface extends PropsWithChildren {
  roles: TRole[];
}

export function RoleGuardWrapper({ children, roles }: RoleWrapperInterface) {
  const { user } = useAppSelector((s) => s.session);
  if (user?.role && roles.includes(user?.role)) {
    return <div>{children}</div>;
  }

  return null;
}
