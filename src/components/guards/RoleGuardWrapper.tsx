import type { TRole } from "@/constants/role.constants";
import { useAppSelector } from "@/store/hooks";
import type { PropsWithChildren } from "react";

interface RoleWrapperInterface extends PropsWithChildren {
  roles: TRole[];
}
// this component render the children if the userRole is included in the list of roles defined in the props
export function RoleGuardWrapper({ children, roles }: RoleWrapperInterface) {
  const { user } = useAppSelector((s) => s.session);
  if (user?.role && roles.includes(user?.role)) {
    return <>{children}</>;
  }

  return null;
}
