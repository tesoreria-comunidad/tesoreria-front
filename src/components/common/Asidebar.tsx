import { type PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import { Link } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import UserSessionCard from "./UserSessionCard";
import { useLocation } from "react-router";
import { Logo } from "./Logo";

export function Asidebar({ children }: PropsWithChildren) {
  const { user } = useAppSelector((s) => s.session);
  const { pathname } = useLocation();
  const { open } = useSidebar();

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar className="flex flex-col justify-between">
        <SidebarHeader
          className="
            flex flex-col items-center justify-center
            pt-6 pb-2 px-2
            min-h-[110px]
            md:min-h-[120px]
          "
        >
          <Logo />
        </SidebarHeader>

        <SidebarContent className="flex flex-col gap-3 flex-1 overflow-y-auto pl-2 mt-3">
          {routes.map((route) =>
            user?.role &&
            route.rolesAccess?.includes(user?.role) &&
            route.sidebarContent ? (
              <Link to={route.path} key={route.path}>
                <div
                  className={`flex items-center gap-2 font-light transition-all duration-300 h-10 pl-4 rounded-md ${
                    pathname === route.path
                      ? "font-medium  bg-primary-2/10"
                      : " hover:bg-muted"
                  }`}
                >
                  {route.icon}
                  {route.name}
                </div>
              </Link>
            ) : null
          )}
        </SidebarContent>

        <SidebarFooter
          className="
            flex flex-col items-center gap-3
            pt-2 pb-6
            border-t border-border
            bg-sidebar
            mt-auto
          "
        >
          <UserSessionCard />
        </SidebarFooter>
      </Sidebar>
      <main
        className={`p-6 h-[100vh] flex-1 bg-background text-foreground transition-colors duration-300 ${
          open ? "max-w-[84vw] max-md:max-w-[100vw]" : "max-w-[100vw]"
        } `}
      >
        {children}
      </main>
    </div>
  );
}
