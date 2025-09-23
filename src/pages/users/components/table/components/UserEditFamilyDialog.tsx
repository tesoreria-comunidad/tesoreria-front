import type { TUser } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEditUserMutation } from "@/queries/user.queries";
import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { UserCircle, UserPlus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppSelector } from "@/store/hooks";
import { useFamilyQueries } from "@/queries/family.queries";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserEditFamilyDialog({ user }: { user: TUser }) {
  const { mutate, isPending } = useEditUserMutation();
  const { showAlert } = useAlert();
  const [createNewFamily, setCreateNewFamily] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState("");
  const [selectedFamilyId, setSelectedFamilyId] = useState("");

  const { inmutableFamilies } = useAppSelector((s) => s.family);
  const { createFamily } = useFamilyQueries();
  const prevFamily = inmutableFamilies.find((f) => f.id === user.id_family);
  const submitChanges = async () => {
    if (!prevFamily) return;

    try {
      let familyId = selectedFamilyId;

      if (createNewFamily) {
        const newFamilyResponse = await createFamily({
          name: newFamilyName,
          phone: "",
          manage_by: prevFamily.manage_by,
        });
        familyId = newFamilyResponse.id;
      }

      mutate(
        {
          body: { id_family: familyId },
          userId: user.id,
        },
        {
          onSuccess: () => {
            showAlert({
              title: `Usuario dado de ${
                user.is_active ? "baja" : "alta"
              } exitosamente`,
              description: "POR FAVOR ACTUALICE LA PAGINA",
              type: "success",
            });
          },
          onError: (error) => {
            console.log("Error editing family", error);
            showAlert({
              title: "Hubo un error al dar de baja el usuario",
              description: "Vuelva a intentarlo mas tarde",
              type: "error",
            });
          },
        }
      );
    } catch (error) {
      console.log("Error editing family", error);
    }
  };

  const user_fullName = `${user.name} ${user.last_name}`;
  return (
    <DialogContent className="sm:max-w-[50vw]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Modificar Familia
        </DialogTitle>
        <div className="flex items-center gap-2 my-2">
          <UserCircle />
          <p>{user_fullName}</p>
        </div>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <Select disabled={createNewFamily} onValueChange={setSelectedFamilyId}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Seleccionar una familia" />
        </SelectTrigger>
        <SelectContent>
          {inmutableFamilies.map((family) => (
            <SelectItem key={family.id} value={family.id.toString()}>
              {family.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <section className="space-y-2 relative">
        <section className=" z-10  flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 ">
          <div className="space-y-0.5">
            <Label>Crear Familia Nueva</Label>
            <span className="text-xs text-muted-foreground">
              Activando esto podras crear una nueva familia para {user_fullName}
            </span>
          </div>

          <Switch
            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700"
            checked={createNewFamily}
            onCheckedChange={() => setCreateNewFamily(!createNewFamily)}
          />
        </section>
        <section
          className={`flex  items-start justify-between rounded-lg border p-3 shadow-sm transition-all   duration-300  z-0 ${
            createNewFamily
              ? "w-full"
              : "  opacity-0 translate-y-[-110%] absolute "
          }`}
        >
          <div className="space-y-0.5  ">
            <Label>
              {" "}
              <UserPlus className="size-4" /> Familia Nueva{" "}
            </Label>
            <span className="text-xs text-muted-foreground">
              Definir el nombre de la nueva familia.
            </span>
          </div>

          <div className="">
            <Input
              className="sm:w-72"
              disabled={!createNewFamily}
              placeholder="Nombre de la familia "
              value={newFamilyName}
              onChange={(e) => {
                setNewFamilyName(e.target.value);
              }}
            />
          </div>
        </section>
      </section>

      <DialogFooter>
        <DialogClose>
          <Button disabled={isPending} variant={"secondary"}>
            cancelar
          </Button>
        </DialogClose>
        <Button onClick={submitChanges} isLoading={isPending}>
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
