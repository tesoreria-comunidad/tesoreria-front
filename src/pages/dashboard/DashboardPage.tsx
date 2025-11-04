import { DashboardCard } from "./components/DashboardCard";
import { UsersGraphs } from "./components/UsersGraphs";
import { RamasGraphs } from "./components/RamasGraphs";
import { ExpensesByCategory } from "../transactions/components/graphs/ExpensesByCategory";
import { TransactionGraph } from "../transactions/components/graphs/TransactionGraph";
import { ActionLogsList } from "./components/ActionLogsList";
import { useMobile } from "@/context/MobileContext";
export function DashboardPage() {
  const { isMobile } = useMobile();
  return (
    <div className="  overflow-hidden flex flex-col gap-4  ">
      <section className="flex  max-md:flex-col   gap-4">
        <DashboardCard type="users" />
        <DashboardCard type="family" />
        <DashboardCard type="cuota" />
      </section>

      <section className="">
        <section className="flex flex-col gap-4">
          <div className=" grid grid-cols-2 max-md:grid-cols-1  gap-4   ">
            <UsersGraphs />

            <TransactionGraph />
          </div>
          <section className="flex gap-4  h-[70vh] ">
            <div className="md:w-1/2 h-full grid grid-rows-2 gap-4">
              <ExpensesByCategory />
              {!isMobile && <RamasGraphs />}
            </div>
            <div className="h-full bg-red-50 w-1/2">
              <ActionLogsList />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
