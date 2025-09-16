import { DashboardCard } from "./components/DashboardCard";
import { UsersGraphs } from "./components/UsersGraphs";
import { RamasGraphs } from "./components/RamasGraphs";
export function DashboardPage() {
  return (
    <div className=" size-full flex flex-col gap-4   ">
      <section className="flex    gap-4">
        <DashboardCard type="users" />
        <DashboardCard type="family" />
        <DashboardCard type="cuota" />
      </section>

      <section className="  w-full    ">
        <section className="size-full  flex items-start  gap-4 ">
          <div className="flex flex-col gap-4 w-1/4 h-full">
            <UsersGraphs />
            <UsersGraphs />
          </div>
          <div className="w-3/4 h-full">
            <RamasGraphs />
          </div>
        </section>
      </section>
    </div>
  );
}
