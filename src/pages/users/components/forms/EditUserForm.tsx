import { useForm } from "react-hook-form";
import { UpdateUserSchema, type TUpdateUser, type TUser } from "@/models";
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
import { useState } from "react";
import { ROLE_VALUES, type TRole } from "@/constants/role.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserQueries } from "@/queries/user.queries";

type EditUserAsideProps = {
  user: TUser;
};

export function EditUserForm({ user }: EditUserAsideProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      role: user?.role || "MASTER",
      username: user?.username || "",
      address: user?.address || "",
    },
  });

  const { updateUserQuery } = useUserQueries();
  const onSubmit = async (values: TUpdateUser) => {
    try {
      setLoading(true);
      if (!user?.id) return;
      await updateUserQuery({ id: user.id, data: values });
      form.reset();
    } catch (error) {
      console.log("Error creating user", error);
    } finally {
      setLoading(false);
    }
  };

  const userRole = user?.role;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre de usuario"
                  {...field}
                  autoComplete="additional-name webauthn"
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
                  autoComplete="additional-name webauthn"
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
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre Direccion 1234"
                  {...field}
                  autoComplete="additional-name webauthn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {userRole && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("role", value as TRole)
                    }
                    value={field.value}
                  >
                    <SelectTrigger className="w-[180px]" value={field.value}>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_VALUES.map((role) => (
                        <SelectItem value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" isLoading={loading}>
          Aceptar Cambios
        </Button>
      </form>
    </Form>
  );
}
