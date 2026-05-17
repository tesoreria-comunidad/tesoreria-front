import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
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
import { useMobile } from "@/context/MobileContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Newspaper, UnfoldVertical, XIcon } from "lucide-react";
import { FileServices } from "@/services/file.service";

export function CuotaPaymentForm({
  family,
  balance,
  onSuccess,
}: {
  family: TFamily;
  balance: TBalance;
  onSuccess?: () => void;
}) {
  const { isMobile } = useMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
    let fileKey: string | undefined;
    if (file) {
      try {
        setIsUploading(true);
        const fileRes = await FileServices.upload(file);
        fileKey = fileRes.fileKey;
      } catch {
        showAlert({
          title: "Error al subir el comprobante",
          description: "No se pudo subir el archivo. Por favor, intentá de nuevo.",
          type: "error",
        });
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    createCuotaMutation.mutate(
      {
        ...values,
        ...(fileKey ? { attachment: fileKey } : {}),
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
          form.reset();
          setFile(null);
          setPreview(null);
          onSuccess?.();
        },
        onError: () => {
          showAlert({
            title: "Error al cargar nuevo movimiento",
            description: "Por favor revisar los datos cargados",
            type: "error",
          });
        },
      },
    );
  }

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
      fileReader.readAsDataURL(selectedFile);
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`p-4 flex flex-col gap-4 h-full`}
      >
        <div
          className={`flex flex-col flex-1 ${
            isMobile ? "gap-4 " : "gap-4 max-h-[90%] overflow-auto"
          }`}
        >
          <section className={`${isMobile ? "space-y-4" : "space-y-8"}`}>
            <div className="flex flex-col">
              {preview && (
                <img
                  src={preview}
                  alt="Vista previa del comprobante"
                  className="aspect-square object-contain w-1/2 mx-auto"
                />
              )}
              {!preview && (
                <Button
                  onClick={handleButtonClick}
                  variant={"ghost"}
                  type="button"
                  className="flex flex-col items-center border-4 text-gray-500 border-dashed h-[200px]"
                >
                  <Newspaper className="size-16" />
                  <span>Cargar Comprobante</span>
                </Button>
              )}
              <Input
                type="file"
                accept="image/*"
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
                  <span>Borrar</span>
                  <XIcon className="size-4" />
                </Button>
              )}
            </div>

            <div
              className={`flex flex-col w-full ${isMobile ? "gap-4" : "gap-8"}`}
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Monto"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                      />
                    </FormControl>
                    {!isMobile && (
                      <FormDescription>
                        {formatCurrency(form.getValues("amount"))}
                      </FormDescription>
                    )}
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
                            value as TPaymentMethod,
                          )
                        }
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-[180px]"
                          value={field.value}
                        >
                          <SelectValue placeholder="Seleccionar" />
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
                    <Input placeholder="Concepto del pago" {...field} />
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
                      placeholder="Descripción del movimiento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {!isMobile && (
            <div className="p-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-accent/50 p-2 rounded">
                  <p>Ver Detalle</p>
                  <UnfoldVertical className="size-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <section>
                    <CuotaUploadInformation values={form.watch()} />
                  </section>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>

        <Button
          type="submit"
          isLoading={isUploading || createCuotaMutation.isPending}
          disabled={isUploading || createCuotaMutation.isPending}
        >
          Cargar Cuota
        </Button>
      </form>
    </Form>
  );
}
