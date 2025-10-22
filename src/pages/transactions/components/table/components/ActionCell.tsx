import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TTransaction } from "@/models/transaction.schema";
import { MenuIcon, PenIcon, Trash2Icon } from "lucide-react";
import { Fragment, useState } from "react";
import EditTransactionDialog from "./EditTransactionAside";
import { Dialog } from "@/components/ui/dialog";
import { DeleteTransactionDialog } from "./DeleteTransactionDialog";

type actionType = "edit" | "delete";
interface ActionCellProps {
  transaction: TTransaction;
}
export function ActionCell({ transaction }: ActionCellProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<actionType>("edit");

  const handleOpenDialog = (type: actionType) => {
    setDialogType(type);
    setOpenDropdown(false); // cerramos el dropdown
    setOpenDialog(true); // abrimos el dialog
  };

  const closeDialog = () => {
    setOpenDropdown(false);
    setOpenDialog(false);
  };
  return (
    <Fragment>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // prevenimos que se cierre antes
              handleOpenDialog("edit");
            }}
          >
            <div className="flex items-center gap-2">
              <PenIcon />
              Editar
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault(); // prevenimos que se cierre antes
              handleOpenDialog("delete");
            }}
          >
            <div className="flex items-center gap-2">
              <Trash2Icon />
              Eliminar
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {dialogType === "edit" ? (
          <EditTransactionDialog transaction={transaction} />
        ) : null}
        {dialogType === "delete" ? (
          <DeleteTransactionDialog
            transaction={transaction}
            closeDialog={closeDialog}
          />
        ) : null}
      </Dialog>
    </Fragment>
  );
}
