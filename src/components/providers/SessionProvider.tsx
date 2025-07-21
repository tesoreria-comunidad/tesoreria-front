import { setAuthInterceptor } from "@/config/axios.config";
import { AuthServices } from "@/services/auth.service";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

export function SessionProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  useEffect(() => {
    const validateUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await setAuthInterceptor(accessToken);
        const res = await AuthServices.me();
        console.log("/me res:", res);
      } catch (error) {
        localStorage.clear();
        navigate("/login");
      }
    };
    validateUser();
  }, []);
  return <div>{children}</div>;
}
