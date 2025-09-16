import { useAppSelector } from "@/store/hooks";

export function CobrabilidadCell({ ramaId }: { ramaId: string }) {
  const { inmutableUsers } = useAppSelector((s) => s.users);
  const users = inmutableUsers.filter((u) => u.id_rama === ramaId);
  // Calculate the number of active users
  const activeUsers = users.filter((user) => user.is_active).length;
  // Calculate the cobrabilidad percentage
  const cobrabilidad =
    users.length === 0 ? 0 : (activeUsers / users.length) * 100;
  // Format the percentage to one decimal place
  const formattedCobrabilidad = cobrabilidad.toFixed(1);
  return (
    <div className="uppercase text-center ">
      <div className="bg-orange-200 text-orange-600 font-semibold w-1/4 mx-auto p-1 rounded-md">
        {formattedCobrabilidad}%
      </div>
    </div>
  );
}
