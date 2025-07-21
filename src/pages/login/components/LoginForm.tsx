import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { AuthServices } from "@/services/auth.service";
import { useNavigate } from "react-router";
import { setAuthInterceptor } from "@/config/axios.config";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((s) => ({ ...s, [name]: value }));
  };

  const nav = useNavigate();

  const hanldeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await AuthServices.login(values);
      const accessToken = res.backendTokens.accessToken;
      await setAuthInterceptor(accessToken);
      localStorage.setItem("accessToken", accessToken);
      // falta actualizar redux
      console.log("RESPUESTA DEL LOGIN", res);
      nav("/");
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoading(false);
    }
    console.log("VALORES", values);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido a MiPelicano</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={hanldeSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Nombre de usuario</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="user name"
                    name="username"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                    onChange={handleInputChange}
                  />
                  <a
                    href="#"
                    className="mr-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  isLoading={loading}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
