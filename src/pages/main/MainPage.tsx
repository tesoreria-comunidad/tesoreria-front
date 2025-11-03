import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import { Asidebar } from "@/components/common/Asidebar";
import { useMobile } from "@/context/MobileContext";

export function MainPage() {
  const { user } = useAppSelector((s) => s.session);
  const { isMobile } = useMobile();
  return (
    <div className=" h-screen w-screen   ">
      <DataProvider>
        <Asidebar>
          <section className="  h-full w-full    ">
            <section
              className={`rounded-md ${
                isMobile ? "" : "p-4"
              }    w-full  mx-auto     overflow-y-auto `}
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
        </Asidebar>
      </DataProvider>
    </div>
  );
}
