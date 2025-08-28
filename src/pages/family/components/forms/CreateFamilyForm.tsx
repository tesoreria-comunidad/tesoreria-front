import { useForm } from "react-hook-form";
import { CreateFamilySchema, type TCreateFamily } from "@/models";
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
import { useFamilyQueries } from "@/queries/family.queries";
import { useAppSelector } from "@/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function CreateFamilyForm() {
  const [loading, setLoading] = useState(false);
  const { inmutableRamas } = useAppSelector((s) => s.ramas);
  const [ramaId, setRamaId] = useState<string>("");
  const form = useForm<TCreateFamily>({
    resolver: zodResolver(CreateFamilySchema),
    defaultValues: {
      name: "",
      phone: "",
      users: [],
      manage_by: "",
    },
  });

  const { createFamily } = useFamilyQueries();
  const onSubmit = async (values: TCreateFamily) => {
    try {
      setLoading(true);

      const body = {
        name: values.name,
        phone: values.phone,
        users: values.users,
        manage_by: values.manage_by,
      };
      await createFamily(body);
      form.reset();
    } catch (error) {
      console.log("Error creating user", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRamaChange = (value: string) => {
    setRamaId(value);
    form.setValue("manage_by", value);
  };
  console.log(form.getValues("manage_by"));
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido de la familia</FormLabel>
              <FormControl>
                <Input
                  placeholder="Familia"
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
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Rama encargada de la cobrabilidad</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => handleRamaChange(value)}
                  value={ramaId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rama" />
                  </SelectTrigger>
                  <SelectContent>
                    {inmutableRamas.map((rama) => (
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono de contacto</FormLabel>
              <FormControl>
                <Input placeholder="Telefono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={loading}>
          Crear
        </Button>
      </form>
    </Form>
  );
}
