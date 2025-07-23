import { setAuthInterceptor } from "@/config/axios.config";
import { AuthServices } from "@/services/auth.service";
import { setSession } from "@/store/features";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

export function SessionProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await setAuthInterceptor(accessToken);
        const res = await AuthServices.me();
        dispatch(setSession(res));
      } catch (error) {
        localStorage.clear();
        navigate("/login");
      }
    };
    validateUser();
  }, []);
  return <div>{children}</div>;
}
