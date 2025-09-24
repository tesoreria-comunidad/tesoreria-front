import { RootTable } from "@/components/common/table";
import type { TRama, TUser } from "@/models";
import type { ColumnDef } from "@tanstack/react-table";
import { AddUserAside } from "../AddUserAside";
import { Link } from "react-router";
import { UserBulkUploader } from "../UsersBulkUploader";
import { CobrabilidadCell } from "./components/CobrabilidadCell";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { useRamasQuery } from "@/queries/ramas.queries";

export function RamasTable() {
  const ramaQuery = useRamasQuery();
  const columns: ColumnDef<TRama>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      size: 10,
      cell: ({ getValue, row }) => (
        <div className="uppercase  ">
          <Link to={`/ramas/${row.original.id}`} className="hover:underline">
            <p className="space-x-4 text-lg ">{getValue<string>()} </p>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "users",
      header: "Beneficiarios",
      size: 50,
      cell: ({ getValue }) => (
        <div className="uppercase text-center  flex items-center gap-2 justify-center">
          <TooltipComponent text="Activos">
            <b className="space-x-4 aspect-square  size-10 flex justify-center items-center bg-green-200 text-green-700 rounded">
              {getValue<TUser[]>().filter((u) => u.is_active).length}{" "}
            </b>
          </TooltipComponent>
          <TooltipComponent text="Bajas">
            <b className="space-x-4 aspect-square  size-10 flex justify-center items-center bg-red-200 text-red-700 rounded">
              {getValue<TUser[]>().filter((u) => !u.is_active).length}{" "}
            </b>
          </TooltipComponent>
          <TooltipComponent text="Becados">
            <b className="space-x-4 aspect-square  size-10 flex justify-center items-center bg-amber-200 text-amber-700 rounded">
              {getValue<TUser[]>().filter((u) => u.is_granted).length}{" "}
            </b>
          </TooltipComponent>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Cobrabilidad",
      size: 50,
      cell: ({ row }) => <CobrabilidadCell rama={row.original} />,
    },

    {
      accessorKey: "id",
      header: "",
      size: 10,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <AddUserAside rama={row.original} />
          <UserBulkUploader id_rama={row.original.id} size="sm" />
        </div>
      ),
    },
  ];

  if (!ramaQuery.data) return null;
  return <RootTable columns={columns} data={ramaQuery.data} />;
}
