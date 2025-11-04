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
import { AuthServices } from "@/services/auth.service";
import { setAuthInterceptor } from "@/config/axios.config";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "/logo.png";
import { Logo as PelicanoLogo } from "@/components/common/Logo";
import { useAppDispatch } from "@/store/hooks";
import { setSession } from "@/store/features";
import { useAlert } from "@/context/AlertContext";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

type LoginFormProps = {
  /** Llamado solo si el login fue exitoso. El padre decide cuándo navegar. */
  onLoginSuccess?: (targetUrl: string) => void;
  /** Llamado cuando se inicia el submit (para mostrar overlay, etc.) */
  onLoginStart?: () => void;
  /** Llamado si hubo error (para ocultar overlay externo si lo usás). */
  onLoginError?: () => void;
};

export function LoginForm({
  onLoginSuccess,
  onLoginStart,
  onLoginError,
}: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      onLoginStart?.();

      const res = await AuthServices.login(values);
      const accessToken = res.backendTokens.accessToken;
      const user = res.user;

      dispatch(setSession(user));
      await setAuthInterceptor(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // Definimos la URL final
      let targetUrl = "/";
      if (user.role === "FAMILY") targetUrl = `/family/${user.id_family}`;
      else if (user.role === "BENEFICIARIO") targetUrl = "/beneficiario";

      if (onLoginSuccess) {
        // Dejar que el padre anime y luego navegue
        onLoginSuccess(targetUrl);
        return;
      }

      // Fallback: comportamiento actual si no pasan onLoginSuccess
      location.replace(targetUrl);
    } catch (error) {
      onLoginError?.();
      showAlert({
        title: "Error de inicio de sesión",
        description:
          "Usuario o contraseña incorrectos. Por favor, verifica tus datos e intenta nuevamente.",
        type: "error",
      });
      console.log("err", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 text-gray-800">
      <section className="flex items-center gap-4 justify-center">
        <p className="text-2xl  max-md:text-lg flex gap-2 items-center ">
          Bienvenido a <PelicanoLogo />
        </p>
        <img src={Logo} alt="comunidad guia scout" className="size-[40px]" />
      </section>

      <hr className="text-primary border-2" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col"
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
                    autoFocus={false}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" isLoading={loading}>
            Iniciar sesión
          </Button>

          <a rel="stylesheet" href="#" className="underline mx-auto text-sm">
            Olvidé mi Contraseña
          </a>
        </form>
      </Form>
    </div>
  );
}
