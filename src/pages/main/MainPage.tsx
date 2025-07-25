import UserSessionCard from "@/components/common/UserSessionCard";
import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { routes } from "@/routes";

export function MainPage() {
  return (
    <div>
      <DataProvider>
        <section className=" border rounded-lg h-[80vh] w-[80vw] place-self-center p-4 mt-10 overflow-hidden">
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
        <div className="absolute top-4 right-4">
          <UserSessionCard />
        </div>
      </DataProvider>
    </div>
  );
}
