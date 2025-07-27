import { DataProvider } from "@/components/providers/DataProvider";
import { Route, Routes } from "react-router";
import { routes } from "@/routes";
import { useAppSelector } from "@/store/hooks";
import { Asidebar } from "@/components/common/Asidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MainPage() {
  const { user } = useAppSelector((s) => s.session);
  return (
    <div className=" h-full flex flex-col flex-1 ">
      <DataProvider>
        <Asidebar>
          <div className="flex flex-col text-[#fff] items-start m-2">
            <SidebarTrigger />
          </div>
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
        </Asidebar>
      </DataProvider>
    </div>
  );
}
