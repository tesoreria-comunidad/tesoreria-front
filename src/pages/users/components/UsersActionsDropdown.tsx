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
  ArrowRightLeft,
  Coffee,
  EllipsisVertical,
  HeartHandshake,
  Trash2,
  Users,
} from "lucide-react";
import { UserStatusUpdateDialog } from "./table/components/UserStatusUpdateDialog";
import { UserGrantUpdateDialog } from "./table/components/UserGrantUpdateDialog";
import { UserEditFamilyDialog } from "./table/components/UserEditFamilyDialog";
import { UserEditInformationDialog } from "./table/components/UserEditInformationDialog";
import { UserRamaTransferDialog } from "./table/components/UserRamaTransferDialog";
import { UserDeleteDialog } from "./table/components/UserDeleteDialog";
import { useAppSelector } from "@/store/hooks";
import { hasPermission } from "@/utils";
import { RoleGuardWrapper } from "@/components/guards/RoleGuardWrapper";

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
  const [dialogType, setDialogType] = useState<
    "grant" | "status" | "family" | "edit" | "transfer" | "delete"
  >("status");

  const { user: userLogged } = useAppSelector((s) => s.session);

  const handleOpenDialog = (type: "grant" | "status" | "family" | "edit" | "transfer" | "delete") => {
    setDialogType(type);
    setOpenDropdown(false); // cerramos el dropdown
    setOpenDialog(true); // abrimos el dialog
  };

  if (!userLogged || !hasPermission(userLogged, user.id_rama ?? "")) {
    // Este es el caso en el que un dirigente esta logueado y está viendo un usuario que no es de su rama.
    return null;
  }
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
              e.preventDefault();
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

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // prevenimos que se cierre antes
              handleOpenDialog("edit"); // no sacar el <Coffee /> xq me gusta
            }}
          >
            <Coffee />
            Editar
          </DropdownMenuItem>

          {showFamilyOptions && (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleOpenDialog("family");
              }}
            >
              <Users />
              Modifcar Familia
            </DropdownMenuItem>
          )}

          <RoleGuardWrapper roles={["MASTER", "DIRIGENTE"]}>
            {user.id_rama && (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleOpenDialog("transfer");
                }}
              >
                <ArrowRightLeft />
                Traspasar
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleOpenDialog("delete");
              }}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <Trash2 />
              Eliminar
            </DropdownMenuItem>
          </RoleGuardWrapper>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {dialogType === "grant" && <UserGrantUpdateDialog user={user} />}
        {dialogType === "status" && <UserStatusUpdateDialog user={user} />}
        {dialogType === "family" && <UserEditFamilyDialog user={user} />}
        {dialogType === "edit" && <UserEditInformationDialog user={user} />}
        {dialogType === "transfer" && <UserRamaTransferDialog user={user} />}
        {dialogType === "delete" && (
          <UserDeleteDialog user={user} onClose={() => setOpenDialog(false)} />
        )}
      </Dialog>
    </>
  );
}
