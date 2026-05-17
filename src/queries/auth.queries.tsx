import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { AuthServices } from "@/services/auth.service";
import { useAlert } from "@/context/AlertContext";

export function useAuthQueries() {}

export const useForgotPasswordMutation = () => {
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: (data: { email: string }) =>
      AuthServices.forgotPassword(data),
    onError: (error: AxiosError) => {
      if (error?.response?.status === 429) {
        showAlert({
          title: "Demasiadas solicitudes",
          description: "Demasiadas solicitudes. Intentá de nuevo en unos minutos.",
          type: "error",
        });
      }
    },
  });
};

export const useResetPasswordMutation = () => {
  const { showAlert } = useAlert();

  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      AuthServices.resetPassword(data),
    onError: (error: AxiosError) => {
      if (error?.response?.status === 429) {
        showAlert({
          title: "Demasiadas solicitudes",
          description: "Demasiadas solicitudes. Intentá de nuevo en unos minutos.",
          type: "error",
        });
      }
    },
  });
};

export const useValidateResetTokenQuery = (token: string) => {
  return useQuery({
    queryKey: ["reset-token-validate", token],
    queryFn: () => AuthServices.validateResetToken(token),
    enabled: token.length > 0,
    retry: false,
  });
};
