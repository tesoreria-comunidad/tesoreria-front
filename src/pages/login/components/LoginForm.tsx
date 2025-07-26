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
import { useAppDispatch } from "@/store/hooks";
import { setSession } from "@/store/features";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});
export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await AuthServices.login(values);
      const accessToken = res.backendTokens.accessToken;
      const user = res.user;
      dispatch(setSession(user));
      await setAuthInterceptor(accessToken);
      localStorage.setItem("accessToken", accessToken);
      if (user.role === "BENEFICIARIO") {
        location.replace("/beneficiario");
        return;
      }
      location.replace("/");
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 text-gray-800 ">
      <section className="flex items-center gap-4 justify-center">
        <p className="text-2xl ">
          Bienvenido a <strong className="text-primary">Mi Pelicano</strong>{" "}
        </p>
        <img src={Logo} alt="comunidad guia scout" className="size-[40px] " />
      </section>
      <hr className="text-primary border-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col  "
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
            Iniciar sesion
          </Button>
          <a rel="stylesheet" href="#" className="underline mx-auto text-sm">
            Olvidé mi Contraseña
          </a>
        </form>
      </Form>
    </div>
  );
}
