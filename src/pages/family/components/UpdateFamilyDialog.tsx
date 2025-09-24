import { Button } from "@/components/ui/button";
import type { TFamily } from "@/models";
import { PenBoxIcon, Settings } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { formatCurrency } from "@/utils";
import { useAlert } from "@/context/AlertContext";
import { BalanceDetailsCard } from "./BalanceDetailsCard";
import { FamilyUsersTable } from "./table/FamilyUsers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditFamilyMutation } from "@/queries/family.queries";
import {
  useBalanceByIdQuery,
  useUpdateBalanceMutation,
} from "@/queries/balance.queries";
import { useRamasQuery } from "@/queries/ramas.queries";
interface UpdateFamilyDialogProps {
  family: TFamily;
  id_balance: string;
  viewBalanceData?: boolean;
}
export function UpdateFamilyDialog({
  family,
  id_balance,
  viewBalanceData = false,
}: UpdateFamilyDialogProps) {
  const { data: balance } = useBalanceByIdQuery(id_balance);
  const { data: ramas } = useRamasQuery();

  if (!ramas || !balance) return null;
  const familyRama = ramas?.find((r) => r.id === family.manage_by);
  const [isCustomCuota, setIsCustomCuota] = useState(balance?.is_custom_cuota);
  const [selectedRamaId, setSelectedRamaId] = useState(family.manage_by);
  const [familyName, setFamilyName] = useState(family.name);
  const [customCuotaValue, setCustomCuotaValue] = useState(
    balance?.custom_cuota ? balance.custom_cuota : 0
  );
  const { showAlert } = useAlert();
  const { mutate: editFamily, isPending: loading } = useEditFamilyMutation();
  const balanceMutationQuery = useUpdateBalanceMutation();
  const handleSubmit = async () => {
    if (
      balance.is_custom_cuota !== isCustomCuota ||
      balance.custom_cuota !== customCuotaValue
    ) {
      await balanceMutationQuery.mutateAsync({
        body: {
          is_custom_cuota: isCustomCuota,
          custom_cuota: customCuotaValue,
        },
        id: family.id_balance!,
      });
    }
    editFamily(
      {
        body: {
          name: familyName,
          manage_by: selectedRamaId,
          phone: "+54",
        },
        familyId: family.id,
      },
      {
        onSuccess() {
          showAlert({
            type: "success",
            title: "Familia actualizada",
            description: " La familia ha sido actualizada exitosamente.",
          });
        },
        onError(error) {
          console.error("Error updating family:", error);
          showAlert({
            type: "error",
            title: "Error actualizando la familia",
            description: " Por favor intenta de nuevo.",
          });
        },
      }
    );
  };

  const areChanges =
    family.name !== familyName ||
    balance?.is_custom_cuota !== isCustomCuota ||
    balance?.custom_cuota !== customCuotaValue ||
    family.manage_by !== selectedRamaId;
  return (
    <div>
      <Dialog>
        <form onSubmit={handleSubmit}>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>
              <Settings />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[50vw]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PenBoxIcon className="size-5" /> Familia
              </DialogTitle>
              <DialogDescription>
                Cobrabilidad a cargo de la rama{" "}
                <strong> {familyRama?.name}</strong>
              </DialogDescription>
            </DialogHeader>

            {viewBalanceData && (
              <section className="flex flex-col gap-4 py-4">
                <div className="w-full flex items-center">
                  {balance && <BalanceDetailsCard family={family} viewOnly />}
                </div>
              </section>
            )}
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Rama a cargo de la cobrabilidad</Label>
                <Select
                  value={selectedRamaId}
                  onValueChange={setSelectedRamaId}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Seleccionar una familia" />
                  </SelectTrigger>
                  <SelectContent>
                    {ramas.map((rama) => (
                      <SelectItem key={rama.id} value={rama.id.toString()}>
                        {rama.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <section className="flex flex-col gap-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label>Nombre</Label>
                  <Input
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>
                    Integrantes del grupo familiar ({family.users.length})
                  </Label>
                  <FamilyUsersTable users={family.users} />
                </div>
              </div>

              <Separator />
              <div className="">
                <div className="space-y-2 relative">
                  <Label>Configuracion de balances y cuota</Label>
                  <section className=" z-10  flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 ">
                    <div className="space-y-0.5">
                      <Label>Cuota Personalizada</Label>
                      <span className="text-xs text-muted-foreground">
                        Activando esto podras definir una cuota personalizada
                        sobre el balance de la familia {family.name}
                      </span>
                    </div>

                    <Switch
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700"
                      checked={isCustomCuota}
                      onCheckedChange={() => setIsCustomCuota(!isCustomCuota)}
                    />
                  </section>

                  <section
                    className={`flex  items-start justify-between rounded-lg border p-3 shadow-sm transition-all   duration-300  z-0 ${
                      isCustomCuota
                        ? "w-full"
                        : "  opacity-0 translate-y-[-110%] absolute "
                    }`}
                  >
                    <div className="space-y-0.5  ">
                      <Label>Valor de Cuota Personalizada</Label>
                      <span className="text-xs text-muted-foreground">
                        Determinar el valor de cuota para este grupo familiar
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 items-start">
                      <Input
                        disabled={!isCustomCuota}
                        type="number"
                        placeholder="Valor de cuota "
                        value={customCuotaValue}
                        onChange={(e) => {
                          console.log("value", e.target.value);
                          setCustomCuotaValue(parseInt(e.target.value));
                        }}
                      />

                      <span className="text-sm text-gray-500 ml-2">
                        {formatCurrency(customCuotaValue || 0)}
                      </span>
                    </div>
                  </section>
                </div>
              </div>
            </section>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                isLoading={loading}
                disabled={!areChanges}
              >
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
