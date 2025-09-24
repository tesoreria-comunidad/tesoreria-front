import { Button } from "@/components/ui/button";
import type { TCuotaPorHemanos } from "@/models/cuotaPorHermanos.schema";
import { formatCurrency } from "@/utils";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useEditCPHMutation } from "@/queries/cuotaPorHermano.queries";
import { useAlert } from "@/context/AlertContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CPHCard({ cph }: { cph: TCuotaPorHemanos }) {
  const [newValue, setNewValue] = useState(cph.valor);

  const { mutate: editCPH, isPending: loading } = useEditCPHMutation();
  const { showAlert } = useAlert();
  const submitChanges = () => {
    editCPH(
      {
        body: {
          valor: newValue,
        },
        id: cph.id,
      },
      {
        onSuccess() {
          showAlert({
            title: "Cuota Por Hermano actualizada",
            description: "",
            type: "success",
          });
        },
        onError(error) {
          console.log("Error Updating CPH:", error);
          showAlert({
            title: "Hubo un error",
            description:
              "Error al intentar actualizar cuota por hermano, intentar mas tarde.",
            type: "error",
          });
        },
      }
    );
  };
  return (
    <>
      <div className="bg-accent p-2 rounded-md text-gray-800  flex justify-between items-center gap-2">
        <div className="flex  gap-2 ">
          <span>Hermanos: </span>
          <strong>{cph.cantidad}</strong>
          <>-</>
          <span>{formatCurrency(cph.valor)}</span>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant={"outline"}>
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cuotas Por Hermanos: {cph.cantidad}</DialogTitle>
              <DialogDescription>
                Aquí podrás modificar el valor a cobrar para aquellas familias
                que tengan {cph.cantidad} de integrantes activos y no becados
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label>Canitdad de hermanos</Label>
              <Input value={cph.cantidad} disabled />
            </div>
            <div className="space-y-2">
              <Label>Valor</Label>
              <Input
                value={newValue}
                onChange={(e) => setNewValue(parseInt(e.target.value))}
              />
            </div>
            <Label>{formatCurrency(newValue)}</Label>

            <DialogFooter>
              <DialogClose>
                <Button variant={"outline"}>Canclear</Button>
              </DialogClose>
              <Button
                onClick={submitChanges}
                isLoading={loading}
                disabled={newValue === cph.valor}
              >
                Actualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
