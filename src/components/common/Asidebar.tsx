import { type PropsWithChildren } from "react";

import { Link } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import UserSessionCard from "./UserSessionCard";
import { useLocation } from "react-router";
import { Logo } from "./Logo";
import { MobileNavbar } from "./navbar/MobileNavbar";

export function Asidebar({ children }: PropsWithChildren) {
  const { user } = useAppSelector((s) => s.session);
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col  bg-accent min-h-screen text-foreground transition-colors duration-300 relative">
      <nav className=" bg-primary/5 p-4    md:h-20 w-full fixed  z-20 border-b backdrop-blur-xl">
        <section className="container mx-auto flex  items-center justify-between  ">
          <Logo />

          <section className="flex items-center  gap-4 max-md:hidden">
            {routes.map((route) =>
              user?.role &&
              route.rolesAccess?.includes(user?.role) &&
              route.sidebarContent ? (
                <Link to={route.path} key={route.path}>
                  <div
                    className={`flex items-center gap-2  transition-all duration-300 h-10 px-2  rounded-md ${
                      pathname === route.path
                        ? "font-semibold  bg-white px-8"
                        : " hover:bg-muted "
                    }`}
                  >
                    {route.icon}
                    {route.name}
                  </div>
                </Link>
              ) : null
            )}
          </section>

          <div>
            <UserSessionCard />
          </div>
        </section>
      </nav>
      <main
        className={` container mx-auto  py-24 h-[100vh] flex-1  text-foreground transition-colors duration-300 w-full `}
      >
        {children}
      </main>

      <MobileNavbar />
    </div>
  );
}
