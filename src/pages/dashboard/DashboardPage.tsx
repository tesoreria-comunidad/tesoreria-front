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
    <div className=" size-full flex flex-col gap-4  max-md:overflow-x-hidden   ">
      <section className="flex  max-md:flex-col   gap-4">
        <DashboardCard type="users" />
        <DashboardCard type="family" />
        <DashboardCard type="cuota" />
      </section>

      <section className=" h-[90%] max-h-[90%] ">
        <section className="flex flex-col gap-4">
          <div className=" grid grid-cols-2 max-md:grid-cols-1  gap-4   ">
            <UsersGraphs />

            <TransactionGraph />
          </div>
          <div className="md:w-1/2">
            <ExpensesByCategory />
          </div>
          {!isMobile && (
            <div className="grid grid-cols-[2fr_1fr] max-md:grid-cols-1 gap-4  ">
              <RamasGraphs />
              <ActionLogsList />
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
