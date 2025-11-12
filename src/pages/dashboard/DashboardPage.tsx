import { DashboardCard } from "./components/DashboardCard";
import { UsersGraphs } from "./components/UsersGraphs";
import { RamasGraphs } from "./components/RamasGraphs";
import { ExpensesByCategory } from "../transactions/components/graphs/ExpensesByCategory";
import { TransactionGraph } from "../transactions/components/graphs/TransactionGraph";
import { ActionLogsList } from "./components/ActionLogsList";
import { useMobile } from "@/context/MobileContext";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
export function DashboardPage() {
  const { isMobile } = useMobile();
  const { user } = useAppSelector((s) => s.session);
  return (
    <div className="  overflow-hidden flex flex-col gap-4  ">
      <Label className=" text-2xl tracking-tighter py-2">
        {user?.gender === "MUJER" ? "Bienvenida" : "Bienvenido"}, {user?.name}{" "}
        {user?.last_name} 👋
      </Label>

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
          <section className="flex max-md:flex-col gap-4  md:min-h-[70vh]  ">
            <div className="md:w-1/2 flex flex-col gap-4">
              <ExpensesByCategory />
              {!isMobile && <RamasGraphs />}
            </div>
            <div className=" bg-red-50 md:w-1/2 h-[70vh]">
              <ActionLogsList />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
