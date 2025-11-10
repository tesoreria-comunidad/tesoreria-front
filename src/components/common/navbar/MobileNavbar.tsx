import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";

import { Link, useLocation } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GripVertical } from "lucide-react";
export function MobileNavbar() {
  const { user } = useAppSelector((s) => s.session);
  const { pathname } = useLocation();
  return (
  <section className="flex  justify-around md:hidden items-center z-10  max-md:fixed max-md:bottom-0 max-md:w-full  bg-[var(--color-background)] py-4">
      {routes.slice(0, 4).map((route) =>
        user?.role &&
        route.rolesAccess?.includes(user?.role) &&
        route.sidebarContent ? (
          <Link to={route.path} key={route.path}>
            <div
              className={`flex flex-col items-center gap-2 text-xs  transition-all duration-300 h-10   rounded-md ${
                pathname === route.path
                  ? "font-semibold bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-accent-foreground)]"
                  : " hover:bg-background "
              }`}
            >
              <div>{route.icon}</div>
              {route.name}
            </div>
          </Link>
        ) : null
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <GripVertical />
          <span className="text-xs">Más</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {routes.slice(4).map((route) =>
            user?.role &&
            route.rolesAccess?.includes(user?.role) &&
            route.sidebarContent ? (
              <DropdownMenuItem asChild>
                <Link to={route.path} key={route.path}>
                  <div
                    className={`flex  items-center gap-2 text-xs  transition-all duration-300 h-10   rounded-md ${
                      pathname === route.path
                        ? "font-semibold bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-accent-foreground)]"
                        : " hover:bg-background "
                    }`}
                  >
                    <div>{route.icon}</div>
                    {route.name}
                  </div>
                </Link>
              </DropdownMenuItem>
            ) : null
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
