import { DashboardCard } from "./components/DashboardCard";
import { UsersGraphs } from "./components/UsersGraphs";
import { RamasGraphs } from "./components/RamasGraphs";
import { ExpensesByCategory } from "../transactions/components/graphs/ExpensesByCategory";
export function DashboardPage() {
  return (
    <div className=" size-full flex flex-col gap-4    ">
      <section className="flex    gap-4">
        <DashboardCard type="users" />
        <DashboardCard type="family" />
        <DashboardCard type="cuota" />
      </section>

      <section className=" h-[90%] max-h-[90%] ">
        <section className="max-h-full grid grid-cols-[2fr_4fr] gap-4 ">
          <div className="flex-1 flex flex-col gap-4   ">
            <UsersGraphs />
            <ExpensesByCategory />
          </div>
          <RamasGraphs />
        </section>
      </section>
    </div>
  );
}
