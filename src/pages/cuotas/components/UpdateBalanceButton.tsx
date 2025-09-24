import { useAppSelector } from "@/store/hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BanknoteArrowUp } from "lucide-react";
import { formatCurrency } from "@/utils";
import { BalanceServices } from "@/services/balance.service";
import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useCuotasQuery } from "@/queries/cuota.queries";
export function UpdateBalanceButton() {
  const { user } = useAppSelector((s) => s.session);
  const { data: cuotas } = useCuotasQuery();
  const currentCuota = cuotas?.find((c) => c.is_active);
  const { data: families } = useFamiliesQuery();
  const [loading, setLoading] = useState(false);
  if (user && user.role !== "MASTER") return null;

  const activeFamilies = families?.filter(
    (f) => f.users.filter((u) => u.is_active).length > 0
  );

  const { showAlert } = useAlert();
  const submitChanges = async () => {
    try {
      setLoading(true);
      const res = await BalanceServices.updateAllBalances();
      console.log("updateAllBalances", res);
      showAlert({
        title: res.message,
        description: "",
        type: "success",
      });
    } catch (err) {
      console.log("Error acutalizando todos los balances", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <BanknoteArrowUp /> Actualizar Balances
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BanknoteArrowUp /> Actualizar Balances
          </DialogTitle>
          <DialogDescription>
            Con esta acción se actualizarán los balances de todas las familias.
            <br />
          </DialogDescription>

          <div className="flex items-center gap-2">
            Valor de cuota: <p>{formatCurrency(currentCuota?.value || 0)}</p>
          </div>
          <div className="flex items-center gap-2">
            Cantidad de familias: <p>{activeFamilies?.length}</p>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={submitChanges} isLoading={loading}>
            Confimrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
