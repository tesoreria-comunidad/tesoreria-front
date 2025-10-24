import NoDataIcon from "./icons/NoDataIcon";

export function EmptyData({
  text = "No hay informacion cargada",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center bg-accent p-10 rounded-2xl size-full text-gray-500">
      <NoDataIcon size={60} />

      <span>{text}</span>
    </div>
  );
}
