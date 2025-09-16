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
  EllipsisVertical,
  HeartHandshake,
  Users,
} from "lucide-react";
import { UserStatusUpdateDialog } from "./table/components/UserStatusUpdateDialog";
import { UserGrantUpdateDialog } from "./table/components/UserGrantUpdateDialog";
import { UserEditFamilyDialog } from "./table/components/UserEditFamilyDialog";

interface UsersActionsDropdownProps {
  user: TUser;
  showFamilyOptions?: boolean;
}

export default function UsersActionsDropdown({
  user,
  showFamilyOptions = false,
}: UsersActionsDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"grant" | "status" | "family">(
    "status"
  );

  const handleOpenDialog = (type: "grant" | "status" | "family") => {
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
          <Button variant="ghost">
            <EllipsisVertical />
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

          {showFamilyOptions && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // prevenimos que se cierre antes
                handleOpenDialog("family");
              }}
            >
              <Users />
              Modifcar Familia
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {dialogType === "grant" && <UserGrantUpdateDialog user={user} />}
        {dialogType === "status" && <UserStatusUpdateDialog user={user} />}
        {dialogType === "family" && <UserEditFamilyDialog user={user} />}
      </Dialog>
    </>
  );
}
