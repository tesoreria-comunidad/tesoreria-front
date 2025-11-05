import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import NavBar from "@/components/common/NavBar";

export function MainPage() {
  const { user } = useAppSelector((s) => s.session);
  return (
    <div className=" h-screen w-screen   ">
      <DataProvider>
        <div className="flex flex-col  bg-accent min-h-screen text-foreground transition-colors duration-300 relative">
          <NavBar />
          <main
            className={` container mx-auto    h-[100vh] flex-1 max-md:py-24 md:pb-24 max-md:px-4  text-foreground transition-colors duration-300 w-full `}
          >
            <section className="  h-full w-full    ">
              <section
                className={`rounded-md    w-full  mx-auto     overflow-y-auto `}
              >
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
            </section>
          </main>
        </div>
      </DataProvider>
    </div>
  );
}
