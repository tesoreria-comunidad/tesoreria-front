import { type PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar";
import { Link } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import UserSessionCard from "./UserSessionCard";

export function Asidebar({ children }: PropsWithChildren) {
  const { user } = useAppSelector((s) => s.session);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <SidebarProvider>
        <Sidebar className="flex flex-col text-primary font-bold gap-10">
          <SidebarHeader className="flex mt-10 pl-5">
            <h1>Bienvenido {user?.username}</h1>
          </SidebarHeader>
          <SidebarContent className="flex flex-col mt-10 gap-5">
            {routes.map((route) =>
              user?.role &&
              route.rolesAccess?.includes(user?.role) &&
              route.sidebarContent ? (
                <Link to={route.path}>
                  <div className="flex items-center gap-2 pl-5">
                    {route.icon}
                    {route.name}
                  </div>
                </Link>
              ) : null
            )}
          </SidebarContent>
          <SidebarFooter className="flex items-start">
            <UserSessionCard />
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-6  h-[100vh] max-h-[100vh]:">{children}</main>
      </SidebarProvider>
    </div>
  );
}
