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
import {
  CreateTransactionSchema,
  type TCreateTransaction,
} from "@/models/transaction.schema";
import {
  PAYMENT_METHODS_OPTIONS,
  type TPaymentMethod,
} from "@/constants/payment-method.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils";
import { useAlert } from "@/context/AlertContext";
import { DatePickerField } from "@/components/common/DatePickerField";
import type { TBalance, TFamily } from "@/models";
import { useCreateTransactionCuotaFamilyMutation } from "@/queries/transactions.queries";
import { CuotaUploadInformation } from "./CuotaUploadInformation";

export function CuotaPaymentForm({
  family,
  balance,
}: {
  family: TFamily;
  balance: TBalance;
}) {
  const form = useForm<TCreateTransaction>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      amount: Math.abs(balance.value),
      category: "CUOTA",
      concept: "",
      description: "",
      direction: "INCOME",
      id_family: family.id,
      payment_date: new Date().toISOString(),
      payment_method: "TRANSFERENCIA",
    },
  });

  const { showAlert } = useAlert();
  const createCuotaMutation = useCreateTransactionCuotaFamilyMutation();

  async function onSubmit(values: TCreateTransaction) {
    createCuotaMutation.mutate(
      {
        ...values,
        payment_date: values.payment_date
          ? new Date(values.payment_date).toISOString()
          : new Date().toISOString(),
      },
      {
        onSuccess: () => {
          showAlert({
            title: "Movimiento cargado",
            description: "",
            type: "success",
          });
          form.reset(); // limpiar form si querés
        },
        onError: () => {
          showAlert({
            title: "Error al cargar nuevo movimiento",
            description: "Por favor revisar los datos cargados",
            type: "error",
          });
        },
      }
    );
  }

  const handleInputChange = (name: keyof TCreateTransaction, value: string) => {
    if (isNaN(Number(value))) return;
    form.setValue(name, Number(value));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex flex-col justify-between gap-4 h-full"
      >
        <div className="space-y-6 flex flex-col flex-1">
          <section className="space-y-8">
            <div className="flex flex-col w-full gap-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Monto"
                        {...field}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      {formatCurrency(form.getValues("amount"))}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <DatePickerField
                        control={form.control}
                        name={field.name}
                        label="Fecha"
                        placeholder="Seleccionar fecha"
                        disableFuture
                      />
                    </FormControl>
                    <FormDescription>
                      Fecha en la que se realizó esta transacción
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de pago</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          form.setValue(
                            "payment_method",
                            value as TPaymentMethod
                          )
                        }
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-[180px]"
                          value={field.value}
                        >
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_METHODS_OPTIONS.map((role) => (
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
            </div>

            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Concepto de este movimiento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descripción de este movimiento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <hr />
          <section className="flex-1 p-8">
            <CuotaUploadInformation values={form.watch()} />
          </section>
        </div>
        <Button type="submit" isLoading={createCuotaMutation.isPending}>
          Cargar Cuota
        </Button>
      </form>
    </Form>
  );
}
