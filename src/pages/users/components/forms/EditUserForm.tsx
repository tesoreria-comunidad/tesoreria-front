import { useForm } from "react-hook-form";
import {
  CreateUserSchema,
  UpdateUserSchema,
  type TCreateUser,
  type TUpdateUser,
} from "@/models";
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
import { useAppSelector } from "@/store/hooks";
import { ROLE_VALUES, type TRole } from "@/constants/role.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserQueries } from "@/queries/user.queries";
export function EditUserForm() {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((s) => s.session);
  const form = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      role: user?.role || "MASTER",
      username: user?.username || "",
    },
  });

  const { updateUser } = useUserQueries();
  const onSubmit = async (values: TUpdateUser) => {
    try {
      setLoading(true);
      if (!user?.id) return;
      await updateUser({ id: user.id, data: values });
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
        {userRole === "MASTER" && (
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
