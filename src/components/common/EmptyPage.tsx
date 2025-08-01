import { BrushCleaning } from "lucide-react";

export function EmptyPage() {
  return (
    <div className="size-full flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center text-gray-500">
        <BrushCleaning className="size-32" />
        <p>No hay información cargada en esta página</p>
      </div>
    </div>
  );
}
