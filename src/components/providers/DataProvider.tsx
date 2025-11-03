import { Fragment, type PropsWithChildren } from "react";
import { useRamasQuery } from "@/queries/ramas.queries";
import { useUsersQuery } from "@/queries/user.queries";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useCuotasQuery } from "@/queries/cuota.queries";
import { useCPHQuery } from "@/queries/cuotaPorHermano.queries";
import { LoaderOverlay } from "../common/Loaders/LoaderOverlay";

export function DataProvider({ children }: PropsWithChildren) {
  const ramaQuery = useRamasQuery();
  const usersQuery = useUsersQuery();
  const familiesQuery = useFamiliesQuery();
  const cuotasQuery = useCuotasQuery();
  const cphQuery = useCPHQuery();

  if (
    ramaQuery.isLoading ||
    usersQuery.isLoading ||
    familiesQuery.isLoading ||
    cuotasQuery.isLoading ||
    cphQuery.isLoading
  )
    return <LoaderOverlay />;
  return <Fragment>{children}</Fragment>;
}
