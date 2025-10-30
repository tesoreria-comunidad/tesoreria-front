import type { TUser, TUpdateUser, TRama } from "@/models";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditUserMutation } from "@/queries/user.queries";
import { useAlert } from "@/context/AlertContext";
import { Edit } from "lucide-react";
import { UpdateUserSchema } from "@/models";
import { GENDER_OPTIONS, type TGender } from "@/constants/gender.constants";
import { useAppSelector } from "@/store/hooks";
import { useRamasQuery } from "@/queries/ramas.queries";

export function UserEditInformationDialog({ user }: { user: TUser }) {
  const { mutate, isPending } = useEditUserMutation();
  const { showAlert } = useAlert();
  const { user: currentUser } = useAppSelector((s) => s.session);
  const { data: ramas } = useRamasQuery();

  const form = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name,
      last_name: user.last_name,
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: user.gender as TGender,
      citizenship: user.citizenship || "Argentina",
      id_rama: user.id_rama || "",
    },
  });

  const onSubmit = (values: TUpdateUser) => { 
    mutate(
      { userId: user.id, body: values },
      {
        onSuccess() {
          showAlert({
            title: "Usuario actualizado",
            description: `${user.last_name}, ${user.name} fue modificado correctamente.`,
            type: "success",
          });
        },
        onError() {
          showAlert({
            title: "Error al actualizar usuario",
            description: "Ocurrió un problema al guardar los cambios.",
            type: "error",
          });
        },
      }
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Edit /> Editar información
        </DialogTitle>
        <DialogDescription>
          Modificá los datos personales y de contacto del usuario seleccionado.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="usuario@mail.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+54 9 ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle, número, ciudad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar género" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDER_OPTIONS.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {currentUser?.role === "MASTER" && (
            <FormField
              control={form.control}
              name="id_rama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rama</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rama" />
                      </SelectTrigger>
                      <SelectContent>
                        {ramas?.map((rama: TRama) => (
                          <SelectItem key={rama.id} value={rama.id}>
                            {rama.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nacionalidad</FormLabel>
                <FormControl>
                  <Input placeholder="Argentina" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="pt-4">
            <Button type="submit" isLoading={isPending}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
