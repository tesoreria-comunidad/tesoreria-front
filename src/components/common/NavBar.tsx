import { MobileNavbar } from "./navbar/MobileNavbar";
import { Logo } from "./Logo";
import { groupedRoutes, type TRoute } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import { Link, useLocation } from "react-router";
import UserSessionCard from "./UserSessionCard";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { user } = useAppSelector((s) => s.session);
  const { pathname } = useLocation();

  const [subRoutes, setSubRoutes] = useState<TRoute[]>([]);
  useEffect(() => {
    const defaultRoutes = groupedRoutes.find((groupedRoute) =>
      groupedRoute.routes.map((r) => r.path).includes(pathname)
    );

    setSubRoutes(defaultRoutes?.routes || []);
  }, [pathname]);
  return (
    <div className=" ">
      <nav className=" bg-primary/5 p-4    md:h-20 w-full fixed  z-20 border-b backdrop-blur-xl">
        <section className="container mx-auto px-8 flex  items-center justify-between    ">
          <Logo />

          <section className="flex items-center  gap-4 max-md:hidden">
            {groupedRoutes.map((groupedRoute) => (
              <Link
                to={groupedRoute.routes[0].path}
                key={groupedRoute.title}
                onClick={() => setSubRoutes(groupedRoute.routes)}
              >
                <div
                  className={`flex items-center gap-2  transition-all duration-300 h-10 px-3 rounded-2xl ${
                    groupedRoute.routes.map((r) => r.path).includes(pathname)
                      ? "font-semibold  bg-white px-4"
                      : " hover:bg-background opacity-50 "
                  }`}
                >
                  {groupedRoute.icon}
                  {groupedRoute.title}
                </div>
              </Link>
            ))}
          </section>
          <div>
            <UserSessionCard />
          </div>
        </section>
      </nav>

      <div className=" container mx-auto px-8 flex justify-center  gap-4 items-center   mt-20 p-2  max-md:hidden">
        {subRoutes.map((route) =>
          user?.role &&
          route.rolesAccess?.includes(user?.role) &&
          route.sidebarContent ? (
            <Link to={route.path} key={route.path}>
              <div
                className={`flex items-center gap-2  transition-all duration-300 h-10 p-4 rounded-md ${
                  pathname === route.path
                    ? "font-semibold  bg-black/10 "
                    : " hover:bg-background opacity-50 "
                }`}
              >
                {route.icon}
                {route.name}
              </div>
            </Link>
          ) : null
        )}
      </div>
      <MobileNavbar />
    </div>
  );
}
