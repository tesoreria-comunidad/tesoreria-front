import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import { Asidebar } from "@/components/common/Asidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MainPage() {
  const { user } = useAppSelector((s) => s.session);
  return (
    <div className=" h-screen w-screen ">
      <DataProvider>
        <Asidebar>
          <section className="  h-full w-full   ">
            <div className="flex items-center   h-[5%] ">
              <SidebarTrigger />
            </div>
            <section
              className={`rounded-md p-4  max-h-[90%] h-[90%] w-full    overflow-y-auto `}
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
