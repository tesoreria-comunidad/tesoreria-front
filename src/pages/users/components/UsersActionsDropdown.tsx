import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";

import type { TUser } from "@/models";
import {
  ArrowBigDown,
  ArrowBigUp,
  HeartHandshake,
  MenuSquare,
} from "lucide-react";
import { UserStatusUpdateDialog } from "./table/UserStatusUpdateDialog";
import { UserGrantUpdateDialog } from "./table/UserGrantUpdateDialog";

interface UsersActionsDropdownProps {
  user: TUser;
}

export default function UsersActionsDropdown({
  user,
}: UsersActionsDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"grant" | "status">("status");

  const handleOpenDialog = (type: "grant" | "status") => {
    setDialogType(type);
    setOpenDropdown(false); // cerramos el dropdown
    setOpenDialog(true); // abrimos el dialog
  };

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger
          asChild
          className="flex justify-center text-center"
        >
          <Button variant={"ghost"} className="mx-auto" size={"icon"}>
            <MenuSquare className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>
            {user.last_name}, {user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Item que abre el dialog */}
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // prevenimos que se cierre antes
              handleOpenDialog("status");
            }}
          >
            {user.is_active ? (
              <>
                <ArrowBigDown />
                Dar de Baja
              </>
            ) : (
              <>
                <ArrowBigUp />
                Dar de Alta
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // prevenimos que se cierre antes
              handleOpenDialog("grant");
            }}
          >
            {user.is_granted ? (
              <>
                <HeartHandshake />
                Quitar Becar
              </>
            ) : (
              <>
                <HeartHandshake />
                Becar
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {dialogType === "grant" ? (
          <UserGrantUpdateDialog user={user} />
        ) : (
          <UserStatusUpdateDialog user={user} />
        )}
      </Dialog>
    </>
  );
}
