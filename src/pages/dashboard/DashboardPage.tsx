import { DashboardCard } from "./components/DashboardCard";
import { UsersGraphs } from "./components/UsersGraphs";
import { RamasGraphs } from "./components/RamasGraphs";
import { ExpensesByCategory } from "../transactions/components/graphs/ExpensesByCategory";
import { TransactionGraph } from "../transactions/components/graphs/TransactionGraph";
import { ActionLogsList } from "./components/ActionLogsList";
export function DashboardPage() {
  return (
    <div className=" size-full flex flex-col gap-4    ">
      <section className="flex    gap-4">
        <DashboardCard type="users" />
        <DashboardCard type="family" />
        <DashboardCard type="cuota" />
      </section>

      <section className=" h-[90%] max-h-[90%] ">
        <section className="flex flex-col gap-4">
          <div className=" grid grid-cols-3  gap-4   ">
            <UsersGraphs />
            <ExpensesByCategory />
            <TransactionGraph />
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-4  ">
            <RamasGraphs />
            <ActionLogsList />
          </div>
        </section>
      </section>
    </div>
  );
}
