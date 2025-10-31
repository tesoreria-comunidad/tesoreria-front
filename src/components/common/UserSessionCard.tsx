import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut, SquareUser } from "lucide-react";

export default function UserSessionCard() {
  const { user } = useAppSelector((s) => s.session);

  if (!user) return;

  const handleLogout = () => {
    localStorage.clear();
    location.replace("/login");
  };
  return (
    <div className=" w-full  ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between  w-full  gap-2 bg-gray-100  p-2 text-gray-700">
          <div className="flex gap-1">
            <SquareUser className="size-10 " />
            <div className="flex flex-col items-start ">
              <p className="font-semibold "> {user.name}, {user.last_name}</p>
              <p className="text-xs font-light">{user.email}</p>
              <p className="text-xs font-light">{user.role}</p>
            </div>
          </div>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Rama</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <div className="flex items-center gap-2">
              <p>Salir</p>
              <LogOut />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
