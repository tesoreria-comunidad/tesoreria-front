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
import {
  DIRECTIONS_OPTIONS,
  type TDirectionOfTransaction,
} from "@/constants/transactions.constatns";
import { CategoryField } from "./compoents/CategoryField";
import { useAlert } from "@/context/AlertContext";
import { DatePickerField } from "@/components/common/DatePickerField";
import { useCreateTransactionMutation } from "@/queries/transactions.queries";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useRef, useState } from "react";
import { Newspaper, Paperclip, XIcon } from "lucide-react";
import { FileServices } from "@/services/file.service";

export function CreateTransactionForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: families } = useFamiliesQuery();

  const form = useForm<TCreateTransaction>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      amount: 0,
      category: "",
      concept: "",
      description: "",
      direction: "EXPENSE",
      id_family: null,
      payment_date: new Date().toISOString(),
      payment_method: "TRANSFERENCIA",
    },
  });

  const { showAlert } = useAlert();
  const createTransactionMutation = useCreateTransactionMutation();

  const onSubmit = async (values: TCreateTransaction) => {
    let fileKey;
    try {
      if (file) {
        const fileRes = await FileServices.upload(file);
        fileKey = fileRes.fileKey;
      }
      createTransactionMutation.mutate(
        {
          ...values,
          attachment: fileKey ? fileKey : "",
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
            form.reset(); // limpiar form después de crear
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
    } catch (error) {}
  };

  const handleInputChange = (name: keyof TCreateTransaction, value: string) => {
    if (isNaN(Number(value))) return;
    form.setValue(name, Number(value));
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result as string);
      fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
    } else {
      setPreview(null);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResetImageFile = () => {
    setPreview(null);
    setFile(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-8 flex flex-col justify-between h-full"
      >
        <section className="space-y-8 ">
          {preview && (
            <img
              src={preview}
              className=" aspect-square object-cover w-1/2 mx-auto"
            />
          )}
          <div className="flex flex-col">
            {!preview && (
              <Button
                onClick={handleButtonClick}
                variant={"ghost"}
                type="button"
                className=" flex flex-col items-center border-4 text-gray-500 border-dashed h-[250px]"
              >
                <Newspaper className="size-16 " />

                <span>Cargar Comporbante</span>
              </Button>
            )}
            <Input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {preview && (
              <Button
                variant={"secondary"}
                type="button"
                size={"sm"}
                onClick={handleResetImageFile}
              >
                <span>Borrar </span>
                <XIcon className="size-4" />
              </Button>
            )}
          </div>
          <div className="flex items-start gap-2">
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
                        form.setValue("payment_method", value as TPaymentMethod)
                      }
                      value={field.value}
                    >
                      <SelectTrigger className="w-[180px]" value={field.value}>
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

          <div className="flex gap-2">
            <CategoryField form={form} />
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue(
                          "direction",
                          value as TDirectionOfTransaction
                        )
                      }
                      value={field.value}
                    >
                      <SelectTrigger className="w-full" value={field.value}>
                        <SelectValue placeholder="Dirección " />
                      </SelectTrigger>
                      <SelectContent>
                        {DIRECTIONS_OPTIONS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d === "EXPENSE" ? "Gasto" : "Ingreso"}
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
                <FormItem className="flex-1">
                  <FormLabel>Familia</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("id_family", value)
                      }
                      value={field.value as string}
                    >
                      <SelectTrigger
                        className="w-full"
                        value={field.value as string}
                      >
                        <SelectValue placeholder="Familia " />
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

          <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concepto</FormLabel>
                <FormControl>
                  <Input placeholder="Concepto de este movimiento" {...field} />
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
        <Button type="submit" isLoading={createTransactionMutation.isPending}>
          Crear
        </Button>
      </form>
    </Form>
  );
}
