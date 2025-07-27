import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserIcon, LogOut } from "lucide-react";

export default function UserSessionCard() {
  const { user } = useAppSelector((s) => s.session);

  if (!user) return;

  const handleLogout = () => {
    localStorage.clear();
    location.replace("/login");
  };
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center  gap-2 bg-primary-2 rounded-lg p-2 px-4 text-white">
          <CircleUserIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
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
