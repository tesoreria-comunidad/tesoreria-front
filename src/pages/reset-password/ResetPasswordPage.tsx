import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMobile } from "@/context/MobileContext";
import {
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} from "@/queries/auth.queries";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string().min(1, "Confirmá tu contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isMobile } = useMobile();

  const token = searchParams.get("token") ?? "";

  const { data: tokenValidation, isLoading: isValidating } =
    useValidateResetTokenQuery(token);

  const resetPasswordMutation = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isTokenInvalid =
    !token || (!isValidating && tokenValidation?.valid === false);
  const isSuccess = resetPasswordMutation.isSuccess;

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const onSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(
      { token, newPassword: values.newPassword },
      {
        onSuccess: () => {
          showAlert({
            title: "Contraseña restablecida",
            description:
              "Tu contraseña fue actualizada correctamente. Podés iniciar sesión ahora.",
            type: "success",
          });
        },
        onError: () => {
          showAlert({
            title: "Error al restablecer la contraseña",
            description:
              "El enlace puede haber expirado o ser inválido. Solicitá uno nuevo.",
            type: "error",
          });
        },
      }
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative grid place-items-center bg-gray-50">
      {/* Top bar */}
      <section className="absolute w-full h-16 top-0 z-10 flex items-center px-4 md:px-6">
        <h2 className="font-semibold tracking-tighter text-2xl max-md:text-lg">
          Mi Pelícano.
        </h2>
      </section>

      {/* Background shapes */}
      <section className="flex items-center max-md:items-end size-full absolute">
        <div className="flex h-full w-2/3 overflow-hidden" />
        <div className="flex h-full w-1/2 max-md:h-2/3 rounded-tl-[90%] overflow-hidden bg-primary-2" />
      </section>

      {/* Card container */}
      <div
        className={`z-10 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] p-8 md:p-12 space-y-6 ${
          isMobile ? "w-[90vw]" : "w-full max-w-md"
        }`}
      >
        {isValidating ? (
          <TokenValidatingState />
        ) : isTokenInvalid ? (
          <TokenInvalidState onGoToLogin={() => navigate("/login")} />
        ) : isSuccess ? (
          <ResetSuccessState onGoToLogin={() => navigate("/login")} />
        ) : (
          <ResetFormState
            form={form}
            onSubmit={onSubmit}
            isPending={resetPasswordMutation.isPending}
            onGoToLogin={() => navigate("/login")}
          />
        )}
      </div>
    </div>
  );
}

function TokenValidatingState() {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <div className="size-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <p className="text-gray-600">Verificando enlace...</p>
    </div>
  );
}

function TokenInvalidState({ onGoToLogin }: { onGoToLogin: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <XCircleIcon className="size-12 text-red-500" />
      <h2 className="text-xl font-semibold text-gray-800">
        Enlace inválido o expirado
      </h2>
      <p className="text-sm text-gray-500">
        Este enlace de recuperación ya no es válido. Los enlaces expiran después
        de un tiempo por seguridad. Solicitá uno nuevo desde la pantalla de
        inicio de sesión.
      </p>
      <Button type="button" className="w-full mt-2" onClick={onGoToLogin}>
        Volver al inicio de sesión
      </Button>
    </div>
  );
}

function ResetSuccessState({ onGoToLogin }: { onGoToLogin: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <CheckCircle2Icon className="size-12 text-green-500" />
      <h2 className="text-xl font-semibold text-gray-800">
        ¡Contraseña actualizada!
      </h2>
      <p className="text-sm text-gray-500">
        Tu contraseña fue restablecida correctamente. Serás redirigido al inicio
        de sesión en unos segundos.
      </p>
      <Button type="button" className="w-full mt-2" onClick={onGoToLogin}>
        Ir al inicio de sesión
      </Button>
    </div>
  );
}

type ResetFormStateProps = {
  form: ReturnType<typeof useForm<ResetPasswordFormValues>>;
  onSubmit: (values: ResetPasswordFormValues) => void;
  isPending: boolean;
  onGoToLogin: () => void;
};

function ResetFormState({
  form,
  onSubmit,
  isPending,
  onGoToLogin,
}: ResetFormStateProps) {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">
          Restablecer contraseña
        </h2>
        <p className="text-sm text-gray-500">
          Ingresá tu nueva contraseña. Debe tener al menos 8 caracteres,
          incluyendo mayúsculas, minúsculas y números.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    {...field}
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
                    type="password"
                    placeholder="Repetí la contraseña"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" className="w-full" isLoading={isPending}>
              Restablecer contraseña
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onGoToLogin}
            >
              Volver al inicio de sesión
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
