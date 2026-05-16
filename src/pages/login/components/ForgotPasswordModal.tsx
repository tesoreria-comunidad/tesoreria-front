import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/context/AlertContext";
import { useForgotPasswordMutation } from "@/queries/auth.queries";
import { CheckCircle2Icon } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Ingresá un correo electrónico válido"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ForgotPasswordModal({
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const { showAlert } = useAlert();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useForgotPasswordMutation();

  const onSubmit = (values: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        setSubmitted(true);
      },
      onError: () => {
        // Mostramos mensaje genérico para no revelar si el email existe
        setSubmitted(true);
        showAlert({
          title: "Solicitud enviada",
          description:
            "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
          type: "info",
        });
      },
    });
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      form.reset();
      setSubmitted(false);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recuperar contraseña</DialogTitle>
          <DialogDescription>
            Ingresá tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2Icon className="size-12 text-green-500" />
            <p className="font-medium text-gray-800">
              Si el correo está registrado, recibirás un enlace para restablecer
              tu contraseña en los próximos minutos.
            </p>
            <p className="text-sm text-gray-500">
              Revisá también tu carpeta de spam.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => handleOpenChange(false)}
            >
              Cerrar
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@correo.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={forgotPasswordMutation.isPending}
                >
                  Enviar enlace de recuperación
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
