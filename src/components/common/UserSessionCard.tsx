import { useAppSelector } from "@/store/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { UserEditInformationDialog } from "@/pages/users/components/table/components/UserEditInformationDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export default function UserSessionCard() {
  const { user } = useAppSelector((s) => s.session);
  const { theme, toggleTheme } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

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

        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="text-sm font-medium text-foreground">
            {user.name}, {user.last_name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs font-medium text-foreground/80 ">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem className="hover:bg-muted" onClick={() => setOpenDialog(true)}>
            <Settings /> Perfil
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={toggleTheme}
            className="hover:bg-muted flex justify-start items-center !p-2"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 " />
            ) : (
              <Sun className="w-4 h-4 text-yellow-400" />
            )}
          <p>Modo</p>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border" />

          <DropdownMenuItem
            onClick={handleLogout}
            className=" hover:text-destructive-foreground flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <p>Salir</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <UserEditInformationDialog user={user} />
      </Dialog>
    </div>
  );
}
