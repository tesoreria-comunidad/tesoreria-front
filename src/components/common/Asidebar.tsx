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
import { useLocation } from "react-router";

export function Asidebar({ children }: PropsWithChildren) {
  const { user } = useAppSelector((s) => s.session);

  const { pathname } = useLocation();
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="flex  justify-center items-center h-[10vh] ">
            <img
              src="/logo.png"
              className="size-20 aspect-square object-cover"
            />
            <strong className="text-primary">Mi Pelicano</strong>{" "}
          </SidebarHeader>
          <hr className="my-4 w-3/4 mx-auto" />
          <SidebarContent className="flex flex-col gap-4  mt-4 pl-2">
            {routes.map((route) =>
              user?.role &&
              route.rolesAccess?.includes(user?.role) &&
              route.sidebarContent ? (
                <Link to={route.path}>
                  <div
                    className={`flex items-center gap-2 transition-all duration-300   pl-4 ${
                      pathname === route.path
                        ? "font-medium text-primary  py-2  bg-gradient-to-r   from-primary/10 to-transparent"
                        : "font-medium text-gray-500 bg-transparent"
                    }`}
                  >
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
