import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCuotaPorHermanoSchema,
  type TCreateCuotaPorHermano,
} from "@/models/cuotaPorHermanos.schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateCPHMutation } from "@/queries/cuotaPorHermano.queries";
import { useAlert } from "@/context/AlertContext";

export function CuotasPorHermanoForm() {
  // Ajuste los valores predeterminados según el schema
  const form = useForm<TCreateCuotaPorHermano>({
    resolver: zodResolver(CreateCuotaPorHermanoSchema),
    defaultValues: {
      // Ejemplo de valores predeterminados. Actualice según su schema.
      cantidad: 0,
      valor: 0,
    },
  });

  const { mutate: createCPH, isPending: loading } = useCreateCPHMutation();
  const { showAlert } = useAlert();
  const onSubmit = async (data: TCreateCuotaPorHermano) => {
    createCPH(data, {
      onSuccess: () => {
        showAlert({
          title: "Nueva cuota por hermano creada",
          description: "",
          type: "success",
        });
        form.reset();
      },
      onError(error) {
        console.log("error creating  CPH", error);
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cantidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de hermanos</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el nombre"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    form.setValue("cantidad", parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor de cuota</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Valor de cuota"
                  {...field}
                  onChange={(e) =>
                    form.setValue("valor", parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={loading}>
          Crear Cuota
        </Button>
      </form>
    </Form>
  );
}
