import { RootTable } from "@/components/common/table";
import type { TRama, TUser } from "@/models";
import { useAppSelector } from "@/store/hooks";
import type { ColumnDef } from "@tanstack/react-table";
import { AddUserAside } from "../AddUserAside";
import { Link } from "react-router";
import { UserBulkUploader } from "../UsersBulkUploader";
import { CobrabilidadCell } from "./components/CobrabilidadCell";

export function RamasTable() {
  const { ramas } = useAppSelector((s) => s.ramas);
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
        <div className="uppercase text-center ">
          <b className="space-x-4">{getValue<TUser[]>().length} </b>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Cobrabilidad",
      size: 50,
      cell: ({ getValue }) => <CobrabilidadCell ramaId={getValue<string>()} />,
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
  return <RootTable columns={columns} data={ramas} />;
}
