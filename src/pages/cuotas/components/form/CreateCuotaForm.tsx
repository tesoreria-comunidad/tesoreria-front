import { CreateCuotaSchema, type TCreateCuota } from "@/models";
import { useCreateCuotaMutation } from "@/queries/cuota.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils";
import { useAlert } from "@/context/AlertContext";
export function CreateCuotaForm() {
  const form = useForm<TCreateCuota>({
    resolver: zodResolver(CreateCuotaSchema),
    defaultValues: {
      value: 0,
    },
  });

  const { showAlert } = useAlert();
  const { mutate: createCuota, isPending: loading } = useCreateCuotaMutation();
  function onSubmit(values: TCreateCuota) {
    createCuota(values, {
      onSuccess() {
        showAlert({
          title: "Nueva cuota creada",
          description: "El valor de la cuota se actualizó",
          type: "success",
        });
      },
      onError(error) {
        console.log("Error creating rama", error);
        showAlert({
          title: "Error al crear cuota",
          description: "",
          type: "error",
        });
      },
    });
  }

  const handleInputChange = (name: keyof TCreateCuota, value: string) => {
    form.setValue(name, Number(value));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-8 flex flex-col justify-between h-full"
      >
        <section className="space-y-8">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuota</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de la rama"
                    {...field}
                    type="number"
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                  />
                </FormControl>
                <FormDescription>
                  {formatCurrency(Number(form.getValues("value")))}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Button type="submit" isLoading={loading}>
          Crear
        </Button>
      </form>
    </Form>
  );
}
