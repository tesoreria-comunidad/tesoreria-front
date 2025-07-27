import UserSessionCard from "@/components/common/UserSessionCard";
import { DataProvider } from "@/components/providers/DataProvider";
import { Link, Route, Routes } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";

export function MainPage() {
  const { user } = useAppSelector((s) => s.session);
  return (
    <div className=" h-full flex flex-col flex-1 ">
      <DataProvider>
        <div className=" m-2">
          <UserSessionCard />
        </div>
        <nav className="flex gap-4 container mx-auto justify-center">
          {routes.map((route) =>
            user?.role && route.rolesAccess?.includes(user?.role) ? (
              <Link to={route.path}>
                <div className="flex items-center justify-center gap-2 shadow hover:bg-accent transition-all duration-300 h-10 px-2 ">
                  {route.icon}
                  {route.name && <span>{route.name}</span>}
                </div>
              </Link>
            ) : null
          )}
        </nav>
        <section className=" bg-accent m-2 rounded-md p-4 flex-1 ">
          <Routes>
            {routes.map(
              (route) =>
                user &&
                route.rolesAccess?.includes(user?.role) && (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                )
            )}
            <Route path={"*"} element={<>NOT FOUND</>} />
          </Routes>
        </section>
      </DataProvider>
    </div>
  );
}
