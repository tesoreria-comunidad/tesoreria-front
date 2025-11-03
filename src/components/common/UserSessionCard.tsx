import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>
              {user.name[0]}
              {user.last_name[0]}
            </AvatarFallback>
          </Avatar>
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
            className="hover:bg-muted flex justify-center items-center !p-2"
          >
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
