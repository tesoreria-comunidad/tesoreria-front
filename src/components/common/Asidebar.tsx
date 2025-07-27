import type { PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
// import { Link } from "react-router";

export function Asidebar({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-primary ">
      <SidebarProvider>
        <Sidebar>
          <SidebarContent className="flex flex-col mt-10 gap-5">
            {/* {routes.map((route) => {
              <Link to={route.path}>
                {route.icon}
                {route.name}
              </Link>;
            })} */}
          </SidebarContent>
          <SidebarFooter>
            <SidebarTrigger />
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-6 bg-primary overflow-auto">{children}</main>
      </SidebarProvider>
    </div>
  );
}
