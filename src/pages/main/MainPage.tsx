import UserSessionCard from "@/components/common/UserSessionCard";
import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { routes } from "@/routes";

export function MainPage() {
  return (
    <div>
      <DataProvider>
        <div className=" m-2">
          <UserSessionCard />
        </div>
        <section className=" bg-accent m-2 rounded-md p-4">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path={"*"} element={<>NOT FOUND</>} />
          </Routes>
        </section>
      </DataProvider>
    </div>
  );
}
