import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut, Moon, SquareUser, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function UserSessionCard() {
  const { user } = useAppSelector((s) => s.session);
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  const handleLogout = () => {
    localStorage.clear();
    location.replace("/login");
  };

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="
            flex items-center justify-between w-full gap-2 
            rounded-md p-2
            bg-card text-card-foreground
            border border-border
            hover:bg-muted transition-colors duration-200
          "
        >
          <div className="flex gap-2 items-center">
            <SquareUser className="size-10 text-primary" />
            <div className="flex flex-col items-start leading-tight">
              <p className="font-semibold">
                {user.name}, {user.last_name}
              </p>
              <p className="text-xs font-light text-muted-foreground">
                {user.email}
              </p>
              <p className="text-xs font-light text-muted-foreground uppercase">
                {user.role}
              </p>
            </div>
          </div>
          <EllipsisVertical className="text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-card text-card-foreground border border-border"
        >
          <DropdownMenuLabel className="text-sm font-medium text-foreground">
            {user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem className="hover:bg-muted">Perfil</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-muted">Rama</DropdownMenuItem>

          <DropdownMenuItem
            onClick={toggleTheme}
            className="hover:bg-muted flex justify-center items-center !p-2">
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-primary" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-400" />
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:bg-destructive hover:text-destructive-foreground flex items-center gap-2"
          >
            <p>Salir</p>
            <LogOut className="w-4 h-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
