import { useForm } from "react-hook-form";
import { CreateUserSchema, type TCreateUser } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ROLE_VALUES, type TRole } from "@/constants/role.constants";
import {
  FAMILY_ROLE_VALUES,
  type TFamilyRole,
} from "@/constants/familiy-role.constants";
import { GENDER_OPTIONS, type TGender } from "@/constants/gender.constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateUserMutation } from "@/queries/user.queries";
import { DatePickerField } from "@/components/common/DatePickerField";
import { useAppSelector } from "@/store/hooks";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useFamiliesQuery } from "@/queries/family.queries";

export function CreateUserForm({ idRama }: { idRama?: string }) {
  const { user } = useAppSelector((s) => s.session);
  const { data: families } = useFamiliesQuery();
  const { data: ramas } = useRamasQuery();
  const createUserMutation = useCreateUserMutation();
  const form = useForm<TCreateUser>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "BENEFICIARIO",
      family_role: "MEMBER", // ajustá al default que uses
      name: "",
      last_name: "",
      address: "",
      phone: "",
      gender: "HOMBRE", // ajustá al default que uses
      dni: "",
      birthdate: "", // si preferís Date -> cambia el schema
      citizenship: "Argentina",
      id_family: "", // lo convertimos a null si viene vacío
      id_rama: idRama,
    },
  });

  const onSubmit = async (values: TCreateUser) => {
    const body: TCreateUser = {} as TCreateUser;
    Object.keys(values).forEach((key) => {
      //@ts-ignore
      if (values[key]) {
        //@ts-ignore
        body[key] = values[key].trim();
      }
    });
    createUserMutation.mutate(body, {
      onSuccess: () => {
        form.reset(); // limpiar form después de crear
      },
      onError: (error) => {
        console.log("Error creating user", error);
      },
    });
  };

  const userRole = user?.role;

  console.log("dirigente123", form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        {/* Sección: Credenciales */}
        <div className="space-y-4 rounded-xl border p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Credenciales
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="usuario.ejemplo"
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userRole === "MASTER" && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value as TRole)
                        }
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_VALUES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
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
            {userRole === "MASTER" && (
              <FormField
                control={form.control}
                name="id_rama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rama</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rama" />
                        </SelectTrigger>
                        <SelectContent>
                          {ramas?.map((rama) => (
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
          </div>
        </div>

        {/* Sección: Datos personales */}
        <div className="space-y-4 rounded-xl border p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Datos personales
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      {...field}
                      autoComplete="given-name"
                    />
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
                    <Input
                      placeholder="Apellido"
                      {...field}
                      autoComplete="family-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Documento"
                      {...field}
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={() => (
                <DatePickerField
                  control={form.control}
                  name="birthdate"
                  label="Fecha de nacimiento"
                  placeholder="Seleccionar fecha"
                  disableFuture
                />
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value as TGender)
                      }
                      value={field.value}
                    >
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
          </div>
        </div>

        {/* Sección: Contacto y domicilio */}
        <div className="space-y-4 rounded-xl border p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Contacto y domicilio
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+54 9 ..."
                      {...field}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Calle, número, ciudad, provincia"
                      {...field}
                      autoComplete="street-address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Sección: Grupo familiar */}
        <div className="space-y-4 rounded-xl border p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Grupo familiar
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="family_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol en la familia</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value as TFamilyRole)
                      }
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol familiar" />
                      </SelectTrigger>
                      <SelectContent>
                        {FAMILY_ROLE_VALUES.map((fr) => (
                          <SelectItem key={fr} value={fr}>
                            {fr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_family"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Familia (opcional)</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar familia" />
                      </SelectTrigger>
                      <SelectContent>
                        {families?.map((family) => (
                          <SelectItem key={family.id} value={family.id}>
                            {family.name}
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
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={createUserMutation.isPending}
          >
            Limpiar
          </Button>
          <Button type="submit" isLoading={createUserMutation.isPending}>
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
}
