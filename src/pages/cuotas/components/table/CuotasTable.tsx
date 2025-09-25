import { FormatedDate } from "@/components/common/FormatedDate";
import { RootTable, type TColumnDef } from "@/components/common/table";
import type { TCuota } from "@/models";
import { useCuotasQuery } from "@/queries/cuota.queries";
import { formatCurrency } from "@/utils";

export default function CuotasTable() {
  const { data: cuotas } = useCuotasQuery();
  const columns: TColumnDef<TCuota>[] = [
    {
      accessorKey: "value",
      header: "Valor de cuota",
      cell: ({ getValue }) => (
        <div className="text-lg font-medium">
          {formatCurrency(getValue<number>())}
        </div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Estado",
      cell: ({ getValue }) => {
        const isActive = getValue<boolean>();
        return (
          <div className="flex justify-center">
            <div
              className={` ${
                isActive
                  ? "bg-green-200 text-green-600"
                  : "bg-orange-200 text-orange-600"
              } p-1 px-4 rounded-md text-sm w-40 text-center  `}
            >
              {isActive ? "Activa" : "Inactiva"}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de creación",
      cell: ({ getValue }) => <FormatedDate date={getValue<string>()} />,
    },
    {
      accessorKey: "id",
      hidden: true,
    },
  ];
  return <RootTable columns={columns} data={cuotas || []} />;
}
