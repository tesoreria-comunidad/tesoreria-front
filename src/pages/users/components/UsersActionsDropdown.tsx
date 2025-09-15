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
  Edit2Icon,
  HeartHandshake,
  MenuSquare,
} from "lucide-react";
import { UserStatusUpdateDialog } from "./table/UserStatusUpdateDialog";
import { UserGrantUpdateDialog } from "./table/UserGrantUpdateDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserEditSheet } from "./UserEditSheet";

interface UsersActionsDropdownProps {
  user: TUser;
}

export default function UsersActionsDropdown({
  user,
}: UsersActionsDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"grant" | "status" | "edit">(
    "status"
  );
  const [openSheet, setOpenSheet] = useState(false);

  const handleOpenDialog = (type: "grant" | "status" | "edit") => {
    setDialogType(type);
    setOpenDropdown(false); // cerramos el dropdown
    if (type === "edit") {
      setOpenSheet(true);
    } else {
      setOpenDialog(true);
    } // abrimos el dialog
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
                Quitar Beca
              </>
            ) : (
              <>
                <HeartHandshake />
                Becar
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // prevenimos que se cierre antes
              handleOpenDialog("edit");
            }}
          >
            <Edit2Icon />
            Editar
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

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Usuario</SheetTitle>
          </SheetHeader>
          <UserEditSheet user={user} />
        </SheetContent>
      </Sheet>
    </>
  );
}
