import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateRamaSchema, type TUpdateRama, type TRama } from "@/models";
import { useUpdateRamaMutation } from "@/queries/ramas.queries";
import { useAlert } from "@/context/AlertContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PenBoxIcon } from "lucide-react";
import { useState } from "react";
import { RoleGuardWrapper } from "@/components/guards/RoleGuardWrapper";
import { GRUPO_LABELS } from "@/config/ramas.config";

interface EditRamaDialogProps {
  rama: TRama;
}

export function EditRamaDialog({ rama }: EditRamaDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: updateRama, isPending } = useUpdateRamaMutation();
  const { showAlert } = useAlert();

  const defaultValues = {
    name: rama.name,
    edad_min: rama.edad_min,
    edad_max: rama.edad_max,
  };

  const form = useForm<TUpdateRama>({
    resolver: zodResolver(UpdateRamaSchema),
    defaultValues,
  });

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) form.reset(defaultValues);
  };

  const onSubmit = (values: TUpdateRama) => {
    updateRama(
      { id: rama.id, body: values },
      {
        onSuccess() {
          showAlert({
            type: "success",
            title: "Rama actualizada",
            description: `Los datos de ${values.name} fueron guardados.`,
          });
          setOpen(false);
        },
        onError() {
          showAlert({
            type: "error",
            title: "Error al actualizar",
            description: "Ocurrió un error al guardar los cambios. Intentá de nuevo.",
          });
        },
      }
    );
  };

  return (
    <RoleGuardWrapper roles={["MASTER"]}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <PenBoxIcon className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PenBoxIcon className="size-5" />
              Editar rama
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la rama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="edad_min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad mínima</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 10"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : parseInt(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="edad_max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad máxima</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 14"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : parseInt(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Grupo{" "}
                <strong>{GRUPO_LABELS[rama.grupo]}</strong> · Posición{" "}
                <strong>{rama.orden}</strong> — estos valores no son editables.
              </p>

              <DialogFooter>
                <Button
                  type="submit"
                  isLoading={isPending}
                  disabled={!form.formState.isDirty}
                >
                  Guardar cambios
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </RoleGuardWrapper>
  );
}
